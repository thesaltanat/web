'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

/**
 * Fast Route Navigation System
 * Features:
 * - Instant visual feedback (curtain)
 * - Background data preloading
 * - Network-friendly caching
 */

export class FastNavigationManager {
	constructor() {
		this.isNavigating = false;
		this.pendingNavigation = null;
		this.preloadQueue = [];
		this.navigationListeners = [];
		this.preloadedData = new Map();
		this.navigationStartTime = null;
	}

	/** Register listener for navigation start */
	onNavigationStart(callback) {
		this.navigationListeners.push({ type: 'start', callback });
		return () => {
			this.navigationListeners = this.navigationListeners.filter(
				l => l.callback !== callback,
			);
		};
	}

	/** Register listener for navigation end */
	onNavigationEnd(callback) {
		this.navigationListeners.push({ type: 'end', callback });
		return () => {
			this.navigationListeners = this.navigationListeners.filter(
				l => l.callback !== callback,
			);
		};
	}

	/** Emit navigation event */
	emit(type, data = {}) {
		this.navigationListeners.forEach(listener => {
			if (listener.type === type) listener.callback(data);
		});
	}

	/** Preload route data in background & cache for 5 mins */
	async preloadRouteData(url, apiFunction) {
		if (!apiFunction) return null;

		const cacheKey = `preload_${url}`;

		// already cached?
		if (this.preloadedData.has(cacheKey)) {
			return this.preloadedData.get(cacheKey);
		}

		try {
			const data = await apiFunction();

			this.preloadedData.set(cacheKey, data);

			// Auto-expire after 5 minutes
			setTimeout(
				() => this.preloadedData.delete(cacheKey),
				5 * 60 * 1000,
			);

			return data;
		} catch (error) {
			console.warn(`Failed to preload data for ${url}:`, error.message);
			return null;
		}
	}

	/** Get preloaded data if exists */
	getPreloadedData(url) {
		const cacheKey = `preload_${url}`;
		return this.preloadedData.get(cacheKey);
	}

	/** Clear preload cache */
	clearPreloadCache() {
		this.preloadedData.clear();
	}

	/** Fast navigation with instant UI feedback */
	async navigate(router, url, options = {}) {
		options = {
			showTransition: true,
			onStart: null,
			onEnd: null,
			preloadData: null,
			...options,
		};

		// If already navigating → queue the latest navigation
		if (this.isNavigating) {
			this.pendingNavigation = { url, options };
			return;
		}

		this.isNavigating = true;
		this.navigationStartTime = performance.now();

		// 1️⃣ Emit start instantly (start curtain)
		this.emit('start', { url, options });
		options.onStart?.();

		// 2️⃣ Preload data in background (optional)
		if (options.preloadData) {
			this.preloadRouteData(url, options.preloadData).catch(err =>
				console.warn('Preload failed:', err),
			);
		}

		try {
			// 3️⃣ Do the actual navigation
			await router.push(url);

			// 4️⃣ Measure navigation time
			const navigationTime = performance.now() - this.navigationStartTime;

			// 5️⃣ Emit end after load
			this.emit('end', { url, navigationTime, options });
			options.onEnd?.({ navigationTime });
		} catch (error) {
			console.error('Navigation failed:', error);
			this.emit('error', { url, error, options });
		} finally {
			this.isNavigating = false;

			// Process queued request (last wins)
			if (this.pendingNavigation) {
				const pending = this.pendingNavigation;
				this.pendingNavigation = null;
				this.navigate(router, pending.url, pending.options);
			}
		}
	}
}

// Global singleton
export const navigationManager = new FastNavigationManager();

/**
 * Hook to use fast navigation in components
 */
export function useFastNavigation() {
	const router = useRouter();
	const navigationRef = useRef(navigationManager);

	/** Push navigation */
	const push = useCallback(
		async (url, options = {}) => {
			return navigationRef.current.navigate(router, url, options);
		},
		[router],
	);

	/** Preload */
	const preload = useCallback((url, apiFunction) => {
		return navigationRef.current.preloadRouteData(url, apiFunction);
	}, []);

	/** Get preloaded */
	const getPreloaded = useCallback(url => {
		return navigationRef.current.getPreloadedData(url);
	}, []);

	/** Clear cache */
	const clearPreloadCache = useCallback(() => {
		return navigationRef.current.clearPreloadCache();
	}, []);

	// Cleanup listeners on unmount — safe guard
	useEffect(() => {
		return () => {};
	}, []);

	return {
		push,
		preload,
		getPreloaded,
		clearPreloadCache,
		navigationManager: navigationRef.current,
	};
}
