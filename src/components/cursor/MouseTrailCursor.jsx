import { useEffect, useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import theme from '@/src/styles/theme';

const StyleSVG = styled.svg`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: ${({ $zIndex }) => $zIndex} !important;
	pointer-events: none;
	will-change: contents;
	opacity: ${({ $opacity }) => $opacity};
	transition: opacity ${({ $fadeTransition }) => $fadeTransition}ms ease;

	line {
		stroke: ${({ $strokeColor }) => $strokeColor};
		stroke-width: ${({ $strokeWidth }) => $strokeWidth}px;
		stroke-linecap: ${({ $lineCap }) => $lineCap};
	}
`;

// Default configuration
const DEFAULT_CONFIG = {
	desktopMinWidth: 1024,
	totalLines: 60,
	easeFactor: 0.75,
	animationDuration: 1000,
	initialOffset: -15,
	strokeColor: theme.colors.theme.hoverColor.base,
	strokeWidth: 2,
	lineCap: 'round',
	zIndex: theme.positioning.zIndex.max,
	opacity: 1,
	fadeTransition: 300,
	enableOnMobile: false,
	enableOnTablet: false,
	throttle: true,
};

/**
 * MouseTrailCursor - Interactive SVG cursor trail effect
 *
 * @component
 * @example
 * // Basic usage
 * <MouseTrailCursor />
 *
 * @example
 * // Custom configuration
 * <MouseTrailCursor
 *   totalLines={40}
 *   strokeColor="#ff0000"
 *   strokeWidth={3}
 *   easeFactor={0.5}
 *   enableOnTablet={true}
 * />
 */
export default function MouseTrailCursor({
	// Display settings
	desktopMinWidth = DEFAULT_CONFIG.desktopMinWidth,
	totalLines = DEFAULT_CONFIG.totalLines,
	easeFactor = DEFAULT_CONFIG.easeFactor,
	animationDuration = DEFAULT_CONFIG.animationDuration,
	initialOffset = DEFAULT_CONFIG.initialOffset,

	// Styling
	strokeColor = DEFAULT_CONFIG.strokeColor,
	strokeWidth = DEFAULT_CONFIG.strokeWidth,
	lineCap = DEFAULT_CONFIG.lineCap,
	zIndex = DEFAULT_CONFIG.zIndex,
	opacity = DEFAULT_CONFIG.opacity,
	fadeTransition = DEFAULT_CONFIG.fadeTransition,

	// Device controls
	enableOnMobile = DEFAULT_CONFIG.enableOnMobile,
	enableOnTablet = DEFAULT_CONFIG.enableOnTablet,

	// Performance
	throttle = DEFAULT_CONFIG.throttle,

	// Custom className for additional styling
	className = '',

	// Callbacks
	onInit = null,
	onDestroy = null,
}) {
	const svgRef = useRef(null);
	const tweensRef = useRef([]);
	const pointerRef = useRef({
		x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
		y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
	});

	// Device detection
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const shouldRender = useMemo(() => {
		if (!mounted) return false;
		if (typeof window === 'undefined') return false;

		const width = window.innerWidth;

		if (enableOnMobile) return true;
		if (enableOnTablet && width >= 768) return true;
		if (width >= desktopMinWidth) return true;

		return false;
	}, [mounted, enableOnMobile, enableOnTablet, desktopMinWidth]);

	useEffect(() => {
		if (!shouldRender) return;

		const root = svgRef.current;
		if (!root) return;

		const svgns = 'http://www.w3.org/2000/svg';
		let rafId = null;

		// Mouse move handler with optional throttling
		const handleMouseMove = (event) => {
			if (throttle) {
				if (rafId) return;
				rafId = requestAnimationFrame(() => {
					pointerRef.current.x = event.clientX;
					pointerRef.current.y = event.clientY;
					rafId = null;
				});
			} else {
				pointerRef.current.x = event.clientX;
				pointerRef.current.y = event.clientY;
			}
		};

		window.addEventListener('mousemove', handleMouseMove, { passive: true });

		// Leader function for chaining
		let leader = (prop) => pointerRef.current[prop];

		// Create all lines
		for (let i = 0; i < totalLines; i++) {
			leader = createLine(leader, i);
		}

		function createLine(leader, index) {
			const line = document.createElementNS(svgns, 'line');
			root.appendChild(line);

			// Calculate opacity based on position in trail
			const lineOpacity = (totalLines - index) / totalLines;

			gsap.set(line, {
				x: initialOffset,
				y: initialOffset,
				opacity: lineOpacity,
			});

			const pos = gsap.getProperty(line);

			const tween = gsap.to(line, {
				duration: animationDuration,
				x: '+=1',
				y: '+=1',
				repeat: -1,
				ease: 'none',
				modifiers: {
					x: () => {
						const currentX = pos('x');
						const targetX = leader('x');
						const newX = currentX + (targetX - currentX) * easeFactor;
						line.setAttribute('x2', targetX - newX);
						return newX;
					},
					y: () => {
						const currentY = pos('y');
						const targetY = leader('y');
						const newY = currentY + (targetY - currentY) * easeFactor;
						line.setAttribute('y2', targetY - newY);
						return newY;
					},
				},
			});

			tweensRef.current.push(tween);
			return pos;
		}

		// Call init callback
		if (onInit && typeof onInit === 'function') {
			onInit();
		}

		// Cleanup function
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);

			if (rafId) {
				cancelAnimationFrame(rafId);
			}

			tweensRef.current.forEach((tween) => {
				if (tween && tween.kill) {
					tween.kill();
				}
			});
			tweensRef.current = [];

			if (root) {
				while (root.firstChild) {
					root.removeChild(root.firstChild);
				}
			}

			// Call destroy callback
			if (onDestroy && typeof onDestroy === 'function') {
				onDestroy();
			}
		};
	}, [
		shouldRender,
		totalLines,
		easeFactor,
		animationDuration,
		initialOffset,
		throttle,
		onInit,
		onDestroy,
	]);

	if (!shouldRender) return null;

	return (
		<StyleSVG
			ref={svgRef}
			className={`mouse-trail-cursor ${className}`}
			aria-hidden="true"
			$strokeColor={strokeColor}
			$strokeWidth={strokeWidth}
			$lineCap={lineCap}
			$zIndex={zIndex}
			$opacity={opacity}
			$fadeTransition={fadeTransition}
		/>
	);
}

