import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook to add scroll direction classes to document.body
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Scroll threshold before classes are applied (default: 250 for desktop, 80 for mobile)
 * @param {string} options.upClass - Class name for scrolling up (default: 'scroll-up')
 * @param {string} options.downClass - Class name for scrolling down (default: 'scroll-down')
 * @param {number} options.mobileBreakpoint - Breakpoint for mobile threshold (default: 991)
 * @param {Array} deps - Dependency array for useEffect
 */
export const useScrollDirection = (options = {}, deps = []) => {
	const {
		threshold,
		upClass = 'scroll-up',
		downClass = 'scroll-down',
		mobileBreakpoint = 991
	} = options;

	useEffect(() => {
		const body = document.body;
		const howMuchScroll = threshold ?? (window.innerWidth < mobileBreakpoint ? 80 : 250);

		const trigger = ScrollTrigger.create({
			start: 'top top',
			end: 'max',
			onUpdate: (self) => {
				// Check if scroll class changes should be prevented
				if (window.preventScrollClassChange) {
					return;
				}

				const currentScroll = self.scroll();

				// Remove classes when near the top
				if (currentScroll <= howMuchScroll) {
					body.classList.remove(upClass, downClass);
					return;
				}

				// Add/remove classes based on scroll direction
				if (self.direction === 1) {
					// Scrolling down
					body.classList.add(downClass);
					body.classList.remove(upClass);
				} else if (self.direction === -1) {
					// Scrolling up
					body.classList.add(upClass);
					body.classList.remove(downClass);
				}
			}
		});

		// Cleanup
		return () => {
			trigger.kill();
			body.classList.remove(upClass, downClass);
		};
	}, deps);
};

// Usage example:
// import { useScrollDirection } from './hooks/useScrollDirection';
//
// function App() {
//   const location = useLocation();
//
//   // Basic usage
//   useScrollDirection({}, [location]);
//
//   // Custom configuration
//   useScrollDirection({
//     threshold: 100,
//     upClass: 'scrolling-up',
//     downClass: 'scrolling-down',
//     mobileBreakpoint: 768
//   }, [location]);
//
//   return <div>Your content</div>;
// }