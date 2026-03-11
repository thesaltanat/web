import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { gsap } from 'gsap';
import theme from '../../styles/theme';

const mixins = {
	tablet: '@media (max-width: 1023px)',
	mobile: '@media (max-width: 767px)',
	smallMobile: '@media (max-width: 480px)',
	flexCenter: css`
		display: flex;
		align-items: center;
		justify-content: center;
	`,
	absoluteCenter: css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	`,
	themeButton: css`
		position: absolute;
		color: #fff;
		font-size: 0.8889rem;
		line-height: 1;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		transition: ${theme.animations.transition.default};
		padding: 1rem;
		cursor: pointer;
		&:hover {
			opacity: 0.8;
		}
	`,
};

const ContentWrapper = styled.div`
	position: relative;
	${mixins.flexCenter}
	height: calc(var(--vh, 1vh) * 100);
	overflow: hidden;
	width: 100%;
	z-index: 6;

	.circle-background {
		height: 50vh;
		width: 50vh;
		border: 1px solid white;
		border-radius: 50%;
		//overflow: hidden;
		position: absolute;
		left: 50%;
		right: 0;
		top: 50%;
		margin: auto;
		transform: translate(-50%, -50%);

		.button-circle {
			z-index: 1;
			position: absolute;
			cursor: pointer;
			height: 130px;
			width: 130px;
			border-radius: 50%;
			background: transparent;
			display: flex;
			align-items: center;
			justify-content: center;
			border: none;

			span {
				position: absolute;
				inset: 0;
				border-radius: 50%;
				margin: auto;
				pointer-events: none; /* so it doesn't block clicks */
				background: conic-gradient(
					from 0deg,
					${theme.colors.theme.primary.base},
					${theme.colors.theme.primary.base},
					${theme.colors.theme.colorThree.base}
				);
				mask: radial-gradient(
					farthest-side,
					transparent calc(100% - 2px),
					black 100%
				);
				-webkit-mask: radial-gradient(
					farthest-side,
					transparent calc(100% - 2px),
					black 100%
				);
				animation: rotateBorder 3s linear infinite;
				width: 16px;
				height: 16px;
				transition: ${theme.animations.transition.default};
				opacity: 0;
			}

			@keyframes rotateBorder {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);
				}
			}

			&:before {
				position: absolute;
				content: '';
				height: 16px;
				width: 16px;
				background: white;
				border: none;
				border-radius: 50%;
				transition: ${theme.animations.transition.default};
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				margin: auto;
				pointer-events: none; /* so it doesn't block clicks */
			}

			&:after {
				content: attr(data-text);
				height: 130px;
				width: 130px;
				position: absolute;
				text-align: center;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				font-weight: 500;
				font-style: normal; /* "medium" corresponds to weight 500 */
				font-size: 0.8889rem; /* 16px / 18px */
				line-height: 1; /* 100% = 1 */
				letter-spacing: 0.16em; /* 16% = 0.16em */
				text-transform: uppercase;
				color: #ffffff;
				background: rgba(255, 255, 255, 0); /* #FFFFFF 5% opacity */
				transition: ${theme.animations.transition.default};
				z-index: 3;
				opacity: 0;
				@media (max-width: 767px) {
					font-size: 0.5rem;
				}
			}

			&:hover {
				&:after {
					opacity: 1;
				}

				span {
					opacity: 1;
					height: 130px;
					width: 130px;
				}

				&:before {
					height: 130px;
					width: 130px;
					background: rgba(
						255,
						255,
						255,
						0.05
					); /* #FFFFFF 5% opacity */
					backdrop-filter: blur(
						10px
					); /* optional - for "behind transparent areas: true" */

					@media (max-width: 767px) {
						height: 100px;
						width: 100px;
					}
				}
			}

			&.is-active {
				&:after {
					opacity: 1;
				}

				span {
					opacity: 1;
					height: 130px;
					width: 130px;
				}

				&:before {
					height: 130px;
					width: 130px;
					background: rgba(
						255,
						255,
						255,
						0.05
					); /* #FFFFFF 5% opacity */
					backdrop-filter: blur(
						10px
					); /* optional - for "behind transparent areas: true" */
				}
			}

			&:nth-of-type(1) {
				position: absolute;
				left: 50%;
				top: -65px;
				transform: translateX(-50%);
				@media (max-width: 767px) {
					top: -50px;
				}
			}

			&:nth-of-type(2) {
				position: absolute;
				left: -65px;
				top: 50%;
				transform: translateY(-50%);
				@media (max-width: 767px) {
					left: -50px;
				}
				//position: absolute;
				//right: -65px;
				//top: 50%;
				//transform: translateY(-50%);
				//@media (max-width: 767px) {
				//	right: -50px;
				//}
			}

			&:nth-of-type(3) {
				position: absolute;
				left: 50%;
				bottom: -65px;
				transform: translateX(-50%);
				@media (max-width: 767px) {
					bottom: -50px;
				}
			}

			&:nth-of-type(4) {
				position: absolute;
				left: -65px;
				top: 50%;
				transform: translateY(-50%);
				@media (max-width: 767px) {
					left: -50px;
				}
			}
		}

		.kv {
			pointer-events: none;

			&__btn {
				${mixins.themeButton}
				transition: 0 all ease !important;
				opacity: 0;
				text-align: center;

				&--awaken {
					top: -80px;
					left: 50%;
					transform: translateX(-50%);
				}

				&--play {
					top: 50%;
					right: -120px;
					transform: rotate(90deg);
					transform-origin: top center;
				}

				&--indulge {
					bottom: -80px;
					left: 50%;
					transform: translateX(-50%);
				}

				&--revel {
					top: 50%;
					left: -120px;
					transform: rotate(-90deg);
					transform-origin: top center;
				}
			}
		}
	}

	// Key Visual Styles

	.kv {
		position: relative;
		width: 50vh;

		&__logo {
			position: relative;
			height: 70.7vh;
		}

		// Theme buttons

		&__btn {
			${mixins.themeButton}
			opacity: 0;
			pointer-events: none;
			transition: ${theme.animations.transition.default};

			&.is-active {
				opacity: 0 !important;
			}

			&:nth-of-type(1) {
				top: 20px;
				left: 50%;
				transform: translateX(-50%);
			}

			&:nth-of-type(2) {
				top: 50%;
				left: -100px;
				transform: rotate(-90deg) translateY(-50%);
				transform-origin: top center;
				//top: 50%;
				//right: -100px;
				//transform: rotate(90deg) translateY(-50%);
				//transform-origin: top center;
			}

			&:nth-of-type(3) {
				bottom: 20px;
				left: 50%;
				transform: translateX(-50%);
			}

			&:nth-of-type(4) {
				top: 50%;
				left: -100px;
				transform: rotate(-90deg) translateY(-50%);
				transform-origin: top center;
			}
		}

		// Headings

		&__heading {
			width: calc(100% - 100px);
			${mixins.absoluteCenter}
			opacity: 0;
			transition: ${theme.animations.transition.default};
			will-change: transform, opacity;
			${theme.typography.styles.h2.desktop}
			color: ${theme.colors.white.base};
			text-transform: uppercase;
			pointer-events: none;
			z-index: -1;

			.main-heading__line {
				display: inline-flex;
			}

			.main-heading__line--1 {
				padding-left: 7rem;
				@media (max-width: 767px) {
					padding-left: 0;
				}
			}

			.main-heading__line--2 {
				padding-right: 5rem;
				@media (max-width: 767px) {
					padding-right: 0;
				}
			}

			.main-heading__line--3 {
				padding-left: 7rem;
				@media (max-width: 767px) {
					padding-left: 0;
				}
			}

			${mixins.tablet} {
				text-align: center;
			}

			&.is-in-viewport {
				opacity: 1;
				transition: ${theme.animations.transition.default};
			}

			/* Make individual characters animatable for GSAP split-style animation */

			.main-heading__line .char,
			.text-description-wrapper .char {
				display: inline-block;
				vertical-align: middle;
				will-change: transform, opacity;
				opacity: 0; /* default hidden until animated */
			}

			@media (max-width: 1024px) {
				${theme.typography.styles.h2.tab}
			}
			@media (max-width: 767px) {
				${theme.typography.styles.h2.mobile}
			}
			@media (max-width: 450px) {
				${theme.typography.styles.h2.mobile}
				font-size: 2.3rem;
			}
		}

		// Interactive areas

		&__areas {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: 50%;
			overflow: hidden;
			pointer-events: none;
		}

		&__area {
			position: absolute;
			z-index: 5;
			opacity: 0.3;
			background: transparent;
			border: none;
			cursor: pointer;

			&--awaken,
			&--indulge {
				height: 50%;
				width: 100%;
				left: 0;
			}

			&--play,
			&--revel {
				height: 100%;
				width: 50%;
				top: 0;
			}

			&--awaken {
				top: 0;
				clip-path: polygon(50% 100%, 100% 0, 0 0);
				border-top-left-radius: 50%;
				border-top-right-radius: 50%;
			}

			&--play {
				right: 0;
				clip-path: polygon(0 50%, 100% 100%, 100% 0);
				border-bottom-right-radius: 50%;
				border-top-right-radius: 50%;
			}

			&--indulge {
				bottom: 0;
				clip-path: polygon(50% 0, 0 100%, 100% 100%);
				border-bottom-left-radius: 50%;
				border-bottom-right-radius: 50%;
			}

			&--revel {
				left: 0;
				clip-path: polygon(100% 50%, 0 0, 0 100%);
				border-top-left-radius: 50%;
				border-bottom-left-radius: 50%;
			}
		}

		@media (max-width: 767px) {
			width: 25vh;
			&__logo {
				height: 50vh;
			}

			.circle-background {
				height: 30vh;
				width: 30vh;

				.button-circle {
					height: 100px;
					width: 100px;

					&:after {
						height: 100px;
						width: 100px;
					}

					span {
						height: 100px;
						width: 100px;
					}

					&.is-active {
						&:before {
							height: 100px;
							width: 100px;
						}
					}
				}
			}
		}
	}

	.text-description-wrapper {
		position: absolute;
		bottom: 50px;
		width: 25rem;
		right: 20rem;
		height: 4rem;
		overflow: visible; /* Allow characters to animate beyond fixed height */

		p {
			color: #fff;
			font-size: 18px;
			font-style: normal;
			font-weight: 400;
			line-height: 120%; /* 21.6px */
			letter-spacing: -0.36px;
			opacity: 0;
			visibility: hidden;
			transition: ${theme.animations.transition.default};
			height: auto;
			width: 100%;
			position: absolute;
			word-break: break-word; /* Handle word wrapping correctly */
			white-space: normal; /* Allow text to wrap naturally */

			span {
				display: inline-block;
				vertical-align: middle;
			}

			&.is-active {
				visibility: visible;
				opacity: 1 !important;
			}
		}

		@media (max-width: 1024px) {
			right: 10rem;
		}
		@media (max-width: 767px) {
			width: calc(100% - 100px) !important;
			left: 0 !important;
			right: 0 !important;
		}
	}
