// components/ui/Button.jsx

'use client';

import styled, { withTheme } from 'styled-components';

// import { DispatchCursor } from 'haspr-cursor' // removed (not used)
import Link from 'next/link';
import theme from '@/src/styles/theme';

const Button = ({
	text,
	src,
	onClick,
	variant = 'normal',
	theme: themeVariant,
	margin,
	className,
	target,
	rel,
	color,
	borderColor,
	hoverBackground,
	hoverColor,
	background,
	fontSize,
	fontWeight,
	lineHeight,
	letterSpacing,
	height,
	width,
	textHoverColor,
	inLineColor,
	outLineColor,
	inLineHoverColor,
	outLineHoverColor,
	textTransform,
	...rest
}) => {
	const variants = {
		normal: {
			width: width || 'auto',
			height: height  || 'auto',
			padding: '12px 60px 12px 18px',
			background:
				background || theme?.colors.theme.secondary.base || '#21271D',
			color: color || theme?.button?.normal?.color || '#fff',
			fontFamily: theme.typography.fonts.primary,
			fontWeight:
				fontWeight || theme?.typography.fontWeights.regular || 400,
			fontSize:
				fontSize || theme?.typography.fontSizes.bodyM?.desktop || '1.125rem',
			lineHeight: lineHeight || '100%',
			letterSpacing: letterSpacing || '-0.02em',
			textTransform: textTransform || 'none',
		},
		text: {
			background:
				background || theme?.button?.text?.background || '#0A2619',
			color: color || theme?.button?.text?.color || '#fff',
			fontFamily: theme?.button?.text?.fontFamily || 'Faustina',
			fontWeight: fontWeight || theme?.button?.text?.fontWeight || 400,
			fontSize: fontSize || theme?.button?.text?.fontSize || '18px',
			lineHeight: lineHeight || theme?.button?.text?.lineHeight || '120%',
			letterSpacing:
				letterSpacing || theme?.button?.text?.letterSpacing || '-2%',
			borderRadius: theme?.button?.text?.borderRadius || '0',
			width: width || theme?.button?.text?.width || 'fit-content',
			height: height || theme?.button?.text?.height || 'auto',
			border: theme?.button?.text?.border || 'none',
			padding: theme?.button?.text?.padding || '0',
			textTransform: textTransform || 'none',

		},
		circle: {
			width: width || theme?.button?.circle?.width || '158px',
			height: height || theme?.button?.circle?.height || '160px',
			borderRadius: theme?.button?.circle?.borderRadius || '79px',
			background:
				background || theme?.button?.circle?.background || '#402D17',
			color: color || theme?.button?.circle?.color || '#fff',
			fontFamily: theme?.button?.circle?.fontFamily || 'Faustina',
			fontWeight: fontWeight || theme?.button?.circle?.fontWeight || 400,
			fontSize: fontSize || theme?.button?.circle?.fontSize || '16px',
			lineHeight:
				lineHeight || theme?.button?.circle?.lineHeight || '120%',
			letterSpacing:
				letterSpacing || theme?.button?.circle?.letterSpacing || '-2%',
			border:
				borderColor ||
				theme?.button?.circle?.border ||
				'1px solid #402D17',
			padding: theme?.button?.circle?.padding || '70px 20px',
			gap: theme?.button?.circle?.gap || '10px',
			textTransform: textTransform || 'none',

		},
	};

	const style = variants[variant];
	// Cursor Action Dispatcher (not used here but kept for future enhancements)
	// const dispatch = DispatchCursor()
	if (src) {
		return (
			<StyledBtn
				as={Link}
				href={src}
				margin={margin}
				inLineColor={inLineColor}
				outLineColor= {outLineColor}
				inLineHoverColor={inLineHoverColor}
				outLineHoverColor={outLineHoverColor}
				className={`dc-btn ${className || ''} ${variant}`}
				style={style}
				textHoverColor={textHoverColor}
				hoverBackground={hoverBackground}
				hoverColor={hoverColor}
				variant={variant}
				textTransform={textTransform}
				target={target}
				rel={rel}
				{...rest}>
				<span id="imMagnetic2" data-magnetism>
					{text}
				</span>
			</StyledBtn>
		);
	}

	return (
		<StyledBtn
			type="button"
			className={`dc-btn ${className || ''} ${variant}`}
			style={style}
			inLineColor={inLineColor}
			outLineColor= {outLineColor}
			inLineHoverColor={inLineHoverColor}
			outLineHoverColor={outLineHoverColor}
			hoverBackground={hoverBackground}
			hoverColor={hoverColor}
			textHoverColor={textHoverColor}
			variant={variant}
			textTransform={textTransform}
			onClick={onClick}
			{...rest}>
			<span id="imMagnetic2" data-magnetism>
				{text}
			</span>
		</StyledBtn>
	);
};

