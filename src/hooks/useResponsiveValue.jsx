'use client';

import { useIsMobile, useIsTablet, useIsDesktop } from './useDeviceDetection';

/**
 * RESPONSIVE VALUE SELECTION HOOK
 * Consolidates responsive logic in one place
 *
 * Usage:
 * const breakpoint = useResponsiveValue({
 *   mobile: 16,
 *   tablet: 24,
 *   desktop: 32,
 *   default: 20
 * });
 */
const useResponsiveValue = (options = {}) => {
	const { mobile, tablet, desktop, default: defaultVal } = options;
	const isMobile = useIsMobile();
	const isTablet = useIsTablet();
	const isDesktop = useIsDesktop();

	if (isMobile && mobile !== undefined) return mobile;
	if (isTablet && tablet !== undefined) return tablet;
	if (isDesktop && desktop !== undefined) return desktop;
	return defaultVal;
};

export default useResponsiveValue;

