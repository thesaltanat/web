'use client';
import { useCallback, useEffect } from 'react';

/**
 * Custom hook to calculate and set viewport height CSS custom properties
 * Handles mobile viewport issues where 100vh doesn't account for browser UI
 *
 * Sets the following CSS custom properties on the html element:
 * - --vh: 1% of viewport height
 * - --dvh: 1% of dynamic viewport height (changes with browser UI)
 * - --svh: 1% of small viewport height (excludes browser UI)
 * - --lvh: 1% of large viewport height (includes browser UI)
 */
const useViewportHeight = () => {
	const calculateViewportHeight = useCallback(() => {
		if (typeof window === 'undefined') return;

		const html = document.documentElement;

		// Get the actual viewport dimensions
		const windowHeight = window.innerHeight;
		const screenHeight = window.screen.height;

		// Calculate 1% of the viewport height
		const vh = windowHeight * 0.01;

		// Calculate different viewport height variants
		const calculations = {
			// Standard viewport height (1% of current viewport)
			'--vh': `${vh}px`,

			// Dynamic viewport height (same as vh for most cases)
			'--dvh': `${vh}px`,

			// Small viewport height (accounting for mobile browser UI)
			'--svh':
				`${Math.min(windowHeight, screenHeight * 0.01 * 100)}px`.replace(
					'100px',
					`${Math.min(windowHeight, screenHeight) * 0.01}px`,
				),

			// Large viewport height (full screen height)
			'--lvh': `${screenHeight * 0.01}px`,
		};

		// Handle mobile-specific calculations
		if (isMobileDevice()) {
			// For mobile devices, adjust for browser chrome
			const mobileVh = windowHeight * 0.01;

			calculations['--vh'] = `${mobileVh}px`;
			calculations['--dvh'] = `${mobileVh}px`;

			// Small viewport height (browser UI visible)
			calculations['--svh'] =
				`${Math.min(windowHeight, screenHeight * 0.75) * 0.01}px`;

			// Large viewport height (browser UI hidden)
			calculations['--lvh'] = `${screenHeight * 0.01}px`;
		}

		// Apply the custom properties to the html element
		Object.entries(calculations).forEach(([property, value]) => {
			html.style.setProperty(property, value);
		});

		// Optional: Log for debugging in development
		if (process.env.NODE_ENV === 'development') {
			// eslint-disable-next-line no-console
		}
	}, []);

	// Throttled resize handler to improve performance
	const throttledResize = useCallback(() => {
		let ticking = false;

		return () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					calculateViewportHeight();
					ticking = false;
				});
				ticking = true;
			}
		};
	}, [calculateViewportHeight]);

	useEffect(() => {
		// Initial calculation
		calculateViewportHeight();

		// Create throttled resize handler
		const handleResize = throttledResize();

		// Add event listeners
		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);

		// Handle mobile browser UI changes (address bar show/hide)
		window.addEventListener('scroll', handleResize);

		// Handle focus events (keyboard show/hide on mobile)
		window.addEventListener('focusin', handleResize);
		window.addEventListener('focusout', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('orientationchange', handleResize);
			window.removeEventListener('scroll', handleResize);
			window.removeEventListener('focusin', handleResize);
			window.removeEventListener('focusout', handleResize);
		};
	}, [calculateViewportHeight, throttledResize]);

	// Return current values (optional, for components that need them)
	return {
		recalculate: calculateViewportHeight,
	};
};

/**
 * Helper function to detect mobile devices
 */
const isMobileDevice = () => {
	if (typeof window === 'undefined') return false;

	return (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		) || window.innerWidth <= 768
	);
};

/**
 * Alternative hook for getting viewport height values directly
 */
export const useViewportHeightValues = () => {
	const calculateValues = () => {
		if (typeof window === 'undefined') {
			return { vh: 0, dvh: 0, svh: 0, lvh: 0 };
		}

		const windowHeight = window.innerHeight;
		const screenHeight = window.screen.height;

		return {
			vh: windowHeight * 0.01,
			dvh: windowHeight * 0.01,
			svh: Math.min(windowHeight, screenHeight * 0.75) * 0.01,
			lvh: screenHeight * 0.01,
		};
	};

	return calculateValues();
};

export default useViewportHeight;
