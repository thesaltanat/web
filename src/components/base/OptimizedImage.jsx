import React, { forwardRef, memo, useCallback, useState } from 'react';

/**
 * Optimized Image component with loading states, error handling, and lazy loading
 */
const OptimizedImage = memo(forwardRef(({
    src,
    alt = '',
    width,
    height,
    className = '',
    loading = 'lazy',
    placeholder = '/images/placeholder.jpg',
    onLoad,
    onError,
    ...props
}, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(placeholder);

    const handleLoad = useCallback((e) => {
        setIsLoaded(true);
        onLoad?.(e);
    }, [onLoad]);

    const handleError = useCallback((e) => {
        setHasError(true);
        setCurrentSrc(placeholder);
        onError?.(e);
    }, [onError, placeholder]);

    const handleImageLoad = useCallback(() => {
        if (src && !hasError) {
            setCurrentSrc(src);
        }
    }, [src, hasError]);

    React.useEffect(() => {
        if (src) {
            setIsLoaded(false);
            setHasError(false);

            // Preload image
            const img = new Image();
            img.onload = handleImageLoad;
            img.onerror = handleError;
            img.src = src;
        }
    }, [src, handleImageLoad, handleError]);

    const imageStyle = {
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        ...(props.style || {})
    };

    return (
        <div className={`relative ${className}`}>
            {!isLoaded && !hasError && (
                <div
                    className="absolute inset-0 bg-gray-200 animate-pulse rounded"
                    style={{ width, height }}
                />
            )}
            <img
                ref={ref}
                src={currentSrc}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
                style={imageStyle}
                {...props}
            />
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                    Failed to load image
                </div>
            )}
        </div>
    );
}));

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;