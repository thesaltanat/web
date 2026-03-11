'use client';

/**
 * CENTRALIZED HOOKS INDEX
 * All hooks imported from this single location prevents duplicates
 *
 * MIGRATION GUIDE:
 * OLD: useDeviceType → NEW: useIsDesktop
 * OLD: useDeviceTypeMobile → NEW: useIsMobile
 * OLD: useDeviceTypeTab → NEW: useIsTablet
 */

// ============ DEVICE DETECTION (CONSOLIDATED) ============
export {
	useBreakpoint,
	useIsMobile,
	useIsTablet,
	useIsDesktop,
	useIsMobileDevice,
	usePrefersReducedMotion,
	useMedia,
} from './useDeviceDetection';

// ============ IMAGE LOADING ============
export { default as useImageLoader } from './useImageLoader';

// ============ RESPONSIVE VALUES ============
export { default as useResponsiveValue } from './useResponsiveValue';

// ============ EXISTING HOOKS ============
export { default as useAppEffects } from './useAppEffects';
export { default as useContainerOffset } from './useContainerOffset';
export { default as useMenuHoverEffect } from './useMenuHoverEffect';
export { default as useMetadata } from './useMetadata';
export { default as useNavigationHover } from './useNavigationHover';
export { default as useRouteChangeCleanup } from './useRouteChangeCleanup';
export { default as useSafeParseHTML } from './useSafeParseHTML';
export { default as useScrollDirection } from './useScrollDirection';
export { default as useScrollTriggerCleanup } from './useScrollTriggerCleanup';
export { default as useSmoothScrollAndTop } from './useSmoothScrollAndTop';
export { default as useViewportHeight } from './useViewportHeight';
export { default as useWindowSize } from './useWindowSize';
export { useBodyScrollLock } from './useBodyScrollLock';
export { useOverflowControl } from './useOverflowControl';

// ============ DEPRECATED HOOKS (BACKWARDS COMPATIBLE) ============
// These are deprecated - migrate to new centralized hooks
import { useIsDesktop, useIsMobile, useIsTablet } from './useDeviceDetection';

let deprecationWarnings = {};

const warn = (oldHook, newHook) => {
	if (deprecationWarnings[oldHook]) return;
	deprecationWarnings[oldHook] = true;
	console.warn(
		`⚠️ [DEPRECATED] "${oldHook}" is deprecated. Use "${newHook}" from '@/src/hooks' instead.`
	);
};

export const useDeviceType = () => {
	warn('useDeviceType', 'useIsDesktop');
	return useIsDesktop();
};

export const useDeviceTypeMobile = () => {
	warn('useDeviceTypeMobile', 'useIsMobile');
	return useIsMobile();
};

export const useDeviceTypeTab = () => {
	warn('useDeviceTypeTab', 'useIsTablet');
	return useIsTablet();
};

