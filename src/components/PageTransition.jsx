'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import Preloader from './Preloader';
import { Suspense } from 'react';

const PageTransitionWrapper = styled.div`
	position: relative;
	width: 100%;
`;

const Curtain = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: calc(var(--vh, 1vh) * 100);
	background-color: #EEECE8; /* Using theme base color */
	z-index: 9999;
	pointer-events: none;
`;

const ContentWrapper = styled(motion.div)`
	width: 100%;
	position: relative;
`;

/**
 * Page transition component that creates a seamless curtain effect
 */
export default function PageTransition({ children }) {
	const pathname = usePathname();

	// Check if device is mobile
	const isMobileDevice = () => {
		if (typeof window === 'undefined') return false;
		return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	};

	const isMobile = isMobileDevice();

	// Use instant transition on mobile, smooth on desktop
	const curtainConfig = isMobile ? {
		initial: { y: 0 },
		animate: { y: 0, transition: { duration: 0 } },
		exit: { y: 0, transition: { duration: 0 } }
	} : {
		initial: { y: '100%' },
		animate: {
			y: '-100%',
			transition: {
				duration: 0.8,
				ease: [0.76, 0, 0.24, 1],
				delay: 0.2
			}
		},
		exit: {
			y: '0%',
			transition: {
				duration: 0.5,
				ease: [0.76, 0, 0.24, 1]
			}
		}
	};

	const contentConfig = isMobile ? {
		initial: { opacity: 1 },
		animate: { opacity: 1, transition: { duration: 0 } },
		exit: { opacity: 1, transition: { duration: 0 } }
	} : {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: { delay: 0.6, duration: 0.4 }
		},
		exit: {
			opacity: 0,
			transition: { duration: 0.4 }
		}
	};

	return (
		<PageTransitionWrapper>
			<AnimatePresence mode="wait">
				<div key={pathname}>
					<Curtain {...curtainConfig} />
					<Suspense fallback={<Preloader />}>
						<ContentWrapper {...contentConfig}>
							{children}
						</ContentWrapper>
					</Suspense>
				</div>
			</AnimatePresence>
		</PageTransitionWrapper>
	);
}
