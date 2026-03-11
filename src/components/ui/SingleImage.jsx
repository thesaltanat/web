// components/ui/SingleImage.jsx

'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import blur from '@/public/images/static/blur.jpg';
import theme from '@/src/styles/theme';

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
	defaultImage = blur, // Default image while loading
	priority = false, // Enable priority loading for above-the-fold images
}) => {
	const [deviceWidth, setDeviceWidth] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		function HandleWidth() {
			if (typeof window !== 'undefined') {
				setDeviceWidth(window.innerWidth);
			}
		}

		HandleWidth();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', HandleWidth);
		}
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('resize', HandleWidth);
			}
		};
	}, []);

	// Use marginSm only for logic, not as a DOM prop
	const computedMargin = deviceWidth <= 600 ? marginSm || margin : margin;
	const blurDataURL =
		'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA4A/9k=';

	return (
		<StyledImg
			className="global-image"
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
			$isLoaded={isLoaded}>
			<Image
				blurDataURL={'/images/static/blur.jpg'}
				placeholder="blur"
				alt={alt || src || 'SingleImage'}
				fill
				priority={priority}
				decoding="async"
				style={{ objectFit: 'cover' }}
				src={
					src
						? deviceWidth > 600
							? src
							: srcSm || src
						: defaultImage
				}
				sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
				onLoad={() => setIsLoaded(true)}
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
		opacity: ${props => (props.$isLoaded ? 1 : 0.9)};
	}
`;
