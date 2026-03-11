'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import parse from 'html-react-parser';
import styled from 'styled-components';
import theme from '@/src/styles/theme';
import Button from '@/src/components/ui/Button';
import { SingleImage } from '@/src/components/ui/SingleImage';
import Social from '@/src/components/ui/Social';
import useContainerOffset from '@/src/hooks/useContainerOffset';
import { DispatchCursor, CURSOR_EXCLUSION } from 'haspr-cursor';

const StyledMenuItem = styled.section`
    background-size: ${theme.backgrounds.size.cover} !important;
    background: #141a12 url('/fixed-element-menu-background-leaf.svg') ${theme.backgrounds.position.center};
    background-repeat: ${theme.backgrounds.repeat.noRepeat} !important;
    position: ${theme.positioning.type.fixed};
    height: ${theme.numericScale.height.full};
    top: ${theme.numericScale.values[0]};
    bottom: ${theme.numericScale.values[0]};
    left: ${theme.numericScale.values[0]};
    width: ${theme.numericScale.width.full};
    z-index: ${theme.numericScale.zIndex['9999']};
    display: ${theme.layout.display.block};
    opacity: ${theme.numericScale.opacity['100']};

    .menu-items__lists {
        padding: ${theme.numericScale.padding.custom('10rem 0 5rem 0')};

        @media (max-width: 767px) {
            padding-left: 15px !important;
            padding-right: 15px !important;
        }

        .menu_item_wrapper_inner_both {
            height: 100%;
            display: flex;
            justify-content: space-between;
            flex-direction: column;

            .header-footer-information {
                ${theme.grid.media.down.laptop} {
                    gap: 15px !important;
                }

                ${theme.grid.media.tablet} {
                    gap: 15px !important;
                    flex-direction: ${theme.layout.flex.direction.column};
                }
            }

            .social {
                gap: 15px !important;
                padding: 0 !important;
                justify-content: flex-start !important;

                li {
                    a {
                        margin: 0;
                        padding: 0;
                    }

                    margin: 0 !important;
                    flex: unset !important;
                    width: unset !important;
                }
            }
        }

        ul {
            overflow: ${theme.overflow.hidden};
            width: ${theme.numericScale.width.full};
            padding-left: ${theme.numericScale.values[0]};
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            justify-content: space-between;

            ${theme.grid.media.down.laptop} {
                gap: 30px !important;
            }

            ${theme.grid.media.tablet} {
                padding-left: ${theme.numericScale.padding['15px']} !important;
                gap: 30px !important;

                li {
                    flex: 0 0 calc(50% - 30px) !important;
                    width: calc(50% - 30px) !important;
                }
            }

            li {
                position: ${theme.positioning.type.relative};
                display: ${theme.layout.display.flex};
                align-items: ${theme.layout.flex.align.center};
                margin-bottom: 0;
                flex: 0 0 calc(50% - 70px);
                width: calc(50% - 70px);

                a {
                    font-family: ${theme.typography.fonts.secondary};
                    font-style: ${theme.typography.fontStyles.normal};
                    font-weight: 400;
                    font-size: 2rem;
                    line-height: 1;
                    letter-spacing: -0.02em;
                    color: ${theme.colors.white.base};
                    text-decoration: ${theme.numericScale.textDecoration.none};
                    transition: ${theme.numericScale.transitions
		.mainTransition};
                    text-transform: uppercase;

                    &:after {
                        content: '';
                        width: ${theme.numericScale.values[0]};
                        height: ${theme.numericScale.height.custom('1px')};
                        background: ${theme.colors.theme.hoverColor.base};
                        position: ${theme.positioning.type.absolute};
                        left: ${theme.numericScale.values[0]};
                        bottom: ${theme.numericScale.spacing.custom('0')};
                        transition: ${theme.numericScale.transitions
		.mainTransition};
                    }

                    ${theme.grid.media.down.laptop} {
                        font-weight: 400;
                        font-size: 1.2rem;
                        line-height: 1;
                        letter-spacing: -0.02em;
                    }

                    ${theme.grid.media.down.md} {
                        font-weight: 400;
                        font-size: 1.333rem;
                        line-height: 1;
                        letter-spacing: -0.02em;

                        &:after {
                            display: ${theme.layout.display.none};
                        }

                        &:hover {
                            a {
                                padding-left: ${theme.numericScale.values[0]};
                                color: ${theme.colors.menuItem};
                            }
                        }
                    }
                }

                &:hover {
                    a {
                        padding-left: ${theme.numericScale.padding['130px']};
                        color: ${theme.colors.menuItem};

                        &:after {
                            width: ${theme.numericScale.width['80px']};
                        }

                        ${theme.grid.media.mobile} {
                            padding-left: ${theme.numericScale.values[0]};
                        }
                    }
                }

                &.active {
                    a {
                        padding-left: ${theme.numericScale.padding['130px']};
                        color: ${theme.colors.menuItem};
                        pointer-events: ${theme.numericScale.cursor.none};

                        &:after {
                            width: ${theme.numericScale.width['80px']};
                        }

                        ${theme.grid.media.mobile} {
                            padding-left: ${theme.numericScale
		.values[0]} !important;
                        }
                    }
                }
            }

            ${theme.grid.media.mobile} {
                padding-left: ${theme.numericScale.padding['0']} !important;
                gap: 30px !important;

                li {
                    flex: 0 0 calc(100% - 30px) !important;
                    width: calc(100% - 30px) !important;
                }
            }

            @media (max-width: 400px) {
                gap: 15px !important;
            }
        }

        ${theme.grid.media.mobile} {
            padding: ${theme.numericScale.padding.custom('120px 0 50px 0')};
        }

        @media (max-width: 400px) {
            .menu-items__lists {
                padding: 100px 0 50px 0;
            }
        }
    }

    .menu-items__images {
        position: relative;
        z-index: 3;

        &__list {
            overflow: ${theme.overflow.hidden};
            height: ${theme.numericScale.height.screen};
            width: ${theme.numericScale.width.full};
            display: ${theme.layout.display.flex};
            gap: ${theme.numericScale.gap['20px']};
            flex-direction: ${theme.layout.flex.direction.column};

            li {
                position: ${theme.positioning.type.relative};

                .image-wrapper-menu {
                    position: ${theme.positioning.type.relative};
                    padding-top: ${theme.aspectRatio.menuItem};
                    transition: ${theme.numericScale.transitions
		.mainTransition};
                    opacity: ${theme.numericScale.opacity['30']};
                    overflow: ${theme.overflow.hidden};

                    mask-size: ${theme.numericScale.maskSize.custom('0 0')};
                    -webkit-mask-size: ${theme.numericScale.maskSize.custom(
			'0 0',
		)};
                    mask-position: ${theme.backgrounds.position.center};
                    -webkit-mask-position: ${theme.backgrounds.position.center};
                    mask-repeat: ${theme.backgrounds.repeat.noRepeat};
                    -webkit-mask-repeat: ${theme.backgrounds.repeat.noRepeat};
                    transition: ${theme.numericScale.transitions
		.mainTransition};

                    &.active {
                        opacity: ${theme.numericScale.opacity['100']};
                        transform: ${theme.numericScale.scale.custom(1.05)};
                        mask-size: ${theme.numericScale.maskSize.double};
                        -webkit-mask-size: ${theme.numericScale.maskSize
		.double};
                    }

                    &:first-child {
                        opacity: ${theme.numericScale.opacity['100']};
                        mask-size: ${theme.numericScale.maskSize.double};
                        -webkit-mask-size: ${theme.numericScale.maskSize
		.double};
                    }

                    &.mask-reveal {
                        mask-size: ${theme.numericScale.maskSize.custom(
			'180% 180%',
		)};
                        -webkit-mask-size: ${theme.numericScale.maskSize.custom(
			'180% 180%',
		)};
                        opacity: ${theme.numericScale.opacity['100']};
                        transform: ${theme.numericScale.scale.custom(1.02)};
                    }

                    img {
                        position: ${theme.positioning.type.absolute};
                        top: ${theme.numericScale.values[0]};
                        left: ${theme.numericScale.values[0]};
                        width: ${theme.numericScale.width.full};
                        height: ${theme.numericScale.height.full};
                        object-fit: ${theme.numericScale.objectFit.cover};
                        will-change: ${theme.numericScale.willChange.transform};
                    }
                }
            }
        }

        ${theme.grid.media.down.md} {
            display: ${theme.layout.display.none} !important;
        }
    }
`;

