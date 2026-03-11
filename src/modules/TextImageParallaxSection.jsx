'use client';
import Button from '@/src/components/ui/Button';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';
import Title from '@/src/components/ui/Title';
import theme from '@/src/styles/theme';
import React, { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import BodyText from '../components/ui/BodyText';
import parse from 'html-react-parser';
import Image from 'next/image';
const TextImageParallaxSection = ({ data }) => {
	const [scrollY, setScrollY] = useState(0);
	const sectionRef = useRef(null);



	const imgOne = data?.images?.list?.[0]?.urls ? 	'https://bestinbd.com' + data?.images?.list?.[0]?.urls?.large :
		'https://bestinbd.com' + data?.images?.list?.[0]?.full_path;
	const imgTwo = data?.images?.list?.[1]?.urls ? 	'https://bestinbd.com' + data?.images?.list?.[1]?.urls?.large :
		'https://bestinbd.com' + data?.images?.list?.[1]?.full_path;
	const imgThree = data?.images?.list?.[2]?.urls ? 	'https://bestinbd.com' + data?.images?.list?.[2]?.urls?.large :
		'https://bestinbd.com' + data?.images?.list?.[2]?.full_path;


	return (
		<StyledTextImageParallaxSection
			ref={sectionRef}
			className="pt-150 pb-150"
			id={'art_of_escap'}>
			<img
				data-speed={0.9}
				className={'home-overview animated-top'}
				src={'/images/static/leaf-bg-1.svg'}
				alt={'home-overview'}
			/>
			<div className={'ring animated-bottom'} data-size={'0.9'}>
				{/* eslint-disable-next-line jsx-a11y/alt-text */}
				<img data-speed={0.9} src={'/images/static/leaf-bg-4.svg'} />
			</div>
			<Container>
				<Row className={'row'}>
					<LeftColumn className={'col-md-5'}>
						<Title
							animate={true}
							tag={'h2'}
							textTransform={'uppercase'}
							text={data?.section_data?.subtitle}
							margin={'0 0 30px 0'}
						/>

						<Description>
							<BodyText as={'divx'}
								color={theme.colors.white.base}
								margin={'0 0 40px 0'}
								animate={true}>
								{parse(data?.section_data?.description)}
							</BodyText>
						</Description>
					</LeftColumn>

					<RightColumn className={'col-md-7'}>
						{/* Image 2 - Top right with window view */}
						<ImageWrapper2
							style={{
								transform: `translateY(${scrollY * -30}px)`,
							}}>
							<SingleImageParallax
								src={imgOne}
								alt="Window view"
							/>
						</ImageWrapper2>
						{/* Image 3 - Center with corridor */}
						<ImageWrapper3>
							<SingleImageParallax src={imgTwo} alt="Corridor" />
						</ImageWrapper3>

						{/* Image 3 - Center with corridor */}
						<ImageWrapper4>
							<SingleImageParallax
								src={imgThree}
								alt="Corridor"
							/>
							<RotatingCircle>
								<svg
									viewBox="0 0 200 200"
									width="200"
									height="200">
									<defs>
										<path
											id="circlePath"
											d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
										/>
									</defs>
									<text
										fontSize="16"
										fontFamily="Arial, sans-serif"
										fill="#202020;"
										letterSpacing={2.8}>
										<textPath href="#circlePath">
											CREATIVITY • QUALITY • CREATIVITY •
											QUALITY •
										</textPath>
									</text>
								</svg>
							</RotatingCircle>

							<Image
								width={200}
								height={200}
								data-speed={0.9}
								className={'stone'}
								src={'/images/static/stone.svg'}
							 alt={'Stone'}/>
						</ImageWrapper4>

						{/* Bottom text with rotating border */}
						<TextSection>
							<Title
								animate={false}
								tag={'h2'}
								textTransform={'uppercase'}
								text={data?.section_data?.short_desc}
								margin={'0 0 40px 0'}
							/>
							<Button text={'Learn more'} src={'/about-us'} />
						</TextSection>

						<CurvedLine />
					</RightColumn>
				</Row>
			</Container>
		</StyledTextImageParallaxSection>
	);
};

const StyledTextImageParallaxSection = styled.section`
	background: ${theme.colors.theme.background.base};

	padding: 150px 0 100px;
	overflow: hidden;
	position: relative;
	
	.container{
		z-index: 8;
		position: relative;
	}

	.stone {
		position: absolute;
		bottom: -50px;
		left: -150px;
		height: 100px;
		@media(max-width: 767px){
			position: absolute;
			bottom: -50px;
			left: unset;
			height: 80px;
			right: -80px;
			width: auto;
		}
	}
	.ring {
		position: absolute;
		top: 0;
		right: -10px;
		z-index: 9;
		@media(max-width: 767px){
			z-index: 8;
			img{
				height: 200px;
			}
		}
	}
	.home-overview {
		position: absolute;
		left: 0;
		opacity: 0.2;
		bottom: 25%;
		z-index: 4;
	}

	${theme.grid.media.down.tab} {
		//.col-md-5{
		//	max-width: 100%;
		//	flex: 0 0 100%;
		//	width: 100%;
		//}
		//.col-md-7{
		//	max-width: 100%;
		//	flex: 0 0 100%;
		//	width: 100%;
		//	
		//}
		//.row{
		//	flex-direction: column;
		//}
	}
`;

const Row = styled.div`
	display: flex;
	position: relative;

	@media (max-width: 1024px) {
	}
`;

const LeftColumn = styled.div`
	flex: 1;
	position: relative;
	z-index: 2;
`;

const Description = styled.div`
	p {
		color: #4a4a4a;
		max-width: 100%;
		margin-bottom: 60px;
		padding-left: 5rem;
		padding-right: 3rem;
		@media(max-width: 1319px){
			padding-left: 0;
			padding-right: 8rem;
		}
		${theme.grid.media.down.laptop} {
			margin-bottom: 40px;
			padding-left: 2rem;
			width: 90%;
			p{
				padding-left: 0;
				margin-bottom: 0;
				width: 100%;
			}
		}
		${theme.grid.media.down.tab} {
			margin-bottom: 40px;
			padding-left: 0;
			width: 98%;
			p{
				padding-left: 0;
				margin-bottom: 0;
				width: 100%;
			}
		}
	}
`;



const RightColumn = styled.div`
	flex: 1;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const ImageWrapper2 = styled.div`
	width: 80%;
	min-height: 620px;
	max-width: 90%;
	margin-bottom: -100px;
	z-index: 3;
	transition: transform 0.3s ease-out;

	img {
		width: 100%;
		height: auto;
		display: block;
	}


	@media(max-width: 767px){
		width: 520px;
		min-height: 360px;
		max-width: 60%;
		margin-bottom: -100px;
	}

`;

const ImageWrapper3 = styled.div`
	width: 65%;
	margin-right: 35%;
	z-index: 3;
	transition: transform 0.3s ease-out;
	margin-top: -40%;
	position: relative;
	height: 490px;
	aspect-ratio: 385 / 490;

	img {
		width: 100%;
		height: auto;
		display: block;
	}
	@media(max-width: 1025px){
		max-width: 70%;
		margin-right: 35%;
		margin-top: -50%;
	}

	@media(max-width: 767px){
		max-width: 60%;
		margin-right: 19%;
		margin-top: -26%;
		height: 350px;
	}
	
`;

const ImageWrapper4 = styled.div`
	width: 60%;
	min-height: 450px;
	max-width: 75%;
	margin-right: 70%;
	z-index: 3;
	transition: transform 0.3s ease-out;
	margin-top: -25%;
	position: relative;

	img {
		width: 100%;
		height: auto;
		display: block;
	}

	@media(max-width: 1025px){
		margin-top: -25%;
		margin-left: 80%;
		left: -15%;
	}
	@media(max-width: 992px){
		max-width: 75%;
		margin-right: 38%;
		margin-top: -30%;
	}
	@media(max-width: 767px){
		max-width: 60%;
		margin-right: 25%;
		margin-top: -33%;
		min-height: 300px;
		
	}
	
`;

const TextSection = styled.div`
	margin-top: -30px;
	left: 30%;
	position: relative;
	width: 85%;
	top: -12%;
	@media(max-width: 1025px){
		left: 15%;
	}
	@media(max-width: 992px){
		margin-top: 100px;
		left: 0;
		position: relative;
		width: 100%;
		top: unset;
	}
`;

const RotatingCircle = styled.div`
	position: absolute;
	width: 170px;
	height: 170px;
	flex-shrink: 0;
	bottom: 30%;
	left: -30%;
	color: #0e5891;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;

	svg {
		animation: rotate 20s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	
	@media(max-width: 767px){
		bottom: -22%;
		left: 50%;
		display: none;
	}
`;

const CurvedLine = styled.div`
	position: absolute;
	top: 20%;
	right: 10%;
	width: 200px;
	height: 200px;
	border: 3px solid #d4a574;
	border-radius: 50% 50% 0 50%;
	transform: rotate(-45deg);
	z-index: 1;
	opacity: 0.6;

	${theme.grid.media.down.laptop} {
		display: none;
	}
`;

export default React.memo(TextImageParallaxSection);
