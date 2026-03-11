'use client';

import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';

export const CustomLink = ({
	children,
	href,
	toggleMenu,
	stopPropagation = false,
	className = '',
	...props
}) => {
	const router = useRouter();
	const pathname = usePathname();

	// Validate href and provide fallback
	const validHref = href && typeof href === 'string' ? href : '/';

	const handleClick = e => {
		if (stopPropagation) e.stopPropagation(); // safely stop here
		e.preventDefault();
		if (pathname === validHref) return;

		// Close menu and navigate
		toggleMenu?.();
		setTimeout(() => {
			router.push(validHref); // Navigate after menu close animation
		}, 1250); // Match the menu close animation duration
	};

	return (
		<Link
			href={validHref}
			onNavigate={handleClick}
			className={className}
			prefetch={true}
			{...props}>
			{children}
		</Link>
	);
};
