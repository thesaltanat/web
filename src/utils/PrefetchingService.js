'use client';

import { useEffect } from 'react';

/**
 * Route Prefetching & Offline Service
 *
 * 1. Registers service worker
 * 2. Prefetches route data before navigation
 * 3. Prefetches common API endpoints
 * 4. DNS-prefetch for faster lookups
 * 5. Predicts next page & fetches on idle
 */

export default function PrefetchingService() {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		// ---------------------------
		// SERVICE WORKER
		// ---------------------------
		function registerServiceWorker() {
			if (!('serviceWorker' in navigator)) return;

			navigator.serviceWorker
				.register('/sw.js', { scope: '/' })
				.then(registration => {
					console.log('Service Worker registered');

					// periodically check updates
					setInterval(() => registration.update(), 60000);
				})
				.catch(e => console.warn('SW registration failed', e));
		}

		// ---------------------------
		// DNS PREFETCH
		// ---------------------------
		function setupDNSPrefetch() {
			const apis = [
				process.env.NEXT_PUBLIC_API_URL,
				'https://fonts.googleapis.com',
				'https://fonts.gstatic.com',
			].filter(Boolean);

			apis.forEach(api => {
				const link = document.createElement('link');
				link.href = api;
				link.rel = 'dns-prefetch';
				document.head.appendChild(link);
			});
		}

		// ---------------------------
		// PREFETCH A ROUTE/URL
		// ---------------------------
		function prefetchRoute(url) {
			if (!url || !url.startsWith('/')) return;

			try {
				// HTML prefetch
				const link = document.createElement('link');
				link.rel = 'prefetch';
				link.as = 'fetch';
				link.crossOrigin = 'anonymous';
				link.href = url;
				document.head.appendChild(link);

				// Service worker prefetch push
				if (
					'serviceWorker' in navigator &&
					navigator.serviceWorker.controller
				) {
					navigator.serviceWorker.controller.postMessage({
						type: 'PREFETCH',
						url,
					});
				}
			} catch (e) {
				console.warn('Prefetch failed', e);
			}
		}

		// ---------------------------
		// PREFETCH API ENDPOINTS
		// ---------------------------
		function prefetchAPIs() {
			const apiEndpoints = [
				'/api/get-req-data/global-data',
				'/api/get-req-data/all-products',
			];

			apiEndpoints.forEach(api => {
				const link = document.createElement('link');
				link.rel = 'prefetch';
				link.as = 'fetch';
				link.crossOrigin = 'anonymous';
				link.href = api;
				document.head.appendChild(link);
			});
		}

		// ---------------------------
		// LINK PREFETCH (viewport)
		// ---------------------------
		function setupLinkPrefetching() {
			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						if (
							entry.isIntersecting &&
							entry.target.tagName === 'A'
						) {
							const href = entry.target.getAttribute('href');
							if (
								href &&
								href.startsWith('/') &&
								!href.includes('#')
							) {
								prefetchRoute(href);
							}
						}
					});
				},
				{ rootMargin: '50px' },
			);

			document
				.querySelectorAll('a[href^="/"]')
				.forEach(link => observer.observe(link));

			// observe new links dynamically
			const mutationObserver = new MutationObserver(mutations => {
				mutations.forEach(m => {
					m.addedNodes.forEach(node => {
						if (node.nodeType === 1) {
							node.querySelectorAll?.('a[href^="/"]')?.forEach(
								link => observer.observe(link),
							);
						}
					});
				});
			});

			mutationObserver.observe(document.body, {
				childList: true,
				subtree: true,
			});
		}

		// ---------------------------
		// ROUTE PREDICTION
		// ---------------------------
		function setupRoutePrediction() {
			const currentPath = window.location.pathname;
			const routes = [];

			if (currentPath === '/')
				routes.push('/about', '/blog', '/products');
			if (currentPath.startsWith('/blog'))
				routes.push('/contact', '/blog');
			if (currentPath.startsWith('/products'))
				routes.push('/contact', '/products');

			routes.forEach(prefetchRoute);
		}

		// ---------------------------
		// IDLE PREFETCH
		// ---------------------------
		function setupIdlePrefetch() {
			let lastScroll = 0;
			let lastMove = 0;

			document.addEventListener(
				'scroll',
				() => (lastScroll = Date.now()),
			);
			document.addEventListener(
				'mousemove',
				() => (lastMove = Date.now()),
			);

			setInterval(() => {
				const now = Date.now();
				const idle = Math.min(now - lastScroll, now - lastMove);

				if (idle > 2000) setupRoutePrediction();
			}, 5000);
		}

		// ---------------------------
		// RUN EVERYTHING
		// ---------------------------
		registerServiceWorker();
		setupDNSPrefetch();
		prefetchAPIs();
		setupLinkPrefetching();
		setupIdlePrefetch();
		setupRoutePrediction();
	}, []);

	return null; // service only — no UI
}
