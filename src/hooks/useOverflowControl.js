import { useEffect } from 'react';

/**
 * Hook to control document overflow state
 * Prevents overflow:hidden on mobile devices
 * @param {boolean} shouldLock - Whether to lock the body scroll
 * @param {object} options - Configuration options
 */
export const useOverflowControl = (shouldLock = true, options = {}) => {
	const { disableOnMobile = true } = options;

	useEffect(() => {
		// Check if device is mobile
		const isMobileDevice = () => {
			if (typeof window === 'undefined') return false;
			return (
				window.innerWidth <= 768 ||
				/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				)
			);
		};

		if (!shouldLock) {
			// Reset overflow if not locking
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
			return;
		}

		const isMobile = isMobileDevice();

		// Apply overflow:hidden only on desktop
		if (shouldLock && !isMobile) {
			document.body.style.overflow = 'hidden';
			document.documentElement.style.overflow = 'hidden';
		} else if (isMobile && disableOnMobile) {
			// Reset overflow on mobile
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		}

		// Cleanup function
		return () => {
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		};
	}, [shouldLock, disableOnMobile]);
};

export default useOverflowControl;

