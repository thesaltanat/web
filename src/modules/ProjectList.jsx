// javascript
'use client';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import useContainerOffset from '@/src/hooks/useContainerOffset';
import { getAllProduct } from '@/src/api';
import Title from '@/src/components/ui/Title';
import BodyText from '@/src/components/ui/BodyText';
import Button from '@/src/components/ui/Button';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';

// Helper to convert a theme style object (camelCase keys) into a CSS string
const objToCss = obj => {
	if (!obj || typeof obj !== 'object') return '';
	return Object.entries(obj)
		.map(([k, v]) => {
			// convert camelCase to kebab-case
			const prop = k.replace(/([A-Z])/g, '-$1').toLowerCase();
			return `${prop}: ${v};`;
		})
		.join('\n');
};


const ProjectList = ({ title = 'Title', data }) => {
	const offset = useContainerOffset('.container');
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			setLoading(true);
			try {
				// expects getAllProduct to return an array or an object with .data
				const res = await getAllProduct();
				const list = Array.isArray(res) ? res : res?.data || [];
				if (!mounted) return;
				setItems(list);
			} catch (err) {
				if (!mounted) return;
				setItems([]);
			} finally {
				if (mounted) setLoading(false);
			}
		};
		fetchData();
		return () => {
			mounted = false;
		};
	}, []);


	return (
		<StyledProjectList offset={offset}>
			<div className={'fixed-element '} data-size={10}>
				<img src={'/images/static/fixed-element-3.svg'} alt="" />
			</div>
			<div className={'fixed-element-2 '} data-size={10}>
				<img
					src={'/images/static/accordion_pattern.png'}
					alt=""
					style={{ opacity: 0.05 }}
				/>
			</div>
			<Container>
				<Row>
					<Col md={{ span: 12 }} className="form_template__content">
						<FeaturesRow>
							{loading && <div>Loading...</div>}
							{!loading && items && items.length === 0 && (
								<div>No items found</div>
							)}
							{!loading &&
								items.map((item, idx) => {

									const imgSrc =
										item.images?.list?.find((f) => f?.banner === 'on') ||
										item.images?.find((f) => f?.banner === 'on') ||
										'/images/dynamic/feature-1.png';
									const heading =
										item?.product_data?.title ||
										item?.data?.title ||
										item.label ||
										'Untitled';
									const descr =
										item?.product_data.short_desc || item.data?.short_desc || '';
									return (
										<FeatureSingleItem key={idx}>
											<div className="inner-content-wrapper position-relative">
												<div className="image_wrapper">
													<SingleImageParallax
														src={ imgSrc?.urls?.large ? 'https://bestinbd.com/' + imgSrc?.urls?.large :
															'https://bestinbd.com/' +
															imgSrc?.full_path
														}
														alt={heading}
													/>
												</div>
												<Title tag={'h2'} center={'center'} text={heading} textTransform={'uppercase'} margin={'0 0 35px'} color={'white'}/>
												{descr ? (
													<BodyText  className="desc">{parse(descr)}</BodyText>
												) : null}
												<Button
													src={'/projects/'+item?.product_data?.slug || item?.slug || '#'}
													background={'#FAF8F2'}
													hoverBackground={theme.colors.theme.hoverColor.base}
													text={'Learn More'}
													margin={'35px 0 0'}
													color={'#131D0D'}
													inLineColor={'#182315'}
													outLineColor={'#FFFFFF94'}
													inLineHoverColor={'#FFFFFF94'}
													outLineHoverColor={'#182315'}
												/>
											</div>
										</FeatureSingleItem>
									);
								})}
						</FeaturesRow>
					</Col>
				</Row>
			</Container>
		</StyledProjectList>
	);
};

const StyledProjectList = styled.section`
	padding: 200px 0;
	position: ${theme.positioning.type.relative};
	background: #141a12;
	.fixed-element-2 {
		position: ${theme.positioning.type.absolute};
		right: 0;
		top: 0;
		left: 0;
	}

	.fixed-element {
		position: ${theme.positioning.type.absolute};
		left: -80px;
		top: 50%;
		z-index: 1;
	}
	
	@media(max-width: 767px){
		padding: 120px 0 120px;
	}
`;


const FeaturesRow = styled.div`
	display: flex;
	gap: 180px;
	flex-wrap: wrap;
	@media(max-width: 767px){
		gap: 60px;
	}
`;

const FeatureSingleItem = styled.div`
	width: 100%;
	.inner-content-wrapper {
		text-align: center;
	}
	.image_wrapper {
		position: relative;
		margin-bottom: 40px;
		padding-top: calc(470 / 1170 * 100%);
	}
	h2 {
		${objToCss(theme.typography.styles.h1.desktop)}
		margin: ${theme.numericScale.margin['0']};
		width: ${theme.numericScale.width.full};
		max-width: ${theme.numericScale.width.full};
		box-sizing: border-box;
		word-wrap: break-word;

		${theme.grid.media.down.tab} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h1.tab)}
		}

		${theme.grid.media.down.md} {
			display: ${theme.layout.display.block};
			${objToCss(theme.typography.styles.h1.mobile)}
		}
	}
	.desc {
		color: rgba(255, 255, 255, 0.8);
		max-width: 80%;
		text-align: center;
		margin: 0 auto;
		@media(max-width: 767px){
			width: 100%;
			max-width: 100%;
		}
	}

`;

const SingleImage = styled.img`
	width: 100%;
	height: 140px;
	object-fit: cover;
	border-radius: 4px;
`;

export default ProjectList;
