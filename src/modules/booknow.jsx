'use client';

import { Col, Container, Row } from 'react-bootstrap';
import Title from '@/src/components/ui/Title';
import styled from 'styled-components';
import theme from '@/src/styles/theme';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import BodyText from '@/src/components/ui/BodyText';
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Grid, Navigation } from 'swiper/modules';
import React, { useMemo, useState } from 'react';
import SwiperCore from 'swiper';
import { SingleImage } from '@/src/components/ui/SingleImage';
import useContainerOffset from '@/src/hooks/useContainerOffset';
import Button from '@/src/components/ui/Button';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';
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
const Testimonial = ({ title = 'Title', data }) => {
	const dataAvailable = useShowSetting();
	const offset = useContainerOffset('.container')

	console.log('https://bestinbd.com' + data?.images?.list?.[0]?.urls?.large, 'book now image')
	return (
		<StyledTestimonial offset={offset}>
			<Container fluid>
				<div className="fixed-element animated-top" data-size={20}>
					<img src="/images/static/fixed-element-1.png" alt="" />
				</div>
				<Row>
					<Col md={{ span: 6 }} className="p-0">
						<div className="image_wrapper_book_now">
							<SingleImageParallax src={data?.images?.list?.[0]?.urls?.large ? 'https://bestinbd.com' + data?.images?.list?.[0]?.urls?.large : 'https://bestinbd.com' + data?.images?.list?.[0]?.full_path} />
						</div>
					</Col>
					<Col md={6} className={'book-now-content'}>
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

						<BodyText
							color={'#FFFFFF'}
							margin={'20px 0 0 0'}>
							{parse(data?.section_data?.description || 'Description')}
						</BodyText>
						<Button src={'/'} text={'Book an reservation'}
							inLineColor={'#363229'}
							outLineColor={theme.colors.theme.colorFive.base}
							background={theme.colors.theme.colorFive.base}
							outLineHoverColor={'#363229'}
							inLineHoverColor={theme.colors.theme.colorFive.base}
							color='#263322'
							margin={'60px 0 0'} />

					</Col>
				</Row>
			</Container>

		</StyledTestimonial>
	);
};

const StyledTestimonial = styled.section`
	position: ${theme.positioning.type.relative};
	margin-bottom: -21rem;
	z-index: 3;

	.fixed-element {
		position: absolute;
		bottom: -100px;
		z-index: 3;
		left: 120px;
		img{
			height: 150px;
			object-fit: contain;
		}
		@media(max-width: 1025px){
			left: 0;
		}
	}

	.container-fluid {
		padding-left: ${props => props.offset + 15}px;
	}

	.image_wrapper_book_now {
		position: relative;
		padding-top: calc(595 / 630 * 100%);
		height: 100%;
	}

	.book-now-content {
		background: ${theme.colors.theme.secondary.base};
		padding: 120px ${props => props.offset + 15}px 120px 70px;
	}


	${theme.grid.media.up.laptop} {

	}

	${theme.grid.media.down.tab} {
		background: ${theme.colors.theme.secondary.base};
		.container-fluid {
			padding: 0 15px !important;
		}

		.image_wrapper_book_now {
			img {
				transform: translate(0) scale(1) !important;
			}
		}

		.row {
			flex-direction: column;
		}

		.col-md-6 {
			max-width: 100%;
			flex: 0 0 100%;
			width: 100%;
			padding: 0 15px;
		}

		.book-now-content {
			padding: 120px 50px 100px;
		}
	}

	${theme.grid.media.down.md} {
		margin-bottom: 0;
		.book-now-content {
			padding: 50px 20px 100px;
		}
		.fixed-element{
			display: none;
		}
	}
`;

export default Testimonial;
