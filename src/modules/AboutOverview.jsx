// javascript
'use client';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import React, { useRef, useEffect } from 'react';
import parse from 'html-react-parser';
import ThemeLayout from '@/src/components/ui/themeLayout';
import Title from '@/src/components/ui/Title';
import { SingleImage } from '@/src/components/ui/SingleImage';
import useWindowSize from '@/src/hooks/useWindowSize';
import Slider, { Slide } from '@/src/render/swiper-wrapper';
import Button from '@/src/components/ui/Button';
import theme from '@/src/styles/theme';
import BodyText from '@/src/components/ui/BodyText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

function AboutOverview({ data }) {
	const windowSize = useWindowSize();
	const SwiperRef = useRef();
	const wrapperRef = useRef(null);

	// Function to initialize swiper
	const handleSwiperInit = swiper => swiper;

	// Helper to safely render/parse content that might not be a string
	const renderParsed = value => {
		if (value == null) return null;
		if (React.isValidElement(value)) return value;
		if (typeof value === 'string') return parse(value);
		// numbers / booleans / objects -> coerce to string and parse
		try {
			return parse(String(value));
		} catch {
			// fallback: return stringified value if parsing fails
			return String(value);
		}
	};

	const CounterDigit = ({ counter, title, counter_bottom }) => {
		return (
			<div className="svg-icon counter-digit">
				<div className="header-counter">
					<h5 className={'split-up counter'}>{renderParsed(counter)}+</h5>
					<h6 className={'split-up'}>{renderParsed(title)}</h6>

				</div>
				<BodyText color={'#fff'} margin={'45px 0 0'}>
					{renderParsed(counter_bottom)}
				</BodyText>
			</div>
		);
	};

	// safe JSON.parse for text_fields
	let counterData = [];
	try {
		const raw = data?.section_data?.text_fields ?? '[]';
		counterData = typeof raw === 'string' ? JSON.parse(raw || '[]') : raw;
		if (!Array.isArray(counterData)) counterData = [];
	} catch {
		counterData = [];
	}

	// scroll-based horizontal translation using wrapperRef + querySelectorAll

	// pin & scroll animation
	useGSAP(() => {
		if (window?.innerWidth > 992) {
			const containerElement = document.querySelector(".container");
			if (containerElement) {
				gsap.set(".scroll-video-items", {
					x: containerElement.offsetLeft + 15,
				});
				gsap
					.timeline({
						scrollTrigger: {
							id: `w`,
							trigger: ".pin-section",
							start: `top ${window.innerWidth > 1900 ? "-100" : "-180"}`,
							scrub: 1,
							toggleActions: "play none none reverse",
						},
					})    .to(".scroll-video-items", {
					ease: "linear",
					// x: -ScrollWidth,

					xPercent: -30,

					// duration: 1,
				});
			}
		}

		return () => {
			ScrollTrigger.getById("w")?.kill(); // Proper cleanup
		};
	}, [data]);



	return (
		<StyleComponent className="scroll-video pt-200 ">
			<div className={'fixed-element '} data-size={10}>
				<img src={'/images/static/fixed-element-1.png'} alt="" />
			</div>
			<ThemeLayout>
				<Col md={12} data-speed={'clamp(1.13)'}>
					<Title
						tag={'h2'}
						margin={'0 0 60px'}
						color={'white'}
						textTransform={'uppercase'
						}
						text={data?.section_data?.subtitle}
					/>
				</Col>

				<Col md={{ span: 9, offset: 3 }} data-speed={'clamp(1.2)'}>
					{data?.section_data?.short_desc && (
						<div className="content">
							<BodyText color={'#FFFFFF'} margin={'0 0 45px'}>
								{renderParsed(data?.section_data?.short_desc)}
							</BodyText>
						</div>
					)}
				</Col>

				<Col
					data-speed={'clamp(1.13)'}
					md={{ span: 8 }}
					className={'full-width-col'}>

					{data?.section_data?.description &&
						<BodyText color={'#FFFFFF'} margin={'0 0 40px'}>
							{renderParsed(data?.section_data?.description)}
						</BodyText>
						}
				</Col>

				<Col md={{span: 3, offset: 1}} className={'d-flex align-items-center'}>
					<Button
						src={'/'}
						background={'#FAF8F2'}
						hoverBackground={theme.colors.theme.hoverColor.base}
						text={'Invest now'}
						color={'#131D0D'}
						inLineColor={'#182315'}
						outLineColor={'#FFFFFF94'}
						inLineHoverColor={'#FFFFFF94'}
						outLineHoverColor={'#182315'}
					/>
				</Col>

				<Col md={{ span: 12 }} data-speed={'clamp(1.1)'}>
					<CounterDigit
						title={counterData?.[1]?.value}
						counter_bottom={counterData?.[2]?.value}
						counter={counterData?.[0]?.value}
					/>
				</Col>
			</ThemeLayout>

			<ThemeLayout>
				{data?.posts?.list &&
					data?.posts?.list.map((e, index) => (
						<Col md={4} key={index} >
							<ServiceList key={index}>
								<h4>{e?.data?.title}</h4>
								<p>{parse(e?.data?.description)}</p>
							</ServiceList>
						</Col>
					))}
			</ThemeLayout>

			{/* video scroll for desktop */}
			<div ref={wrapperRef} className="wrapper-scroll parallax-xx">
				{windowSize > 991 ? (
					<div className="desktop scroll-video-items">
						{data?.images?.list &&
							data?.images?.list.map((e, index) => (
								<div
									key={index}
									className="scroll-video-items__single">
									<div className="scroll-video-items__single__video">
										<SingleImage
											alt={data?.section?.title}
											src={
												(e?.full_path?.startsWith(
													'http',
												)
													? ''
													: 'https://bestinbd.com') +
												e?.full_path
											}
										/>
									</div>
								</div>
							))}
					</div>
				) : (
					<div className="scroll-video-items">
						<Slider
							ref={SwiperRef}
							navigationLeft={'.achievements .prev'}
							navigationRight={'.achievements .next'}
							effect={true}
							loop={true}
							grabCursor={false}
							watchSlidesProgress={false}
							mousewheelControl={false}
							keyboardControl={false}
							onSwiperInit={handleSwiperInit}
							spaceBetween={30}
							slidesPerView={1}
							allowSlideNext={true}
							allowSlidePrev={true}
							speed={900}
							autoplay={true}
							infinity={false}
							breakpoints={{
								768: { slidesPerView: 3, spaceBetween: 30 },
							}}>
							{data?.images?.list &&
								data?.images?.list.map((e, index) => (
									<Slide key={index}>
										<div className="scroll-video-items__single">
											<div className="scroll-video-items__single__video">
												<SingleImage
													alt={data?.section?.title}
													src={
														(e?.full_path?.startsWith(
															'http',
														)
															? ''
															: 'https://bestinbd.com') +
														e?.full_path
													}
												/>
											</div>
										</div>
									</Slide>
								))}
						</Slider>
					</div>
				)}
			</div>
		</StyleComponent>
	);
}
const ServiceList = styled.div`
	display: flex;
	flex-direction: column;


	h4{
		font-family: Mosvita,serif;
		font-weight: 500;            /* Medium */
		font-style: normal;
		font-size: 1.778rem;         /* 32px */
		line-height: 100%;
		letter-spacing: -0.089rem;   /* -5% */
		color: #FFFFFF;
		padding-bottom: 25px;
		margin-bottom: 30px;
		border-bottom:  1px solid #B8B8B86B;
		max-width: 80%;
		
	x
	}
	p{
		color: #FFFFFF;
	}
`;
const StyleComponent = styled.section`
	background: #141a12;
	position: relative;
	overflow: hidden;
	padding: 200px 0;

	.fixed-element {
		position: ${theme.positioning.type.absolute};
		right: 0;
		top: 100px;
		z-index: 1;
	}
	.container {
		position: relative;
		z-index: 2;
	}

	ul {
		display: flex;
		margin-top: 60px;
		justify-content: space-between;
		li {
			color: #fff;
			font-weight: 500;
			font-size: 20px;
			line-height: 24px;
			img {
				margin-right: 10px;
			}
		}
	}

	.scroll-video {
		width: 100%;
	}

	.wrapper-scroll {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		transform: translateY(-50%);
		z-index: 0;
		opacity: 0.2;
		margin: 0;
	}

	.scroll-video-items {
		width: 100%;
		@media (min-width: 991px) {
			display: flex;
			gap: 30px;
			align-items: center;
		}
		margin-top: 60px;

		&__single {
			position: relative;
			@media (min-width: 991px) {
				min-width: calc(25% - 30px);
			}

			&:nth-of-type(even) {
				transform: translateY(30px);
			}

			&__video {
				padding-top: calc(600 / 450 * 100%);
				position: relative;
				border-radius: 8px;
				overflow: hidden;

				video {
					position: absolute;
					height: 100%;
					width: 100%;
					object-fit: cover;
					inset: 0;
				}
			}

			will-change: transform;
			transition: transform 0.35s cubic-bezier(0.22, 0.9, 0.35, 1);
		}

		&.desktop {
			.scroll-video-items__single {
				.scroll-video-items__single__video {
					padding: 0 !important;
					.global-image {
						position: unset;
						img {
							position: unset !important;
							height: auto !important;
							width: 100% !important;
						}
					}
				}
			}
		}
	}

	.content {
		p,
		h6 {
			color: white;
		}
	}

	.counter-digit{
		.header-counter{
			display: flex;
			gap: 10px;
			align-items: baseline;
			padding-bottom: 10px;
			border-bottom: 1px solid #E8E8E8;
			h5{
				font-weight: 600;
				font-size: 7.111rem;
				line-height: 100%;
				letter-spacing: -0.213rem;
				background: linear-gradient(267.09deg, #968853 10.83%, #DBC278 54.87%, #DCC27D 83.21%, #9E8836 105.42%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				background-clip: text;
				color: transparent;

			}
			h6{
				font-family: Mosvita,serif;
				font-weight: 600;        /* Semi Bold */
				font-style: normal;
				font-size: 3.556rem;     /* 64px */
				line-height: 100%;
				letter-spacing: -0.107rem; /* -3% */
				background: linear-gradient(267.09deg, #968853 10.83%, #DBC278 54.87%, #DCC27D 83.21%, #9E8836 105.42%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				background-clip: text;
				color: transparent;

			}
			
			@media(max-width: 767px){
				margin-top: 45px;
				flex-direction: column;
			}
		}
	}
	.svg-icon {
		position: relative;
		margin-bottom: 60px;
	}



	@media (max-width: 992px) {
		.col-md-4.offset-md-3 {
			margin: 0;
		}
	}
	@media (max-width: 991px) {
		ul {
			flex-wrap: wrap;
			li {
				width: 50%;
				margin-bottom: 25px;
				padding-right: 10px;
				img {
					display: block;
					margin-bottom: 5px;
				}
			}
		}
	}

	@media (max-width: 767px) {
		padding-top: 180px !important;
		h2{
			font-size: 2rem;
		}
	
		.title,
		.content {
			margin-bottom: 60px;
		}
		.swiper-initialized {
			padding-right: 120px;
		}
		.scroll-video-items {
			transform: translate(0);
		}
		.full-width-col {
			margin-top: 0;
		}
	}

	@media (max-width: 400px) {
		padding: 120px 0;
		.title,
		.content {
			margin-bottom: 60px;
		}
		.swiper-initialized {
			padding-right: 120px;
		}
		.scroll-video-items {
			transform: translate(0);
		}
		.svg-icon {
			svg {
				height: 100px;
				width: 100%;
			}
		}
	}
`;

export default React.memo(AboutOverview);