const ItemSingle = styled.div`
	word-break: break-word;
	min-width: 33.3333%;
	justify-content: flex-end;
	display: flex;
	flex-direction: column;

	p {
		font-weight: 400;
		font-style: normal;
		font-size: 1rem;
		line-height: 1;
		letter-spacing: -0.0178rem;
		color: #9688537d;
		margin-bottom: 15px;
		cursor: default;

		&:nth-of-type(2) {
			color: ${theme.colors.white.base};
			font-weight: 400;
			font-style: normal;
			font-size: 1rem;
			line-height: 1;
			letter-spacing: -0.0222rem;
			text-decoration: none;
			transition: ${theme.animations.transition.default};
			margin-bottom: 0;
			display: inline-block;
			cursor: default;
		}
	}

	a {
		color: ${theme.colors.white.base};
		font-weight: 400;
		font-style: normal;
		font-size: 1rem;
		line-height: 1;
		letter-spacing: -0.0222rem;
		text-decoration: none;
		transition: ${theme.animations.transition.default};
		margin-bottom: 0;
		display: inline-block;

		&:hover {
			text-decoration: underline;
		}
	}

	&:hover {
		cursor: pointer;
	}

	${theme.grid.media.down.md} {
		flex: 0 0 calc(100% - 20px);
		width: calc(100% - 20px);
		&:nth-of-type(1) {
			flex: 0 0 calc(50% - 20px);
			width: calc(50% - 20px);
		}
		&:nth-of-type(2) {
			flex: 0 0 calc(50% - 20px);
			width: calc(50% - 20px);
		}
	}
`;

