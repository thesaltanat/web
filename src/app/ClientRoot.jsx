'use client';

// CSS imports moved to layout.jsx

import StickyButton from '@/src/components/ui/StickyButton';
import { ShowSettingProvider } from '@/src/store/ShowSettingProvider';
import ErrorBoundary from '@/src/app/ErrorBoundary';
import HasprCursor, { CURSOR_HIDE, CURSOR_SHOW } from 'haspr-cursor';
// ✅ Animation hooks imports
import { useAnimationSystem } from '@/src/animations';
import { useGlobalData } from '@/src/hooks/data/useApiData';
import useViewportHeight from '@/src/hooks/useViewportHeight';
import useOverflowControl from '@/src/hooks/useOverflowControl';
import SmoothScrollAndTop from '@/src/hooks/useSmoothScrollAndTop';
import Footer from '@/src/components/Footer';
import Header from '@/src/components/Header';
import MouseTrailCursor from '@/src/components/cursor/MouseTrailCursor';
import CustomContextMenu from '@/src/components/CustomContextMenu';
import useDeviceTypeMobile from '@/src/hooks/useDeviceTypeMobile';
import useScrollReset from '@/src/hooks/useScrollReset';

// ✅ API imports moved here

export default function ClientRoot({ children }) {
	const { data: globalData } = useGlobalData();
	const isMobile = useDeviceTypeMobile();

	// Immediate scroll reset on route changes (highest priority)
	useScrollReset();
	const { lenis } = useAnimationSystem({
		enabled: true,
		gsap: { enabled: true },
		lenis: {
			enabled: true,
		},
		scrollAnimations: {
			enabled: true,
			enableParallax: true,
			minWidth: 991,
		},
		pageTransitions: {
			enabled: true,
			preventScroll: true,
		},
		parallax: true,
	});

	useViewportHeight();

	// Prevent overflow:hidden on mobile devices
	useOverflowControl(false, { disableOnMobile: true });

	return (
		<>
			<SmoothScrollAndTop />
			<ShowSettingProvider
				initialScrollData={lenis}
				getSettings={globalData}>
				<ErrorBoundary>
					<HasprCursor>
						<Header />
						<div
							id="main-wrapper"
							onMouseEnter={CURSOR_SHOW}
							onMouseLeave={CURSOR_HIDE}>
							<MouseTrailCursor
								desktopMinWidth={1024} // When to enable
								totalLines={60} // Trail length
								easeFactor={0.75} // Smoothness (0-1)
								animationDuration={1000} // GSAP duration
								initialOffset={-15} // Starting position
							/>
							{globalData?.data?.global_settings_data && (
								<StickyButton
									target={'_blank'}
									icon={
										'<svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
										'<circle cx="31" cy="31" r="30" fill="#7B7048"/>\n' +
										'<circle cx="31" cy="31" r="30" fill="#7B7048"/>\n' +
										'<circle cx="31" cy="31" r="30.5" stroke="#EEECE8" stroke-opacity="0.29"/>\n' +
										'<path d="M32.74 45L31 44L35 37H41C41.5304 37 42.0391 36.7893 42.4142 36.4142C42.7893 36.0391 43 35.5304 43 35V23C43 22.4696 42.7893 21.9609 42.4142 21.5858C42.0391 21.2107 41.5304 21 41 21H21C20.4696 21 19.9609 21.2107 19.5858 21.5858C19.2107 21.9609 19 22.4696 19 23V35C19 35.5304 19.2107 36.0391 19.5858 36.4142C19.9609 36.7893 20.4696 37 21 37H30V39H21C19.9391 39 18.9217 38.5786 18.1716 37.8284C17.4214 37.0783 17 36.0609 17 35V23C17 21.9391 17.4214 20.9217 18.1716 20.1716C18.9217 19.4214 19.9391 19 21 19H41C42.0609 19 43.0783 19.4214 43.8284 20.1716C44.5786 20.9217 45 21.9391 45 23V35C45 36.0609 44.5786 37.0783 43.8284 37.8284C43.0783 38.5786 42.0609 39 41 39H36.16L32.74 45Z" fill="white"/>\n' +
										'<path d="M23 25H39V27H23V25ZM23 31H33V33H23V31Z" fill="white"/>\n' +
										'</svg>\n'
									}
									href={`https://wa.me/${globalData?.data?.global_settings_data?.whatsapp_number}`}
									top={'unset'}
									right={'90px'}
									bottom={'65px'}
									topTab={'unset'}
									rightTab={'30px'}
									bottomTab={'65px'}
									topMobile={'unset'}
									rightMobile={'20px'}
									bottomMobile={'60px'}
									ariaLabel="Sticky Contact Button"
								/>
							)}
							{!isMobile && (
								<CustomContextMenu
									navigationMenuData={
										globalData?.data?.menus?.[1]
									}
									data={
										globalData?.data?.global_settings_data
									}
								/>
							)}
							<div
								className="min-root"
								style={{ minHeight: '100svh' }}>
								{children}
							</div>
						</div>
						<Footer data={globalData} />
					</HasprCursor>
				</ErrorBoundary>
			</ShowSettingProvider>
		</>
	);
}
