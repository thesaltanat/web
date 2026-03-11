// lib/lenis.js
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let scrollHandler = null;
let gsapTicker = null;

// Simple device detection
const isMobileDevice = () => {
	if (typeof window === 'undefined') return false;
	return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const initLenis = () => {
	if (lenisInstance) return lenisInstance;

	if (typeof window === 'undefined') return null;

	const isMobile = isMobileDevice();

	// Obys-like smooth scroll configuration
	lenisInstance = new Lenis({
		duration: isMobile ? 1.8 : 1.5, // Longer duration for buttery smoothness
		easing: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Perfect easing curve like Obys
		direction: 'vertical',
		smooth: !isMobile,
		touchMultiplier: isMobile ? 1.5 : 1.8, // Smoother touch response
		wheelMultiplier: isMobile ? 0.6 : 0.8, // Reduced for ultra smooth feel
		lerp: isMobile ? 0.08 : 0.07, // Lower lerp for more smoothness
		infinite: false,
		orientation: 'vertical',
		gestureOrientation: 'vertical',
		wrapper: window,
		content: document.body,
		syncTouch: !isMobile,
		syncTouchLerp: 0.08, // Smoother touch lerp
		touchInertiaMultiplier: 25, // Reduced for smoother momentum
		preventScrollOnTouch: false, // Allow touch scrolling for better UX
		smoothmobile: false, // Disable smooth on mobile for performance
		normalizeWheel: false, // Normalize wheel delta for consistent experience
		nested: true, // Enable nested scroll for scrollable containers
	});

	// Optimized scroll handler with throttling
	let ticking = false;
	scrollHandler = ({ scroll }) => {
		if (!ticking) {
			requestAnimationFrame(() => {
				const menuElement = document.querySelector('.site-menu');
				if (menuElement) {
					if (scroll > 300) {
						menuElement.classList.add('color');
					} else if (scroll < 300) {
						menuElement.classList.remove('color');
					}
				}
				// Throttled ScrollTrigger update - REMOVED for Safari jitter fix
				// ScrollTrigger.update();
				ticking = false;
			});
			ticking = true;
		}
	};
	lenisInstance.on('scroll', scrollHandler);

	// Optimized GSAP ticker integration
	gsapTicker = time => {
		if (lenisInstance) {
			lenisInstance.raf(time * 1000);
		}
	};
	gsap.ticker.add(gsapTicker);
	gsap.ticker.lagSmoothing(1000, 16);

	// Optimize performance settings
	gsap.config({
		force3D: 'auto', // Let browser decide. force3D:true is bad for Safari memory.
		nullTargetWarn: false,
		trialWarn: false,
	});

	// Make Lenis and ScrollTrigger globally available for page transitions
	if (typeof window !== 'undefined') {
		window.lenisInstance = lenisInstance;
		window.ScrollTrigger = ScrollTrigger;
	}

	return lenisInstance;
};

export const getLenis = () => lenisInstance;

export const destroyLenis = () => {
	if (lenisInstance) {
		// Remove scroll event listener
		if (scrollHandler) {
			lenisInstance.off('scroll', scrollHandler);
			scrollHandler = null;
		}

		// Remove GSAP ticker
		if (gsapTicker) {
			gsap.ticker.remove(gsapTicker);
			gsapTicker = null;
		}

		// Destroy Lenis instance
		try {
			lenisInstance.destroy();
		} catch (e) {
			console.warn('Lenis ensure destroy failed', e);
		}
		lenisInstance = null;

		// Kill all ScrollTrigger instances
		ScrollTrigger.getAll().forEach(trigger => trigger.kill());
		ScrollTrigger.clearMatchMedia(); // Clear matchMedia cache
	}
};
