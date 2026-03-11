'use client';

import theme from '@/src/styles/theme';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import parse from 'html-react-parser';
import {
	forwardRef,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import styled from 'styled-components';

gsap.registerPlugin(ScrollTrigger);

/**
 * BodyText component with simple fade-in animation on scroll
 */
const BodyText = forwardRef(
	(
		{
			children,
			as = 'p',
			fontFamily = theme.typography.fonts.primary,
			fontWeight = 400,
			fontStyle = 'normal',
			fontSize = '1.1rem',
			lineHeight = 1.2,
			letterSpacing = '-0.0225rem',
			color = 'black',
			margin = '0',
			animate = true,
			animationDelay = 0,
			animationTrigger = null,
			className = '',
			...rest
		},
		ref,
	) => {
		const textRef = useRef(null);
		const uniqueId = useId();
		const [isDesktop, setIsDesktop] = useState(true);

		// Check if device is desktop (≥ 1024px)
		useEffect(() => {
			const checkDevice = () => {
				const isMobile = window.innerWidth <= 1025;
				setIsDesktop(!isMobile);
			};

			checkDevice();
			window.addEventListener('resize', checkDevice);
			return () => window.removeEventListener('resize', checkDevice);
		}, []);

		// Initialize GSAP fade-in animation
    useLayoutEffect(() => {
      if (!textRef.current || !animate || !isDesktop) return;

      const element = textRef.current;

      // Kill any existing ScrollTriggers for this element to prevent memory leaks
      const existingTriggers = ScrollTrigger.getAll().filter(
        (st) => st.vars?.id === `bodytext-fade-${uniqueId}` || st.trigger === element,
      );
      existingTriggers.forEach((st) => st.kill());

      // Set initial state with will-change for better performance
      gsap.set(element, {
        opacity: 0,
        y: 20,
        willChange: 'transform, opacity',
      });

      // Resolve trigger
      const resolvedTrigger =
        animationTrigger && typeof animationTrigger === 'object' && 'current' in animationTrigger
          ? animationTrigger.current
          : animationTrigger || element;

      if (!resolvedTrigger) {
        // Fallback: show element if no trigger
        gsap.set(element, { opacity: 1, y: 0, willChange: 'auto' });
        return;
      }

      // Wait for next frame to ensure DOM is fully painted
      requestAnimationFrame(() => {
        // Create animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            id: `bodytext-fade-${uniqueId}`,
            trigger: resolvedTrigger,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play none none none',
            markers: false,
            invalidateOnRefresh: true, // Recalculate on resize/refresh
            refreshPriority: -1,
            onComplete: () => {
              // Remove will-change after animation completes
              gsap.set(element, { willChange: 'auto' });
            },
            onRefresh: () => {
              // Reset initial state on refresh (resize, route change)
              if (tl.scrollTrigger && !tl.scrollTrigger.isActive) {
                gsap.set(element, {
                  opacity: 0,
                  y: 20,
                  willChange: 'transform, opacity',
                });
              }
            },
          },
        });

        tl.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: animationDelay / 1000,
          onComplete: () => {
            // Ensure will-change is removed after animation
            gsap.set(element, { willChange: 'auto' });
          },
        });

        // Store timeline for cleanup
        if (element) {
          element._gsapTimeline = tl;
        }
      });

      // Comprehensive cleanup function
      return () => {
        const tl = element?._gsapTimeline;

        // Kill ScrollTrigger first
        if (tl?.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        // Kill timeline
        if (tl) {
          tl.kill();
        }
        // Reset styles to prevent FOUC on unmount
        gsap.set(element, { clearProps: 'all' });

        // Clean up stored reference
        if (element) {
          delete element._gsapTimeline;
        }
      };
    }, [animate, animationDelay, animationTrigger, isDesktop, uniqueId]);

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
		// Check if children is a string with HTML tags
		const isString = typeof children === 'string';
		const hasHTMLTags = isString && /<[^>]*>/.test(children);

		return (
			<StyledText
				ref={ref || textRef}
				as={as}
				$fontFamily={fontFamily}
				$fontWeight={fontWeight}
				$fontStyle={fontStyle}
				$fontSize={fontSize}
				$lineHeight={lineHeight}
				$letterSpacing={letterSpacing}
				$color={color}
				$margin={margin}
				className={className}
				{...rest}>
				{isString && hasHTMLTags ? parse(children) : children}
			</StyledText>
		);
	},
);

BodyText.displayName = 'BodyText';

const StyledText = styled.p`
	font-family: ${props => props.$fontFamily};
	font-weight: ${props => props.$fontWeight};
	font-style: ${props => props.$fontStyle};
	font-size: ${props => props.$fontSize};
	line-height: ${props => props.$lineHeight};
	letter-spacing: ${props => props.$letterSpacing};
	color: ${props => props.$color};
	margin: ${props => props.$margin};

	/* Prevent conflicts with GSAP animations */
	transform-style: preserve-3d;
	backface-visibility: hidden;
	perspective: 1000px;

	${theme.grid.media.down.md} {
		opacity: 1 !important;
		transform: none !important;
		will-change: auto !important;
	}
`;

export default BodyText;
