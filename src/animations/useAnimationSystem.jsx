import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { initLenis, getLenis } from './getLenis';
import { animationManager } from '@/src/services/animation/AnimationManager';
import { useIsMobileDevice, useBreakpoint } from '@/src/hooks/useDeviceDetection';

// Register GSAP plugins
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

/**
 * Master Animation Hook
 * Consolidates: GSAP Setup, Lenis, Page Transitions, Parallax, and ScrollTrigger Refresh
 */
const useAnimationSystem = ({
	enabled = true,
	preventScroll = true,
	enableParallax = true,
	minWidth = 991,
	...options
} = {}) => {
	const pathname = usePathname();
	const isMobile = useIsMobileDevice();
	const isUnder1024 = useBreakpoint(1023);

	// State
	const [lenis, setLenis] = useState(null);
	const [isReady, setIsReady] = useState(false);
	const isInitialLoadRef = useRef(true);
	const animationsRef = useRef([]);
	const parallaxTimeoutsRef = useRef([]);
	const parallaxTriggersRef = useRef([]);

	// 1. GSAP Global Configuration
	useEffect(() => {
		if (!enabled) return;

		gsap.config({
			force3D: true,
			nullTargetWarn: false,
		});

		const config = {
			autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
			ignoreMobileResize: true,
		};
		ScrollTrigger.config(config);
	}, [enabled]);

	// 2. Lenis Initialization & Loop
	useEffect(() => {
		if (typeof window === 'undefined' || !enabled) return;

		// Initialize Lenis
		const lenisInstance = initLenis(options);

		// RAF Loop
		const rafId = animationManager.createRAF((time) => {
			lenisInstance.raf(time);
		});

		setLenis(lenisInstance);

		// Immediate refresh to sync everything
		animationManager.refresh();
		setIsReady(true);

		return () => {
			if (rafId) rafId(); // Stop RAF
			// Note: We don't destroy Lenis here as it might be shared, 
			// but for a singleton usage this is fine. 
			// The getLenis module handles singleton state.
		};
	}, [enabled]);

	// 3. Scroll Handling & Page Transitions
	useEffect(() => {
		if (typeof window === 'undefined') return;

		// Scroll to top logic
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		} else if (isMobile) {
			window.scrollTo(0, 0);
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		} else {
			const smoother = ScrollSmoother?.get();
			if (smoother) smoother.scrollTop(0, true);
			else window.scrollTo(0, 0);
		}

		// Body Classes
		const body = document.body;
		if (pathname.includes('/press-release')) {
			body.classList.add('press-release-body');
		} else {
			body.classList.remove('press-release-body');
		}

	}, [pathname, lenis, isMobile]);

	// --- Fix: Always scroll to top on route change ---
	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		} else if (isMobile) {
			window.scrollTo(0, 0);
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		} else {
			const smoother = ScrollSmoother?.get();
			if (smoother) smoother.scrollTop(0, true);
			else window.scrollTo(0, 0);
		}
	}, [pathname, lenis, isMobile]);

	// 4. Initial Load Scroll Prevention
	useEffect(() => {
		if (!preventScroll) return;

		if (isInitialLoadRef.current && !isMobile) {
			document.body.style.overflow = 'hidden';
			document.documentElement.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		}

		const timeout = setTimeout(() => {
			isInitialLoadRef.current = false;
		}, 100);

		return () => clearTimeout(timeout);
	}, [pathname, preventScroll, isMobile]);

	// 5. ScrollTrigger Refresh Logic
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const refresh = () => ScrollTrigger.refresh();

		if (document.readyState === 'complete') {
			refresh();
		} else {
			window.addEventListener('load', refresh);
		}

		const initialTimeout = setTimeout(refresh, 500);

		const resizeObserver = new ResizeObserver(() => {
			refresh();
		});

		const mainWrapper = document.getElementById('main-wrapper') || document.body;
		resizeObserver.observe(mainWrapper);

		return () => {
			window.removeEventListener('load', refresh);
			clearTimeout(initialTimeout);
			resizeObserver.disconnect();
		};
	}, [pathname]);

	// 6. Parallax Effects
	useEffect(() => {
		// Conditions to skip parallax
		if (!enabled || !enableParallax || isMobile || isUnder1024) return;

		// A. Hardcoded Selector Parallax (from useParallaxEffect)
		const setupSelectorParallax = () => {
			const PARALLAX_SELECTORS = [
				['.animated-right', { set: { xPercent: 0 }, to: size => ({ xPercent: size + 50 }) }],
				['.animated-left', { set: { xPercent: 0 }, to: size => ({ xPercent: -(size + 50) }) }],
				['.animated-top', { set: { yPercent: 0 }, to: size => ({ yPercent: -(size + 50) }) }],
				['.animated-bottom', { set: { yPercent: 0 }, to: size => ({ yPercent: size + 50 }) }],
				['.fixed-left', { set: { rotation: 0, transformOrigin: 'center center' }, to: () => ({ rotation: 45 }) }],
				['.fixed-right', { set: { rotation: 0, transformOrigin: 'center center' }, to: () => ({ rotation: -45 }) }],
				['.video_tour', { set: { y: 0 }, to: () => ({ y: -100 }) }],
			];

			let attempts = 0;
			const maxAttempts = 4;

			const createAllParallax = () => {
				attempts += 1;
				let createdCount = 0;

				PARALLAX_SELECTORS.forEach(([selector, props]) => {
					const nodes = gsap.utils.toArray(selector);
					nodes.forEach(item => {
						// Avoid double binding
						if (item._gsapParallaxBound) return;
						item._gsapParallaxBound = true;

						const parallaxSize = parseInt(item.getAttribute('data-size')) || 20;
						gsap.set(item, { ...props.set, willChange: 'transform' });

						const tween = gsap.to(item, {
							...props.to(parallaxSize),
							ease: 'none',
							force3D: true,
							scrollTrigger: {
								trigger: item,
								start: 'top bottom',
								end: 'bottom top',
								scrub: 1,
								refreshPriority: 1,
								invalidateOnRefresh: true,
							},
						});
						parallaxTriggersRef.current.push(tween.scrollTrigger);
						createdCount += 1;
					});
				});

				if (createdCount > 0) ScrollTrigger.refresh();

				if (createdCount === 0 && attempts < maxAttempts) {
					const id = setTimeout(createAllParallax, 150 * attempts);
					parallaxTimeoutsRef.current.push(id);
				}
			};

			const initialId = setTimeout(createAllParallax, 120);
			parallaxTimeoutsRef.current.push(initialId);
		};

		// B. Generic .parallax Class Support (from useScrollAnimations)
		const setupGenericParallax = () => {
			if (window.innerWidth < minWidth) return;

			const elements = document.querySelectorAll('.parallax');
			elements.forEach(element => {
				if (element._gsapGenericBound) return;
				element._gsapGenericBound = true;

				const speed = element.dataset.speed ?? 0.1;
				const animation = animationManager.to(element, {
					y: () => -(window.innerHeight * speed),
					ease: 'none',
					scrollTrigger: {
						trigger: element,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1,
						refreshPriority: 1,
						invalidateOnRefresh: true,
					},
				});
				if (animation) animationsRef.current.push(animation);
			});
		};

		setupSelectorParallax();
		setupGenericParallax();

		return () => {
			// Cleanup selector parallax
			parallaxTimeoutsRef.current.forEach(id => clearTimeout(id));
			parallaxTriggersRef.current.forEach(t => t?.kill());

			// Cleanup generic parallax
			animationsRef.current.forEach(anim => {
				if (anim.scrollTrigger) anim.scrollTrigger.kill();
				anim.kill();
			});

			// Reset refs
			parallaxTriggersRef.current = [];
			animationsRef.current = [];
		};

	}, [pathname, enabled, enableParallax, isMobile, isUnder1024, minWidth]);

	return {
		lenis,
		isReady,
		currentPath: pathname,
		isInitialLoad: isInitialLoadRef.current
	};
};

export default useAnimationSystem;
