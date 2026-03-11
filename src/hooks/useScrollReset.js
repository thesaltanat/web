import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Layout-level scroll reset hook
 * This ensures scroll position is reset immediately on route changes
 * Should be used in the main layout or app component
 */
const useScrollReset = () => {
	const pathname = usePathname();

	useEffect(() => {
		// Immediate scroll reset - happens synchronously
		if (typeof window !== 'undefined') {
			// Multiple approaches to ensure scroll is at top
			window.scrollTo(0, 0);
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;

			// Force a reflow to ensure the scroll position is applied
			document.documentElement.scrollLeft = 0;
			document.body.scrollLeft = 0;

			// Set scroll behavior to instant temporarily
			const html = document.documentElement;
			const body = document.body;
			const htmlScrollBehavior = html.style.scrollBehavior;
			const bodyScrollBehavior = body.style.scrollBehavior;

			html.style.scrollBehavior = 'auto';
			body.style.scrollBehavior = 'auto';

			// Restore scroll behavior after a frame
			requestAnimationFrame(() => {
				html.style.scrollBehavior = htmlScrollBehavior;
				body.style.scrollBehavior = bodyScrollBehavior;
			});
		}
	}, [pathname]);
};

export default useScrollReset;
