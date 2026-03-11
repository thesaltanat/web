'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * PageTransitionOverlay Component
 *
 * Provides a smooth overlay transition during route changes
 * to prevent the flash of header before content loads.
 *
 * This overlay covers the entire viewport (including header/footer)
 * during navigation, creating a seamless transition experience.
 */
export default function PageTransitionOverlay() {
	const pathname = usePathname();
	const [isVisible, setIsVisible] = useState(false);
	const previousPath = useRef(pathname);

	useEffect(() => {
		// Only trigger transition if the path actually changed
		if (pathname !== previousPath.current) {
			// Show the overlay
			setIsVisible(true);

			// Wait for curtain animation to complete, then hide overlay
			setTimeout(() => {
				setIsVisible(false);
				previousPath.current = pathname;
			}, 800); // Match curtain duration
		}
	}, [pathname]);

	if (!isVisible) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.4 }}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				zIndex: 99999,
				background: '#EEECE8',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				pointerEvents: 'all',
			}}
			aria-hidden={!isVisible}
			role="presentation"
		>
			<div style={{ textAlign: 'center' }}>
				<div
					style={{
						width: 40,
						height: 40,
						border: '3px solid #7B704833',
						borderTopColor: '#7B7048',
						borderRadius: '50%',
						animation: 'spin 0.8s linear infinite',
					}}
				/>
				<span style={{ position: 'absolute', left: '-9999px' }}>Loading...</span>
			</div>
			<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
		</motion.div>
	);
}
