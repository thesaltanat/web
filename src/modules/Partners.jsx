'use client';

import { CSSPlugin, gsap } from 'gsap';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Autoplay, FreeMode, Grid, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Title from '@/src/components/ui/Title';
import theme from '@/src/styles/theme';
import { CSSRulePlugin } from 'gsap/dist/CSSRulePlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import styled from 'styled-components';
import SwiperCore from 'swiper';

SwiperCore.use([Autoplay]);
gsap.registerPlugin(ScrollTrigger, CSSPlugin, CSSRulePlugin);

const Partners = ({ data, preloaderComplete }) => {
	const sectionRef = useRef(null);
	const [swiperInstance, setSwiperInstance] = useState(null);
	const [animationComplete, setAnimationComplete] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const containerRef = useRef(null);

	// Memoize the subtitle to prevent unnecessary re-renders
	const subtitle = useMemo(
		() => data?.section_data?.subtitle,
		[data?.section_data?.subtitle],
	);

	// Memoize the partner images to prevent unnecessary re-renders
	const partnerImages = useMemo(
		() =>
			data?.images?.list?.map((e, index) => (
				<SwiperSlide key={index}>
					<Col md={12} className={`p-0 ${index + 1}`} key={index}>
						<div className="single-partners-image">
							<div className="image-overlay"></div>
							<div className="image-wrapper">
								<img
									src={
										'https://bestinbd.com' +
										e?.full_path
									}
									alt={e?.short_title || 'Partners'}
									loading="lazy"
								/>
							</div>
						</div>
					</Col>
				</SwiperSlide>
			)),
		[data?.images?.list],
	);

	// Simplified effect for animation initialization
	useEffect(() => {
		// Ensure preloader is complete and swiper is initialized before starting animation
		if (
			!preloaderComplete ||
			!containerRef.current ||
			!data?.images?.list?.length ||
			!swiperInstance
		)
			return;

		let tl;
		const currentContainer = containerRef.current;

		function initializeAnimation() {
			const items = currentContainer.querySelectorAll(
				'.single-partners-image',
			);

			// Only proceed if items exist
			if (items.length === 0) return;

			const imageWrappers =
				currentContainer.querySelectorAll('.image-wrapper');
			const images =
				currentContainer.querySelectorAll('.image-wrapper img');
			const overlays =
				currentContainer.querySelectorAll('.image-overlay');

			// Clean up any existing ScrollTriggers tied to this container
			ScrollTrigger.getAll().forEach(trigger => {
				if (trigger.trigger === currentContainer) {
					trigger.kill();
				}
			});

			// Detect custom scroller (e.g., Lenis / ScrollSmoother). If a
			// data attribute is used on the scroll container, pass it to ScrollTrigger.
			const scrollerEl = document.querySelector(
				'[data-scroll-container]',
			);

			// Initial setup - avoid transform conflicts
			gsap.set(items, {
				opacity: 0,
				y: 40,
			});

			gsap.set(imageWrappers, {
				scale: 0.8,
			});

			gsap.set(images, {
				scale: 1.2,
				filter: 'blur(4px)',
			});

			gsap.set(overlays, {
				scaleX: 1,
				transformOrigin: 'left center',
			});

			// Create timeline for reveal animation
			tl = gsap.timeline({
				scrollTrigger: {
					trigger: currentContainer,
					// only pass scroller if we detected a custom scroll container
					scroller: scrollerEl || undefined,
					start: 'top 80%', // trigger a bit earlier
					end: 'bottom 10%',
					toggleActions: 'play none none none',
					refreshPriority: 1,
					onStart: () => {
						setIsInView(true);
						setAnimationComplete(false);
						// Pause swiper autoplay during reveal animation
						if (swiperInstance?.autoplay) {
							swiperInstance.autoplay.stop();
						}
					},
					onComplete: () => {
						setAnimationComplete(true);
						setIsInView(false);
						// Resume swiper autoplay after reveal animation
						if (swiperInstance?.autoplay) {
							swiperInstance.autoplay.start();
						}
					},
				},
			});

			// Animate each item
			items.forEach((item, index) => {
				const imageWrapper = item.querySelector('.image-wrapper');
				const img = item.querySelector('.image-wrapper img');
				const overlay = item.querySelector('.image-overlay');

				tl.to(
					item,
					{
						opacity: 1,
						y: 0,
						duration: 0.25,
						ease: 'power1.out',
					},
					index * 0.03,
				)
					.to(
						imageWrapper,
						{
							scale: 1,
							duration: 0.25,
							ease: 'power1.out',
						},
						index * 0.03,
					)
					.to(
						overlay,
						{
							scaleX: 0,
							duration: 0.3,
							ease: 'power1.inOut',
							transformOrigin: 'right center',
						},
						index * 0.03 + 0.03,
					)
					.to(
						img,
						{
							scale: 1,
							filter: 'blur(0px)',
							duration: 0.3,
							ease: 'power1.out',
						},
						index * 0.03 + 0.05,
					);
			});

			// If using a custom scroller, refresh ScrollTrigger to account for layout
			ScrollTrigger.refresh();
		}

		// Initialize the animation
		initializeAnimation();

		return () => {
			// Cleanup function: kill timeline and any triggers tied to the container
			if (tl) tl.kill();
			ScrollTrigger.getAll().forEach(trigger => {
				if (trigger.trigger === currentContainer) {
					trigger.kill();
				}
			});
		};
	}, [data?.images?.list, swiperInstance, preloaderComplete]);

	// Initialize swiper autoplay when component mounts
	useEffect(() => {
		if (swiperInstance && animationComplete) {
			// Start autoplay only after animation is complete
			setTimeout(() => {
				if (swiperInstance?.autoplay) {
					swiperInstance.autoplay.start();
				}
			}, 100);
		}
	}, [swiperInstance, animationComplete]);
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

	return (
		<StyledPartners
			ref={sectionRef}
			data-scroll-section
			className="partners">
			<Container>
				<Row>
					<Col md={12}>
						{subtitle && (
							<Title
								margin={'0 0 90px 0'}
								textTransform={'uppercase'}
								animate={true}
								text={subtitle}
								tag={'h4'}
								color={`${theme.colors.theme.colorFour.base}`}
							/>
						)}
					</Col>
				</Row>
			</Container>
			<Container className={'partners-images'} ref={containerRef}>
				<Row>
					<Col md={12}>
						<Swiper
							slidesPerView={6}
							grid={{
								rows: 2,
								fill: 'row', // Important for correct row filling
							}}
							slidesPerGroup={7}
							spaceBetween={25}
							onSwiper={setSwiperInstance}
							loop={false}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
								waitForTransition: true,
								stopOnLastSlide: false,
							}}
							loopAddBlankSlides={false}
							cssMode={false}
							speed={1000}
							pagination={{
								clickable: true,
							}}
							navigation={{
								prevEl: '.partner_prev',
								nextEl: '.partner_next',
							}}
							freeMode={false}
							breakpoints={{
								320: {
									slidesPerView: 2,
									spaceBetween: 15,
									slidesPerGroup: 1,
									grid: {
										rows: 2,
										fill: 'row', // Important for correct row filling
									},
								},
								768: {
									slidesPerView: 4,
									spaceBetween: 15,
									grid: {
										rows: 2,
										fill: 'row', // Important for correct row filling
									},
								},
								1024: {
									slidesPerView: 7,
									spaceBetween: 25,
									grid: {
										rows: 2,
										fill: 'row', // Important for correct row filling
									},
								},
							}}
							modules={[Navigation, Grid, FreeMode, Autoplay]}
							className="about-slider_mask w-slider-mask">
							{data?.images?.list?.length > 0 && partnerImages}
						</Swiper>
					</Col>
				</Row>
			</Container>
			<div className="fixed-background">
				<img src="/images/static/leaf-bg-1.svg" alt="Background Floating" />
			</div>
		</StyledPartners>
	);
};

