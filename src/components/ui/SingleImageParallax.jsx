'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import styled from 'styled-components';
import theme from '@/src/styles/theme';

gsap.registerPlugin(ScrollTrigger);

export const SingleImageParallax = ({
	src,
	srcSm,
	position = 'absolute',
	objectfit = 'cover',
	height = '100%',
	width = '100%',
	alt = '',
	left = 0,
	margin = 0,
	right = 0,
	top = 0,
	bottom = 0,
	transition,
	parallax = true,
	parallaxSpeed = 0.15,
	quality = 100,
	priority = false,
	classImage,
}) => {
	const wrapperRef = useRef(null);
	const [isMobile, setIsMobile] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	// Check if device is mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 1025);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Setup parallax effect (disabled on mobile)
	useEffect(() => {
		if (isMobile || !parallax || !wrapperRef.current) return;

		const container = wrapperRef.current;
		const img = container.querySelector('img');
		if (!img) return;

		const containerHeight = container.clientHeight;
		const travelDistance = Math.max(40, containerHeight * parallaxSpeed);

		// Set up the animation
		gsap.set(img, {
			opacity: 1,
		});

		const animation = gsap.fromTo(
			img,
			{ y: -travelDistance },
			{
				y: travelDistance,
				ease: 'none',
				scrollTrigger: {
					trigger: container,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 0.6,
				},
			},
		);

		return () => {
			animation.scrollTrigger?.kill();
			animation.kill();
		};
	}, [parallax, parallaxSpeed, isMobile]);

	// Generate a simple placeholder
	const rgbDataURL =
		'data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

	return (
		<StyledImgParralax
			ref={wrapperRef}
			className={
				parallax
					? 'img-container global-image' +
						(classImage ? ` ${classImage}` : '')
					: 'global-image' + (classImage ? ` ${classImage}` : '')
			}
			$position={position}
			$height={height}
			$width={width}
			$top={top}
			$left={left}
			$bottom={bottom}
			$right={right}
			$margin={margin}
			$objectfit={objectfit}
			$transition={transition}
			$isLoaded={isLoaded}>
			<Image
				src={isMobile && srcSm ? srcSm : src}
				alt={alt}
				fill
				quality={quality}
				priority={priority}
				placeholder="blur"
				blurDataURL={'/images/static/blur.jpg'}
				style={{ objectFit: objectfit }}
				onLoad={() => setIsLoaded(true)}
			/>
		</StyledImgParralax>
	);
};

const StyledImgParralax = styled.div`
	position: ${props => props.$position};
	height: ${props => props.$height};
	width: ${props => props.$width};
	top: ${props => props.$top};
	left: ${props => props.$left};
	bottom: ${props => props.$bottom};
	right: ${props => props.$right};
	margin: ${props => props.$margin};
	overflow: ${theme.overflow.hidden};
	will-change: transform;
	contain: layout style paint;
	transform: translateZ(0);
	backface-visibility: hidden;
	-webkit-font-smoothing: antialiased;

	img {
		object-fit: ${props => props.$objectfit};
		transform-origin: 50% 50%;
		will-change: transform;
		opacity: ${props => props.$isLoaded ? 1 : 0.9};
		transform: scale(1.12) translateZ(0);
		${props => props.$transition && 'transition: 1.4s ease'};
		backface-visibility: hidden;
		-webkit-font-smoothing: antialiased;
		${theme.grid.media.down.laptop} {
			transform-origin: 0;
			transform: scale(1) translateZ(0) !important;
		}
	}
`;
