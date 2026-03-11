// components/ui/Title.jsx
// Title component for dynamic headings (h1-h6) with theme-based styles.
// Pass the heading tag via the `tag` prop (e.g., tag="h1").
// All heading styles use theme.typography for font family, size, weight, etc.
// Supports margin, padding, border, alignment, and other customizations.
'use client';

import {
	forwardRef,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import styled, { withTheme } from 'styled-components';

import theme from '@/src/styles/theme';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import parse from 'html-react-parser';

gsap.registerPlugin(ScrollTrigger);

// Helper to convert a theme style object (camelCase keys) into a CSS string
const objToCss = obj => {
	if (!obj || typeof obj !== 'object') return '';
	return Object.entries(obj)
		.map(([k, v]) => {
			// convert camelCase to kebab-case
			const prop = k.replace(/([A-Z])/g, '-$1').toLowerCase();
			return `${prop}: ${v};`;
		})
		.join('\n');
};

/**
 * AnimatedText component for scroll-triggered word animation with proper masking reveal
 * Only triggers on desktop devices (≥ 991px)
 */
const AnimatedText = ({
	text,
	className,
	delay = 0,
	animate = false,
	trigger = null,
}) => {
	const textRef = useRef(null);
	const [isDesktop, setIsDesktop] = useState(true);
	const uniqueId = useId(); // Generate unique ID at component level

	// Check if device is desktop (≥ 991px - matches animation system)
	useEffect(() => {
		const checkDevice = () => {
			const isMobile = window.innerWidth <= 1025;
			setIsDesktop(!isMobile);
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);
		return () => window.removeEventListener('resize', checkDevice);
	}, []);

	// Initialize GSAP ScrollTrigger after layout so refs are available
  useLayoutEffect(() => {
    if (!animate || !textRef.current || !isDesktop) return;

    const words = textRef.current.querySelectorAll('.anim-word');
    if (!words.length) return;

    // Kill any existing ScrollTriggers with the same ID to prevent memory leaks
    const existingTriggers = ScrollTrigger.getAll().filter(
      (st) => st.vars?.id === `title-anim-${uniqueId}`,
    );
    existingTriggers.forEach((st) => st.kill());

    // Set initial state - words start below the mask with performance optimization
    gsap.set(words, {
      y: '110%',
      opacity: 0,
      willChange: 'transform, opacity',
    });

    // Accept trigger as either a DOM node or a ref object
    const resolvedTrigger =
      trigger && typeof trigger === 'object' && 'current' in trigger
        ? trigger.current
        : trigger || textRef.current;

    if (!resolvedTrigger) {
      // Cleanup if no valid trigger
      gsap.set(words, { opacity: 1, y: '0%', willChange: 'auto' });
      return;
    }

    // Wait for next frame to ensure DOM is fully painted
    requestAnimationFrame(() => {
      // Create animation timeline with unique ID to prevent conflicts
      const tl = gsap.timeline({
        scrollTrigger: {
          id: `title-anim-${uniqueId}`,
          trigger: resolvedTrigger,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
          markers: false,
          scrub: false,
          invalidateOnRefresh: true, // Recalculate on resize/refresh
          refreshPriority: -1,
          onComplete: () => {
            // Remove will-change after animation completes
            gsap.set(words, { willChange: 'auto' });
          },
          onRefresh: () => {
            // Reset initial state on refresh (resize, route change)
            if (tl.scrollTrigger && !tl.scrollTrigger.isActive) {
              gsap.set(words, {
                y: '110%',
                opacity: 0,
                willChange: 'transform, opacity',
              });
            }
          },
        },
      });

      tl.to(words, {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power2.out',
        delay: delay / 1000,
        onComplete: () => {
          // Ensure will-change is removed after animation
          gsap.set(words, { willChange: 'auto' });
        },
      });

      // Store timeline for cleanup
      if (textRef.current) {
        textRef.current._gsapTimeline = tl;
      }
    });

    // Comprehensive cleanup function
    return () => {
      const tl = textRef.current?._gsapTimeline;

      // Kill ScrollTrigger first
      if (tl?.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      // Kill timeline
      if (tl) {
        tl.kill();
      }
      // Reset styles to prevent FOUC on unmount
      gsap.set(words, { clearProps: 'all' });

      // Clean up stored reference
      if (textRef.current) {
        delete textRef.current._gsapTimeline;
      }
    };
  }, [animate, delay, trigger, isDesktop, uniqueId]);

  // Add a separate effect to handle ScrollTrigger refresh on route changes
  useLayoutEffect(
    () => {
      // Small delay to ensure DOM is settled after route change
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(refreshTimer);
    },
    [
      /* add your route dependency here, e.g., pathname from useLocation */
    ],
  );
	// If not desktop or animation disabled, show normal text
	if (!animate || !isDesktop) {
		return <div className={className}>{parse(text)}</div>;
	}

	// Split text into words and handle line breaks properly
	const words = text.split(' ').filter(word => word !== '');

	return (
		<div ref={textRef} className={`${className} animated-text-container`}>
			{words.map((word, wordIndex) => (
				<span key={wordIndex} className="anim-word-wrapper">
					<span className="anim-word">{word}</span>
				</span>
			))}
		</div>
	);
};

/**
 * Title displays a heading (h1-h6) with fully dynamic, theme-based styles.
 */
const Title = forwardRef(
	(
		{
			text,
			tag = 'h2',
			margin,
			padding,
			borderColor,
			borderWidth,
			borderStyle,
			borderRadius,
			textTransform,
			center,
			className,
			width,
			backgroundColor,
			color,
			theme,
			animate = true,
			animationDelay = 0,
			animationTrigger = null,
			...rest
		},
		ref,
	) => {
		const titleRef = useRef(null);
		const triggerRef = ref || titleRef;

		// Check if text contains HTML tags
		const hasHTMLTags = /<[^>]*>/.test(text);

		// If tag is 'subheader', render as div with class 'h0'
		if (tag === 'header') {
			return (
				<StyledTitle
					ref={triggerRef}
					className={`title header ${className || ''}`}
					margin={margin}
					padding={padding}
					borderColor={borderColor}
					borderWidth={borderWidth}
					borderStyle={borderStyle}
					borderRadius={borderRadius}
					center={center}
					width={width}
					backgroundColor={backgroundColor}
					textTransform={textTransform}
					color={color}
					theme={theme}
					{...rest}>
					<div className="header">
						{hasHTMLTags || !animate ? (
							parse(text)
						) : (
							<AnimatedText
								text={text}
								animate={animate}
								delay={animationDelay}
								trigger={animationTrigger || triggerRef}
							/>
						)}
					</div>
				</StyledTitle>
			);
		}

		// If tag is 'h0', render as div with class 'h0'
		if (tag === 'h0') {
			return (
				<StyledTitle
					ref={triggerRef}
					className={`title h0 ${className || ''}`}
					margin={margin}
					padding={padding}
					borderColor={borderColor}
					borderWidth={borderWidth}
					borderStyle={borderStyle}
					borderRadius={borderRadius}
					textTransform={textTransform}
					center={center}
					width={width}
					backgroundColor={backgroundColor}
					color={color}
					theme={theme}
					{...rest}>
					<div className="h0">
						{hasHTMLTags || !animate ? (
							parse(text)
						) : (
							<AnimatedText
								text={text}
								animate={animate}
								delay={animationDelay}
								trigger={animationTrigger || triggerRef}
							/>
						)}
					</div>
				</StyledTitle>
			);
		}

		// If tag is 'subheader', render as div with class 'h0'
		if (tag === 'subheader') {
			return (
				<StyledTitle
					ref={triggerRef}
					className={`title subheader ${className || ''}`}
					margin={margin}
					padding={padding}
					borderColor={borderColor}
					borderWidth={borderWidth}
					borderStyle={borderStyle}
					borderRadius={borderRadius}
					center={center}
					width={width}
					backgroundColor={backgroundColor}
					color={color}
					textTransform={textTransform}
					theme={theme}
					{...rest}>
					<div className="subheader">
						{hasHTMLTags || !animate ? (
							parse(text)
						) : (
							<AnimatedText
								text={text}
								animate={animate}
								delay={animationDelay}
								trigger={animationTrigger || triggerRef}
							/>
						)}
					</div>
				</StyledTitle>
			);
		}

		// If tag is 'subtext', render as div with class 'h0'
		if (tag === 'subtext') {
			return (
				<StyledTitle
					ref={triggerRef}
					className={`title subtext ${className || ''}`}
					margin={margin}
					padding={padding}
					borderColor={borderColor}
					borderWidth={borderWidth}
					borderStyle={borderStyle}
					borderRadius={borderRadius}
					center={center}
					width={width}
					backgroundColor={backgroundColor}
					color={color}
					textTransform={textTransform}
					theme={theme}
					{...rest}>
					<div className="subtext">
						{hasHTMLTags || !animate ? (
							parse(text)
						) : (
							<AnimatedText
								text={text}
								animate={animate}
								delay={animationDelay}
								trigger={animationTrigger || triggerRef}
							/>
						)}
					</div>
				</StyledTitle>
			);
		}

		// Otherwise, render as heading tag
		const CustomTag = tag;
		return (
			<StyledTitle
				ref={triggerRef}
				className={`title ${className || ''}`}
				margin={margin}
				padding={padding}
				borderColor={borderColor}
				borderWidth={borderWidth}
				borderStyle={borderStyle}
				borderRadius={borderRadius}
				center={center}
				textTransform={textTransform}
				width={width}
				backgroundColor={backgroundColor}
				color={color}
				theme={theme}
				{...rest}>
				<CustomTag>
					{hasHTMLTags || !animate ? (
						parse(text)
					) : (
						<AnimatedText
							text={text}
							animate={animate}
							delay={animationDelay}
							trigger={animationTrigger || triggerRef.current}
						/>
					)}
				</CustomTag>
			</StyledTitle>
		);
	},
);

Title.displayName = 'Title';

// Styled component with proper masking for word-by-word animation
const StyledTitle = styled.div`
	margin: ${props => props.margin || theme.numericScale.margin['0']};
	text-transform: ${props => props.textTransform || 'normal'};
	padding: ${props => props.padding || theme.numericScale.padding['0']};
	color: ${props => props.color || theme.colors.black.base};
	width: ${props =>
		props.width ||
		theme.numericScale.width.full}; /* Changed from fit-content to 100% */
	max-width: 100%; /* Prevent overflow */
	text-align: ${props =>
		props.center
			? props.center
				? props.center
				: theme.layout.flex.align.center
			: 'left'};
	background-color: ${props =>
		props.backgroundColor || theme.colors.transparent};
	border-color: ${props => props.borderColor || theme.colors.transparent};
	border-width: ${props =>
		props.borderWidth || theme.numericScale.borderWidth['0']};
	border-style: ${props => props.borderStyle || 'none'};
	border-radius: ${props =>
		props.borderRadius || theme.numericScale.borderRadius['0']};
	box-sizing: border-box; /* Include padding and border in width */

	/* Animation styles for text reveal with word-by-word masking - Desktop only */
	.animated-text-container {
		display: block;
		overflow: hidden;
		/* Prevent conflicts with GSAP animations */
		transform-style: preserve-3d;
		backface-visibility: hidden;
		perspective: 1000px;
	}

	.anim-word-wrapper {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
		margin-right: 0.25em; /* Space between words */

		&:last-child {
			margin-right: 0;
		}
	}

	.anim-word {
		will-change: transform;
		display: inline-block;
		opacity: 0; /* Hide initially to prevent FOUC */
		transform: translateY(110%); /* Start position matching GSAP from */
	}

	${theme.grid.media.down.laptop} {
		.animated-text-container {
			display: ${theme.layout.display.flex};
			flex-wrap: ${theme.layout.flex.wrap};
			align-items: baseline;
			justify-content: ${props =>
				props.center ? theme.layout.flex.align.center : 'flex-start'};
			gap: 0;
			width: ${theme.numericScale.width.full};
			max-width: ${theme.numericScale.width.full};
			box-sizing: border-box;
		}

		.anim-word-wrapper {
			display: ${theme.layout.display.inlineBlock};
			overflow: ${theme.overflow.hidden}; /* Creates the mask effect */
			position: ${theme.positioning.type.relative};
			margin-right: ${theme.numericScale.margin.custom(
				'0.2em',
			)}; /* Reduced spacing to prevent overflow */
			max-width: ${theme.numericScale.width.full};

			&:last-child {
				margin-right: ${theme.numericScale.margin[
					'0'
				]}; /* No margin on last word */
			}
		}

		.anim-word {
			display: ${theme.layout.display.inlineBlock};
			will-change: ${theme.scale.willChange.transform};
			backface-visibility: ${theme.overflow.hidden};
			position: ${theme.positioning.type.relative};
			padding-right: 5px;
			white-space: ${theme.layout.flex.wrap}; /* Prevents word breaking */
		}
	}

	/* Mobile - disable animation styles */

	${theme.grid.media.down.md} {
		.animated-text-container {
			display: ${theme.layout.display.block};
			width: ${theme.numericScale.width.full};
		}

		.anim-word-wrapper,
		.anim-word {
			display: ${theme.layout.display.inline};
			transform: none !important;
			opacity: 1 !important; /* Force visibility on mobile */
			will-change: auto !important;
			margin-right: ${theme.numericScale.margin['0']};
		}
	}

	/* Heading styles use theme.typography for consistency */

	h1 {
		${objToCss(theme.typography.styles.h1.desktop)}
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h1.tab)}
		}

		${theme.grid.media.down.md} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h1.mobile)}
		}
	}

	h2 {
		${objToCss(theme.typography.styles.h2.desktop)}
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h2.tab)}
		}

		${theme.grid.media.down.md} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h2.mobile)}
		}
	}

	h3 {
		${objToCss(theme.typography.styles.h3.desktop)}
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h3.tab)}
		}

		${theme.grid.media.down.md} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h3.mobile)}
		}
	}

	h4 {
		${objToCss(theme.typography.styles.h4.desktop)}
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h4.tab)}
		}

		${theme.grid.media.down.md} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h4.mobile)}
		}
	}

	h5 {
		${objToCss(theme.typography.styles.h5.desktop)}
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h5.tab)}
		}

		${theme.grid.media.down.md} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h5.mobile)}
		}
	}

	h6 {
		${objToCss(theme.typography.styles.h6.desktop)}
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h6.tab)}
		}

		${theme.grid.media.down.md} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h6.mobile)}
		}
	}

	.h0 {
		${objToCss(theme.typography.styles.heroDisplay.desktop)}
		color: ${props =>
			props.color || props.theme?.typography?.h0?.color || '#000'};
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display
				.block}; /* Changed from flex to block */
			${objToCss(theme.typography.styles.heroDisplay.tab)}
		}

		${theme.grid.media.down.md} {
			${objToCss(theme.typography.styles.heroDisplay.mobile)}
		}
	}
	.subheader {
		${objToCss(theme.typography.styles.h6.desktop)}
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h6.tab)}
		}

		${theme.grid.media.down.md} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h6.mobile)}
		}
	}
	.header {
		${objToCss(theme.typography.styles.h5.desktop)}
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h5.tab)}
		}

		${theme.grid.media.down.md} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h5.mobile)}
		}
	}
	.subtext {
		${objToCss(theme.typography.styles.bodyM.desktop)}
		color: ${props =>
			props.color || props.theme?.typography?.h0?.color || '#000'};
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.laptop} {
			display: ${theme.layout.display
				.block}; /* Changed from flex to block */
			${objToCss(theme.typography.styles.bodyM.tab)}
		}

		${theme.grid.media.down.md} {
			${objToCss(theme.typography.styles.bodyM.mobile)}
		}
	}

	p {
		${theme.typography.styles.bodyS.desktop};
		color: ${props => props.color || theme.colors.black.base};
	}
`;

export default withTheme(Title);
