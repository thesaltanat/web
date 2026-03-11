/**
 * Route Change Performance Monitor
 * Tracks and optimizes route transition performance
 */

'use client';

import { useEffect } from 'react';
import { navigationManager } from './FastNavigationManager';

/**
 * Track route performance metrics
 */
export function useRoutePerformance() {
	useEffect(() => {
		// Monitor navigation start
		const unsubscribeStart = navigationManager.onNavigationStart(({ url }) => {
			// Mark navigation start
			if (window.performance && window.performance.mark) {
				window.performance.mark(`navigation-start-${url}`);
			}

			// Log to analytics
			logMetric('navigation_start', { url });
		});

		// Monitor navigation end
		const unsubscribeEnd = navigationManager.onNavigationEnd(
			({ url, navigationTime }) => {
				// Mark navigation end
				if (window.performance && window.performance.mark) {
					window.performance.mark(`navigation-end-${url}`);

					try {
						window.performance.measure(
							`navigation-duration-${url}`,
							`navigation-start-${url}`,
							`navigation-end-${url}`
						);
					} catch (e) {
						console.warn('Performance measurement failed:', e);
					}
				}

				// Log to analytics
				logMetric('navigation_complete', {
					url,
					duration_ms: navigationTime,
					fast: navigationTime < 500, // Consider < 500ms as "fast"
				});

				// Log to console in development
				if (process.env.NODE_ENV === 'development') {
					console.log(
						`%c⚡ Navigation: ${navigationTime.toFixed(0)}ms`,
						navigationTime < 500
							? 'color: green; font-weight: bold'
							: 'color: orange; font-weight: bold'
					);
				}
			}
		);

		return () => {
			unsubscribeStart();
			unsubscribeEnd();
		};
	}, []);
}

/**
 * Log metrics to analytics service
 */
function logMetric(eventName, data = {}) {
	try {
		// Google Analytics
		if (window.gtag) {
			window.gtag('event', eventName, data);
		}

		// Custom analytics endpoint
		if (process.env.NEXT_PUBLIC_ANALYTICS_URL) {
			fetch(process.env.NEXT_PUBLIC_ANALYTICS_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					event: eventName,
					timestamp: Date.now(),
					...data,
				}),
			}).catch(() => {}); // Fail silently
		}
	} catch (error) {
		console.warn('Analytics logging failed:', error);
	}
}

/**
 * Component to include in layout for automatic performance tracking
 */
export default function RoutePerformanceTracker() {
	useRoutePerformance();
	return null;
}

