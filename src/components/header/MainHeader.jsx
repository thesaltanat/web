'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '@/src/styles/theme';
import Button from '@/src/components/ui/Button';
import { DispatchCursor, CURSOR_EXCLUSION } from 'haspr-cursor';

const HeaderContent = styled.div`
	${theme.layout.patterns.flexCenter};
	${theme.layout.patterns.flexBetween};
`;

const LogoWrapper = styled.div`
	width: ${theme.numericScale.width['1/3']};
	${theme.layout.patterns.flexCenter};
	display: ${theme.layout.display.flex};
	align-items: ${theme.layout.flex.align.center};
	justify-content: ${theme.layout.flex.justify.start};
	${theme.grid.media.mobile} {
		width: ${theme.numericScale.width['1/2']};
		align-items: ${theme.layout.flex.align.start};
		justify-content: ${theme.layout.flex.justify.start};
	}
`;

const Logo = styled.div`
	display: ${theme.layout.display.flex};
	align-items: ${theme.layout.flex.align.center};

	img {
		object-fit: ${theme.numericScale.objectFit.contain};
		filter: brightness(${theme.numericScale.brightness['110']});
	}
	${theme.grid.media.down.tab} {
		img {
			height: 45px;
		}
	}
	@media (max-width: 767px) {
		img {
			height: 30px;
		}
	}
`;

const MenuButton = styled.div`
	display: ${theme.layout.display.flex};
	align-items: ${theme.layout.flex.align.center};
	justify-content: ${theme.layout.flex.justify.center};
	gap: ${theme.numericScale.gap['25px']};
	cursor: ${theme.numericScale.cursor.pointer};
	min-height: ${theme.numericScale.minHeight['60px']};
	transition: ${theme.numericScale.transitions.mainTransition};

	.close-icon-wrapper {
		height: 45px;
		width: 45px;
	}

	.menu-lines {
		display: ${theme.layout.display.flex};
		flex-direction: ${theme.layout.flex.direction.column};
		gap: ${theme.numericScale.gap['10px']};
		height: 45px;
		width: 45px;
		align-items: ${theme.layout.flex.align.center};
		justify-content: ${theme.layout.flex.justify.center};

		span {
			width: ${theme.numericScale.width['45px']};
			height: ${theme.numericScale.height['1px']};
			background: ${theme.colors.theme.primary.base};
			transition: ${theme.numericScale.transitions.mainTransition};

			&:nth-of-type(2) {
				transform: ${theme.positioning.transform.translate.x('-8px')};
			}
		}

		&.color {
			span {
				background: ${theme.colors.white.base};
			}
		}

		&:hover {
			span {
				&:nth-of-type(2) {
					transform: ${theme.positioning.transform.translate.x('0')};
				}
			}
		}
	}

	.close-icon {
		${theme.components.header.closeIcon};
		&::before,
		&::after {
			${theme.components.header.closeIconLine};
		}
		&::before {
			transform: ${theme.numericScale.rotate.custom('45deg')};
		}
		&::after {
			transform: ${theme.numericScale.rotate.custom('-45deg')};
		}
	}

	.menu-text {
		color: ${theme.colors.black.base};
		font-weight: ${theme.numericScale.fontWeight.normal};
		font-style: ${theme.numericScale.fontStyles.normal};
		font-size: ${theme.numericScale.fontSize.base};
		line-height: ${theme.numericScale.lineHeight.base};
		letter-spacing: ${theme.numericScale.letterSpacing.tight};
		transition: ${theme.numericScale.transitions.mainTransition};

		&.color {
			color: ${theme.colors.white.base};
		}
	}
`;

const NavigationActions = styled.div`
	display: ${theme.layout.display.flex};
	align-items: ${theme.layout.flex.align.center};
	justify-content: ${theme.layout.flex.justify.end};
	gap: ${theme.numericScale.gap.custom('70px')};
	width: ${theme.numericScale.width['1/3']};

	${theme.grid.media.down.laptop} {
		gap: ${theme.numericScale.gap['30px']};
		width: 50%;
	}
	${theme.grid.media.down.tab} {
		gap: ${theme.numericScale.gap['50px']};
		width: 50%;
	}
	${theme.grid.media.down.mobile} {
		width: 100%;
	}
`;

const MainHeader = ({
	isMenuOpen,
	toggleMenu,
	mainLogo,
	isMobile,
	location,
}) => {
	const dispatch = DispatchCursor();

	return (
		<HeaderContent>
			<LogoWrapper>
				<Logo>
					<Link href="/" prefetch={false}>
						{mainLogo?.path && (
							<img
								src={`${process.env.NEXT_PUBLIC_API_URL}/admin/${mainLogo.path}`}
								alt="Saltanat Group Limited"
							/>
						)}
					</Link>
				</Logo>
			</LogoWrapper>

			<NavigationActions>
				{!isMobile && (
					<Button
						className={'desktop-mobile'}
						src={'/why-invest'}
						fontSize={'1.2rem'}
						background={'#FAF8F2'}
						hoverBackground={theme.colors.theme.hoverColor.base}
						text={'Invest now'}
						color={'#131D0D'}
						inLineColor={'#182315'}
						outLineColor={'#FFFFFF94'}
						inLineHoverColor={'#FFFFFF94'}
						outLineHoverColor={'#182315'}
					/>
				)}

				<MenuButton
					role="button"
					aria-expanded={isMenuOpen}
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					onClick={toggleMenu}
					onMouseEnter={() =>
						CURSOR_EXCLUSION(dispatch, 'START', 'LARGE')
					}
					onMouseLeave={() => CURSOR_EXCLUSION(dispatch, 'END')}
					className={'hamburger-menu-for-click'}>
					{isMenuOpen ? (
						<div className="d-flex close-icon-wrapper align-items-center gap-2">
							<svg
								width="64px"
								height="64px"
								viewBox="0 0 64 64"
								fill="none"
								stroke="#fff">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g
									id="SVGRepo_tracerCarrier"
									strokeLinecap="round"
									strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<line
										x1="16"
										y1="16"
										x2="48"
										y2="48"></line>
									<line
										x1="48"
										y1="16"
										x2="16"
										y2="48"></line>
								</g>
							</svg>
						</div>
					) : (
						<div
							className={`menu-lines ${location === '/' ? '' : 'color'}`}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					)}
				</MenuButton>
			</NavigationActions>
		</HeaderContent>
	);
};

MainHeader.propTypes = {
	isMenuOpen: PropTypes.bool.isRequired,
	toggleMenu: PropTypes.func.isRequired,
	mainLogo: PropTypes.shape({
		path: PropTypes.string,
	}),
	isMobile: PropTypes.bool.isRequired,
	location: PropTypes.string.isRequired,
};

MainHeader.defaultProps = {
	mainLogo: null,
};

export default MainHeader;
