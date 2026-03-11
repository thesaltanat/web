'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import BodyText from '@/src/components/ui/BodyText';
import Button from '@/src/components/ui/Button';
import NavigationButton from '@/src/components/ui/NavigationButton';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';
import Title from '@/src/components/ui/Title';
import useContainerOffset from '@/src/hooks/useContainerOffset';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import { useMemo } from 'react';
import styled from 'styled-components';
import SwiperCore from 'swiper';

SwiperCore.use([Autoplay]);
/**
 * Gallery SliderTemplate1 template component
 * Props:
 *  - images: array of { src, alt } objects
 *  - title: string
 *
 * This uses the project's `Title` component for the heading and provides a
 * lightweight, dependency-free lightbox (named `LightGallery` locally) so we
 * don't have to rely on external wrappers. Clicking a thumbnail opens the
 * modal; arrow keys navigate and Esc closes.
 */
const SliderTemplate1 = ({ title = 'Title', data }) => {
	const dataAvailable = useShowSetting();
	const offset = useContainerOffset('.container');

	// Memoize the partner images to prevent unnecessary re-renders
	const sliderItemContent = useMemo(
		() =>
			data?.posts?.list?.map((e, index) => (
				<SwiperSlide key={index}>
					<div className="single-partners-image">
						<Title
							color={theme.colors.theme.colorFour.base}
							text={e?.data?.title ? e?.data?.title : title}
							tag="h2"
							margin={'0 0 0'}
							textTransform="uppercase"
							animate={true}
						/>

						<BodyText
							as={'p'}
							children={parse(
								e?.data?.description || 'Description',
							)}
							color={theme.colors.theme.colorFour.base}
							margin={'20px 0 0 0'}
						/>
						<Button
							src={'/'}
							text={'Book an reservation'}
							inLineColor={theme.colors.white.base}
							outLineColor={theme.colors.theme.secondary.base}
							background={theme.colors.theme.secondary.base}
							hoverBackground={theme.colors.theme.hoverColor.base}
							outLineHoverColor={
								theme.colors.theme.colorFive.base
							}
							inLineHoverColor={theme.colors.theme.secondary.base}
							color={theme.colors.white.base}
							margin={'60px 0 0'}
						/>
					</div>
				</SwiperSlide>
			)),
		[data?.posts?.list],
	);
	const sliderItemImages = useMemo(
		() =>
			data?.posts?.list?.map((e, index) => (
				<SwiperSlide
					key={index}
					className={'single-slider-image-wrapper'}>
					<div className="item-single item-1">
						<div className="image-feature-1 image-feature">
							<SingleImageParallax
								src={
									e?.images?.list
										? e?.images?.list?.[0]?.urls?.large ? 'https://bestinbd.com' + e?.images?.list?.[0]?.urls?.large  : 'https://bestinbd.com' +
											e?.images?.list?.[0]?.full_path
										: `/images/dynamic/img${index + 1}.jpg`
								}
							/>
						</div>
					</div>
				</SwiperSlide>
			)),
		[data?.posts?.list],
	);
	const sliderItemImages2 = useMemo(
		() =>
			data?.posts?.list?.map((e, index) => (
				<SwiperSlide
					key={index}
					className={'single-slider-image-wrapper'}>
					<div className="item-single item-2">
						<div className="image-feature-2 image-feature">
							<SingleImageParallax
								src={
									e?.images?.list
										? e?.images?.list?.[0]?.urls?.large ? 'https://bestinbd.com' + e?.images?.list?.[0]?.urls?.large  : 'https://bestinbd.com' +
											e?.images?.list?.[0]?.full_path
										: `/images/dynamic/img${index + 2}.jpg`
								}
							/>
						</div>
					</div>
				</SwiperSlide>
			)),
		[data?.posts?.list],
	);
	const sliderItemImages3 = useMemo(
		() =>
			data?.posts?.list?.map((e, index) => (
				<SwiperSlide
					key={index}
					className={'single-slider-image-wrapper'}>
					<div className="item-single item-2">
						<div className="image-feature-2 image-feature">
							<SingleImageParallax
								src={
									e?.images?.list
										? e?.images?.list?.[0]?.urls?.large ? 'https://bestinbd.com' + e?.images?.list?.[0]?.urls?.large  : 'https://bestinbd.com' +
											e?.images?.list?.[0]?.full_path
										: `/images/dynamic/img${index + 3}.jpg`
								}
							/>
						</div>
					</div>
				</SwiperSlide>
			)),
		[data?.posts?.list],
	);

	// handle slider progress
	const handleProgress = swiper => {
		let interleaveOffset = 0.5;
		for (let i = 0; i < swiper.slides.length; i++) {
			let slideProgress = swiper.slides[i].progress;
			let innerOffset = swiper.width * interleaveOffset;
			let innerTranslate = slideProgress * innerOffset;
			// defensive: make sure slide and inner element exist before touching style
			const slideEl = swiper.slides[i];
			if (!slideEl) continue;
			const imgEl = slideEl.querySelector('.global-image');
			if (!imgEl) continue;
			imgEl.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
		}
	};

	// hand touch move not required this slider
	const handleTouchStart = swiper => {
		for (let i = 0; i < swiper.slides.length; i++) {
			const slideEl = swiper.slides[i];
			if (!slideEl) continue;
			slideEl.style.transition = '';
		}
	};

	// handle image transition on change
	const handleSetTransition = (swiper, speed) => {
		for (let i = 0; i < swiper.slides.length; i++) {
			const slideEl = swiper.slides[i];
			if (!slideEl) continue;
			slideEl.style.transition = `${speed}ms`;
			const imgEl = slideEl.querySelector('.global-image');
			if (!imgEl) continue;
			imgEl.style.transition = `${speed}ms`;
		}
	};

	return (
		<StyledSliderTemplate1 offset={offset}>
			<div className="fixed-element " data-size={20}>
				<img src="/images/static/leaf-bg-3.svg" alt="" />
			</div>
			<Container>
				<Row>
					<Col md={{ span: 6 }} className="p-0 position-relative">
						<div className="fixed-element-top animated-bottom" data-size={10}>
							<img src="/images/static/fixed-element-3.svg" alt="" />
						</div>
						<Swiper
							slidesPerView={1}
							spaceBetween={0}
							loop={false}
							loopAddBlankSlides={false}
							speed={1000}
							onProgress={handleProgress}
							touchStart={handleTouchStart}
							onSetTransition={handleSetTransition}
							navigation={{
								prevEl: '.navigation-buttons-left-slider-1',
								nextEl: '.navigation-buttons-right-slider-1',
							}}
							freeMode={false}
							modules={[Navigation, Autoplay]}
							className="image-slider-item-1 ">
							{data?.posts?.list?.length > 0 && sliderItemImages}
						</Swiper>

						<Swiper
							slidesPerView={1}
							spaceBetween={0}
							loop={false}
							loopAddBlankSlides={false}
							onProgress={handleProgress}
							touchStart={handleTouchStart}
							onSetTransition={handleSetTransition}
							speed={1000}
							navigation={{
								prevEl: '.navigation-buttons-left-slider-1',
								nextEl: '.navigation-buttons-right-slider-1',
							}}
							freeMode={false}
							modules={[Navigation, Autoplay]}
							className="image-slider-item-2 ">
							{data?.posts?.list?.length > 0 && sliderItemImages2}
						</Swiper>

						<Swiper
							slidesPerView={1}
							spaceBetween={0}
							loop={false}
							loopAddBlankSlides={false}
							onProgress={handleProgress}
							touchStart={handleTouchStart}
							onSetTransition={handleSetTransition}
							speed={1000}
							navigation={{
								prevEl: '.navigation-buttons-left-slider-1',
								nextEl: '.navigation-buttons-right-slider-1',
							}}
							freeMode={false}
							modules={[Navigation, Autoplay]}
							className="image-slider-item-3 ">
							{data?.posts?.list?.length > 0 && sliderItemImages3}
						</Swiper>
					</Col>
					<Col
						md={6}
						className={'book-now-content position-relative'}>
						<Swiper
							slidesPerView={1}
							spaceBetween={30}
							loop={false}
							loopAddBlankSlides={false}
							speed={1000}
							navigation={{
								prevEl: '.navigation-buttons-left-slider-1',
								nextEl: '.navigation-buttons-right-slider-1',
							}}
							freeMode={false}
							modules={[Navigation, Autoplay]}
							className="about-slider_mask w-slider-mask">
							{data?.posts?.list?.length > 0 && sliderItemContent}
						</Swiper>

						<ul className="navigation-buttons">
							<NavigationButton
								id="navigation-buttons-left"
								className="navigation-buttons-left-slider-1"
								hoverColor={theme.colors.theme.hoverColor.base}
								initialPathColor={
									theme.colors.theme.colorFour.base
								}
								ariaLabel="Previous testimonials">
								<svg
									width="32"
									height="5"
									viewBox="0 0 32 5"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M4.28575 0.212402L0.857178 2.12539L4.28575 4.03838"
										stroke="#271609"
										strokeMiterlimit="10"
									/>
									<path
										d="M0.857178 2.12549H31.7143"
										stroke="#271609"
										strokeWidth="0.9798"
										strokeMiterlimit="10"
									/>
								</svg>
							</NavigationButton>
							<li>
								<svg
									width="1"
									height="11"
									viewBox="0 0 1 11"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<line
										x1="0.5"
										y1="-1.11565e-08"
										x2="0.500001"
										y2="10.2026"
										stroke="#271609"
									/>
								</svg>
							</li>
							<NavigationButton
								id="navigation-buttons-right"
								className="navigation-buttons-right-slider-1"
								hoverColor={theme.colors.theme.hoverColor.base}
								initialPathColor={
									theme.colors.theme.colorFour.base
								}
								ariaLabel="Next testimonials">
								<svg
									width="32"
									height="5"
									viewBox="0 0 32 5"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M27.4285 0.212402L30.8571 2.12539L27.4285 4.03838"
										stroke="#271609"
										strokeMiterlimit="10"
									/>
									<path
										d="M30.8571 2.12549H-3.40939e-05"
										stroke="#271609"
										strokeWidth="0.9798"
										strokeMiterlimit="10"
									/>
								</svg>
							</NavigationButton>
						</ul>
					</Col>
				</Row>
			</Container>
		</StyledSliderTemplate1>
	);
};

