'use client';

import { usePathname } from 'next/navigation';
import {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollDirection } from '@/src/hooks/useScrollDirection';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import useDeviceTypeMobile from '@/src/hooks/useDeviceTypeMobile';
import theme from '@/src/styles/theme';
import ThemeLayout from '@/src/components/ui/themeLayout';
import MainHeader from '@/src/components/header/MainHeader';
import MenuOverlay from '@/src/components/header/MenuOverlay';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeaderContainer = styled.header`
	${theme.components.header.base}
	${theme.grid.media.tablet} {
		padding: ${theme.numericScale.spacing['20px']}
			${theme.numericScale.spacing[0]};
	}
	backdrop-filter: blur(10px);
	background: #0000000d;
	contain: layout style paint;
	will-change: auto;
	${theme.grid.media.tablet} {
		min-height: ${theme.numericScale.height.unset};
		height: 80px;
		overflow: hidden;
		padding: 10px 0;
	}

	&.menu-open {
		transform: none !important;
		background: ${theme.colors.transparent} !important;
	}

	&.color {
		.menu-text {
			color: ${theme.colors.white.base} !important;
		}

		.menu-lines span {
			background: ${theme.colors.white.base} !important;
		}

		.dc-btn {
			color: ${theme.colors.white.base} !important;

			span {
				color: ${theme.colors.white.base} !important;
			}
		}
	}
	@media (max-width: 992px) {
		.desktop-mobile {
		}
	}
	@media (max-width: 767px) {
		.desktop-mobile {
			display: none;
		}
	}
`;

const Header = () => {
	const headerRef = useRef(null);
	const location = usePathname();
	const showSetting = useShowSetting();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isMobile = useDeviceTypeMobile();
	const scrollPositionRef = useRef(0);
	const scrollTimeoutRef = useRef(null);

	// Memoized data extraction
	const globalData = useMemo(
		() => showSetting?.getSettings?.data?.global_settings_data || null,
		[showSetting],
	);

	const mainMenuData = useMemo(
		() => showSetting?.getSettings?.data?.menus?.[1] || null,
		[showSetting],
	);

	const mainLogo = useMemo(() => {
		const raw = globalData?.logo_light;
		if (!raw) return null;
		try {
			return JSON.parse(raw);
		} catch (err) {
			console.warn('Failed to parse logo_light JSON:', err);
			return null;
		}
	}, [globalData?.logo_light]);

	const socialMedia = useMemo(() => {
		try {
			return globalData?.social_media_links
				? JSON.parse(globalData.social_media_links)
				: null;
		} catch {
			return null;
		}
	}, [globalData?.social_media_links]);

	const filteredMenuData = useMemo(() => {
		const filtered =
			mainMenuData?.filter(
				menuItem => menuItem?.item_url && menuItem?.item_title,
			) || [];
		return filtered.sort((a, b) => {
			const orderA = a?.sort_order || 0;
			const orderB = b?.sort_order || 0;
			return orderA - orderB;
		});
	}, [mainMenuData]);

	// Scroll lock/unlock functions
	const lockScroll = useCallback(() => {
		const scrollY = window.pageYOffset;
		scrollPositionRef.current = scrollY;

		requestAnimationFrame(() => {
			document.documentElement.style.scrollbarGutter = 'stable';
			document.body.style.overflow = 'hidden';
			window.preventScrollClassChange = true;
		});
	}, []);

	const unlockScroll = useCallback(() => {
		const scrollY = scrollPositionRef.current;

		requestAnimationFrame(() => {
			document.documentElement.style.scrollbarGutter = 'auto';
			document.body.style.overflow = '';
			window.scrollTo(0, scrollY);

			clearTimeout(scrollTimeoutRef.current);
			scrollTimeoutRef.current = setTimeout(() => {
				window.preventScrollClassChange = false;
			}, 50);
		});
	}, []);

	const toggleMenu = useCallback(() => {
		setIsMenuOpen(prev => {
			const newState = !prev;

			if (newState) {
				requestAnimationFrame(() => {
					lockScroll();
				});
			}

			return newState;
		});
	}, [lockScroll]);

	// Header animation on mount
	useEffect(() => {
		const header = headerRef.current;
		if (!header) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				header,
				{ y: 100, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.6,
					ease: 'power2.out',
					delay: 0.2,
				},
			);
		}, headerRef);

		return () => ctx.revert();
	}, []);

	// Close menu on route change
	useEffect(() => {
		setIsMenuOpen(false);
		unlockScroll();
		window.preventScrollClassChange = false;
	}, [location, unlockScroll]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			document.body.style.cssText = '';
			window.preventScrollClassChange = false;
			clearTimeout(scrollTimeoutRef.current);
		};
	}, []);

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (!isMenuOpen) return;

		const handleWheel = e => {
			if (e.target.closest('.menu-items')) {
				return;
			}
			e.preventDefault();
		};
		const handleTouchMove = e => {
			if (e.target.closest('.menu-items')) {
				return;
			}
			e.preventDefault();
		};

		document.addEventListener('wheel', handleWheel, { passive: false });
		document.addEventListener('touchmove', handleTouchMove, {
			passive: false,
		});

		return () => {
			document.removeEventListener('wheel', handleWheel);
			document.removeEventListener('touchmove', handleTouchMove);
		};
	}, [isMenuOpen]);

	// Custom scroll direction hook
	useScrollDirection(
		{
			threshold: 100,
			upClass: 'scroll-up',
			downClass: 'scroll-down',
			mobileBreakpoint: 768,
		},
		[location],
	);

	return (
		<Suspense>
			<HeaderContainer
				ref={headerRef}
				className={`menu-desktop site-header ${isMenuOpen ? 'menu-open' : ''}`}>
				<ThemeLayout
					columns={1}
					colData={[
						<MainHeader
							key="main-header"
							mainLogo={mainLogo}
							isMobile={isMobile}
							location={location}
							isMenuOpen={isMenuOpen}
							toggleMenu={toggleMenu}
						/>,
					]}
				/>
			</HeaderContainer>

			<MenuOverlay
				isMenuOpen={isMenuOpen}
				filteredMenuData={filteredMenuData}
				location={location}
				isMobile={isMobile}
				globalData={globalData}
				socialMedia={socialMedia}
				unlockScroll={unlockScroll}
				toggleMenu={toggleMenu}
			/>
		</Suspense>
	);
};

export default Header;
