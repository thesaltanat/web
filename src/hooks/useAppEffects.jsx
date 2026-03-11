import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const useAppEffects = () => {
	const pathName = usePathname();

	// ✅ FIXED: Proper page scroll reset with load event detection
	useEffect(() => {
		const handlePageReady = () => {
			document.body.style.cursor = 'default';
			window.scrollTo(0, 0);
		};

		// Use load event instead of magic timeout
		if (document.readyState === 'complete') {
			handlePageReady();
		} else {
			window.addEventListener('load', handlePageReady);
			return () => window.removeEventListener('load', handlePageReady);
		}
	}, [pathName]);

	useEffect(() => {
		const setVhProperty = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};
		setVhProperty();
		window.addEventListener('resize', setVhProperty);
		return () => window.removeEventListener('resize', setVhProperty);
	}, []);

	// ✅ FIXED: Service Worker registration with error recovery and periodic updates
	useEffect(() => {
		const registerServiceWorker = async () => {
			if (!('serviceWorker' in navigator)) return;

			try {
				const registration = await navigator.serviceWorker.register(
					'/sw.js',
					{
						scope: '/',
						updateViaCache: 'none', // Always check for updates
					},
				);

				// Only log in development
				if (process.env.NODE_ENV === 'development') {
					// eslint-disable-next-line no-console
					console.log(
						'Service Worker registered with scope:',
						registration.scope,
					);
				}

				// Check for updates periodically
				const updateInterval = setInterval(() => {
					registration.update();
				}, 60000); // Every minute

				return () => clearInterval(updateInterval);
			} catch (error) {
				// Only log in development
				if (process.env.NODE_ENV === 'development') {
					// eslint-disable-next-line no-console
					console.error('Service Worker registration failed:', error);
				}

				// Report to monitoring service in production
				if (typeof window !== 'undefined' && window.Sentry) {
					window.Sentry.captureException(error, {
						contexts: {
							serviceWorker: { action: 'registration' },
						},
					});
				}
			}
		};

		registerServiceWorker();
	}, []);
};

export default useAppEffects;
