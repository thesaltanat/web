import { gsap } from 'gsap';
import { useEffect } from 'react';

/**
 * Custom hook to handle menu hover effects and image mask reveal animations.
 * This logic was extracted from Header.jsx to isolate memory leaks and buggy transitions.
 *
 * @param {boolean} isMenuOpen - Whether the menu overlay is open.
 */
export default function useMenuHoverEffect(isMenuOpen) {
	useEffect(() => {
		if (!isMenuOpen) return;

		let handlers = [];
		let timer;
		let isMounted = true;

		function setupMenuHoverListeners() {
			if (!isMounted) return;
			const getLis = document.querySelectorAll('.hover-item');
			const getimgs = document.querySelectorAll('.left li');
			const rightWrapper = document.querySelectorAll('.right');
			const getRightImg = document.querySelectorAll('.right li');
			const wrapper = document.querySelector('.left');
			const imageWrappers = document.querySelectorAll('.image-wrapper');

			if (!getLis.length || !imageWrappers.length) return;

			const handleHover = i => {
				if (!isMounted) return;
				// Scroll to the corresponding image
				if (wrapper) {
					gsap.to(wrapper, {
						duration: 0.8,
						scrollTo: {
							y: getimgs[i]?.offsetTop - 130,
							autoKill: true,
						},
						ease: 'power2.out',
					});
				}

				if (rightWrapper.length > 0) {
					gsap.to(rightWrapper, {
						duration: 0.8,
						scrollTo: {
							y: getRightImg[i + 1]?.offsetTop,
							autoKill: true,
						},
						ease: 'power2.out',
					});
				}

				// Update image with mask reveal effect
				imageWrappers.forEach((wrap, index) => {
					// Remove all mask classes first
					wrap.classList.remove('active', 'mask-reveal');

					if (index === i) {
						// Add mask reveal effect for hovered item
						wrap.classList.add('mask-reveal');
						gsap.to(wrap, {
							duration: 0.4,
							opacity: 1,
							scale: 1.05,
							ease: 'power2.out',
						});
					} else {
						// Reset other items
						gsap.to(wrap, {
							duration: 0.4,
							opacity: 1,
							scale: 1,
							ease: 'power2.out',
						});
					}
				});
			};

			const handleMouseLeave = () => {
				if (!isMounted) return;
				// Reset all images and masks when leaving menu items
				imageWrappers.forEach((wrap, index) => {
					wrap.classList.remove('mask-reveal');

					if (index === 0) {
						// First item stays active
						wrap.classList.add('active');
						gsap.to(wrap, {
							duration: 0.4,
							opacity: 1,
							scale: 1,
							ease: 'power2.out',
						});
					} else {
						gsap.to(wrap, {
							duration: 0.4,
							opacity: 0.3,
							scale: 1,
							ease: 'power2.out',
						});
					}
				});
			};

			// Bind listeners
			getLis.forEach((el, i) => {
				const anchor = el.querySelector('a');
				if (anchor) {
					const onMouseOver = () => handleHover(i);
					const onMouseLeave = () => handleMouseLeave();

					el.addEventListener('mouseover', onMouseOver);
					el.addEventListener('mouseleave', onMouseLeave);

					handlers.push({ el, onMouseOver, onMouseLeave });
				}
			});
		}

		timer = setTimeout(setupMenuHoverListeners, 100);

		return () => {
			isMounted = false;
			clearTimeout(timer);
			handlers.forEach(({ el, onMouseOver, onMouseLeave }) => {
				el.removeEventListener('mouseover', onMouseOver);
				el.removeEventListener('mouseleave', onMouseLeave);
			});
		};
	}, [isMenuOpen]);
}
