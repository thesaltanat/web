// components/ui/SingleImage.jsx - REFACTORED for reusability and performance
"use client";

import styled from "styled-components";
import Image from "next/image";
import { useImageLoader } from "@/src/hooks/useImageLoader";
import { useIsMobile } from "@/src/hooks/useDeviceDetection";
import blur from '@/public/images/static/blur.jpg'
import theme from "@/src/styles/theme";

/**
 * Optimized image component with:
 * - Placeholder shown immediately (no skeleton)
 * - Responsive srcset using hooks
 * - Centralized device detection
 * - Better performance with useImageLoader
 */
export const SingleImage = ({
	src,
	srcSm,
	position,
	objectFit,
	height,
	width,
	alt,
	left,
	margin,
	marginSm,
	right,
	top,
	bottom,
	transition,
	defaultImage = blur,
	priority = false,
}) => {
	// CENTRALIZED: Use hook instead of useState + useEffect + window.addEventListener
	const isMobile = useIsMobile();

	// CONSOLIDATED: Image loading logic in reusable hook
	const { displaySrc, loaded } = useImageLoader(
		src ? (isMobile ? (srcSm || src) : src) : defaultImage,
		{ placeholder: defaultImage }
	);

	// Simple responsive margin logic
	const computedMargin = isMobile ? (marginSm || margin) : margin;

	return (
		<StyledImg
			className='global-image'
			objectFit={objectFit}
			margin={computedMargin}
			position={position}
			left={left}
			right={right}
			top={top}
			bottom={bottom}
			height={height}
			width={width}
			transition={transition}
			$isLoaded={loaded}
		>
			<Image
				blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gAfQ2F0YWxvZyBWaWV3ZXIgRXhwb3J0IEZpbGUgU3VjY2VzcyAg/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgAAQABAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBkQgUQqGxwdHwFSNCsuMCUdNTc5KFCBY0N3ck8MKHdKIkBh3k+8jm"
				placeholder="blur"
				alt={alt || src || 'SingleImage'}
				fill
				priority={priority}
				style={{ objectFit: 'cover' }}
				src={displaySrc || src}
				sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
				quality={75}
			/>
		</StyledImg>
	);
};

const StyledImg = styled.div`
	position: ${props => props.position || theme.positioning.type.absolute};
	height: ${props => props.height || '100%'};
	width: ${props => props.width || '100%'};
	top: ${props => props.top || 0};
	left: ${props => props.left || 0};
	bottom: ${props => props.bottom || 0};
	right: ${props => props.right || 0};
	margin: ${props => props.margin || 0};
	overflow: ${theme.overflow.hidden};

	img {
		transition: opacity 0.3s ease-in-out;
		object-fit: ${props => props.objectFit || 'cover'};
		opacity: ${props => props.$isLoaded ? 1 : 0.9};
	}
`;

