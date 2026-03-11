"use client";

import { Col, Container, Row } from "react-bootstrap";
import parse from "html-react-parser";
import styled from "styled-components";
import Title from '@/src/components/ui/Title';
import BodyText from '@/src/components/ui/BodyText';
import Button from '@/src/components/ui/Button';
import React from 'react';

export default function ProjectOverview({data, product}) {

    return (
		<StyledWrapper>
			<div className="fix-it" data-scroll data-scroll-direction={'vertical'} data-scroll-speed="3">
				<img src="/images/static/stone-texture-unique-stone-colo.png" alt="" />
			</div>
			<div className="fixed-it">
				<img src="/images/static/fixed-element-3.svg" alt="" />
			</div>
			<Container>
				<Row>
					<Col md={7} className={'text-center'}>
						<Title
							animate={true}
							color={'#363229'}
							textTransform={'uppercase'}
							center={false}
							text={parse(data?.data?.title || 'At A Glance')}
							tag={'h3'}
							margin={'0 0 40px'}
						/>
					</Col>
					<Col md={5}></Col>
					<Col md={{ span: 4, offset: 1 }}>
						<BodyText margin={'0 0 40px'} color={'#363229'}>
							{parse(data?.data?.description || '')}
						</BodyText>
						<Button
							margin={'0'}
							text={'Download Brochure'}
							backgroundColor={
								'linear-gradient(0deg, #226437, #226437),\n' +
								'\t\t\t\t\t\tlinear-gradient(0deg, #0D2B17, #0D2B17)'
							}
							color={'#FFFFFF'}
							inLineColor={'#FFFFFF'}
							outLineColor={
								'linear-gradient(0deg, #226437, #226437),\n' +
								'\t\t\t\t\t\tlinear-gradient(0deg, #0D2B17, #0D2B17)'
							}
							outLineHoverColor={'#FFFFFF'}
							inLineHoverColor={
								'linear-gradient(0deg, #226437, #226437),\n' +
								'\t\t\t\t\t\tlinear-gradient(0deg, #0D2B17, #0D2B17)'
							}
						/>
					</Col>
				</Row>
			</Container>
		</StyledWrapper>
	);
}


const StyledWrapper = styled.section`
    position: relative;
    padding: 200px 0 ;
	background-image: url("/images/static/background-overview.webp");
	background-size: cover !important;
	background-position: center !important;
	background-repeat: no-repeat !important;
	.container{
		position: relative;
		z-index: 2;
	}
	
	.fixed-it{
		position: absolute;
		left: -80px;
		bottom: 20px;
		z-index: 2;


	}
	
	.fix-it {
		position: absolute;
		right: 100px;
		bottom: 0;
		will-change: transform;
		z-index: 2;

		@media(max-width: 1024px){
			right: 0;
		}
	}

	@media(max-width: 767px){
		padding-bottom: 70vh;
		padding-top: 80px;
		h3{
			font-size: 2rem !important;
		}
	}

`;