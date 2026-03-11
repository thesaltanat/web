/**
 * Performance monitoring and optimization utilities
 */

/**
 * Debounce function to limit rapid function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute on leading edge
 * @returns {Function}
 */
export function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Throttle function to limit function calls to once per specified time
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function}
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Create an optimized scroll listener with throttling
 * @param {Function} callback - Callback function
 * @param {number} throttleMs - Throttle time in milliseconds
 * @returns {Function} - Cleanup function
 */
export function createScrollListener(callback, throttleMs = 16) {
    const throttledCallback = throttle(callback, throttleMs);

    if (typeof window === 'undefined') {
        return () => {};
    }

    window.addEventListener('scroll', throttledCallback, { passive: true });

    return () => {
        window.removeEventListener('scroll', throttledCallback);
    };
}

/**
 * Create an optimized resize listener with debouncing
 * @param {Function} callback - Callback function
 * @param {number} debounceMs - Debounce time in milliseconds
 * @returns {Function} - Cleanup function
 */
export function createResizeListener(callback, debounceMs = 250) {
    const debouncedCallback = debounce(callback, debounceMs);

    if (typeof window === 'undefined') {
        return () => {};
    }

    window.addEventListener('resize', debouncedCallback);

    return () => {
        window.removeEventListener('resize', debouncedCallback);
    };
}

/**
 * Measure performance of a function
 * @param {Function} func - Function to measure
 * @param {string} label - Label for performance measurement
 * @returns {any} - Function result
 */
export function measurePerformance(func, label = 'Function') {
    if (typeof window === 'undefined' || !window.performance) {
        return func();
    }

    const start = performance.now();
    const result = func();
    const end = performance.now();

    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`${label} took ${(end - start).toFixed(2)} milliseconds`);
    }

    return result;
}

/**
 * Async performance measurement
 * @param {Function} asyncFunc - Async function to measure
 * @param {string} label - Label for performance measurement
 * @returns {Promise<any>} - Function result
 */
export async function measurePerformanceAsync(asyncFunc, label = 'Async Function') {
    if (typeof window === 'undefined' || !window.performance) {
        return await asyncFunc();
    }

    const start = performance.now();
    const result = await asyncFunc();
    const end = performance.now();

    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(`${label} took ${(end - start).toFixed(2)} milliseconds`);
    }

    return result;
}

/**
 * Create intersection observer with performance optimization
 * @param {Function} callback - Intersection callback
 * @param {Object} options - IntersectionObserver options
 * @returns {IntersectionObserver|null}
 */
export function createIntersectionObserver(callback, options = {}) {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
        return null;
    }

    const defaultOptions = {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
    };

    return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Lazy load images with intersection observer
 * @param {string} selector - Image selector
 * @param {Object} options - Options
 */
export function lazyLoadImages(selector = '[data-src]', options = {}) {
    if (typeof window === 'undefined') return;

    const images = document.querySelectorAll(selector);

    if (images.length === 0) return;

    const observer = createIntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.dataset.src;

                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    }, options);

    images.forEach(img => observer.observe(img));

    return () => observer.disconnect();
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export function isInViewport(element) {
    if (!element || typeof window === 'undefined') return false;

    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Optimize bundle loading with dynamic imports
 * @param {Function} importFunction - Dynamic import function
 * @param {number} delay - Delay before loading (for low priority resources)
 * @returns {Promise}
 */
export function loadBundleOptimized(importFunction, delay = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const loadedModule = await importFunction();
                resolve(loadedModule);
            } catch (error) {
                reject(error);
            }
        }, delay);
    });
}

/**
 * Preload critical resources
 * @param {string[]} urls - URLs to preload
 * @param {string} as - Resource type (script, style, font, etc.)
 */
export function preloadResources(urls, as = 'script') {
    if (typeof document === 'undefined') return;

    urls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = as;
        document.head.appendChild(link);
    });
}

/**
 * Cleanup performance observers and listeners
 */
export class PerformanceManager {
    constructor() {
        this.observers = new Set();
        this.cleanupFunctions = new Set();
    }

    addObserver(observer) {
        this.observers.add(observer);
    }

    addCleanupFunction(cleanupFn) {
        this.cleanupFunctions.add(cleanupFn);
    }

    cleanup() {
        // Disconnect all observers
        this.observers.forEach(observer => {
            try {
                observer.disconnect();
            } catch (e) {
                // Ignore errors
            }
        });

        // Run all cleanup functions
        this.cleanupFunctions.forEach(cleanupFn => {
            try {
                cleanupFn();
            } catch (e) {
                // Ignore errors
            }
        });

        this.observers.clear();
        this.cleanupFunctions.clear();
    }
}

export const performanceManager = new PerformanceManager();