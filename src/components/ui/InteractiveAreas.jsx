import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import theme from '../../styles/theme';

const pulseGlow = keyframes`
	0%, 100% {
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
	}
	50% {
		box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
	}
`;

const getInteractiveAreaPosition = themeKey => {
	const positions = {
		awaken: {
			top: '15%',
			left: '50%',
			transform: 'translateX(-50%)',
		},
		play: {
			top: '50%',
			right: '15%',
			transform: 'translateY(-50%)',
		},
		indulge: {
			bottom: '15%',
			left: '50%',
			transform: 'translateX(-50%)',
		},
		revel: {
			top: '50%',
			left: '15%',
			transform: 'translateY(-50%)',
		},
	};
	const pos = positions[themeKey];
	return css`
		top: ${pos?.top || 'auto'};
		right: ${pos?.right || 'auto'};
		bottom: ${pos?.bottom || 'auto'};
		left: ${pos?.left || 'auto'};
		transform: ${pos?.transform};
		width: 140px;
		height: 140px;
	`;
};

const StyledInteractiveAreas = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 3;
	pointer-events: none;
`;

const StyledInteractiveArea = styled.button`
	position: absolute;
	background: transparent;
	border: 2px solid transparent;
	cursor: pointer;
	opacity: 0;
	transition: ${theme.animations.transition.default};
	border-radius: 50%;
	pointer-events: auto;
	backdrop-filter: blur(5px);

	&:hover {
		opacity: 0.3;
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.3);
		animation: ${pulseGlow} 2s ease-in-out infinite;
	}

	&:focus {
		outline: none;
		opacity: 0.4;
		border-color: rgba(255, 255, 255, 0.5);
	}

	${props => getInteractiveAreaPosition(props.$theme)}
`;

const InteractiveAreas = ({
	themes,
	isLoaded,
	handleThemeChange,
	handleAreaHover,
	handleAreaLeave,
}) => (
	<StyledInteractiveAreas>
		{Object.keys(themes).map(theme => (
			<StyledInteractiveArea
				key={theme}
				$theme={theme}
				onClick={() => handleThemeChange(theme)}
				onMouseEnter={() => handleAreaHover(theme)}
				onMouseLeave={() => handleAreaLeave(theme)}
				aria-label={`Switch to ${theme} theme`}
				disabled={!isLoaded}
			/>
		))}
	</StyledInteractiveAreas>
);

export default InteractiveAreas;