const StyledBtn = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border: ${({ style }) => style?.border || 'none'};
	border-radius: ${({ style }) => style?.borderRadius || '0'};
	background: ${({ style }) =>
		style?.background || theme.colors.theme.secondary.base};
	color: ${({ style }) => style?.color || '#131D0D'};
	width: ${({ style }) => style?.width || 'auto'};
	height: ${({ style }) => style?.height || 'auto'};
	padding: ${({ style }) => style?.padding || '8px 20px'};
	gap: ${({ style }) => style?.gap || '0'};
	font-family: ${({ style }) =>
		style?.fontFamily || theme.typography.fonts.primary};
	font-weight: ${({ style }) => style?.fontWeight || 400};
	font-size: ${({ style }) => style?.fontSize || '1rem'};
	line-height: ${({ style }) => style?.lineHeight || '100%'};
	letter-spacing: ${({ style }) => style?.letterSpacing || '-0.02em'};
	box-sizing: border-box;
	text-decoration: none;
	position: relative;
	margin: ${props => props.margin || '0'};
	transition: ${theme.animations.transition.default};
	text-transform: ${({ style }) => style?.textTransform || 'none'};

	&.text {
		background: ${({ style }) => style?.background || '#FAF8F2'};
		border: none;
		padding: ${({ style }) => style?.padding || '0'};
		width: ${({ style }) => style?.width || 'auto'};
		height: ${({ style }) => style?.height || 'auto'};
		text-transform: ${({ style }) => style?.textTransform || 'none'};

		&:before {
			border-radius: ${({ style }) => style?.borderRadius || '0'};
		}
	}

	&.circle {
		border: ${({ style }) => style?.border || '1px solid #00000000'};
		border-radius: ${({ style }) => style?.borderRadius || '0'};
		padding: ${({ style }) => style?.padding || '0'};
		width: ${({ style }) => style?.width || 'auto'};
		height: ${({ style }) => style?.height || 'auto'};
		gap: ${({ style }) => style?.gap || '0'};
		text-transform: ${({ style }) => style?.textTransform || 'none'};

		&:before {
			display: none !important;
		}
		&:after {
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
			border-radius: 50%;
			content: '';
			opacity: 1;
			background: transparent;
			transition: ${theme.animations.transition.default};
			background: ${props =>
				props.hoverBackground || theme.colors.theme.secondary.base};
			pointer-events: none;
			transform: scale(0);
		}

		&:hover {
			background: transparent !important;
			color: ${props =>
				props.textHoverColor || theme.colors.theme.secondary.base};
			&:after {
				transform: scale(1);
			}
			&:before {
				background: ${props =>
					props.inLineHoverColor ||
					theme.colors.theme.secondary.base};
			}
			span {
				color: ${props =>
					props.textHoverColor || theme.colors.theme.secondary.base};
			}
		}
	}

	&:before {
		content: '';
		position: absolute;
		top: 50%;
		right: 0;
		width: 45px;
		height: 1px;
		background: transparent;
		transition: ${theme.animations.transition.default};
		background: ${props =>
			props.inLineColor || theme.colors.theme.primary.base};
		pointer-events: none;
	}

	&:after {
		content: '';
		position: absolute;
		top: 50%;
		right: -25px;
		width: 25px;
		height: 1px;
		background: transparent;
		transition: ${theme.animations.transition.default};
		background: ${props =>
			props.outLineColor || theme.colors.theme.secondary.base};
		pointer-events: none;
	}

	span {
		position: relative;
		z-index: 1;
		color: ${({ style }) => style?.color || '#131D0D'};
		font-style: normal;
		transition: ${theme.animations.transition.default};
	}

	&:hover {
		background: ${props =>
			props.hoverBackground ||
			theme.colors.theme.primary.base} !important;
		color: ${props =>
			props.textHoverColor || theme.colors.theme.secondary.base};
		&:after {
			background: ${props =>
				props.outLineHoverColor || theme.colors.theme.primary.base};
		}
		&:before {
			background: ${props =>
				props.inLineHoverColor || theme.colors.theme.secondary.base};
		}
		span {
			color: ${props =>
				props.textHoverColor || theme.colors.theme.secondary.base};
		}
	}
`;

export default withTheme(Button);
