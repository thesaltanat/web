'use client';
import CounterDigit from '@/src/components/ui/single-item/CounterDigit.';
import { SingleImage } from '@/src/components/ui/SingleImage';
import ThemeLayout from '@/src/components/ui/themeLayout';
import Title from '@/src/components/ui/Title';
import useWindowSize from '@/src/hooks/useWindowSize';
import { Slide, default as Slider } from '@/src/render/swiper-wrapper';
import parse from 'html-react-parser';
import React, { useRef } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';

function OverviewTemplateV3({ data }) {
	const windowSize = useWindowSize();
	const SwiperRef = useRef();

	// Function to initialize swiper
	const handleSwiperInit = swiper => {
		return swiper;
	};
	return (
		<StyleComponent className="scroll-video pt-200 ">
			<ThemeLayout>
				<Col md={12} data-speed={'clamp(1.13)'}>
					<Title
						fontWeight={600}
						tag={'h2'}
						margin={'0 0 120px'}
						color={'white'}
						text={data?.section_data?.subtitle}
					/>
				</Col>
				<Col md={{ span: 4, offset: 3 }} data-speed={'clamp(1.2)'}>
					{data?.section_data?.short_desc && (
						<div className="content">
							<h6 className={'split-up'}>
								{parse(data?.section_data?.short_desc)}
							</h6>
						</div>
					)}
				</Col>
				<Col md={{ span: 4, offset: 1 }} data-speed={'clamp(1.1)'}>
					<CounterDigit
						title={data?.section_data?.counter_title}
						counter_bottom={data?.section_data?.counter_bottom}
						counter={data?.section_data?.counter}
					/>
				</Col>
				<Col
					data-speed={'clamp(1.13)'}
					md={{ span: 9, offset: 3 }}
					className={'full-width-col'}>
					{data?.section_data?.description &&
						parse(data?.section_data?.description)}
				</Col>
			</ThemeLayout>

			{/* video scroll for desktop  */}
			<div className="wrapper-scroll parallax-xx">
				{windowSize > 991 ? (
					<div className="desktop scroll-video-items">
						{data?.images?.list &&
							data?.images?.list?.map((e, index) => {
								return (
									<div
										key={index}
										className="scroll-video-items__single">
										<div className="scroll-video-items__single__video">
											<SingleImage
												alt={data?.section?.title}
												src={e?.full_path}
											/>
										</div>
									</div>
								);
							})}
					</div>
				) : (
					// mobile slider
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
								768: {
									slidesPerView: 3,
									spaceBetween: 30,
								},
							}}>
							{data?.images?.list &&
								data?.images?.list?.map((e, index) => {
									return (
										<Slide key={index}>
											<div className="scroll-video-items__single">
												<div className="scroll-video-items__single__video">
													<SingleImage
														alt={
															data?.section?.title
														}
														src={e?.full_path}
													/>
												</div>
											</div>
										</Slide>
									);
								})}
						</Slider>
					</div>
				)}
			</div>
		</StyleComponent>
	);
}
const StyleComponent = styled.section`
	background-color: #0f1711;
	position: relative;
	overflow: hidden;
	padding: 200px 0;

	.counter_bottom {
		position: absolute;
		height: auto !important;
		bottom: 20px !important;
	}
	.full-width-col {
		margin-top: 40px;
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
				min-width: calc(33.333% - 30px);
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

	.svg-icon {
		position: relative;
		margin-bottom: 60px;
		.counter_bottom {
			position: absolute;
			height: auto !important;
			bottom: -33px !important;
		}
		p {
			color: white;
			position: absolute;
			bottom: -13px;
			left: 0;
		}
	}

	p {
		color: white;
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

export default React.memo(OverviewTemplateV3);
