import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

/**
 * Centralized animation manager for memory-leak prevention and performance optimization
 */
class AnimationManager {
	constructor() {
		this.instances = new Set();
		this.observers = new Set();
		this.rafCallbacks = new Set();
		this.timeouts = new Set();
		this.intervals = new Set();
		this.isDestroyed = false;
		this.isInitialized = false;

		// Only initialize on client side
		if (typeof window !== 'undefined') {
			this._initializeClient();
		}
	}

	/**
	 * Initialize client-side only features
	 * @private
	 */
	_initializeClient() {
		if (this.isInitialized) return;

		// Register GSAP plugins
		gsap.registerPlugin(ScrollTrigger);

		// Configure GSAP for better performance
		gsap.config({
			force3D: true,
			nullTargetWarn: false,
		});

		// Configure ScrollTrigger
		ScrollTrigger.config({
			autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
			ignoreMobileResize: true,
		});

		// Bind cleanup to page visibility changes
		this._bindVisibilityCleanup();

		this.isInitialized = true;
	}

	/**
	 * Create a ScrollTrigger instance with automatic cleanup tracking
	 * @param {Object} config - ScrollTrigger configuration
	 * @returns {ScrollTrigger}
	 */
	createScrollTrigger(config) {
		// Ensure client-side initialization
		this._initializeClient();

		if (this.isDestroyed) {
			if (process.env.NODE_ENV === 'development') {
				// eslint-disable-next-line no-console
				console.warn(
					'AnimationManager is destroyed, cannot create ScrollTrigger',
				);
			}
			return null;
		}

		const instance = ScrollTrigger.create(config);
		this.instances.add(instance);

		// Auto-remove from tracking when killed
		const originalKill = instance.kill.bind(instance);
		instance.kill = (...args) => {
			this.instances.delete(instance);
			return originalKill(...args);
		};

		return instance;
	}

	/**
	 * Create GSAP timeline with cleanup tracking
	 * @param {Object} config - Timeline configuration
	 * @returns {gsap.timeline}
	 */
	createTimeline(config = {}) {
		// Ensure client-side initialization
		this._initializeClient();

		if (this.isDestroyed) {
			if (process.env.NODE_ENV === 'development') {
				// eslint-disable-next-line no-console
				console.warn(
					'AnimationManager is destroyed, cannot create timeline',
				);
			}
			return null;
		}

		const timeline = gsap.timeline(config);
		this.instances.add(timeline);

		// Auto-remove from tracking when killed
		const originalKill = timeline.kill.bind(timeline);
		timeline.kill = (...args) => {
			this.instances.delete(timeline);
			return originalKill(...args);
		};

		return timeline;
	}

	/**
	 * Create GSAP tween with cleanup tracking
	 * @param {any} target
	 * @param {Object} config
	 * @returns {gsap.core.Tween}
	 */
	to(target, config) {
		// Ensure client-side initialization
		this._initializeClient();

		if (this.isDestroyed) {
			if (process.env.NODE_ENV === 'development') {
				// eslint-disable-next-line no-console
				console.warn(
					'AnimationManager is destroyed, cannot create tween',
				);
			}
			return null;
		}

		const tween = gsap.to(target, config);
		this.instances.add(tween);

		// Auto-remove from tracking when killed
		const originalKill = tween.kill.bind(tween);
		tween.kill = (...args) => {
			this.instances.delete(tween);
			return originalKill(...args);
		};

		return tween;
	}

	/**
	 * Create IntersectionObserver with cleanup tracking
	 * @param {Function} callback
	 * @param {Object} options
	 * @returns {IntersectionObserver}
	 */
	createIntersectionObserver(callback, options = {}) {
		if (this.isDestroyed || typeof window === 'undefined') {
			return null;
		}

		const observer = new IntersectionObserver(callback, options);
		this.observers.add(observer);

		// Auto-remove from tracking when disconnected
		const originalDisconnect = observer.disconnect.bind(observer);
		observer.disconnect = (...args) => {
			this.observers.delete(observer);
			return originalDisconnect(...args);
		};

		return observer;
	}