const overlayVariants = {
	initial: {
		y: '100%',
		opacity: 0,
	},
	animate: {
		y: '0%',
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: [0.65, 0, 0.35, 1],
		},
	},
	exit: {
		y: '100%',
		opacity: 0,
		transition: {
			duration: 0.4,
			ease: [0.65, 0, 0.35, 1],
		},
	},
};

const contentContainerVariants = {
	initial: {
		opacity: 0,
		y: 10,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			delay: 0.1,
			ease: [0.65, 0, 0.35, 1],
			staggerChildren: 0.03,
			delayChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		y: 5,
		transition: {
			duration: 0.25,
			ease: [0.65, 0, 0.35, 1],
		},
	},
};

const listItemVariants = {
	initial: { opacity: 0, y: 8 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: [0.65, 0, 0.35, 1],
		},
	},
	exit: {
		opacity: 0,
		y: 4,
		transition: {
			duration: 0.2,
			ease: [0.65, 0, 0.35, 1],
		},
	},
};

const MotionMenu = motion(StyledMenuItem);

const MenuOverlay = ({
	isMenuOpen,
	filteredMenuData,
	location,
	globalData,
	socialMedia,
	isMobile,
	toggleMenu,
	unlockScroll,
}) => {
	const offset = useContainerOffset('.container');
	const dispatch = DispatchCursor();

	return (
		<AnimatePresence mode="wait">
			{isMenuOpen && (
				<MotionMenu
					variants={overlayVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					className={'menu-items'}
					onAnimationComplete={definition => {
						if (definition === 'exit') {
							requestAnimationFrame(() => {
								unlockScroll();
							});
						}
					}}
					style={{
						pointerEvents: 'auto',
						willChange: 'transform, opacity',
						backfaceVisibility: 'hidden',
					}}>
					<motion.div
						className="d-flex"
						variants={contentContainerVariants}>
						<motion.div
							className="menu-items__images d-flex col-sm-5"
							style={{ paddingLeft: 0, paddingRight: 0 }}>
							<motion.ul
								className="menu-items__images__list left"
								variants={contentContainerVariants}>
								{filteredMenuData.map((menuItem, index) => (
									<motion.li
										key={menuItem.item_url}
										className={`${location === menuItem.item_url ? 'active' : ''}`}
										variants={listItemVariants}>
										<motion.div
											className={`image-wrapper-menu ${index === 0 ? 'active' : ''}`}
											initial={{
												opacity: 0.3,
												scale: 1.02,
											}}
											animate={{
												opacity: 1,
												scale: 1,
												transition: {
													duration: 0.4,
													ease: [0.65, 0, 0.35, 1],
												},
											}}
											exit={{
												opacity: 0.3,
												scale: 1.01,
												transition: { duration: 0.2 },
											}}>
											<SingleImage
												src={
													menuItem.item_icon ||
													`/images/dynamic/menu/img${index + 1}.jpg` ||
													'/images/static/blur.jpg'
												}
												alt={(
													menuItem.item_title || ''
												).replace(/<[^>]*>/g, '')}
											/>
										</motion.div>
									</motion.li>
								))}
							</motion.ul>
						</motion.div>

						<motion.div
							className="menu-items__lists col-sm-7"
							style={{
								paddingLeft: offset + 'px',
								paddingRight: offset + 'px',
							}}>
							<div className={'menu_item_wrapper_inner_both'}>
								{isMobile && (
									<Button
										src={'/why-invest'}
										margin={'0 0 40px'}
										width={'fit-content'}
										background={'#FAF8F2'}
										hoverBackground={
											theme.colors.theme.hoverColor.base
										}
										text={'Invest now'}
										color={'#131D0D'}
										inLineColor={'#182315'}
										outLineColor={'#FFFFFF94'}
										inLineHoverColor={'#FFFFFF94'}
										outLineHoverColor={'#182315'}
									/>
								)}

								<motion.ul variants={contentContainerVariants}>
									{filteredMenuData.map(menuItem => (
										<motion.li
											variants={listItemVariants}
											key={menuItem.item_url}
											className={`hover-item ${location === menuItem.item_url ? 'active' : ''}`}>
											<Link
												prefetch={false}
												onMouseEnter={() =>
													CURSOR_EXCLUSION(
														dispatch,
														'START',
														'LARGE',
													)
												}
												onMouseLeave={() =>
													CURSOR_EXCLUSION(
														dispatch,
														'END',
													)
												}
												scroll={false}
												href={menuItem.item_url || '/'}>
												{parse(
													menuItem.item_title || '',
												)}
											</Link>
										</motion.li>
									))}
								</motion.ul>

								{!isMobile && (
									<motion.div
										className={
											'd-flex justify-content-between gap-5 text-break mt-lg-5 header-footer-information'
										}
										variants={listItemVariants}>
										{globalData?.office_phone && (
											<ItemSingle>
												<p>Phone</p>
												<Link
													target={'_blank'}
													href={`tel:${globalData.office_phone}`}>
													{globalData.office_phone}
												</Link>
											</ItemSingle>
										)}
										{globalData?.contact_email && (
											<ItemSingle>
												<p>Email</p>
												<Link
													target={'_blank'}
													href={`mailto:${globalData.contact_email}`}>
													{globalData.contact_email}
												</Link>
											</ItemSingle>
										)}
										{globalData?.office_location && (
											<ItemSingle>
												<p>Address</p>
												<Link
													target={'_blank'}
													href={
														globalData.google_map_link
													}>
													{globalData.office_location}
												</Link>
											</ItemSingle>
										)}
									</motion.div>
								)}

								{isMobile && socialMedia?.length > 0 && (
									<Social
										data={socialMedia}
										margin={'60px 0 0'}
										marginMobile={'60px 0 60px'}
										iconColor={'white'}
									/>
								)}
							</div>
						</motion.div>
					</motion.div>
				</MotionMenu>
			)}
		</AnimatePresence>
	);
};

export default MenuOverlay;
