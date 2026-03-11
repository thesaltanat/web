import CacheManager from './CacheManager.js';
import axios from 'axios';

/**
 * Optimized API Service with caching, retry logic, and memory management
 */
class ApiService {
	constructor() {
		this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
		this.timeout = 15000;
		this.cache = new CacheManager({
			maxSize: 50, // Limit cache size
			defaultTTL: 5 * 60 * 1000, // 5 minutes default TTL
		});

		this.client = this._createClient();
		this.requestQueue = new Map(); // Prevent duplicate requests
		this.abortControllers = new Map(); // Track active requests
	}

	/**
	 * Create axios client with interceptors
	 * @private
	 */
	_createClient() {
		const client = axios.create({
			baseURL: this.baseURL,
			timeout: this.timeout,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		// Request interceptor
		client.interceptors.request.use(
			config => {
				// Add auth token if available
				const token = this._getAuthToken();
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}

				// Add request timestamp for debugging
				config.metadata = { startTime: Date.now() };
				return config;
			},
			error => Promise.reject(error),
		);

		// Response interceptor
		client.interceptors.response.use(
			response => {
				const duration =
					Date.now() - response.config.metadata.startTime;

				// Log slow requests in development
				if (process.env.NODE_ENV === 'development' && duration > 1000) {
					// eslint-disable-next-line no-console
					console.warn(
						`Slow API request: ${response.config.url} took ${duration}ms`,
					);
				}

				return response.data;
			},
			error => this._handleResponseError(error),
		);

		return client;
	}

	/**
	 * Handle response errors
	 * @private
	 */
	_handleResponseError(error) {
		const status = error.response?.status;
		const url = error.config?.url;

		// Handle 401 Unauthorized
		if (status === 401) {
			this._clearAuthToken();
			return Promise.resolve({
				data: null,
				error: 'Unauthorized',
				status: 401,
				success: false,
			});
		}

		// Handle 404 Not Found
		if (status === 404) {
			return Promise.resolve({
				data: null,
				error: 'Not Found',
				status: 404,
				success: false,
			});
		}

		// Handle server errors
		if (status >= 500) {
			// eslint-disable-next-line no-console
			console.error(`Server error for ${url}:`, error.message);
			return Promise.resolve({
				data: null,
				error: 'Server Error',
				status,
				success: false,
			});
		}

		// Generic error
		return Promise.resolve({
			data: null,
			error:
				error.response?.data?.message ||
				error.message ||
				'Request failed',
			status: status || 500,
			success: false,
		});
	}

	/**
	 * Server-side fetch using native fetch API (bypasses axios issues)
	 * @private
	 */
	async _serverFetch(endpoint) {
		const url = `${this.baseURL}${endpoint}`;

		try {
			console.log('[Server Fetch] URL:', url);
			const response = await fetch(url, {
				headers: {
					'Accept': 'application/json',
					'User-Agent':
						'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
					'Referer': 'https://demo.thesaltanat.com',
				},
			});

			console.log('[Server Fetch] Status:', response.status);

			if (!response.ok) {
				const errorText = await response.text();
				console.error('[Server Fetch] HTTP Error:', response.status, errorText.substring(0, 500));
				return {
					data: null,
					error: `HTTP ${response.status}`,
					status: response.status,
					success: false,
				};
			}

			const data = await response.json();
			console.log('[Server Fetch] Response keys:', Object.keys(data));
			console.log('[Server Fetch] Has data.page_data:', !!data.data?.page_data);
			console.log('[Server Fetch] Success field:', data.success);

			return data;
		} catch (error) {
			console.error(`[Server Fetch] Error for ${url}:`, error.message);
			return {
				data: null,
				error: error.message,
				status: 500,
				success: false,
			};
		}
	}

	/**
	 * Get data with caching and request deduplication
	 * @param {string} endpoint
	 * @param {Object} options
	 * @returns {Promise<any>}
	 */
	async get(endpoint, options = {}) {
		const cacheKey = this._generateCacheKey(endpoint, options);
		const useCache = options.cache !== false;

		// Return cached data if available
		if (useCache) {
			const cached = this.cache.get(cacheKey);
			if (cached) {
				return cached;
			}
		}

		// Check if same request is already in progress
		if (this.requestQueue.has(cacheKey)) {
			return this.requestQueue.get(cacheKey);
		}

		// Use native fetch on server-side to bypass axios issues
		const isServer = typeof window === 'undefined';

		if (isServer) {
			try {
				const requestPromise = this._serverFetch(endpoint);
				this.requestQueue.set(cacheKey, requestPromise);

				const response = await requestPromise;

				// Cache successful responses
				if (useCache && response && response.success !== false && response.data) {
					this.cache.set(cacheKey, response, options.ttl);
				}

				this.requestQueue.delete(cacheKey);
				return response;
			} catch (error) {
				this.requestQueue.delete(cacheKey);
				throw error;
			}
		}

		// Client-side: use axios as normal
		const abortController = new AbortController();
		this.abortControllers.set(cacheKey, abortController);

		try {
			// Create request promise
			const requestPromise = this.client.get(endpoint, {
				...options,
				signal: abortController.signal,
			});

			// Add to request queue to prevent duplicates
			this.requestQueue.set(cacheKey, requestPromise);

			const response = await requestPromise;

			// Cache successful responses
			if (useCache && response && response.success !== false) {
				this.cache.set(cacheKey, response, options.ttl);
			}

			return response;
		} catch (error) {
			// Don't cache errors
			throw error;
		} finally {
			// Cleanup
			this.requestQueue.delete(cacheKey);
			this.abortControllers.delete(cacheKey);
		}
	}

	/**
	 * POST request (no caching)
	 * @param {string} endpoint
	 * @param {any} data
	 * @param {Object} options
	 * @returns {Promise<any>}
	 */
	async post(endpoint, data, options = {}) {
		const abortController = new AbortController();
		const requestKey = `POST:${endpoint}:${Date.now()}`;

		this.abortControllers.set(requestKey, abortController);

		try {
			return await this.client.post(endpoint, data, {
				...options,
				signal: abortController.signal,
			});
		} finally {
			this.abortControllers.delete(requestKey);
		}
	}

	/**
	 * Cancel all pending requests
	 */
	cancelAllRequests() {
		for (const controller of this.abortControllers.values()) {
			controller.abort();
		}
		this.abortControllers.clear();
		this.requestQueue.clear();
	}

	/**
	 * Clear cache
	 */
	clearCache() {
		this.cache.clear();
	}

	/**
	 * Get cache statistics
	 */
	getCacheStats() {
		return this.cache.getStats();
	}

	/**
	 * Generate cache key
	 * @private
	 */
	_generateCacheKey(endpoint, options) {
		const params = options.params || {};
		const paramsString = Object.keys(params)
			.sort()
			.map(key => `${key}=${params[key]}`)
			.join('&');

		return `${endpoint}${paramsString ? `?${paramsString}` : ''}`;
	}

	/**
	 * Get auth token from localStorage
	 * @private
	 */
	_getAuthToken() {
		if (typeof window === 'undefined') return null;
		return localStorage.getItem('auth_token');
	}

	/**
	 * Clear auth token
	 * @private
	 */
	_clearAuthToken() {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('auth_token');
		}
	}
}

