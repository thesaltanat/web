'use client';

import { CSSPlugin, gsap } from 'gsap';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
	Autoplay,
	EffectFade,
	EffectCreative,
	Navigation,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Title from '@/src/components/ui/Title';
import theme from '@/src/styles/theme';
import { CSSRulePlugin } from 'gsap/dist/CSSRulePlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import styled from 'styled-components';
import SwiperCore from 'swiper';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import useContainerOffset from '@/src/hooks/useContainerOffset';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';
import BodyText from '@/src/components/ui/BodyText';
import parse from 'html-react-parser';
import Button from '@/src/components/ui/Button';

SwiperCore.use([Autoplay, EffectFade, EffectCreative]);
gsap.registerPlugin(ScrollTrigger, CSSPlugin, CSSRulePlugin);

const FeaturedProjectSingleSlider = ({ data, preloaderComplete }) => {
	const sectionRef = useRef(null);
	const [swiperInstance, setSwiperInstance] = useState(null);
	const [animationComplete, setAnimationComplete] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const containerRef = useRef(null);
	const offset= useContainerOffset('.container')
	const [currentIndex, setCurrentIndex] = useState(0);

	const globalData = useShowSetting();
	const dataFeaturePorject =
		globalData?.getSettings?.data?.feature_project || null;

	const featureData = useMemo(() => {
		return Array.isArray(dataFeaturePorject?.data)
			? dataFeaturePorject.data
			: [];
	}, [dataFeaturePorject?.data]);

	// Memoize the partner images to prevent unnecessary re-renders
	const partnerImages = useMemo(
		() =>
			featureData?.map((e, index) => {
				const banner = e?.images?.list?.find(f => f?.banner === 'on');
				const icon = e?.images?.list?.find(f => f?.icon === 'on');
				return (
					<SwiperSlide key={index}>
						<div
							className={`single-product ${index + 1}`}
							key={index}>
							<div className="slide-mask"></div>
							<div className="image-wrapper">
								<SingleImageParallax
									src={
										banner?.urls?.large
											? 'https://bestinbd.com' +
												banner?.urls?.large
											: 'https://bestinbd.com' +
												banner?.full_path
									}
									alt={
										banner?.short_title || 'Project Banner'
									}
								/>
							</div>
							<h6 className={'feature_project_title'}>
								Featured projects
							</h6>
							<div className=" box_wrapper">
								<div className="button-position animated-top">
									<Button
										src={'/'}
										hoverBackground={theme.colors.theme.hoverColor.base}
										text={'Learn More'}
										variant={'circle'}
										textTransform={'uppercase'}
										borderColor={'1px solid #fff'}
										color={'#fff'}
										background={'transparent'}
									/>
								</div>

								<div className="icon">
									<img
										src={
											'https://bestinbd.com/' +
											icon?.full_path
										}
										alt={icon?.short_title}
									/>
								</div>
								<Title
									center={true}
									text={e?.product_data?.title}
									tag={'h5'}
									width={'80%'}

									textTransform={'uppercase'}
									margin={'30px auto 15px'}
								/>
								<div className="box-banner-image">
									<SingleImageParallax
										src={
											banner?.urls?.large
												? 'https://bestinbd.com' +
													banner?.urls?.large
												: 'https://bestinbd.com' +
													banner?.full_path
										}
										alt={
											banner?.short_title ||
											'Project Banner'
										}
									/>
								</div>
								<BodyText margin={'24px 0 0'}>
									{parse(e?.product_data?.short_desc)}
								</BodyText>
							</div>
						</div>
					</SwiperSlide>
				);
			}),
		[featureData],
	);

	// Initialize swiper autoplay when component mounts
	// useEffect(() => {
	// 	if (swiperInstance && animationComplete) {
	// 		// Start autoplay only after animation is complete
	// 		setTimeout(() => {
	// 			if (swiperInstance?.autoplay) {
	// 				swiperInstance.autoplay.start();
	// 			}
	// 		}, 100);
	// 	}
	// }, [swiperInstance, animationComplete]);
	useEffect(() => {
		if (!swiperInstance) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// Only start autoplay if animation is complete and not currently revealing
					if (animationComplete && !isInView) {
						if (swiperInstance?.autoplay) {
							swiperInstance.autoplay.start();
						}
					}
				} else {
					if (swiperInstance?.autoplay) {
						swiperInstance.autoplay.stop();
					}
				}
			},
			{
				threshold: 0.1, // Lower threshold for earlier detection
				rootMargin: '50px 0px', // Start detection 50px before element enters viewport
			},
		);

		const currentContainer = containerRef.current;

		if (currentContainer) {
			observer.observe(currentContainer);
		}

		return () => {
			if (currentContainer) {
				observer.unobserve(currentContainer);
			}
			observer.disconnect();
		};
	}, [swiperInstance, isInView, animationComplete]);

	useEffect(() => {
		if (swiperInstance) {
			const realIndex = swiperInstance.realIndex !== undefined
				? swiperInstance.realIndex
				: swiperInstance.activeIndex;
			setCurrentIndex(realIndex);
		}
	}, [swiperInstance]);

	const handleSetTransition = (swiper, speed) => {
		for (let i = 0; i < swiper.slides.length; i++) {
			swiper.slides[i].style.transition = `${speed}ms `;
			swiper.slides[i].querySelector('.single-product').style.transition =
				`${speed}ms`;
		}
	};

	const handleProgress = swiper => {
		const interleaveOffset = 0.5; // Adjust as needed
		swiper.slides.forEach(slide => {
			const slideProgress = slide.progress;
			const innerOffset = swiper.width * interleaveOffset;
			const innerTranslate = slideProgress * innerOffset;

			// Use GSAP for smooth animation
			gsap.set(slide.querySelector('.single-product'), {
				x: innerTranslate,
				duration: 1.5,
				ease: 'Expo.easeInOut',
			});
		});
	};
	return (
		<StyledFeaturedProjectSingleSlider
			ref={sectionRef}
			data-scroll-section
			offset={offset}
			className="featured-project-section">
			<Swiper
				slidesPerView={1}
				spaceBetween={0}
				onSwiper={setSwiperInstance}
				onProgress={handleProgress}
				loop={true}
				onSetTransition={handleSetTransition}
				autoplay={false}
				loopAddBlankSlides={false}
				cssMode={false}
				speed={1000}
				effect="creative"
				creativeEffect={{
					prev: {
						translate: ['-100%', 0, 0],
					},
					next: {
						translate: ['100%', 0, 0],
					},
				}}
				navigation={{
					prevEl: '.featured_project_prev',
					nextEl: '.featured_project_next',
				}}
				onSlideChangeTransitionStart={() => {
					document.querySelectorAll('.slide-mask').forEach(mask => {
						mask.style.opacity = 1;
					});
				}}
				onSlideChangeTransitionEnd={() => {
					document.querySelectorAll('.slide-mask').forEach(mask => {
						mask.style.opacity = 0;
					});
				}}
				freeMode={false}
				modules={[Navigation, Autoplay, EffectFade, EffectCreative]}
				className="about-slider_mask w-slider-mask"
				onSlideChange={swiper => {
					const realIndex =
						swiper.realIndex !== undefined
							? swiper.realIndex
							: swiper.activeIndex;
					setCurrentIndex(realIndex);
				}}>
				{featureData?.length > 0 && partnerImages}
			</Swiper>
			<div className="footer-bottom">
				<div className="count">
					<span className="current">
						{featureData?.length > 0
							? `${(currentIndex + 1).toString().padStart(2, '0')}`
							: '01'}
					</span>
					/
					<span className="total">
						{featureData?.length < 10
							? `0${featureData?.length}`
							: featureData?.length}
					</span>
				</div>
				<ul className={'navigation-button'}>
					<li className={'featured_project_prev'}>
						<svg
							width="48"
							height="7"
							viewBox="0 0 48 7"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_137_1138)">
								<path
									d="M6.38604 0.31665L1.27722 3.16714L6.38604 6.01764"
									stroke="white"
									stroke-miterlimit="10"
								/>
								<path
									d="M1.27722 3.16724H47.2566"
									stroke="white"
									stroke-width="0.9798"
									stroke-miterlimit="10"
								/>
							</g>
							<defs>
								<clipPath id="clip0_137_1138">
									<rect
										width="47.2566"
										height="6.33443"
										fill="white"
									/>
								</clipPath>
							</defs>
						</svg>
					</li>
					<li>
						<svg
							width="1"
							height="16"
							viewBox="0 0 1 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<line
								x1="0.5"
								y1="-1.11565e-08"
								x2="0.500001"
								y2="15.2026"
								stroke="white"
							/>
						</svg>
					</li>
					<li className={'featured_project_next'}>
						<svg
							width="48"
							height="7"
							viewBox="0 0 48 7"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_137_1142)">
								<path
									d="M40.8706 0.31665L45.9794 3.16714L40.8706 6.01764"
									stroke="white"
									stroke-miterlimit="10"
								/>
								<path
									d="M45.9794 3.16724H-1.62125e-05"
									stroke="white"
									stroke-width="0.9798"
									stroke-miterlimit="10"
								/>
							</g>
							<defs>
								<clipPath id="clip0_137_1142">
									<rect
										width="47.2566"
										height="6.33443"
										fill="white"
										transform="matrix(-1 0 0 1 47.2566 0)"
									/>
								</clipPath>
							</defs>
						</svg>
					</li>
				</ul>
			</div>
		</StyledFeaturedProjectSingleSlider>
	);
};

