'use client';
import BodyText from '@/src/components/ui/BodyText';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';
import ThemeLayout from '@/src/components/ui/themeLayout';
import Title from '@/src/components/ui/Title';
import useDeviceTypeMobile from '@/src/hooks/useDeviceTypeMobile';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import { Fragment } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
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
const OverviewTemplateV1 = ({ data }) => {
	const imageItemSingleList =
		data?.images?.list?.filter(f => f?.thumb === 'on') || [];
	const imageLastBanner =
		data?.images?.list?.filter(f => f?.banner === 'on') || [];
	const title = 'Overview Section';
	const isMobile = useDeviceTypeMobile()

	const list1 = imageItemSingleList.filter((_, index) => index % 2 === 0); // odd index
	const list2 = imageItemSingleList.filter((_, index) => index % 2 !== 0); // even index

	const lineData = JSON.parse(data?.section_data?.text_fields || '{}');

	const Line = () => <div className="timeline-line"></div>;

	return (
		<StyledOverviewTemplateV1>
			<ThemeLayout marginBottom={'60px'}>
				<Col md={12}>
					<Title
						center={'center'}
						color={theme.colors.theme.colorFour.base}
						margin={'0 0 40px 0'}
						text={
							data?.section_data?.subtitle
								? data?.section_data?.subtitle
								: title
						}
						tag="h2"
						textTransform="uppercase"
						animate={false}
					/>
					<div className="d-flex mb-lg-5 gap-5 overview-wrapper-text">
						{data?.section_data?.short_desc && (
							<BodyText
								children={parse(data?.section_data?.short_desc)}
							/>
						)}
						{data?.section_data?.description && (
							<BodyText
								children={data?.section_data?.description}
							/>
						)}
					</div>
				</Col>
			</ThemeLayout>
			<ThemeLayout fluid={true} containerClass={'p-0 m-0 position-relative'}>
				{
					!isMobile &&
					<Col md={12} className={'text-center line-wrapper'}>
						{/* Start with line */}
						<Line />
						{lineData && lineData.length > 0 &&
							lineData.map((line, index) => (
								<Fragment key={index}>

									{/* Text block */}
									<div className="text-block">
										<Title tag={'subheader'}  textTransform={'uppercase'} animate={true} center={true} text={line?.value || ''}/>
									</div>

									{/* Line after each text */}
									<Line />
								</Fragment>
							))
						}
					</Col>
				}
				<Col md={4} className={'item-1-col'}>
					{/* Render list 1 */}
					{ !isMobile && list1.map((item, index) => {
						const basePath = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://bestinbd.com';
						const url = item?.urls?.large ? basePath + item?.urls?.large : item?.full_path ? basePath + item.full_path : null;

						if (!url) return null;

						return (
							<ImageWrapper key={index} className={'item-1'}>
								<SingleImageParallax src={url} />
								{item?.short_title && (
									<h4 className={'animated-right'} data-size={'10'}>{parse(item.short_title)}</h4>
								)}
								{item?.short_desc && (
									<p>{parse(item.short_desc)}</p>
								)}
							</ImageWrapper>
						);
					})}

					{
						isMobile &&
						<Line />

					}
					{ isMobile && imageItemSingleList.map((item, index) => {
						const basePath = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://bestinbd.com';
						const url = item?.full_path ? basePath + item.full_path : null;

						if (!url) return null;

						return (
							<Fragment key={index}>
								<ImageWrapper className={'item-1'}>
									<SingleImageParallax src={url} />
									{item?.short_title && (
										<h4 className={'animated-right'} data-size={'10'}>{parse(item.short_title)}</h4>
									)}
									{item?.short_desc && (
										<p>{parse(item.short_desc)}</p>
									)}
								</ImageWrapper>
								{
									index % 2 === 1 && <Line />
								}
							</Fragment>
						);
					})}
				</Col>

				{
					!isMobile &&
					<Col md={4}></Col>

				}

				{/* Render list 2 */}
				{
					!isMobile &&
					<Col md={4} className={'item-2-col'}>
						{ !isMobile && list2.map((item, index) => {
							const basePath = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://bestinbd.com';
							const url = item?.full_path ? basePath + item.full_path : null;

							if (!url) return null;

							return (
								<ImageWrapper key={index} className={'item-2'}>
									<SingleImageParallax src={url} />
									{item?.short_title && (
										<h4  className={'animated-left'} data-size={'10'}>{parse(item.short_title)}</h4>
									)}
									{item?.short_desc && (
										<p>{parse(item.short_desc)}</p>
									)}
								</ImageWrapper>
							);
						})}
					</Col>
				}

				<div className={'fixed-element-2'}>
					{/* eslint-disable-next-line jsx-a11y/alt-text */}
					<img src={'/images/static/leaf-bg-5.webp'}/>
				</div>
			</ThemeLayout>
			<ThemeLayout>
				<Col md={{span: 10, offset: 1}}  className={'mt-lg-5'}>
					<div className={'image-banner-wrapper'}>
						<SingleImageParallax src={'https://bestinbd.com' + imageLastBanner?.[0]?.full_path} alt={imageLastBanner?.[0]?.short_title}/>
					</div>
				</Col>
			</ThemeLayout>
			{/* Fixed Elements */}
			{
				!isMobile &&
				<div className={'fixed-element animated-bottom'} data-size={10}>
					<img src={'/images/static/fixed-element-4.webp'} alt="" />
				</div>
			}

		</StyledOverviewTemplateV1>
	);
};