const StyledPartners = styled.section`
	padding: 180px 0;
	position: relative;
	background: linear-gradient(0deg, #eeece3 0%, #eeece3 100%), #f4f4f4;
	.container{
		position: relative;
		z-index: 5;
	}
	.swiper-pagination-bullet {
		&.swiper-pagination-bullet-active {
			background-color: #dd223f;
		}
	}
	.swiper-pagination {
		position: absolute;
		bottom: -5px !important;
	}
	.swiper {
		padding-bottom: 30px;
	}
	.col-md-2 {
		min-height: 120px;
	}

	.single-partners-image {
		position: relative;
		padding-top: calc(120 / 170 * 100%);
		//margin-bottom: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		//opacity: 0;
		opacity: 1;
		overflow: hidden;
			transition: box-shadow 0.3s ease;

		&:hover {
			//box-shadow: 0 8px 25px rgba(21, 38, 55, 0.15);
		}

		.image-overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(
				135deg,
				${theme.colors.theme.hoverColor.base} 0%,
				${theme.colors.theme.hoverColor.base} 50%,
				${theme.colors.theme.hoverColor.base} 100%
			);
			z-index: 2;
			transform-origin: left center;
			display: none;
		}

		.image-wrapper {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 80%;
			height: 80%;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 1;
		}

		img {
			width: auto;
			height: auto;
			object-fit: contain;
			max-width: 100%;
			max-height: 100%;
			transition: transform 0.3s ease;

			&:hover {
				transform: scale(1.05);
			}
		}

		// Add a subtle glow effect
		&::before {
			content: '';
			position: absolute;
			top: -2px;
			left: -2px;
			right: -2px;
			bottom: -2px;
			background: linear-gradient(
				45deg,
				transparent,
				rgba(221, 34, 63, 0.1),
				transparent
			);
			border-radius: 10px;
			z-index: -1;
			opacity: 0;
			transition: opacity 0.3s ease;
		}

		&:hover::before {
			opacity: 0;
		}
	}

	.fixed-background {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 2;
		img {
			opacity: 0.1;
			width: 100%;
			height: 100%;
		}
	}

	@media(max-width: 767px){
		padding: 100px 0;
		h4{
			font-size: 2rem;
		}
	}
`;

export default React.memo(Partners);
