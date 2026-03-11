/** @format */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';
import OnScrollButton from '@/src/components/ui/onscrollbutton';
import { gsap } from 'gsap';
import theme from '../styles/theme';
import { useBreakpoint } from '@/src/hooks/useDeviceDetection';
import BackgroundVideo from '@/src/components/ui/BackgroundVideo';
import HeroContent from '@/src/components/ui/HeroContent';
import InteractiveAreas from '@/src/components/ui/InteractiveAreas';

// SASS-style mixins using CSS helper functions
const mixins = {
	// Breakpoints
	tablet: '@media (max-width: 1023px)',
	mobile: '@media (max-width: 767px)',
	smallMobile: '@media (max-width: 480px)',

	// Common flex center
	flexCenter: css`
		display: flex;
		align-items: center;
		justify-content: center;
	`,

	// Absolute positioning
	absoluteCenter: css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	`,

	// Theme button positioning
	themeButton: css`
		position: absolute;
		color: #fff;
		font-size: 0.8889rem;
		line-height: 1; /* 100% = 1 */
		letter-spacing: 0.16em; /* 16% = 0.16em */
		text-transform: uppercase;
		transition: ${theme.animations.transition.default};
		padding: 1rem;
		cursor: pointer;

		&:hover {
			opacity: 0.8;
		}
	`,
};
const HeroContainer = styled.div`
	position: relative;
	width: 100%;
	height: calc(var(--vh, 1vh) * 100);
	${mixins.flexCenter}
	overflow: hidden;
	background: #000;

	${mixins.mobile} {
		padding: 1rem;
	}

	${mixins.smallMobile} {
		padding: 0.5rem;
	}

	&:after {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		content: '';
		z-index: 5;
		background: linear-gradient(
			0deg,
			rgba(4, 4, 4, 0.41) 0%,
			rgba(4, 4, 4, 0.41) 100%
		);
	}
`;
const InteractiveAreasStyled = styled(InteractiveAreas)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 3;
	pointer-events: none;
`;

const SoundButton = styled.button`
	${mixins.themeButton}
	bottom: 2rem;
	right: 2rem;
	z-index: 10;
	background: rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
	${mixins.flexCenter}

	${mixins.mobile} {
		bottom: 1rem;
		right: 2.3rem;
		width: 2.5rem;
		height: 2.5rem;
	}

	&:hover {
		background: rgba(0, 0, 0, 0.5);
		border-color: rgba(255, 255, 255, 0.4);
	}

	svg {
		width: 1rem;
		height: 1rem;
	}
`;

// Component
const HeroBanner = ({ videos = {}, autoPlay = true, loop = true }) => {
	const [activeTheme, setActiveTheme] = useState('awaken');
	const [isLoaded, setIsLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay compliance
	const [hasUserInteracted, setHasUserInteracted] = useState(false);
	const [isAutoProgressing, setIsAutoProgressing] = useState(true);
	const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
	const heroRef = useRef(null);
	const videoRefs = useRef({});
	const autoProgressTimeout = useRef(null);

	// Disable animations for devices under 1024px
	const isUnder1024 = useBreakpoint(1023);

	const themes = useMemo(
		() => ({
			awaken: {
				mainTitle: 'Discover',
				title: ['Promise', 'Meets', 'Prosperity'],
				video: videos.awaken || 'media/YCkMDxZ6sc3o.mp4',
				color: '#ff6b6b',
				src: '/about-us',
				description:
					'The Saltanat stands as a symbol of thoughtful growth, crafting spaces that unite opportunity, beauty, and lasting legacy.',
			},
			indulge: {
				mainTitle: 'Retreat',
				title: ['diversified', 'global', 'leader'],
				video: videos.indulge || 'media/ByiVZnAHzpQN.mp4',
				color: '#45b7d1',
				src: '/projects',
				description:
					'The Saltanat stands as a symbol of thoughtful growth, crafting spaces that unite opportunity, beauty, and lasting legacy.',
			},
			play: {
				mainTitle: 'Invest',
				title: ['Play', 'without', 'restraint'],
				video: videos.play || 'media/FajV69UIYMfM.mp4',
				color: '#4ecdc4',
				src: '/why-invest',
				description:
					'Standing tall as a beacon of luxury and foresight, The Saltanat redefines urban living by harmonizing opulence with sustainable growth.',
			},
		}),
		[videos],
	);

	// Theme keys for easy navigation
	const themeKeys = useMemo(() => Object.keys(themes), [themes]);

	// Initial loading delay for skeleton transition
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 500);
		return () => clearTimeout(timer);
	}, []);

	// Set custom --vh property to fix viewport height on mobile
	useEffect(() => {
		const updateVh = () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		updateVh();
		window.addEventListener('resize', updateVh);

		return () => {
			window.removeEventListener('resize', updateVh);
		};
	}, []);

	// Auto-progression through themes
	useEffect(() => {
		if (!isLoaded || !isAutoProgressing) return;

		const progressToNext = () => {
			setCurrentThemeIndex(prevIndex => {
				const nextIndex = (prevIndex + 1) % themeKeys.length;
				const nextTheme = themeKeys[nextIndex];
				setActiveTheme(nextTheme);
				return nextIndex;
			});
		};

		// Start auto-progression after initial load
		autoProgressTimeout.current = setTimeout(() => {
			progressToNext();
		}, 8000); // 8 seconds per theme

		return () => {
			if (autoProgressTimeout.current) {
				clearTimeout(autoProgressTimeout.current);
			}
		};
	}, [isLoaded, isAutoProgressing, currentThemeIndex, themeKeys]);

	// Sync currentThemeIndex with activeTheme when manually changed
	useEffect(() => {
		const index = themeKeys.indexOf(activeTheme);
		if (index !== -1 && index !== currentThemeIndex) {
			setCurrentThemeIndex(index);
		}
	}, [activeTheme, themeKeys, currentThemeIndex]);
	useEffect(() => {
		if (isLoading) return;

		const timeline = gsap.timeline({
			paused: true,
			onComplete: () => setIsLoaded(true),
		});

		timeline
			.from('.hero-logo', {
				duration: 1.2,
				opacity: 0,
				y: -50,
				scale: 0.8,
				ease: 'power2.out',
			})
			.from(
				'.theme-buttons',
				{
					duration: 0.6,
					opacity: 0,
					y: 20,
					ease: 'power2.out',
				},
				'-=0.4',
			);

		timeline.play();

		return () => {
			if (timeline) {
				timeline.kill();
			}
			gsap.killTweensOf('.hero-logo');
			gsap.killTweensOf('.theme-buttons');
		};
	}, [isLoading]);

	// Video management: play active, pause inactive, handle audio, and video ended events
	useEffect(() => {
		// Define handleVideoEnded outside the loop to avoid scope issues
		const handleVideoEnded = () => {
			if (isAutoProgressing) {
				const nextIndex = (currentThemeIndex + 1) % themeKeys.length;
				const nextTheme = themeKeys[nextIndex];

				// Add transition effect before changing theme
				gsap.to(heroRef.current, {
					opacity: 0.8,
					duration: 0.3,
					ease: 'power2.inOut',
					onComplete: () => {
						setActiveTheme(nextTheme);
						setCurrentThemeIndex(nextIndex);
						gsap.to(heroRef.current, {
							opacity: 1,
							duration: 0.5,
							ease: 'power2.inOut',
						});
					},
				});
			}
		};

		Object.keys(themes).forEach(themeKey => {
			const video = videoRefs.current[themeKey];
			if (video) {
				video.muted = isMuted;
				video.volume = isMuted ? 0 : 0.5; // Medium volume when unmuted

				// Remove existing event listeners to prevent duplicates
				video.removeEventListener('ended', handleVideoEnded);

				if (themeKey === activeTheme) {
					video.currentTime = 0;
					// For Safari, ensure user interaction before playing with sound
					if (!isMuted && !hasUserInteracted) {
						video.muted = true;
					}

					// Add ended event listener for auto-progression
					video.addEventListener('ended', handleVideoEnded);
					video.play().catch(() => {
						// Handle autoplay restrictions silently
					});
				} else {
					video.pause();
				}
			}
		});

		// Cleanup function
		return () => {
			Object.values(videoRefs.current).forEach(video => {
				if (video) {
					video.removeEventListener('ended', handleVideoEnded);
				}
			});
		};
	}, [
		activeTheme,
		themes,
		isMuted,
		hasUserInteracted,
		isAutoProgressing,
		currentThemeIndex,
		themeKeys,
	]);

	const router = useRouter();

	// Add sound toggle handler
	const handleSoundToggle = () => {
		setIsMuted(!isMuted);
		setHasUserInteracted(true);

		// Update all videos immediately
		Object.values(videoRefs.current).forEach(video => {
			if (video) {
				video.muted = !isMuted;
				video.volume = !isMuted ? 0 : 0.5;
			}
		});
	};

	const handleThemeChange = themeKey => {
		if (!isLoaded) return;

		setHasUserInteracted(true); // Enable sound after user interaction
		setActiveTheme(themeKey);

		// Pause auto-progression when user manually changes theme
		setIsAutoProgressing(false);

		// Clear any pending auto-progression timeout
		if (autoProgressTimeout.current) {
			clearTimeout(autoProgressTimeout.current);
		}

		// Resume auto-progression after 10 seconds of no user interaction
		setTimeout(() => {
			setIsAutoProgressing(true);
		}, 10000);

		// Container animation for extra effect
		gsap.fromTo(
			heroRef.current,
			{ scale: 1 },
			{
				duration: 1.5,
				ease: 'power1.inOut',
				yoyo: true,
				repeat: 1,
			},
		);

		// Navigate to theme route
		const themePath = themes[themeKey]?.src;
		if (themePath) {
			router.push(themePath);
		}
	};

	const handleAreaHover = themeKey => {
		// Only enable hover-based animations after intro loaded and on devices >= 1024px
		if (!isLoaded || isUnder1024) return;

		setActiveTheme(themeKey);

		// Temporarily pause auto-progression during hover
		setIsAutoProgressing(false);

		// Clear any pending auto-progression timeout
		if (autoProgressTimeout.current) {
			clearTimeout(autoProgressTimeout.current);
		}

		// Animate heading characters
		try {
			const charSelector = `.kv__heading--${themeKey} .main-heading__line .char`;
			const chars = document.querySelectorAll(charSelector);
			if (chars && chars.length) {
				gsap.killTweensOf(chars);
				gsap.fromTo(
					Array.from(chars),
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.02,
						duration: 0.45,
						ease: 'power2.out',
					},
				);
			} else {
				// Fallback to line-based animation
				const selector = `.kv__heading--${themeKey} .main-heading__line`;
				const lines = document.querySelectorAll(selector);
				if (lines && lines.length) {
					gsap.killTweensOf(lines);
					gsap.fromTo(
						lines,
						{ y: 20, opacity: 0 },
						{
							y: 0,
							opacity: 1,
							stagger: 0.06,
							duration: 0.45,
							ease: 'power2.out',
						},
					);
				}
			}
		} catch (e) {
			// Safe-guard for SSR
		}

		// Animate description characters
		try {
			const descCharSelector = `.text-description--${themeKey} .char`;
			const descChars = document.querySelectorAll(descCharSelector);
			if (descChars && descChars.length) {
				gsap.killTweensOf(descChars);
				gsap.fromTo(
					Array.from(descChars),
					{ y: 12, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.01,
						duration: 0.45,
						ease: 'power2.out',
					},
				);
			}
		} catch (e) {
			// noop
		}
	};

	const handleAreaLeave = () => {
		// Resume auto-progression after a short delay when hover ends
		setTimeout(() => {
			setIsAutoProgressing(true);
		}, 2000);
	};

	// Split text into character spans for GSAP animation
	useEffect(() => {
		if (typeof window === 'undefined') return;

		// Split heading lines
		const lines = document.querySelectorAll('.main-heading__line');
		lines.forEach(line => {
			if (line.dataset.split === 'true') return;
			const text = line.textContent || '';
			line.setAttribute('aria-label', text);
			const html = Array.from(text)
				.map(ch => {
					if (ch === ' ')
						return '<span class="char char-space">&nbsp;</span>';
					return `<span class="char">${ch}</span>`;
				})
				.join('');
			line.innerHTML = html;
			line.dataset.split = 'true';
		});

		// Split description paragraphs by words
		const descs = document.querySelectorAll('.text-description-wrapper p');
		descs.forEach(p => {
			if (p.dataset.split === 'true') return;
			const text = p.textContent || '';
			p.setAttribute('aria-label', text);
			const words = text.split(/(\s+)/);
			const html = words
				.map(word => {
					if (/^\s+$/.test(word)) {
						const spaces = Array(word.length)
							.fill('&nbsp;')
							.join('');
						return `<span class="char char-space">${spaces}</span>`;
					}
					return `<span class="char">${word}</span>`;
				})
				.join('');
			p.innerHTML = html;
			p.dataset.split = 'true';
		});
	}, [themes]);

	// Animate active theme heading and description
	useEffect(() => {
		if (!isLoaded || isUnder1024) return;

		try {
			const charSelector = `.kv__heading--${activeTheme} .main-heading__line .char`;
			const chars = document.querySelectorAll(charSelector);
			if (chars && chars.length) {
				gsap.killTweensOf(chars);
				gsap.fromTo(
					Array.from(chars),
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.02,
						duration: 0.45,
						ease: 'power2.out',
					},
				);
			}

			const descCharSelector = `.text-description--${activeTheme} .char`;
			const descChars = document.querySelectorAll(descCharSelector);
			if (descChars && descChars.length) {
				gsap.killTweensOf(descChars);
				gsap.fromTo(
					Array.from(descChars),
					{ y: 12, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.01,
						duration: 0.45,
						ease: 'power2.out',
					},
				);
			}
		} catch (e) {
			// noop
		}
	}, [activeTheme, isLoaded, isUnder1024]);

	const handleVideoLoad = () => {
		// Video loaded callback
	};

	const handleVideoError = () => {
		// Video error callback
	};

	return (
		<>
			<HeroContainer ref={heroRef}>
				<OnScrollButton
					hash="#art_of_escap"
					position={{
						desktop: 'bottom: 0; left: 140px;',
						tablet: 'bottom: 0; left: 40px;',
						mobile: 'bottom: 0; right: 24px; left: unset;',
					}}
				/>

				{/* Sound Control Button */}
				<SoundButton
					onClick={handleSoundToggle}
					aria-label={isMuted ? 'Unmute' : 'Mute'}>
					{isMuted ? (
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M3.63 3.63a.996.996 0 000 1.414L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.54-.77 2.17-1.33l1.58 1.58a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7z" />
						</svg>
					) : (
						<svg viewBox="0 0 24 24" fill="currentColor">
							<path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
						</svg>
					)}
				</SoundButton>

				{/* Background Videos */}
				{Object.entries(themes).map(([theme, data]) => (
					<BackgroundVideo
						key={theme}
						ref={el => (videoRefs.current[theme] = el)}
						src={data.video}
						autoPlay={autoPlay && theme === 'awaken'}
						loop={false} // Disable loop to enable auto-progression
						playsInline
						isActive={activeTheme === theme}
						theme={theme}
						onLoadedData={handleVideoLoad}
						onError={handleVideoError}
					/>
				))}

				{/* Main Content */}
				<HeroContent
					themes={themes}
					activeTheme={activeTheme}
					isLoaded={isLoaded}
					isUnder1024={isUnder1024}
					handleThemeChange={handleThemeChange}
					handleAreaHover={handleAreaHover}
					handleAreaLeave={handleAreaLeave}
				/>

				{/* Interactive Areas */}
				<InteractiveAreasStyled
					themes={themes}
					isLoaded={isLoaded}
					handleThemeChange={handleThemeChange}
					handleAreaHover={handleAreaHover}
					handleAreaLeave={handleAreaLeave}
				/>
			</HeroContainer>
		</>
	);
};

export default HeroBanner;