// Prop types documentation (if using TypeScript, convert to interface)
MouseTrailCursor.propTypes = {
	// Display settings
	desktopMinWidth: 'number - Minimum width to enable effect (default: 1024)',
	totalLines: 'number - Number of trail lines (default: 60)',
	easeFactor: 'number - Smoothness of trail (0-1, default: 0.75)',
	animationDuration: 'number - GSAP animation duration (default: 1000)',
	initialOffset: 'number - Starting position offset (default: -15)',

	// Styling
	strokeColor: 'string - Line color (default: theme.colors.theme.hoverColor.base)',
	strokeWidth: 'number - Line thickness in pixels (default: 2)',
	lineCap: 'string - Line cap style: round|butt|square (default: round)',
	zIndex: 'number - Z-index value (default: theme.positioning.zIndex.max)',
	opacity: 'number - Overall opacity 0-1 (default: 1)',
	fadeTransition: 'number - Fade transition duration in ms (default: 300)',

	// Device controls
	enableOnMobile: 'boolean - Enable on mobile devices (default: false)',
	enableOnTablet: 'boolean - Enable on tablets (default: false)',

	// Performance
	throttle: 'boolean - Throttle mouse events with RAF (default: true)',

	// Additional
	className: 'string - Additional CSS classes',
	onInit: 'function - Callback after initialization',
	onDestroy: 'function - Callback before cleanup',
};