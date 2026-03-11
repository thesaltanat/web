// File removed, restored to previous state via git.
import fs from 'fs/promises';
import path from 'path';

/**
 * Data Reader Service
 * Reads pre-fetched JSON data instead of hitting APIs
 * Works in both server and client environments
 */
class DataReader {
	constructor() {
		this.dataDir = path.join(process.cwd(), 'public', 'data');
		this.cache = new Map();
		this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache in memory
	}

	/**
	 * Read JSON file from disk (server-side)
	 */
	async readFromDisk(filename) {
		try {
			const filePath = path.join(this.dataDir, `${filename}.json`);
			const content = await fs.readFile(filePath, 'utf-8');
			return JSON.parse(content);
		} catch (error) {
			console.error(`Failed to read ${filename}.json:`, error.message);
			return {
				success: false,
				error: 'File not found',
				data: null,
			};
		}
	}

	/**
	 * Read JSON file via fetch (client-side)
	 */
	async readFromPublic(filename) {
		try {
			const response = await fetch(`/data/${filename}.json`, {
				cache: 'force-cache',
			});

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error(`Failed to fetch ${filename}.json:`, error.message);
			return {
				success: false,
				error: 'Failed to fetch data',
				data: null,
			};
		}
	}

	/**
	 * Get data with caching
	 */
	async getData(key, useCache = true) {
		// Check memory cache first
		if (useCache && this.cache.has(key)) {
			const cached = this.cache.get(key);
			const now = Date.now();

			if (now - cached.timestamp < this.cacheTimeout) {
				return cached.data;
			} else {
				this.cache.delete(key);
			}
		}

		// Determine if we're on server or client
		const isServer = typeof window === 'undefined';

		// Read data
		const data = isServer
			? await this.readFromDisk(key)
			: await this.readFromPublic(key);

		// Cache the result
		if (useCache && data.success !== false) {
			this.cache.set(key, {
				data,
				timestamp: Date.now(),
			});
		}

		return data;
	}

	/**
	 * Get global data
	 */
	async getGlobalData() {
		return await this.getData('global');
	}

	/**
	 * Get home page data
	 */
	async getHomeData() {
		return await this.getData('home');
	}

	/**
	 * Get page data by slug
	 */
	async getPageData(slug) {
		// Try both page-{slug} and {slug} for compatibility
		let data = await this.getData(`page-${slug}`);
		if (!data || data.success === false) {
			data = await this.getData(slug);
		}
		return data;
	}

	/**
	 * Get blog categories
	 */
	async getBlogCategories() {
		return await this.getData('blogCategories');
	}

	/**
	 * Get blog list
	 */
	async getBlogList() {
		return await this.getData('blogList');
	}

	/**
	 * Get all products
	 */
	async getAllProducts() {
		return await this.getData('allProducts');
	}

	/**
	 * Get featured products
	 */
	async getFeaturedProducts() {
		return await this.getData('featuredProducts');
	}

	/**
	 * Get all data at once
	 */
	async getAllData() {
		return await this.getData('all-data');
	}

	/**
	 * Get metadata about the data
	 */
	async getMetadata() {
		return await this.getData('metadata', false);
	}

	/**
	 * Clear memory cache
	 */
	clearCache() {
		this.cache.clear();
	}

	/**
	 * Get cache statistics
	 */
	getCacheStats() {
		return {
			size: this.cache.size,
			keys: Array.from(this.cache.keys()),
		};
	}
}

// Export singleton instance
export const dataReader = new DataReader();

// Export class for custom instances
export default DataReader;
