import { useRef } from 'react';

import useNavigationHover from '@/src/hooks/useNavigationHover';

/**
 * NavigationButton
 * Props:
 *  - id: element id
 *  - className: class(es) to apply
 *  - hoverColor: stroke color on hover
 *  - initialPathColor: color to set on leave if original not present
 *  - onClick: click handler
 *  - ariaLabel
 *  - children: inner content (usually an SVG)
 */
const NavigationButton = ({
	id,
	className,
	hoverColor = '#FFFFFF',
	initialPathColor = null,
	onClick,
	ariaLabel,
	children,
}) => {
	const ref = useRef(null);

	// use the hook with the ref for robust targeting
	useNavigationHover({ ref, id, className, hoverColor, initialPathColor });

	return (
		<li
			id={id}
			className={className}
			ref={ref}
			onClick={onClick}
			role="button"
			aria-label={ariaLabel}>
			{children}
		</li>
	);
};

export default NavigationButton;