const StyledFeaturedProjectSingleSlider = styled.section`
	height: 110vh;
	position: relative;

	.swiper {
		height: 100%;
	}
	.box_wrapper {
		position: absolute;
		background: #f2f0eb;
		top: 50%;
		left: 50%;
		padding: 3rem;
		text-align: center;
		max-width: 40%;
		width: 40%;
		transform: translate(-50%, -50%);
		z-index: 99;

		.box-banner-image {
			position: relative;
			padding-top: calc(215 / 370 * 100%);
		}

		.button-position {
			position: absolute;
			bottom: 200px;
			right: -130px;
			
			@media(max-width: 767px){
				display: none;
			}
		}

		@media (max-width: 1180px) {
			max-width: 50%;
			width: 50%;
		}

		@media (max-width: 992px) {
			max-width: 60%;
			width: 60%;
		}
		@media (max-width: 767px) {
			max-width: calc(100% - 30px);
			width: calc(100% - 30px);
			padding: 1rem 2rem;
		}
	}

	.single-product {
		height: 100%;
		position: relative;
		overflow: hidden;
		will-change: transform;
		.container {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
		}

		.feature_project_title {
			position: absolute;
			top: 50%;
			left: ${probs =>
				probs.offset ? `${probs.offset + 20}px` : '20px'};
			transform: translate(0, -50%);
			z-index: 2;
			color: #fff;
			writing-mode: vertical-rl;
			margin: 0 auto;
			/* Optional: further adjust character orientation if needed */
			text-orientation: upright;
			text-transform: uppercase;
			font-weight: 500;
			font-size: 16px;
			line-height: 100%;
			letter-spacing: 36%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			@media (max-width: 767px) {
				writing-mode: unset;
				position: relative;
				inset: unset;
				line-height: 1;
				justify-content: flex-start;
				height: auto;
				margin-left: 15px;
				margin-top: 80px;
			}
		}

		.image-wrapper {
			position: absolute;
			inset: 0;
			object-fit: cover;
			height: 100%;
			width: 100%;

			img {
				object-fit: cover;
				width: 100%;
				height: 100%;
			}

			&:after {
				content: '';
				position: absolute;
				inset: 0;
				background: #00000033;
				height: 100%;
				width: 100%;
				z-index: 1;
			}
		}

		@media (max-width: 767px) {
			h5 {
				font-family: Cammron, serif;
				font-weight: 400;
				font-style: normal;
				font-size: 28px;
				line-height: 100%;
				letter-spacing: -2%;
				text-align: center;
			}
		}
	}

	.footer-bottom {
		position: absolute;
		bottom: 40px;
		z-index: 99;
		right: ${props => props.offset || 90}px;
		display: flex;
		gap: 8px;

		.count {
			color: white;
			font-family: Mosvita, sans-serif;
			font-weight: 400;
			font-size: 18px;
			line-height: 120%;
			letter-spacing: -2%;
		}

		.navigation-button {
			display: flex;
			align-items: center;

			li {
				cursor: pointer;

				svg {
					path {
						transition: stroke 0.3s ease;
					}
				}

				&:first-child,
				&:last-child {
					margin: 0 10px;
				}

				&:hover {
					svg {
						path {
							stroke: ${theme.colors.theme.hoverColor.base};
						}
					}
				}
			}
		}

		@media (max-width: 767px) {
			right: 15px !important;
			bottom: 30px;
		}
	}

	.slide-mask {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		opacity: 0;
		transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1);
		z-index: 15;
		pointer-events: none;
	}
`;

export default React.memo(FeaturedProjectSingleSlider);
