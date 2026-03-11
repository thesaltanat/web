'use client';

import { useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Autoplay, Grid, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import BodyText from '@/src/components/ui/BodyText';
import NavigationButton from '@/src/components/ui/NavigationButton';
import { SingleImage } from '@/src/components/ui/SingleImage';
import Title from '@/src/components/ui/Title';
import useContainerOffset from '@/src/hooks/useContainerOffset';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import styled from 'styled-components';
import SwiperCore from 'swiper';
SwiperCore.use([Autoplay]);
/**
 * Gallery Testimonial template component
 * Props:
 *  - images: array of { src, alt } objects
 *  - title: string
 *
 * This uses the project's `Title` component for the heading and provides a
 * lightweight, dependency-free lightbox (named `LightGallery` locally) so we
 * don't have to rely on external wrappers. Clicking a thumbnail opens the
 * modal; arrow keys navigate and Esc closes.
 */
const Testimonial = ({ title = 'Gallery', data }) => {
	useShowSetting();
	const offset = useContainerOffset('.container');

	// Memoize the partner images to prevent unnecessary re-renders
	const partnerImages = useMemo(
		() =>
			data?.posts?.list?.map((e, index) => (
				<SwiperSlide key={index}>
					<div className="single-testimonial-item">
						<Title
							tag={'subheader'}
							margin={'0 0 60px'}
							textTransform={'uppercase'}
							animate={true}
							color={`#DED6BE`}
							text={e?.data?.subtitle}
						/>
						<div className={'testimonial-content'}>
							<svg
								width="138"
								height="110"
								viewBox="0 0 138 110"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									opacity="0.69"
									d="M11.6802 15.7575C-1.29295 29.8375 0.0132904 47.9188 0.0545502 48.125V103.125C0.0545502 104.948 0.77887 106.697 2.06818 107.986C3.3575 109.276 5.10619 110 6.92955 110H48.1795C55.7627 110 61.9295 103.833 61.9295 96.25V48.125C61.9295 46.3016 61.2052 44.553 59.9159 43.2636C58.6266 41.9743 56.8779 41.25 55.0545 41.25H33.8933C34.0416 37.8516 35.0569 34.5477 36.8427 31.6525C40.3352 26.1456 46.9145 22.385 56.4089 20.4875L61.9295 19.3875V0H55.0545C35.9214 0 21.3258 5.30062 11.6802 15.7575ZM87.3533 15.7575C74.3733 29.8375 75.6864 47.9188 75.7277 48.125V103.125C75.7277 104.948 76.452 106.697 77.7413 107.986C79.0306 109.276 80.7793 110 82.6027 110H123.853C131.436 110 137.603 103.833 137.603 96.25V48.125C137.603 46.3016 136.878 44.553 135.589 43.2636C134.3 41.9743 132.551 41.25 130.728 41.25H109.566C109.715 37.8516 110.73 34.5477 112.516 31.6525C116.008 26.1456 122.588 22.385 132.082 20.4875L137.603 19.3875V0H130.728C111.595 0 96.9989 5.30062 87.3533 15.7575Z"
									fill="#433D2F"
								/>
							</svg>
							<BodyText
								as={'p'}
								color={'#FFFFFF'}
								margin={'20px 0 0 0'}>
								{parse(e?.data?.description)}
							</BodyText>
						</div>

						<div className="designation-element">
							<div className="rounded-image">
								<SingleImage
									src={ 'https://bestinbd.com' +
										e?.images?.list?.[0]?.urls?.large ? e?.images?.list?.[0]?.urls?.large : e?.images?.list?.[0]?.full_path ||
										'/images/static/blur.jpg'
									}
								/>
							</div>
							<h4>{e?.data?.title}</h4>
							<p>{e?.data?.short_desc}</p>
						</div>
					</div>
				</SwiperSlide>
			)),
		[data?.posts?.list],
	);

	return (
		<StyledTestimonial offset={offset}>
			<Container>
				<Row>
					<Col md={{ span: 12 }} className="form_template__content">
						<div className="d-flex title-with-navigation justify-content-between align-items-center">
							<Title
								color={theme.colors.white.base}
								text={
									data?.section_data?.subtitle
										? data?.section_data?.subtitle
										: title
								}
								tag="h2"
								margin={'0 0 0'}
								textTransform="uppercase"
								animate={false}
							/>

							<ul className="navigation-buttons">
								<NavigationButton
									id="navigation-buttons-left"
									className="navigation-buttons-left"
									hoverColor={
										theme.colors.theme.hoverColor.base
									}
									initialPathColor={theme.colors.white.base}
									ariaLabel="Previous testimonials">
									<svg
										width="32"
										height="5"
										viewBox="0 0 32 5"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M4.28575 0.212402L0.857178 2.12539L4.28575 4.03838"
											stroke="white"
											strokeMiterlimit="10"
										/>
										<path
											d="M0.857178 2.12549H31.7143"
											stroke="white"
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
											stroke="white"
										/>
									</svg>
								</li>
								<NavigationButton
									id="navigation-buttons-right"
									className="navigation-buttons-right"
									hoverColor={
										theme.colors.theme.hoverColor.base
									}
									initialPathColor={theme.colors.white.base}
									ariaLabel="Next testimonials">
									<svg
										width="32"
										height="5"
										viewBox="0 0 32 5"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M27.4285 0.212402L30.8571 2.12539L27.4285 4.03838"
											stroke="white"
											strokeMiterlimit="10"
										/>
										<path
											d="M30.8571 2.12549H-3.40939e-05"
											stroke="white"
											strokeWidth="0.9798"
											strokeMiterlimit="10"
										/>
									</svg>
								</NavigationButton>
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
			<Container fluid>
				<Row>
					<Col md={12}>
						<Swiper
							slidesPerView={2}
							slidesPerGroup={2}
							spaceBetween={25}
							loop={true}
							loopAddBlankSlides={false}
							cssMode={false}
							speed={1000}
							navigation={{
								prevEl: '#navigation-buttons-left',
								nextEl: '#navigation-buttons-right',
							}}
							breakpoints={{
								320: {
									slidesPerView: 1,
									spaceBetween: 15,
									freeMode: true,
									speed: 2000,
									loop: false,
									cssMode: false,
									loopAdditionalSlides: 1,
								},
								768: {
									slidesPerView: 2,
									spaceBetween: 15,
								},
								1024: {
									slidesPerView: 2,
									spaceBetween: 25,
								},
							}}
							modules={[Navigation, Grid]}
							className="about-slider_mask w-slider-mask">
							{data?.posts?.list?.length > 0 && partnerImages}
						</Swiper>
					</Col>
				</Row>
			</Container>
			<div className={'fixed-element'}>
				<img src={'/images/static/leaf-bg-2.png'} alt="" />
			</div>
		</StyledTestimonial>
	);
};

const StyledTestimonial = styled.section`
	padding: 120px 0;
	background: ${theme.colors.theme.colorTwo.base};
	position: ${theme.positioning.type.relative};

	.fixed-element {
		position: ${theme.positioning.type.absolute};
		right: 0;
		bottom: -100px;
		z-index: 1;
		opacity: 0.3;
	}

	.single-testimonial-item {
		position: ${theme.positioning.type.relative};
		padding-left: ${props => (props.offset ? props.offset + 'px' : '80px')};
		padding-right: ${props =>
			props.offset ? props.offset + 'px' : '80px'};
		transition: ${theme.animations.transition.default};

		.subheader {
			font-weight: 400;
			font-style: normal;
			font-size: 2.2222rem !important;
			line-height: 100%;
			letter-spacing: -0.0444rem;
		}

		.testimonial-content {
			position: ${theme.positioning.type.relative};

			svg {
				position: ${theme.positioning.type.absolute};
				z-index: -1;
				top: -50px;
				left: 0;
			}
		}

		.designation-element {
			.rounded-image {
				position: relative;
				//padding-top: calc(100 / 100 * 100%);
				height: 100px;
				width: 100px;
				border-radius: 50%;
				overflow: hidden;
				margin-top: 40px;
			}

			h4 {
				margin-top: 20px;
				color: ${theme.colors.white.base};
				font-weight: 500;
				font-style: normal;
				font-size: 1.3333rem;
				line-height: 100%;
				letter-spacing: -0.0267rem;
			}

			p {
				color: ${theme.colors.white.base};
				font-weight: 400;
				font-style: normal;
				font-size: 0.8889rem;
				line-height: 100%;
				letter-spacing: -0.0178rem;
			}
		}
	}

	.title-with-navigation {
		margin-bottom: 100px;
	}

	.navigation-buttons {
		display: flex;
		gap: 8px;

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

	.swiper-slide-active {
		transition: ${theme.animations.transition.default};
	}

	${theme.grid.media.up.laptop} {
		.swiper-slide-active {
			transition: ${theme.animations.transition.default};
			border-right: 1px solid rgba(255, 255, 255, 0.5);
		}
	}

	${theme.grid.media.down.tab} {
	}

	${theme.grid.media.down.md} {
		padding: 100px 0 0;

		.title-with-navigation {
			flex-direction: column;
			gap: 30px;
			align-items: flex-start !important;
			justify-content: flex-start;
			margin-bottom: 60px;
		}

		.single-testimonial-item {
			padding-left: 0 !important;
			padding-right: 0 !important;
		}
	}
`;

export default Testimonial;
