// components/ui/StickyButton.jsx
'use client';

import styled from 'styled-components';

const Sticky = styled.button`
	position: fixed;
	z-index: ${p => p.$zIndex ?? 1000};
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: ${p => p.$size || '62px'};
	height: ${p => p.$size || '62px'};
	padding: 0;
	border: none;
	background: transparent;
	cursor: pointer;
	transition:
		transform 160ms ease,
		box-shadow 160ms ease;
	border-radius: 50%;
	${p => (p.$top ? `top: ${p.$top};` : '')}
	${p => (p.$bottom ? `bottom: ${p.$bottom};` : '')}
	${p => (p.$left ? `left: ${p.$left};` : '')}
	${p => (p.$right ? `right: ${p.$right};` : '')}

	/* Tablet overrides (<=1024px) */
	@media (max-width: 1024px) {
		${p =>
			p.$topTab ? `top: ${p.$topTab};` : p.$top ? `top: ${p.$top};` : ''}
		${p =>
			p.$bottomTab
				? `bottom: ${p.$bottomTab};`
				: p.$bottom
					? `bottom: ${p.$bottom};`
					: ''}
		${p =>
			p.$leftTab
				? `left: ${p.$leftTab};`
				: p.$left
					? `left: ${p.$left};`
					: ''}
		${p =>
			p.$rightTab
				? `right: ${p.$rightTab};`
				: p.$right
					? `right: ${p.$right};`
					: ''}
	}

	/* Mobile overrides (<=767px) */
	@media (max-width: 767px) {
		${p =>
			p.$topMobile
				? `top: ${p.$topMobile};`
				: p.$topTab
					? `top: ${p.$topTab};`
					: p.$top
						? `top: ${p.$top};`
						: ''}
		${p =>
			p.$bottomMobile
				? `bottom: ${p.$bottomMobile};`
				: p.$bottomTab
					? `bottom: ${p.$bottomTab};`
					: p.$bottom
						? `bottom: ${p.$bottom};`
						: ''}
		${p =>
			p.$leftMobile
				? `left: ${p.$leftMobile};`
				: p.$leftTab
					? `left: ${p.$leftTab};`
					: p.$left
						? `left: ${p.$left};`
						: ''}
		${p =>
			p.$rightMobile
				? `right: ${p.$rightMobile};`
				: p.$rightTab
					? `right: ${p.$rightTab};`
					: p.$right
						? `right: ${p.$right};`
						: ''}
	}

	&:hover,
	&:focus {
		transform: translateY(-3px);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
		outline: none;
	}

	.icon {
		display: inline-block;
		width: 100%;
		height: 100%;
		line-height: 0;
	}

	/* If user passed raw SVG as string, ensure it scales */
	.icon svg {
		width: 100%;
		height: 100%;
		display: block;
	}
`;

/**
 * StickyButton
 * Props:
 * - onClick: function
 * - href: optional href to navigate to after onClick (supports tel:, mailto:, http)
 * - target: optional target for navigation (e.g., '_blank')
 * - top/bottom/left/right: CSS values (e.g., '24px' or '2rem')
 * - size: CSS size for square button (default '62px')
 * - icon: React node (preferred) or string containing SVG markup
 * - ariaLabel: accessibility label
 * - zIndex: number
 */
const StickyButton = ({
	onClick,
	href,
	target,
	top,
	bottom = '24px',
	left,
	right = '24px',
	topTab,
	bottomTab,
	leftTab,
	rightTab,
	topMobile,
	bottomMobile,
	leftMobile,
	rightMobile,
	size = '62px',
	icon,
	ariaLabel = 'Sticky action',
	zIndex = 1000,
	className,
	...rest
}) => {
	// normalize numeric props to pixel values
	const norm = v => (typeof v === 'number' ? `${v}px` : v);
	const styledProps = {
		$top: norm(top),
		$bottom: norm(bottom),
		$left: norm(left),
		$right: norm(right),
		$topTab: norm(topTab),
		$bottomTab: norm(bottomTab),
		$leftTab: norm(leftTab),
		$rightTab: norm(rightTab),
		$topMobile: norm(topMobile),
		$bottomMobile: norm(bottomMobile),
		$leftMobile: norm(leftMobile),
		$rightMobile: norm(rightMobile),
		$size: norm(size),
		$zIndex: zIndex,
	};
	const isAnchor = !!href;
	const renderIcon = () => {
		if (!icon) return null;
		// If icon is a string, render as HTML (SVG markup). If React node, render directly.
		if (typeof icon === 'string') {
			return (
				<span
					className="icon"
					dangerouslySetInnerHTML={{ __html: icon }}
				/>
			);
		}
		return <span className="icon">{icon}</span>;
	};

	const handleClick = e => {
		// call user-provided handler first
		if (typeof onClick === 'function') {
			try {
				onClick(e);
			} catch (err) {
				// swallow errors from user handler so navigation still works if provided
				// eslint-disable-next-line no-console
				console.error(err);
			}
		}

		// If an href is provided, navigate accordingly
		if (href) {
			if (target === '_blank') {
				window.open(href, target || '_self');
			} else {
				// direct navigation (works for tel: and mailto: too)
				window.location.href = href;
			}
		}
	};

	return (
		<Sticky
			as={isAnchor ? 'a' : 'button'}
			href={isAnchor ? href : undefined}
			target={isAnchor ? target : undefined}
			onClick={handleClick}
			{...styledProps}
			aria-label={ariaLabel}
			className={className}
			{...rest}>
			{renderIcon()}
		</Sticky>
	);
};

export default StickyButton;
