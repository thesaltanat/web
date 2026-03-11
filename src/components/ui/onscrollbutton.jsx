/** @format */

'use client';

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { gsap } from 'gsap';
import theme from '@/src/styles/theme';

// Animation for the line scrolling down
const scrollAnimation = keyframes`
	0% {
		transform: translateY(-100%);
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		transform: translateY(100%);
		opacity: 0;
	}
`;

// Styled Components
const ScrollButtonWrapper = styled.a`
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	cursor: pointer;
	z-index: 50;
	text-decoration: none;
	opacity: 1 !important;
	
	transition:
		transform 0.3s ease,
		opacity 0.3s ease;

	/* Dynamic positioning based on props */
	${props => props.$position.desktop};

	@media(max-width: 1023px) {
		${props => props.$position.tablet}
		
	}

	/* Mobile positioning */
	@media (max-width: 767px) {
		${props => props.$position.mobile}
	}

	&:hover {
		transform: translateY(4px);

		.scroll-text {
			color: #ffffff;
			letter-spacing: 7.5px;
		}

		.line-wrapper {
			&::before {
				animation-duration: 1.5s;
			}
		}
	}

	&:active {
		transform: translateY(6px);
	}
`;

const ScrollText = styled.span`
	color: #ffe9e9;
	font-family: 'Mosvita', sans-serif;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	letter-spacing: 5.76px;
	text-transform: uppercase;
	transition: all 0.3s ease;
	white-space: nowrap;
	writing-mode: vertical-rl;
	transform: rotate(180deg);
	opacity: 1 !important;

	/* Tablet */
	@media (max-width: 1023px) {
		font-size: 14px;
		letter-spacing: 4.5px;
	}

	/* Mobile */
	@media (max-width: 767px) {
		font-size: 12px;
		letter-spacing: 3.5px;
	}
`;

const LineWrapper = styled.div`
	position: relative;
	width: 2px;
	height: 128px;
	overflow: hidden;

	/* Tablet */
	@media (max-width: 1023px) {
		height: 96px;
	}

	/* Mobile */
	@media (max-width: 767px) {
		height: 64px;
	}

	/* Animated line effect */
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			180deg,
			${theme.colors.theme.primary[0]} 0%,
			${theme.colors.theme.colorThree.base} 50%,
			${theme.colors.theme.primary[0]} 100%
		);
		animation: ${scrollAnimation} 2s ease-in-out infinite;
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
	}
`;

/**
 * OnScrollButton Component
 *
 * A fixed positioned scroll button with interactive hover effects
 *
 * @param {Object} props
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.href - Link URL (optional, for navigation)
 * @param {string} props.hash - Hash/anchor link (e.g., "#section")
 * @param {Object} props.position - Positioning for different devices
 * @param {string} props.position.desktop - CSS positioning for desktop (e.g., "bottom: 40px; right: 40px;")
 * @param {string} props.position.tablet - CSS positioning for tablet
 * @param {string} props.position.mobile - CSS positioning for mobile
 * @param {string} props.text - Button text (default: "SCROLL")
 * @param {number} props.lineHeight - Height of the line (default: 128)
 */
const OnScrollButton = ({
	onClick,
	href,
	hash,
	position = {
		desktop: 'bottom: 40px; right: 40px;',
		tablet: 'bottom: 30px; right: 30px;',
		mobile: 'bottom: 20px; right: 20px;',
	},
	text = 'SCROLL',
	lineHeight = 128,
}) => {
	const [isVisible, setIsVisible] = useState(true);

	// Handle click with smooth scroll
	const handleClick = e => {
		if (onClick) {
			e.preventDefault();
			onClick(e);
		}

		// If hash is provided, smooth scroll to element
		if (hash) {
			e.preventDefault();
			const element = document.querySelector(hash);
			if (element) {
				const headerOffset = 80; // Adjust based on your header height
				const elementPosition = element.getBoundingClientRect().top;
				const offsetPosition =
					elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				});
			}
		}
	};

	// Optional: Hide button when near bottom of page
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const threshold = 200; // Hide when within 200px of bottom

			if (documentHeight - scrollPosition < threshold) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// GSAP entrance animation
	useEffect(() => {
		gsap.from('.scroll-button', {
			opacity: 0,
			y: 20,
			duration: 0.8,
			delay: 0.5,
			ease: 'power2.out',
		});
	}, []);

	// Determine the href attribute
	const linkHref = hash || href || '#';

	return (
		<ScrollButtonWrapper
			className="scroll-button"
			href={linkHref}
			onClick={handleClick}
			$position={position}
			style={{
				opacity: isVisible ? 1 : 0,
				pointerEvents: isVisible ? 'auto' : 'none',
			}}>
			<ScrollText className="scroll-text">{text}</ScrollText>
			<LineWrapper className="line-wrapper">
				<svg
					width="1"
					height={lineHeight}
					viewBox={`0 0 1 ${lineHeight}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<line
						x1="0.5"
						y1="0"
						x2="0.5"
						y2={lineHeight}
						stroke="white"
						strokeOpacity="0.6"
					/>
				</svg>

			</LineWrapper>
		</ScrollButtonWrapper>
	);
};

export default OnScrollButton;
