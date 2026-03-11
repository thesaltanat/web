/**
 * Hook and utilities for safe image URL construction
 * Prevents duplicate path segments in URLs
 */

import { useMemo } from 'react';

const BASE_URL = 'https://bestinbd.com';
const API_BASE = `${BASE_URL}/projects/web`;

/**
 * Removes duplicate path segments from URLs
 * @example
 * cleanPath('projects/web/projects/web/image.jpg')
 * Returns: 'projects/web/image.jpg'
 */
export const cleanDuplicatePath = (path) => {
	if (!path) return '';

	// Remove leading/trailing slashes for processing
	const cleanPath = path.replace(/^\/+|\/+$/g, '');

	// Split by '/' and remove duplicates while maintaining order
	const segments = cleanPath.split('/');
	const seen = new Set();
	const result = [];

	for (const segment of segments) {
		if (segment && !seen.has(segment)) {
			result.push(segment);
			seen.add(segment);
		} else if (!segment && result.length > 0) {
			// Keep structure with empty segments if needed
			result.push(segment);
		}
		// Skip if we've already seen this segment (handles duplicates)
	}

	return result.join('/');
};

/**
 * Safe URL construction that prevents duplicate path segments
 * @param {string} imagePath - The image path from API (may or may not have full prefix)
 * @returns {string} - Complete URL without duplicates
 */
export const buildSafeImageUrl = (imagePath) => {
	if (!imagePath) return '';

	// If path already includes the domain, return as-is
	if (imagePath.includes('://')) {
		return imagePath;
	}

	// Remove leading slash if present
	let cleanImagePath = imagePath.replace(/^\//, '');

	// Check if path already contains 'projects/web' prefix
	if (cleanImagePath.startsWith('projects/web/')) {
		// Path already has prefix, use directly with base domain
		return `${BASE_URL}/${cleanImagePath}`;
	}

	// Path doesn't have prefix, add it
	return `${API_BASE}/${cleanImagePath}`;
};

/**
 * Build responsive image URLs with safe path handling
 * @param {Object} imageData - Image data from API with urls object
 * @returns {Object} - Object with large, medium, small image URLs
 */
export const buildImageUrls = (imageData) => {
	if (!imageData) {
		return {
			large: null,
			medium: null,
			small: null,
		};
	}

	return {
		large: imageData?.urls?.large
			? buildSafeImageUrl(imageData.urls.large)
			: imageData?.full_path
			? buildSafeImageUrl(imageData.full_path)
			: null,
		medium: imageData?.urls?.medium
			? buildSafeImageUrl(imageData.urls.medium)
			: imageData?.urls?.large
			? buildSafeImageUrl(imageData.urls.large)
			: null,
		small: imageData?.urls?.small
			? buildSafeImageUrl(imageData.urls.small)
			: imageData?.urls?.medium
			? buildSafeImageUrl(imageData.urls.medium)
			: null,
	};
};

/**
 * React hook for responsive image URLs
 * Automatically handles safe URL construction and fallbacks
 */
export const useImageUrls = (imageData) => {
	return useMemo(() => {
		if (!imageData) {
			return {
				large: null,
				medium: null,
				small: null,
			};
		}

		// Use safe URL builder
		return buildImageUrls(imageData);
	}, [imageData]);
};

/**
 * Helper for constructing URLs with fallback chain
 * @param {Object} imageObj - Object with urls and full_path
 * @returns {string} - Best available image URL
 */
export const getPreferredImageUrl = (imageObj) => {
	if (!imageObj) return null;

	// Try in order of preference
	if (imageObj.urls?.large) {
		return buildSafeImageUrl(imageObj.urls.large);
	}
	if (imageObj.urls?.medium) {
		return buildSafeImageUrl(imageObj.urls.medium);
	}
	if (imageObj.urls?.small) {
		return buildSafeImageUrl(imageObj.urls.small);
	}
	if (imageObj.full_path) {
		return buildSafeImageUrl(imageObj.full_path);
	}

	return null;
};

/**
 * Array of image URLs with safe construction
 * Useful for galleries and carousels
 */
export const buildImageUrlArray = (imageArray) => {
	if (!Array.isArray(imageArray)) return [];

	return imageArray.map(img => buildImageUrls(img));
};

// Export all utilities as named exports
// Also provide convenience bundle
export const imageUrlUtils = {
	buildSafeImageUrl,
	buildImageUrls,
	useImageUrls,
	getPreferredImageUrl,
	buildImageUrlArray,
	cleanDuplicatePath,
};

