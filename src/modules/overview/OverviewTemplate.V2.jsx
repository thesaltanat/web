'use client';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';
import Title from '@/src/components/ui/Title';
import useDeviceTypeMobile from '@/src/hooks/useDeviceTypeMobile';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
const OverviewTemplateV2 = ({ data }) => {
	const isMobile = useDeviceTypeMobile()
	const globalData = useShowSetting()

	return (
		<StyledOverviewV2 className="OverviewV2" data-scroll-section>
			<div className={'fixed-element-2 '} data-size={10}>
				<img src={'/images/static/accordion_pattern.png'} alt="" style={{opacity: 0.1}} />
			</div>

			{
				data?.section_data?.subtitle &&
				<Container>
					<Row>
						<Col md={10}>
							<Title tag={'h3'} margin={'0 0 80px'} text={data?.section_data?.subtitle} color={'#000'}/>
						</Col>
					</Row>
				</Container>

			}

			<Container>


				<Row>
					<Col md={6} className={'mb-lg-5'} style={{paddingRight: '50px', paddingLeft: '6rem'}}>
						{
							data?.section_data?.short_desc &&
							parse(data?.section_data?.short_desc)
						}
					</Col>
					<Col md={6} className={'mb-lg-5'}>
						{
							data?.section_data?.description &&
							parse(data?.section_data?.description)
						}
					</Col>
					<Col md={4}>
						<div className="image-wrapper-first">
							{data?.images?.list?.[0]?.full_path && (
								<SingleImageParallax parallax alt={data?.section_data?.subtitle} src={ data?.images?.list?.[0]?.urls?.large ? 'https://bestinbd.com' + data?.images?.list?.[0]?.urls?.large : 'https://bestinbd.com' +data?.images?.list?.[0]?.full_path} />
							)}

							{
								isMobile &&
								<div className="fix-it-right" data-scroll data-scroll-direction={'vertical'} data-scroll-speed="-3">
									<img src={'/images/static/fixed-element-4.webp'} />
								</div>
							}
						</div>
					</Col>

					<Col md={8}>
						<div className="image-wrapper-second">
							{
								!isMobile &&
								<div className="fix-it-right" data-scroll data-scroll-direction={'vertical'} data-scroll-speed="-3">
									<img src={'/images/static/fixed-element-4.webp'} />
								</div>
							}

							{data?.images?.list?.[1]?.full_path && (
								<SingleImageParallax parallax alt={data?.section_data?.subtitle} src={ data?.images?.list?.[1]?.urls?.large ? 'https://bestinbd.com' +data?.images?.list?.[1]?.urls?.large : 'https://bestinbd.com' + data?.images?.list?.[1]?.full_path} />
							)}
						</div>
						<p style={{marginTop: 55}}>{parse(data?.images?.list?.[1]?.short_desc || '')}</p>
					</Col>
				</Row>
			</Container>
		</StyledOverviewV2>
	);
};

	const StyledOverviewV2 = styled.section`
		padding-top: 160px;
    padding-bottom: 150px;
	position: relative;
	background: #FAF8F2;
	overflow: hidden;
	.fixed-element-2{
		position: ${theme.positioning.type.absolute};
		right: 0;
		top: 0;
		left: 0;
	}
    .container {
        position: relative;
    }

    .image-wrapper-first {
        position: relative;
        padding-top: calc(326 / 370 * 100%);
    }

	.image-wrapper-second{
        position: relative;
        padding-top: calc(326 / 772 * 100%);
		height: 100%;
	}
	.content-only{
		margin-top: 40px;
	}

	.fix-it-right{
        position: absolute;
        right: -50px;
        top: -30px;
		will-change: transform;
		z-index: 2;
		img{
			height: 120px;
		}
	}


	@media(max-width: 767px){
		padding: 100px 0 ;
		.title {
			margin-bottom: 40px;
		}
        .content-only{
			margin-top: 30px;
			padding-left: 30%;
			margin-bottom: 40px;
		}
        .image-wrapper-second{
            padding-top: calc(526 / 772 * 100%);
			margin-top: 30px;

		}
		.col-md-4{
			width: 70%;
		}
		.col-md-6{
			padding-left: 15px !important;
			padding-right: 15px !important;
			margin-bottom: 30px;
		}
	}

	@media(max-width: 767px){
		padding-top: 100px;
		padding-bottom: 100px;
	}
`;

export default React.memo(OverviewTemplateV2);