const StyledSliderTemplate1 = styled.section`
	position: ${theme.positioning.type.relative};
	background: linear-gradient(0deg, #eeece3 0%, #eeece3 100%), #f4f4f4;
	z-index: 3;
	padding: 130px 0 250px;
	overflow: hidden;
	@media(max-width: 767px){
		padding: 80px 0 150px;
	}
	.fixed-element-top{
		position: absolute;
		left: 40vh;
		top: -70px;
		z-index: 4;
	}


	.single-partners-image {
	
		@media(max-width: 767px){
			p{
				display: -webkit-box; /* Specify that we want to use webkit-box */
				-webkit-box-orient: vertical; /* Indicate the text direction */
				-webkit-line-clamp: 3; /* Set the desired number of lines */
				overflow: hidden; /* Hide any overflow */
				p{
					display: -webkit-box; /* Specify that we want to use webkit-box */
					-webkit-box-orient: vertical; /* Indicate the text direction */
					-webkit-line-clamp: 3; /* Set the desired number of lines */
					overflow: hidden; /* Hide any overflow */
				}
			}
		}
	}
	
	/* Start clipped (zero width) and expand to full polygon when slide becomes active/visible */
	.swiper-slide-active .global-image,
	.swiper-slide-visible .global-image {
		/* full visible shape */
		-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	}

	.global-image {
		/* initial clipped mask: zero width from the left */
		-webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
		transition:
			clip-path 0.8s cubic-bezier(0.29, 0.73, 0.45, 1),
			-webkit-clip-path 0.8s cubic-bezier(0.29, 0.73, 0.45, 1),
			border-color 3.6s linear,
			transform 0.8s ease;
		will-change: clip-path, transform;
		overflow: hidden;
	}

	.fixed-element {
		position: absolute;
		bottom: 0;
		right: 0;
		opacity: 0.1;
		z-index: -1;
	}
	.navigation-buttons {
		display: flex;
		gap: 8px;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 9;

		@media(max-width: 767px){
			right: 15px;
		}
		svg {
			height: 40px;

			path {
				transition: ${theme.animations.transition.default};
			}
		}

		.navigation-buttons-right {
			cursor: pointer;

			&:hover {
				path {
					stroke: ${theme.colors.theme.hoverColor.base};
				}
			}
		}

		.navigation-buttons-left {
			cursor: pointer;

			&:hover {
				path {
					stroke: ${theme.colors.theme.hoverColor.base};
				}
			}
		}
	}

	.image-slider-item-1 {
		margin: 0;
		position: absolute;
		width: 48vh;
		height: 52vh;
		@media(max-width: 1024px){
			width: 75%;
			height: 375px;
		}
		@media(max-width: 767px){
			position: relative;
			left: 15px;
			height: 320px;
		}
	}

	.image-slider-item-2 {
		width: 50vh;
		height: 55vh;
		position: absolute;
		margin: 0;
		left: 28%;
		top: 30%;
		
		@media(max-width: 1024px){
			width: 63%;
			height: 335px;
			position: absolute;
			margin: 0;
			left: 30%;
			top: 30%;
		}
		@media(max-width: 767px){
			top: 45%;
		}
	}

	.image-slider-item-3 {
		width: 40vh;
		height: 30vh;
		position: absolute;
		margin: 0;
		left: 12%;
		top: 75%;
		z-index: 3;
		@media(max-width: 1024px){
			width: 53%;
			height: 205px;
			position: absolute;
			margin: 0;
			left: 10%;
			top: 62%;
			z-index: 3;
		}
		@media(max-width: 992px){
			width: 53%;
			height: 205px;
			position: absolute;
			margin: 0;
			left: 10%;
			top: 52%;
			z-index: 3;
		}
		@media(max-width: 767px){
			top: 110%;
		}
		
	}

	.single-slider-image-wrapper {
		.item-single {
			height: 100%;
			//&.item-1{
			//	aspect-ratio: 370 / 420;
			//}
			//
			//&.item-3{
			//	aspect-ratio: 415 / 380;
			//}
			//&.item-2{
			//	aspect-ratio: 255 / 320;
			//
			//}
		}

		.image-feature {
			position: relative;
			height: 100%;
			&.image-feature-1 {
				padding-top: calc(420 / 370 * 100%);
			}
			&.image-feature-2 {
				padding-top: calc(380 / 415 * 100%);
			}
			&.image-feature-3 {
				padding-top: calc(320 / 255 * 100%);
			}
		}
	}

	${theme.grid.media.up.laptop} {
	}

	${theme.grid.media.down.md} {
		.row{
			flex-direction: column;
		}
		.col-md-6{
			max-width: 100%;
			flex: 0 0 100%;
			width: 100%;
			padding: 0 15px;
		}
		
		.book-now-content{
			margin-top: 20rem;
		}
	}

	${theme.grid.media.down.md} {
		.book-now-content{
			margin-top: 15rem;
		}
	}
`;

export default SliderTemplate1;
