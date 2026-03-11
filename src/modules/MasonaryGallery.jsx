'use client';

import BodyText from '@/src/components/ui/BodyText';
import { SingleImage } from '@/src/components/ui/SingleImage';
import ThemeLayout from '@/src/components/ui/themeLayout';
import Title from '@/src/components/ui/Title';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import { useRef } from 'react';
import { Col } from 'react-bootstrap';
import Masonry from 'react-layout-masonry';
import styled from 'styled-components';

const MasonaryGallery = ({ data }) => {
	const sectionRef = useRef(null);
	const images = data?.images?.list || data?.images || [];
	const validImages = images.filter(img => img && img.full_path);
	const onInit = () => {};

	return (
		<StyledMasonaryGallery ref={sectionRef} className="pt-150 pb-150">
			<div className={'fixed-element '} data-size={10}>
				<img src={'/images/static/fixed-element-1.png'} alt="" />
			</div>
			<ThemeLayout>
				<Col md={{ span: 6, offset: 2 }} data-speed={'clamp(1.13)'}>
					<Title
						tag={'h2'}
						margin={'0 0 90px'}
						color={'#4D3E2D'}
						text={data?.section_data?.subtitle || data?.data?.subtitle}
					/>
				</Col>
				<Col md={4}>
					{data?.section_data?.short_desc && (
						<div className="content">
							<BodyText color={'#4D3E2D'} margin={'0 0 45px'}>
								{parse(data?.section_data?.short_desc || data?.data?.short_desc || '')}
							</BodyText>
						</div>
					)}
				</Col>
			</ThemeLayout>
			<LightGallery
				onInit={onInit}
				speed={500}
				plugins={[lgThumbnail, lgZoom]}
				elementClassNames="lightgallery"
				selector=".thumb">
				<Masonry className={'masonry-grid-item'}   columnProps={{
					className: 'custom-column',
				}}
					columns={{ 640: 2, 900: 3, 1200: 3, 1536: 4 }}
					gap={24}>
					{validImages.map((item, idx) => {
						const src = `https://bestinbd.com${item.urls?.large ? item.urls?.large : item.full_path}`;
						return (
							<a
								className="thumb"
								key={item.id || idx}
								href={src}
								data-src={src}
								aria-label={`Open image ${idx + 1}`}>
								<div className="masonary-item">
									<div className="image-wrapper">
										<SingleImage
											src={src}
											alt={
												item.alt ||
												`gallery-image-${idx}`
											}
											loading="lazy"
										/>
									</div>
								</div>
							</a>
						);
					})}
				</Masonry>
			</LightGallery>
		</StyledMasonaryGallery>
	);
};

const StyledMasonaryGallery = styled.section`
	background: #f9f2ee;
	padding: 180px 0 280px;
	overflow: hidden;
	position: relative;

	.container{
		z-index: 2;
		position: relative;
	}
	.fixed-element {
		position: ${theme.positioning.type.absolute};
		left: 0;
		top: 100px;
		z-index: 1;
		@media(max-width: 767px){
			display: none;
		}
	}
	.custom-column{
		&:nth-of-type(odd){
			transform: translateY(160px);
		}
		@media(max-width: 767px){
			&:nth-of-type(even){
				transform: translateY(100px);
			}
			&:nth-of-type(odd){
				transform: translateY(0);
			}
		}
	}

	.masonary-item {
		margin-bottom: 24px;
		
		.image-wrapper {
			position: relative;
			overflow: hidden;

			.global-image {
				position: relative !important;
				inset: unset !important;
				width: 100%;
				height: auto !important;
			}

			img {
				position: relative !important;
				inset: unset !important;
				width: 100%;
				height: auto !important;
				box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
				transition: transform 0.2s;
				object-fit: contain !important;

				&:hover {
					transform: scale(1.03);
				}
			}
		}
	}

	.thumb {
		display: block;
		text-decoration: none;
		color: inherit;
	}
	
	@media(max-width: 767px){
		padding-top: 100px;
		padding-bottom: 200px;
		.masonry-grid-item{
			gap: 15px !important;
		}
		.title{
			margin-bottom: 40px;
		}
		.masonary-item{
			margin: 0;
		}
	}
`;

export default MasonaryGallery;
