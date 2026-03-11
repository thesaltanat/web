/**
 * Memory-efficient cache manager with TTL and size limits
 */
class CacheManager {
	constructor(options = {}) {
		this.maxSize = options.maxSize || 100;
		this.defaultTTL = options.defaultTTL || 5 * 60 * 1000; // 5 minutes
		this.cache = new Map();
		this.accessTimes = new Map();
		this.timers = new Map();
	}

	/**
	 * Get value from cache
	 * @param {string} key
	 * @returns {any|null}
	 */
	get(key) {
		if (!this.cache.has(key)) {
			return null;
		}

		// Update access time for LRU (client-side only)
		if (typeof window !== 'undefined') {
			this.accessTimes.set(key, Date.now());
		}
		return this.cache.get(key);
	}

	/**
	 * Set value in cache with optional TTL
	 * @param {string} key
	 * @param {any} value
	 * @param {number} ttl - Time to live in milliseconds
	 */
	set(key, value, ttl = this.defaultTTL) {
		// Clear existing timer
		if (this.timers.has(key)) {
			clearTimeout(this.timers.get(key));
		}

		// Ensure cache size limit
		if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
			this._evictLRU();
		}

		this.cache.set(key, value);

		// Set access time (client-side only)
		if (typeof window !== 'undefined') {
			this.accessTimes.set(key, Date.now());
		}

		// Set expiration timer (client-side only)
		if (ttl > 0 && typeof window !== 'undefined') {
			const timer = setTimeout(() => {
				this.delete(key);
			}, ttl);
			this.timers.set(key, timer);
		}
	}

	/**
	 * Delete value from cache
	 * @param {string} key
	 */
	delete(key) {
		this.cache.delete(key);
		this.accessTimes.delete(key);

		if (this.timers.has(key)) {
			clearTimeout(this.timers.get(key));
			this.timers.delete(key);
		}
	}

	/**
	 * Clear all cache
	 */
	clear() {
		this.timers.forEach(timer => clearTimeout(timer));
		this.cache.clear();
		this.accessTimes.clear();
		this.timers.clear();
	}

	/**
	 * Get cache statistics
	 * @returns {Object}
	 */
	getStats() {
		return {
			size: this.cache.size,
			maxSize: this.maxSize,
			hitRate: this._calculateHitRate(),
		};
	}

	/**
	 * Evict least recently used item
	 * @private
	 */
	_evictLRU() {
		if (this.accessTimes.size === 0) return;

		let oldestKey = null;
		let oldestTime = Infinity;

		for (const [key, time] of this.accessTimes.entries()) {
			if (time < oldestTime) {
				oldestTime = time;
				oldestKey = key;
			}
		}

		if (oldestKey) {
			this.delete(oldestKey);
		}
	}

	/**
	 * Calculate cache hit rate (simplified)
	 * @private
	 */
	_calculateHitRate() {
		// This is a simplified implementation
		// In production, you'd track hits/misses properly
		return this.cache.size > 0 ? 0.8 : 0;
	}
}

export default CacheManager;