const ImageWrapper = styled.div`
	position: relative;
	margin-bottom: 100px;
	display: table;
	width: 1%;

	.global-image {
		position: relative !important;
		inset: unset !important;
		height: auto !important;
		width: auto !important;
		margin-bottom: 60px;

		img {
			position: relative !important;
			inset: unset !important;
			height: auto !important;
			width: auto !important;
		}
	}

	h4 {
		position: absolute;
		left: 0;
		bottom: 0;
		font-family: ${theme.typography.fonts.secondary};
		font-weight: 400;
		font-size: 5.333rem; /* 96px */
		line-height: 1; /* 100% */
		letter-spacing: -0.02em; /* -2% */
		color: rgba(222, 214, 190, 0.4);
		text-transform: uppercase;
		@media(max-width: 767px){
			font-size: 3rem !important; /* 54px */
		}
	}
	p {
		color: #2b2319;
	}
	&.item-2 {
		margin-left: auto;
		h4 {
			left: unset;
			right: 0;
			bottom: -50px;
		}
	}

	&.item-1 {
		p {
			margin-left: 5rem;
		}
		h4 {
			bottom: -50px;
		}
	}

	${theme.grid.media.down.md}{
		width: 100%;
		padding: 0 15px;
		margin-bottom: 50px;
		.global-image{
			img{
				width: 100% !important;
			}
		}
	}
`;
const StyledOverviewTemplateV1 = styled.section`
	padding: 120px 0 0;
	background: ${theme.colors.theme.background.base};
	position: ${theme.positioning.type.relative};
	z-index: 1;
	@media(max-width: 1024px){
		.subheader{
			.animated-text-container{
				display: block !important;
			}
		}
		.fixed-element img{
			height: 150px !important;
		}
	}
	.line-wrapper{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		height: 100%;
		width: 15%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 45px;
		@media(max-width: 1024px){
			width: 30%;
		}
	}
	.timeline-line {
		width: 1px;
		height: 100%; /* adjust */
		background: #d8d5cc; /* your color */
		margin: 0 auto;
		${theme.grid.media.down.md}{
			height: 15rem;
			margin-bottom: 30px;
		}
	}
	.fixed-element {
		position: ${theme.positioning.type.absolute};
		right: -50px;
		top: 100px;
		z-index: 1;
		img {
			height: 200px;
		}
	}
	.fixed-element-2{
		position: ${theme.positioning.type.absolute};
		bottom: 0;
		left: -15px;
		z-index: 1;
	}
	.item-1-col{
		.item-1:nth-of-type(2){
			margin-left: auto;
		}
		p{
			padding-right: 3rem;
		}
	}
	.item-2-col{
		padding-top: 100px;
		p{
			padding-right: 3rem;
		}
		.item-2:last-child{
			margin-left: 0;
			margin-right: auto;
		}
	}
	.image-banner-wrapper{
		position: relative;
		padding-top: calc(515 / 990 * 100%);
	}

	&:after{
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 300px;
		background-color: #141A12;
		z-index: -1;

	}
	${theme.grid.media.up.laptop} {
	}

	${theme.grid.media.down.tab} {
		&:after{
			height: 15vh !important;
		}
	}

	${theme.grid.media.down.md} {
		padding: 100px 0;
		&:after{
			height: 20vh !important;
		}
		.overview-wrapper-text{
			flex-direction: column;
			gap: 20px !important;
		}
	}
`;

export default OverviewTemplateV1;
