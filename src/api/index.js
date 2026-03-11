import axios from 'axios';

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || '',
	timeout: 15000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// Request interceptor
apiClient.interceptors.request.use(
	config => {
		// Add auth token if available
		const token =
			typeof window !== 'undefined'
				? localStorage.getItem('auth_token')
				: null;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => Promise.reject(error),
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
	response => response.data,
	error => {
		console.error('API Error:', {
			status: error.response?.status,
			message: error.message,
			url: error.config?.url,
		});

		// Handle 404 errors
		if (error.response?.status === 404) {
			return {
				data: null,
				error: 'Not Found',
				status: 404,
				success: false,
			};
		}

		// Handle 401 Unauthorized
		if (error.response?.status === 401) {
			if (typeof window !== 'undefined') {
				localStorage.removeItem('auth_token');
				// Optional: redirect to login
			}
			return {
				data: null,
				error: 'Unauthorized',
				status: 401,
				success: false,
			};
		}

		// Handle 500 Server Error
		if (error.response?.status >= 500) {
			return {
				data: null,
				error: 'Server Error',
				status: error.response.status,
				success: false,
			};
		}

		// Return generic error response
		return {
			data: null,
			error:
				error.response?.data?.message ||
				error.message ||
				'An error occurred',
			status: error.response?.status || 500,
			success: false,
		};
	},
);

export async function getApi(param) {
	try {
		return await apiClient.get(
			`/api/get-req-data/sections?type=slug&value=${param}&get_section=yes&image=yes&post=yes&file=yes&gallery=no`,
		);
	} catch (error) {
		return {
			data: null,
			error: error.message || 'Failed to fetch data',
			status: error.response?.status || 500,
			success: false,
		};
	}
}

export async function getGlobalApi() {
	try {
		return await apiClient.get('/api/get-req-data/global-data');
	} catch (error) {
		return {
			data: null,
			error: error.message || 'Failed to fetch global data',
			status: error.response?.status || 500,
			success: false,
		};
	}
}

export async function getCategoryBlogData() {
	try {
		return await apiClient.get('/api/get-req-data/all-category?type=1');
	} catch (error) {
		return {
			data: null,
			error: error.message || 'Failed to fetch categories',
			status: error.response?.status || 500,
			success: false,
		};
	}
}

export async function getBlogData() {
	try {
		return await apiClient.get('/api/get-req-data/blog-list');
	} catch (error) {
		return {
			data: null,
			error: error.message || 'Failed to fetch blog data',
			status: error.response?.status || 500,
			success: false,
		};
	}
}

export async function getBlogDataSingle(type, value) {
	try {
		return await apiClient.get(
			`/api/get-req-data/blog-data?type=${type}&value=${value}`,
		);
	} catch (error) {
		return {
			data: null,
			error: error.message || 'Failed to fetch blog data',
			status: error.response?.status || 500,
			success: false,
		};
	}
}

export async function getProductSingle(value) {
	try {
		return await apiClient.get(
			`/api/get-req-data/product-data?type=slug&value=${value}&image=yes&post=yes&file=yes&specification=yes&gallery=yes&variation=yes`,
		);
	} catch (error) {
		return {
			data: null,
			error: error.message || 'Failed to fetch product data',
			status: error.response?.status || 500,
			success: false,
		};
	}
}

export async function getAllProduct() {
	try {
		return await apiClient.get('/api/get-req-data/all-products');
	} catch (error) {
		return {
			data: null,
			error: error.message || 'Failed to fetch products',
			status: error.response?.status || 500,
			success: false,
		};
	}
}

export async function getFeaturedProduct() {
	try {
		return await apiClient.get(
			'/api/get-req-data/all-featured-products?image=yes&file=yes&post=yes',
		);
	} catch (error) {
		return {
			data: null,
			error: error.message || 'Failed to fetch featured products',
			status: error.response?.status || 500,
			success: false,
		};
	}
}

export async function getApiJson(param) {
	try {
		return await axios.get(`/json/${param}.json`, { timeout: 5000 });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(`Failed to fetch JSON: ${param}`, error.message);
		return { data: null, error: true, status: 404, success: false };
	}
}

// --- SSG/ISR API helpers (updated to match legacy endpoints) ---
// Returns a static list of slugs. Update this list as needed.

export async function fetchPageData(slug) {
	const res = await fetch(
		process.env.NEXT_PUBLIC_API_URL +
			`/api/get-req-data/sections?type=slug&value=${slug}&get_section=yes&image=yes&post=yes&file=yes&gallery=no`,
	);
	if (!res.ok) return null;
	return await res.json();
}
