'use client';

import { useEffect, useState } from 'react';
import { addResizeListener } from '@/src/utils/sharedResizeObserver';

// ============ CONSOLIDATED DEVICE DETECTION ============
// Replaces: useDeviceType, useDeviceTypeMobile, useDeviceTypeTab
// Single source of truth for all device-based logic

const useBreakpoint = (breakpoint = 768) => {
	const [isBelow, setIsBelow] = useState(() => {
		if (typeof window === 'undefined') return false;
		return window.innerWidth <= breakpoint;
	});

	useEffect(() => {
		const handleResize = () => setIsBelow(window.innerWidth <= breakpoint);
		handleResize();
		return addResizeListener(handleResize);
	}, [breakpoint]);

	return isBelow;
};

const useIsMobile = () => useBreakpoint(767);
const useIsTablet = () => useBreakpoint(993);
const useIsDesktop = () => !useBreakpoint(1170);

const useIsMobileDevice = () => {
	const isMobileViewport = useIsMobile();
	if (typeof window === 'undefined') return false;
	if (!isMobileViewport) return false;
	return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);
};

const usePrefersReducedMotion = () => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		try {
			if (typeof window === 'undefined') return;
			const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
			setMatches(mql.matches);

			const handler = (e) => setMatches(e.matches);
			if (mql.addEventListener) {
				mql.addEventListener('change', handler);
				return () => mql.removeEventListener('change', handler);
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn('useMedia query failed', e);
		}
	}, []);

	return matches;
};

const useMedia = (query, defaultState = false) => {
	const [matches, setMatches] = useState(() => {
		try {
			if (typeof window === 'undefined') return defaultState;
			return window.matchMedia(query).matches;
		} catch {
			return defaultState;
		}
	});

	useEffect(() => {
		try {
			const mql = window.matchMedia(query);
			const handler = (e) => setMatches(e.matches);

			if (mql.addEventListener) {
				mql.addEventListener('change', handler);
				return () => mql.removeEventListener('change', handler);
			} else if (mql.addListener) {
				mql.addListener(handler);
				return () => mql.removeListener(handler);
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn('useMedia query failed:', query, e);
		}
	}, [query]);

	return matches;
};

export {
	useBreakpoint,
	useIsMobile,
	useIsTablet,
	useIsDesktop,
	useIsMobileDevice,
	usePrefersReducedMotion,
	useMedia,
};

