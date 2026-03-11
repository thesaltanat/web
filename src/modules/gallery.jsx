'use client';

import { Col, Container, Row } from 'react-bootstrap';

import { SingleImage } from '@/src/components/ui/SingleImage';
import Title from '@/src/components/ui/Title';
import theme from '@/src/styles/theme';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import styled from 'styled-components';

/**
 * Gallery component
 * Props:
 *  - images: array of { src, alt } objects
 *  - title: string
 *
 * This uses the project's `Title` component for the heading and provides a
 * lightweight, dependency-free lightbox (named `LightGallery` locally) so we
 * don't have to rely on external wrappers. Clicking a thumbnail opens the
 * modal; arrow keys navigate and Esc closes.
 */
const Gallery = ({ title = 'Gallery', data }) => {
	const images = data?.images?.list || [];
	const onInit = () => {};
	// Filter out entries without a valid path to avoid lightGallery warnings
	const validImages = images.filter(img => img && img.full_path);
	return (
		<StyledGallery>
			<Container>
				<Row>
					<Col md={12} className="text-center">
						<Title
							center={'center'}
							color={theme.colors.white.base}
							text={
								data?.section_data?.subtitle
									? data?.section_data?.subtitle
									: title
							}
							tag="h2"
							textTransform="uppercase"
							animate={true}
						/>
					</Col>
				</Row>
			</Container>

			<div className="gallery-inner">
				<LightGallery
					onInit={onInit}
					speed={500}
					plugins={[lgThumbnail, lgZoom]}
					elementClassNames="lightgallery"
					selector=".thumb">
					<div className="thumbs">
						{validImages.map((img, i) => {
							const src = img?.urls?.large ? 'https://bestinbd.com' + img.urls.large :
								'https://bestinbd.com' + img.full_path;
							return (
								<a
									className="thumb"
									key={i}
									href={src}
									data-src={src}
									aria-label={`Open image ${i + 1}`}>
									<div className="image-wrapper">
										<SingleImage
											src={src}
											alt={img.alt || `Image ${i + 1}`}
											loading="lazy"
										/>
									</div>
								</a>
							);
						})}
					</div>
				</LightGallery>
			</div>
		</StyledGallery>
	);
};

const StyledGallery = styled.section`
	margin-top: -80px;
	position: ${theme.positioning.type.relative};
	&:after{
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background: ${theme.colors.theme.colorTwo.base};
		z-index: 0;
	}
	&:before{
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background: ${theme.colors.theme.secondary.base};
		z-index: 0;
	}


	.container{
		position: relative;
		z-index: 3;
	}
	.title{
		transform: translateY(40px);
		position: relative;
		z-index: 1;
		@media(max-width: 767px){
			transform: translateY(0);
		}
	}

	.gallery-inner {
		position: relative;
		z-index: 2;
		.thumbs {
			display: flex;
			justify-content: space-between;
			gap: 15px;
			flex-wrap: wrap;
		}
	}

	.thumb {
		width: calc(25% - 15px);
		background: transparent;
		border: 0;
		padding: 0;
		cursor: pointer;
		display: block;
		overflow: hidden;

		.image-wrapper {
			position: relative;
			padding-top: calc(480 / 400 * 100%);
			img {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition: ${theme.animations.transition.default};
				transform: scale(1);
			}
		}
		&:hover {
			img{
				transform: scale(1.05);
			}
		}
	}

	.lightbox {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.8);
		z-index: 1200;
		padding: 40px;
	}

	.lightbox-inner {
		max-width: 90%;
		max-height: 90%;
	}
	.lightbox-inner img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 6px;
	}

	.close {
		position: absolute;
		top: 18px;
		right: 18px;
		background: transparent;
		color: #fff;
		border: 0;
		font-size: 28px;
		cursor: pointer;
	}

	.nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.06);
		color: #fff;
		border: 0;
		width: 48px;
		height: 80px;
		font-size: 32px;
		cursor: pointer;
		border-radius: 6px;
	}
	.nav.prev {
		left: 18px;
	}
	.nav.next {
		right: 18px;
	}

	@media (max-width: 767px) {
		margin-top: -1px;
		.nav {
			width: 42px;
			height: 64px;
			font-size: 24px;
		}

		.title{
			margin-bottom: 45px;
		}

		.thumb {
			width: calc(50% - 10px);
		}
		.gallery-inner {
			.thumbs {
				gap: 10px;
			}
		}
	}
`;

export default Gallery;