`;

// This component encapsulates the SVG logo, theme buttons, headings, and description logic for the hero banner.
// All design and event handlers are passed via props for full reusability.
const HeroContent = ({
	themes,
	activeTheme,
	isLoaded,
	isUnder1024,
	handleThemeChange,
	handleAreaHover,
	handleAreaLeave,
}) => {
	// Split text into character spans for GSAP animation
	useEffect(() => {
		if (typeof window === 'undefined') return;
		// Heading lines
		const lines = document.querySelectorAll('.main-heading__line');
		lines.forEach(line => {
			if (line.dataset.split === 'true') return;
			const text = line.textContent || '';
			line.setAttribute('aria-label', text);
			const html = Array.from(text)
				.map(ch =>
					ch === ' '
						? '<span class="char char-space">&nbsp;</span>'
						: `<span class="char">${ch}</span>`,
				)
				.join('');
			line.innerHTML = html;
			line.dataset.split = 'true';
		});
		// Description paragraphs
		const descs = document.querySelectorAll('.text-description-wrapper p');
		descs.forEach(p => {
			if (p.dataset.split === 'true') return;
			const text = p.textContent || '';
			p.setAttribute('aria-label', text);
			const words = text.split(/(\s+)/);
			const html = words
				.map(word =>
					/^\s+$/.test(word)
						? `<span class="char char-space">${Array(word.length).fill('&nbsp;').join('')}</span>`
						: `<span class="char">${word}</span>`,
				)
				.join('');
			p.innerHTML = html;
			p.dataset.split = 'true';
		});
	}, [themes]);

	// Animate heading and description chars on activeTheme change
	useEffect(() => {
		if (!isLoaded || isUnder1024) return;
		try {
			const charSelector = `.kv__heading--${activeTheme} .main-heading__line .char`;
			const chars = document.querySelectorAll(charSelector);
			if (chars && chars.length) {
				gsap.killTweensOf(chars);
				gsap.fromTo(
					Array.from(chars),
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.02,
						duration: 0.45,
						ease: 'power2.out',
					},
				);
			}
			const descCharSelector = `.text-description--${activeTheme} .char`;
			const descChars = document.querySelectorAll(descCharSelector);
			if (descChars && descChars.length) {
				gsap.killTweensOf(descChars);
				gsap.fromTo(
					Array.from(descChars),
					{ y: 12, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.01,
						duration: 0.45,
						ease: 'power2.out',
					},
				);
			}
		} catch (e) {}
	}, [activeTheme, isLoaded, isUnder1024]);

	return (
		<ContentWrapper className="hero-content">
			<div className="intro__kv kv">
				<div className="kv__logo">
					<span
						style={{ display: 'none' }}
						className="kv__logo-circle">
						{/* SVG and circles, unchanged, for brevity you can copy from the original */}
					</span>
					<div className="circle-background">
						{Object.keys(themes).map(theme => (
							<button
								data-text={themes[theme].mainTitle}
								key={`area-${theme}`}
								className={`kv__areaa--${theme} button-circle ${activeTheme === theme ? 'is-active' : ''}`}
								onClick={() => handleThemeChange(theme)}
								onMouseEnter={() => handleAreaHover(theme)}
								onMouseLeave={() => handleAreaLeave(theme)}
								onTouchStart={() => handleAreaHover(theme)}
								onTouchEnd={() => handleAreaLeave(theme)}
								aria-label={`Switch to ${theme} theme`}
								disabled={!isLoaded}>
								<span></span>
							</button>
						))}
					</div>
					{Object.entries(themes).map(([theme, data]) => (
						<h2
							key={`heading-${theme}`}
							className={`kv__heading kv__heading--${theme} main-heading ${activeTheme === theme ? 'is-in-viewport' : ''}`}>
							{data.title.map((line, idx) => (
								<div
									key={`${theme}-line-${idx}`}
									className={`main-heading__line main-heading__line--${idx + 1}`}
									data-charming-text="">
									{line}
								</div>
							))}
						</h2>
					))}
				</div>
				{Object.keys(themes).map(theme => (
					<span
						key={`btn-${theme}`}
						className={`kv__btn kv__btn--${theme} ${activeTheme === theme ? 'is-active' : ''}`}
						style={{ opacity: 1 }}
						role="button"
						tabIndex={0}
						onClick={() => handleThemeChange(theme)}
						onKeyDown={e =>
							(e.key === 'Enter' || e.key === ' ') &&
							handleThemeChange(theme)
						}
						onTouchStart={() => handleAreaHover(theme)}
						onTouchEnd={() => handleAreaLeave(theme)}
						onMouseEnter={() => handleAreaHover(theme)}
						onMouseLeave={() => handleAreaLeave(theme)}>
						{themes[theme].mainTitle}
					</span>
				))}
				<div className="kv__areas">
					{Object.keys(themes).map(theme => (
						<button
							key={`area-${theme}`}
							className={`kv__area kv__area--${theme}`}
							onClick={() => handleThemeChange(theme)}
							onMouseEnter={() => handleAreaHover(theme)}
							onMouseLeave={() => handleAreaLeave(theme)}
							onTouchStart={() => handleAreaHover(theme)}
							onTouchEnd={() => handleAreaLeave(theme)}
							aria-label={`Switch to ${theme} theme`}
							disabled={!isLoaded}
						/>
					))}
				</div>
			</div>
			<div className="text-description-wrapper">
				{Object.keys(themes).map(theme => (
					<p
						data-charming-text=""
						key={`text-${theme}`}
						className={`text-description--${theme} ${activeTheme === theme ? 'is-active' : ''}`}>
						{themes[theme].description}
					</p>
				))}
			</div>
		</ContentWrapper>
	);
};

export default HeroContent;
