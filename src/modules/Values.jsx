'use client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Accordion, Col, Container, Row } from 'react-bootstrap';
import parse from 'html-react-parser';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import theme from '@/src/styles/theme';
import Title from '@/src/components/ui/Title';
import BodyText from '@/src/components/ui/BodyText';
import Button from '@/src/components/ui/Button';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';
gsap.registerPlugin(ScrollTrigger);

const MyComponent = ({ reverse, id, data }) => {


	const allThumbImage = data?.images?.list?.filter(e => e?.thumb == 'on');
	const backgroundImage = data?.images?.list?.find(e => e?.background == 'on');

	const centerImage = allThumbImage?.[2];
	const left_image = allThumbImage?.[0];
	const right_image = allThumbImage?.[1];


	return (
		<StyledComponent
			className={`pt-160 pb-160 divider`}
			style={{
				backgroundImage: backgroundImage
					? `url(https://bestinbd.com${backgroundImage?.full_path})`
					: 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			id={`${id ? id : 'Strength'}`}>
			<img className={'about-right'} src={'/images/static/ring.png'} />
			<Container>
				<Row>
					<Col md={10}>
						<Title
							text={data?.section_data?.subtitle}
							tag={'h2'}
							textTransform={'uppercase'}
							color={'#fff'}
							animate={true}
							margin={'0 0 40px 0'}
						/>
						<BodyText color={'rgba(255, 255, 255, 1)'} margin={'0 0 60px 0'}>
							{parse(data?.section_data?.short_desc || data?.section_data?.description || '')}
						</BodyText>
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
				</Row>
				<Row
					className={`address__row ${reverse ? 'flex-row-reverse' : ''}`}>
					<Col
						md={reverse ? { span: 5, offset: 1 } : { span: 5 }}
						className={'address__image'}>
						<div className="address__img">
							<SingleImageParallax
								src={ left_image?.urls?.large ?
									'https://bestinbd.com' +
									left_image?.urls?.large :
									'https://bestinbd.com' +
									left_image?.full_path
								}
							/>
							<div className="image-circle-ring-background">
								<img src="/images/static/circle-ring-black.svg" alt="" />
							</div>
						</div>
						<div className="right-img">
							<SingleImageParallax src={ right_image?.urls?.large ?
								'https://bestinbd.com' +
								right_image?.urls?.large :
								'https://bestinbd.com' +
								right_image?.full_path
							}/>
							<div className="right-image-fixed">
								<img src="/images/static/vector-dot-color.svg" alt="" />
							</div>
						</div>
						<div className="center-img">
							<SingleImageParallax classImage={'center-img'} src={
								centerImage?.urls?.large ?
								'https://bestinbd.com' +
								centerImage?.urls?.large :
								'https://bestinbd.com' +
								centerImage?.full_path
							}/>
						</div>


						<img
							data-speed={0.9}
							className={'stone'}
							src={'/images/static/imgi_7_stone.png'}
						/>
					</Col>
					<Col
						className={` fade-up address__accordion`}
						md={reverse ? { span: 6 } : { span: 6, offset: 1 }}>
						{data?.posts?.list &&
							data?.posts?.list?.length > 0 &&
							data?.posts?.list.map((element, index) => {
								return (
									<SinglePostItem key={index}>
										<h4>{parse(element?.data?.title)}</h4>
										{parse(element?.data?.description)}
									</SinglePostItem>
								);
							})}
					</Col>
				</Row>
			</Container>
		</StyledComponent>
	);
};
const SinglePostItem = styled.div`

	padding-bottom: 30px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	margin-bottom: 30px;
	h4 {
		color: white;
		font-family: ${theme.typography.fonts.primary};
		font-weight: 500; /* Medium */
		font-style: normal;
		font-size: 1.333rem; /* 24px */
		line-height: 100%;
		letter-spacing: -0.027rem; /* -2% */
		margin-bottom: 25px;
	}

	p {
		color: rgba(255, 255, 255, 0.6);
	}
`;
const StyledComponent = styled.section`
	background: #141A12;
	position: relative;
	overflow: hidden;
	padding: 150px 0 250px;
	background-blend-mode: soft-light, normal;

	.about-right {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 0;
		will-change: transform;
	}



	.address__image {
		position: relative;
		margin-top: 5rem;

		.right-img {
			position: absolute;
			bottom: -80px;
			right: -5%;
			.global-image{
				position: relative !important;
				inset: unset !important;
				height: auto !important; 
				width: auto !important;
				img{
					position: relative !important;
					inset: unset !important;
					height: auto !important;
					width: auto !important;
				}
			}
			.right-image-fixed{
				position: absolute;
				z-index: 4;
				right: -50px;
				bottom: -50px;
			}
		}

		.center-img {
			position: absolute;
			bottom: -5%;
			right: 25%;
			z-index: 1;
			.global-image{
				position: relative !important;
				inset: unset !important;
				height: auto !important;
				width: auto !important;
				img{
					position: relative !important;
					inset: unset !important;
					height: auto !important;
					width: auto !important;
				}
			}
		}

		.stone {
			position: absolute;
			bottom: -40px;
			right: 45%;
			z-index: 2;
		}
		
		@media(max-width: 1025px){
				//max-width: 100%;
				//width: 100%;
		}
	}



	.address__img {
		position: relative;
		padding-top: calc(530 / 530 * 100%);
		.image-circle-ring-background{
			position: absolute;
			top: -105px;
			right: -100px;
			z-index: 3;
			
		}
	}

	@media(max-width: 1024px) {
		padding: 150px 0 150px;
		
		.address__img{
			max-width: 85%;
			
		}
		.right-img{
			position: absolute;
			right: 30px !important;
			bottom: unset !important;
			top: 25%;
		}
		.center-img{
			bottom: unset !important;
			top: 35% !important;
			right: 40% !important;
			
		}
		.stone{
			right: 42% !important;
			z-index: 2;
			height: 70px;
			bottom: unset !important;
			top: 35% !important;
			display: none !important;
		}
		.address__accordion{
			//width: 100%;
			//max-width: 100%;
			margin: 60px 0 0!important;
		}
	}
	@media (max-width: 992px) {
		.right-img{
			right: 30px !important;
			bottom: unset !important;
			top: 15%;
		}
		.center-img{
			bottom: unset !important;
			top: 20% !important;
			right: 40% !important;

		}
	}

	@media (max-width: 767px) {
		padding-top: 250px;
		padding-bottom: 80px;
		.address__img {
			width: calc(100% - 40px);
			max-width: calc(100% - 40px);
		}
		.center-img{
			top: unset !important;
			bottom: -0% !important;
			right: 25% !important;
		}
		
		.right-img{
			right: 30px !important;
			bottom: -5% !important;
			top: unset !important;
		}
		.about-right{
			height: 200px;
		}
		.address__form {
			margin-top: 0;
			margin-bottom: 60px;
		}

	}
`;
export default MyComponent;
