'use client';

import { useEffect, useState } from 'react';

/**
 * Image Preloader Hook
 * Consolidates image loading logic - replaces manual onLoad/onError patterns
 * Shows placeholder immediately, swaps when real image loads (no skeleton needed)
 *
 * Usage:
 * const { displaySrc, loaded, error } = useImageLoader(src, { placeholder: fallback });
 */
const useImageLoader = (src, options = {}) => {
	const { placeholder, onLoadComplete, onError } = options;
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [displaySrc, setDisplaySrc] = useState(src);

	useEffect(() => {
		if (!src) {
			setLoaded(false);
			setError(false);
			setDisplaySrc(placeholder);
			return;
		}

		let mounted = true;
		const img = new Image();
		img.src = src;

		img.onload = () => {
			if (!mounted) return;
			setLoaded(true);
			setError(false);
			setDisplaySrc(src);
			onLoadComplete?.();
		};

		img.onerror = () => {
			if (!mounted) return;
			setLoaded(true);
			setError(true);
			setDisplaySrc(placeholder || src);
			onError?.();
		};

		return () => {
			mounted = false;
			img.onload = null;
			img.onerror = null;
		};
	}, [src, placeholder, onLoadComplete, onError]);

	return { loaded, error, displaySrc, isLoading: !loaded };
};

export default useImageLoader;