// Create singleton instance
export const apiService = new ApiService();

// Legacy API functions using new service
export async function getApi(param) {
	return apiService.get(
		`/api/get-req-data/sections?type=slug&value=${param}&get_section=yes&image=yes&post=yes&file=yes&gallery=no`,
	);
}

export async function getGlobalApi() {
	return apiService.get('/api/get-req-data/global-data');
}

export async function getCategoryBlogData() {
	return apiService.get('/api/get-req-data/all-category?type=1');
}

export async function getBlogData() {
	return apiService.get('/api/get-req-data/blog-list');
}

export async function getBlogDataSingle(type, value) {
	return apiService.get(
		`/api/get-req-data/blog-data?type=${type}&value=${value}`,
	);
}

export async function getProductSingle(value) {
	return apiService.get(
		`/api/get-req-data/product-data?type=slug&value=${value}&image=yes&post=yes&file=yes&specification=yes&gallery=yes&variation=yes`,
	);
}

export async function getAllProduct() {
	return apiService.get('/api/get-req-data/all-products');
}

export async function getFeaturedProduct() {
	return apiService.get(
		'/api/get-req-data/all-featured-products?image=yes&file=yes&post=yes',
	);
}

export async function getApiJson(param) {
	try {
		const response = await fetch(`/json/${param}.json`, {
			signal: AbortSignal.timeout(5000),
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`Failed to fetch JSON: ${param}`, error.message);
		return { data: null, error: true, status: 404, success: false };
	}
}

export default ApiService;
