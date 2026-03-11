import { useCallback, useEffect, useRef, useState } from 'react';

import { apiService } from '@/src/services/api/ApiService';

/**
 * Memory-safe data fetching hook with caching, cancellation, and error handling
 * @param {string|Function} endpoint - API endpoint or function that returns endpoint
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether to fetch data (default: true)
 * @param {boolean} options.cache - Whether to use caching (default: true)
 * @param {number} options.ttl - Cache TTL in milliseconds
 * @param {any[]} options.dependencies - Dependencies to trigger refetch
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} - { data, loading, error, refetch }
 */
export function useApiData(endpoint, options = {}) {
    const {
        enabled = true,
        cache = true,
        ttl,
        dependencies = [],
        onSuccess,
        onError
    } = options;

    const [state, setState] = useState({
        data: null,
        loading: false,
        error: null
    });

    const abortControllerRef = useRef(null);
    const mountedRef = useRef(true);

    const fetchData = useCallback(async (signal) => {
        if (!enabled) return;

        const currentEndpoint = typeof endpoint === 'function' ? endpoint() : endpoint;
        if (!currentEndpoint) return;

        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const response = await apiService.get(currentEndpoint, {
                cache,
                ttl,
                signal
            });

            if (signal?.aborted || !mountedRef.current) return;

            if (response.success === false) {
                const error = new Error(response.error || 'Request failed');
                error.status = response.status;
                throw error;
            }

            setState({
                data: response,
                loading: false,
                error: null
            });

            onSuccess?.(response);

        } catch (error) {
            if (error.name === 'AbortError' || !mountedRef.current) return;

            const errorObj = {
                message: error.message || 'Unknown error',
                status: error.status || 500
            };

            setState({
                data: null,
                loading: false,
                error: errorObj
            });

            onError?.(errorObj);
        }
    }, [endpoint, enabled, cache, ttl, onSuccess, onError]);

    const refetch = useCallback(() => {
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        fetchData(abortControllerRef.current.signal);
    }, [fetchData]);

    useEffect(() => {
        mountedRef.current = true;
        refetch();

        return () => {
            mountedRef.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled, refetch, ...dependencies]);

    useEffect(() => {
        return () => {
            mountedRef.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return {
        ...state,
        refetch,
        isLoading: state.loading,
        isError: !!state.error
    };
}

/**
 * Hook for fetching page data by slug
 * @param {string} slug
 * @param {Object} options
 * @returns {Object}
 */
export function usePageData(slug, options = {}) {
    return useApiData(
        slug ? `/api/get-req-data/sections?type=slug&value=${slug}&get_section=yes&image=yes&post=yes&file=yes&gallery=no` : null,
        {
            enabled: !!slug,
            cache: true,
            ttl: 5 * 60 * 1000, // 5 minutes
            dependencies: [slug],
            ...options
        }
    );
}

/**
 * Hook for fetching global data
 * @param {Object} options
 * @returns {Object}
 */
export function useGlobalData(options = {}) {
    return useApiData(
        '/api/get-req-data/global-data',
        {
            cache: true,
            ttl: 10 * 60 * 1000, // 10 minutes
            ...options
        }
    );
}

/**
 * Hook for fetching blog data
 * @param {Object} options
 * @returns {Object}
 */
export function useBlogData(options = {}) {
    return useApiData(
        '/api/get-req-data/blog-list',
        {
            cache: true,
            ttl: 5 * 60 * 1000, // 5 minutes
            ...options
        }
    );
}

/**
 * Hook for fetching single blog post
 * @param {string} type
 * @param {string} value
 * @param {Object} options
 * @returns {Object}
 */
export function useBlogPost(type, value, options = {}) {
    return useApiData(
        type && value ? `/api/get-req-data/blog-data?type=${type}&value=${value}` : null,
        {
            enabled: !!(type && value),
            cache: true,
            ttl: 10 * 60 * 1000, // 10 minutes
            dependencies: [type, value],
            ...options
        }
    );
}

/**
 * Hook for fetching product data
 * @param {string} slug
 * @param {Object} options
 * @returns {Object}
 */
export function useProductData(slug, options = {}) {
    return useApiData(
        slug ? `/api/get-req-data/product-data?type=slug&value=${slug}&image=yes&post=yes&file=yes&specification=yes&gallery=yes&variation=yes` : null,
        {
            enabled: !!slug,
            cache: true,
            ttl: 5 * 60 * 1000, // 5 minutes
            dependencies: [slug],
            ...options
        }
    );
}

/**
 * Hook for fetching all products
 * @param {Object} options
 * @returns {Object}
 */
export function useAllProducts(options = {}) {
    return useApiData(
        '/api/get-req-data/all-products',
        {
            cache: true,
            ttl: 5 * 60 * 1000, // 5 minutes
            ...options
        }
    );
}

/**
 * Hook for fetching featured products
 * @param {Object} options
 * @returns {Object}
 */
export function useFeaturedProducts(options = {}) {
    return useApiData(
        '/api/get-req-data/all-featured-products?image=yes&file=yes&post=yes',
        {
            cache: true,
            ttl: 10 * 60 * 1000, // 10 minutes
            ...options
        }
    );
}