	/**
	 * Create tracked RAF callback
	 * @param {Function} callback
	 * @returns {Function} - Cancel function
	 */
	createRAF(callback) {
		if (this.isDestroyed) return () => {};

		let rafId;
		const rafCallback = time => {
			callback(time);
			rafId = requestAnimationFrame(rafCallback);
		};

		rafId = requestAnimationFrame(rafCallback);

		const cancel = () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
				this.rafCallbacks.delete(cancel);
			}
		};

		this.rafCallbacks.add(cancel);
		return cancel;
	}

	/**
	 * Create tracked timeout
	 * @param {Function} callback
	 * @param {number} delay
	 * @returns {Function} - Clear function
	 */
	createTimeout(callback, delay) {
		if (this.isDestroyed) return () => {};

		const timeoutId = setTimeout(() => {
			callback();
			this.timeouts.delete(clear);
		}, delay);

		const clear = () => {
			clearTimeout(timeoutId);
			this.timeouts.delete(clear);
		};

		this.timeouts.add(clear);
		return clear;
	}

	/**
	 * Create tracked interval
	 * @param {Function} callback
	 * @param {number} delay
	 * @returns {Function} - Clear function
	 */
	createInterval(callback, delay) {
		if (this.isDestroyed) return () => {};

		const intervalId = setInterval(callback, delay);

		const clear = () => {
			clearInterval(intervalId);
			this.intervals.delete(clear);
		};

		this.intervals.add(clear);
		return clear;
	}

	/**
	 * Refresh all ScrollTrigger instances
	 */
	refresh() {
		if (!this.isDestroyed && typeof window !== 'undefined') {
			this._initializeClient();
			ScrollTrigger.refresh();
		}
	}

	/**
	 * Get performance stats
	 * @returns {Object}
	 */
	getStats() {
		return {
			scrollTriggers: Array.from(this.instances).filter(
				i => i.constructor.name === 'ScrollTrigger',
			).length,
			tweens: Array.from(this.instances).filter(
				i => i.constructor.name === 'Tween',
			).length,
			timelines: Array.from(this.instances).filter(
				i => i.constructor.name === 'Timeline',
			).length,
			observers: this.observers.size,
			rafs: this.rafCallbacks.size,
			timeouts: this.timeouts.size,
			intervals: this.intervals.size,
		};
	}

	/**
	 * Cleanup specific instances by type
	 * @param {string} type - 'scrolltrigger' | 'tween' | 'timeline' | 'observer' | 'raf' | 'timeout' | 'interval'
	 */
	cleanupByType(type) {
		switch (type.toLowerCase()) {
			case 'scrolltrigger':
				for (const instance of this.instances) {
					if (instance.constructor.name === 'ScrollTrigger') {
						instance.kill();
					}
				}
				break;
			case 'tween':
				for (const instance of this.instances) {
					if (instance.constructor.name === 'Tween') {
						instance.kill();
					}
				}
				break;
			case 'timeline':
				for (const instance of this.instances) {
					if (instance.constructor.name === 'Timeline') {
						instance.kill();
					}
				}
				break;
			case 'observer':
				for (const observer of this.observers) {
					observer.disconnect();
				}
				break;
			case 'raf':
				for (const cancel of this.rafCallbacks) {
					cancel();
				}
				break;
			case 'timeout':
				for (const clear of this.timeouts) {
					clear();
				}
				break;
			case 'interval':
				for (const clear of this.intervals) {
					clear();
				}
				break;
		}
	}

	/**
	 * Clean up all tracked instances
	 */
	cleanup() {
		// Kill all GSAP instances
		for (const instance of this.instances) {
			try {
				instance.kill();
			} catch (e) {
				// Ignore errors from already killed instances
			}
		}

		// Disconnect all observers
		for (const observer of this.observers) {
			try {
				observer.disconnect();
			} catch (e) {
				// Ignore errors
			}
		}

		// Cancel all RAF callbacks
		for (const cancel of this.rafCallbacks) {
			try {
				cancel();
			} catch (e) {
				// Ignore errors
			}
		}

		// Clear all timeouts
		for (const clear of this.timeouts) {
			try {
				clear();
			} catch (e) {
				// Ignore errors
			}
		}

		// Clear all intervals
		for (const clear of this.intervals) {
			try {
				clear();
			} catch (e) {
				// Ignore errors
			}
		}

		// Clear sets
		this.instances.clear();
		this.observers.clear();
		this.rafCallbacks.clear();
		this.timeouts.clear();
		this.intervals.clear();
	}

	/**
	 * Destroy the animation manager
	 */
	destroy() {
		this.cleanup();
		this.isDestroyed = true;

		// Remove visibility change listener
		if (typeof document !== 'undefined') {
			document.removeEventListener(
				'visibilitychange',
				this._handleVisibilityChange,
			);
		}
	}

	/**
	 * Bind cleanup to page visibility changes
	 * @private
	 */
	_bindVisibilityCleanup() {
		if (typeof document === 'undefined') return;

		this._handleVisibilityChange = () => {
			if (document.hidden) {
				// Page is hidden, pause animations
				gsap.globalTimeline.pause();
			} else {
				// Page is visible, resume animations
				gsap.globalTimeline.resume();
				this.refresh();
			}
		};

		document.addEventListener(
			'visibilitychange',
			this._handleVisibilityChange,
		);
	}
}

// Lazy-load singleton instance to prevent SSR issues
let _animationManager = null;

export const getAnimationManager = () => {
	if (!_animationManager) {
		_animationManager = new AnimationManager();

		// Cleanup on page unload
		if (typeof window !== 'undefined') {
			window.addEventListener('beforeunload', () => {
				_animationManager.destroy();
			});
		}
	}
	return _animationManager;
};

// For backward compatibility, but with lazy loading
export const animationManager = new Proxy(
	{},
	{
		get(target, prop) {
			const manager = getAnimationManager();
			const value = manager[prop];
			return typeof value === 'function' ? value.bind(manager) : value;
		},
	},
);

export default AnimationManager;
