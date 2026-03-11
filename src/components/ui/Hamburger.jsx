// components/ui/Hamburger.jsx
'use client';

import { useRef } from 'react';

import { gsap } from 'gsap';
import styled from 'styled-components';

const Wrapper = styled.button`
	background: transparent;
	border: none;
	padding: 0;
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	color: ${props =>
		props.lineColor ||
		'#FFFFFF'}; /* controls svg stroke via currentColor */
	transition: color 180ms ease-in-out;

	&:hover,
	&:focus {
		color: ${props => props.hoverColor || props.lineColor || '#FFFFFF'};
		outline: none;
	}

	svg {
		display: block;
	}
`;

const Hamburger = ({
	onClick,
	lineColor = '#FFFFFF',
	hoverColor,
	className,
	ariaLabel = 'Menu',
	// target coords for hover (defaults to the provided top coords)
	hoverTarget = { x1: '50', y1: '10.5', x2: '10', y2: '10.5' },
	duration = 0.18,
	...rest
}) => {
	const middleRef = useRef(null);
	const tweenRef = useRef(null);

	const original = { x1: '40', y1: '10.5', x2: '0', y2: '10.5' };

	const animateTo = target => {
		if (!middleRef.current) return;
		if (tweenRef.current) tweenRef.current.kill();
		tweenRef.current = gsap.to(middleRef.current, {
			duration,
			attr: {
				x1: target.x1,
				y1: target.y1,
				x2: target.x2,
				y2: target.y2,
			},
			ease: 'power1.out',
		});
	};

	const handleMouseEnter = () => animateTo(hoverTarget);
	const handleMouseLeave = () => animateTo(original);

	const handleKeyDown = e => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClick && onClick(e);
		}
	};

	return (
		<Wrapper
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleMouseEnter}
			onBlur={handleMouseLeave}
			onKeyDown={handleKeyDown}
			lineColor={lineColor}
			hoverColor={hoverColor}
			aria-label={ariaLabel}
			role="button"
			tabIndex={0}
			className={className}
			{...rest}>
			<svg
				width="50"
				height="21"
				viewBox="0 0 50 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				focusable="false">
				<line
					x1="50"
					y1="0.500008"
					x2="10"
					y2="0.500004"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
				<line
					ref={middleRef}
					className="middle"
					x1={original.x1}
					y1={original.y1}
					x2={original.x2}
					y2={original.y2}
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
				<line
					x1="50"
					y1="20.5"
					x2="10"
					y2="20.5"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>
		</Wrapper>
	);
};

export default Hamburger;
