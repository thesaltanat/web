/**
 * Shared Resize Observer Utility
 * Prevents multiple resize event listeners by using a single ResizeObserver
 * All device type hooks should use this shared utility
 */

let resizeObserver = null;
let listeners = new Set();

const notifyListeners = () => {
    listeners.forEach(callback => callback());
};

const setupResizeObserver = () => {
    if (typeof window === 'undefined') return;

    if (!resizeObserver) {
        // Use ResizeObserver for better performance than resize events
        resizeObserver = new ResizeObserver(() => {
            notifyListeners();
        });
        resizeObserver.observe(document.body);
    }
};

export const addResizeListener = (callback) => {
    listeners.add(callback);
    setupResizeObserver();

    return () => {
        listeners.delete(callback);
        if (listeners.size === 0 && resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        }
    };
};
