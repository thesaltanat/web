'use client';
import React, { useEffect, useRef, useState, Fragment } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { gsap } from 'gsap';
import Button from '@/src/components/ui/Button';
import theme from '@/src/styles/theme';
import Link from 'next/link';
import useDeviceTypeMobile from '@/src/hooks/useDeviceTypeMobile';
import SelectInput from '@/src/components/ui/input/SelectInput';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import parse from 'html-react-parser';

const NewsEvents = ({ data }) => {

	const dataAvailable = useShowSetting()
	const blogData = dataAvailable?.getSettings?.data?.feature_blog?.data
	const categories = dataAvailable?.getSettings?.data?.feature_blog?.categories || []
	const [selectedCategory, setSelectedCategory] = useState('all');
	const isMobile = useDeviceTypeMobile();




	const categoryList = categories.map(item => ({
		value: item?.category_data?.slug,
		label: item?.category_data?.title
	}));



	const demoData = [
		{
			id: 1,
			title: "The Saltanat Announces New Expansion In Sreemangal's Tea Valley",
			slug: 'the-saltanat-announces-new-expansion-in-sreemangals-tea-valley',
			category: 'ALL',
			url: 'https://placehold.co/120x165',
			image: 'https://placehold.co/120x165',
			icon: '/icons/download.svg',
		},
		{
			id: 2,
			title: 'Investors Gather For The Saltanat Growth Summit 2025',
			slug: 'investors-gather-for-the-saltanat-growth-summit-2025',
			category: 'PROFILE',
			url: 'https://placehold.co/120x165',
			image: 'https://placehold.co/120x165',
			icon: '/icons/download.svg',
		},
		{
			id: 3,
			title: 'Investing In Tranquility: The Rise Of Eco-Luxury In Bangladesh',
			slug: 'investing-in-tranquility-the-rise-of-eco-luxury-in-bangladesh',
			category: 'PROJECTS',
			url: 'https://placehold.co/120x165',
			image: 'https://placehold.co/120x165',
			icon: '/icons/download.svg',
		},
		{
			id: 4,
			title: 'Construction Milestone Achieved At Saltanat Tea Resort',
			slug: 'construction-milestone-achieved-at-saltanat-tea-resort',
			category: 'PROJECTS',
			url: 'https://placehold.co/120x165',
			image: 'https://placehold.co/120x165',
			icon: '/icons/download.svg',
		},
		{
			id: 5,
			title: 'How Sustainable Design Creates Lasting Value For Investors',
			slug: 'how-sustainable-design-creates-lasting-value-for-investors',
			category: 'FINANCES',
			url: 'https://placehold.co/120x165',
			image: 'https://placehold.co/120x165',
			icon: '/icons/download.svg',
		},
		{
			id: 6,
			title: 'A Journey Through Vision — Inside The Making Of Saltanat Tea Resort',
			slug: 'a-journey-through-vision-inside-the-making-of-saltanat-tea-resort',
			url: 'https://placehold.co/120x165',
			category: 'ALL',
			image: 'https://placehold.co/120x165',
			icon: '/icons/download.svg',
		},
	];

	const handleCategoryClick = (label) => {
		setSelectedCategory(label);
	};

	const filteredData =
		selectedCategory.toLowerCase() === 'all'
			? blogData
			: blogData.filter(
				(item) => categories?.find(cat => cat?.category_data?.id === item?.data?.category_id)?.category_data?.slug  === selectedCategory.toLowerCase()
			);


	useEffect(() => {
		const links = document.querySelectorAll('.insights__items__single');
		const hoverRevealElements = document.querySelectorAll('.hover-reveal');

		const handleMouseMove = index => e => {
			const revealElement = hoverRevealElements[index];
			if (!revealElement) return;
			const rect = revealElement.getBoundingClientRect();

			revealElement.style.opacity = 1;
			gsap.to(revealElement, {
				left: e.clientX - (rect.left - 100),
				top: e.clientY - (rect.top + 155),
			});
		};

		const handleMouseLeave = index => () => {
			if (hoverRevealElements[index])
				hoverRevealElements[index].style.opacity = 0;
		};

		links.forEach((link, index) => {
			link.addEventListener('mousemove', handleMouseMove(index));
			link.addEventListener('mouseleave', handleMouseLeave(index));
		});

		return () => {
			links.forEach((link, index) => {
				link.removeEventListener('mousemove', handleMouseMove(index));
				link.removeEventListener('mouseleave', handleMouseLeave(index));
			});
		};
	}, []);


	return (
		<StyledComponent className="insights pb-160">
			<div className={'fixed-element '} data-size={10}>
				<img src={'/images/static/fixed-element-1.png'} alt="" />
			</div>
			<div className={'fixed-element-2 '} data-size={10}>
				<img
					src={'/images/static/accordion_pattern.png'}
					alt=""
					style={{ opacity: 0.1 }}
				/>
			</div>
			<Container>
				<Row>
					<Col lg={4} md={4} className="insights__title">
						<div
							className={
								'menu-button d-flex flex-column align-items-center justify-content-center'
							}>
							{
								!isMobile &&
								<div onClick={() => handleCategoryClick('all')}>


									<Button
										hoverBackground={'#203619'}
										textHoverColor={'#fff'}
										textTransform={'uppercase'}
										background={
											selectedCategory === 'all'
												? '#203619'
												: 'transparent'
										}
										color={
											selectedCategory === 'all'
												? '#fff'
												: '#203619'
										}
										border={'1px solid #203619'}
										variant={'circle'}
										src={'#'}
										text={'ALL'}
										hoverColor={'black'}
									/>
								</div>
							}

							{categoryList && !isMobile &&
								categoryList.length > 0 &&
								categoryList.map(item => {
									const isActive =
										selectedCategory === item.label;
									return (
										<Fragment key={item.value}>
											<div onClick={() => handleCategoryClick(item.label)}>
												<Button
													hoverBackground={'#203619'}
													textHoverColor={'#fff'}
													textTransform={'uppercase'}
													background={
														isActive
															? '#203619'
															: 'transparent'
													}
													color={
														isActive
															? '#fff'
															: '#203619'
													}
													border={'1px solid #203619'}
													variant={'circle'}
													src={'#'}
													text={item.label}
													hoverColor={'black'}
												/>
											</div>

										</Fragment>
									);
								})}

							{
								isMobile &&
								<SelectInput selectedValue={categoryList} placeholder={'Select Category'} options={categoryList} onChange={(e) => handleCategoryClick(e.label)} />
							}
						</div>
					</Col>

					<Col
						lg={{ span: 8 }}
						md={{ span: 8 }}
						className="insights__items">
						{filteredData?.length > 0 &&
							filteredData.map((i, index) => {
								const thumb = i?.images?.find((f) => f?.thumb === 'on');
								const finalDate = i?.data?.date; // "04/07/2025"


								const [day, month, year] = finalDate.split('/');
								const dateObj = new Date(`${year}-${month}-${day}`);

								const formattedDate = dateObj.toLocaleDateString('en-GB', {
									day: '2-digit',
									month: 'long',
									year: 'numeric',
								});
								const catName = categories?.find(cat => cat?.category_data?.id === i?.data?.category_id);

								return (
									<div
										className="insights__items__single"
										key={i.data.id ?? index}>
										<Link
											prefetch={true}
											href={
												'/press-release/' +
													i?.data?.slug ?? '#'
											}></Link>
										<div className="info">
											<h4>
												{catName?.category_data?.title}
											</h4>
											<h6>{parse(formattedDate)}</h6>
										</div>

										<div className="name">
											<h5>{i.data?.title}</h5>
										</div>

										{thumb?.urls?.large ||
										thumb?.full_path ? (
											<div className="hover-reveal">
												<img
													className="hidden-img"
													src={
														thumb?.urls?.large
															? 'https://bestinbd.com' +
																thumb?.urls
																	?.large
															: 'https://bestinbd.com' +
																thumb?.full_path
													}
													alt=""
												/>
											</div>
										) : null}
									</div>
								);
							})}
					</Col>
				</Row>
			</Container>
		</StyledComponent>
	);
};
const StyledComponent = styled.section`
	background: #faf8f2;
	position: relative;
	padding: 110px 0 160px 0;

	.container {
		position: relative;
		z-index: 3;
	}

	.fixed-element {
		position: ${theme.positioning.type.absolute};
		left: -80px;
		top: 100px;
		z-index: 1;
		@media(max-width: 767px){
			left: -50px;
			top: 20px;
			img{
				height: 100px;
			}
		}
	}

	.fixed-element-2 {
		position: ${theme.positioning.type.absolute};
		right: 0;
		top: 0;
		left: 0;
	}

	.insights__title {
		display: flex;
		align-items: baseline;
		position: relative;
	}

	.insights__items {
		&__single {
			display: flex;
			gap: 80px;
			padding: 30px 30px 30px 0;
			border-top: 1px solid #a69f88a6;
			position: relative;
			cursor: pointer;

			@media (max-width: 767px) {
				flex-direction: column;
			}

			&:first-child {
				border-top: none;
			}

			&:nth-last-child(1) {
				border-bottom: 1px solid #a69f88a6;
			}

			a {
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				z-index: 5;
			}

			.hover-reveal {
				position: absolute;
				width: 200px;
				height: 250px;
				top: 50%;
				left: 50%;
				pointer-events: none;
				transform: translate(-50%, -50%) scale(0.8);
				opacity: 0;
				transition: all 0.5s ease-out;
			}

			.hover-reveal img {
				height: 100%;
				width: 100%;
				object-fit: cover;
				position: relative;
				transition: transform 0.4s ease-out;
				mix-blend-mode: difference;
				transform: rotate(3deg);
			}

			.info {
				h4 {
					font-family: ${theme.typography.fonts.secondary};
					font-weight: 400;
					font-size: 1.333rem;
					color: #203619;
					line-height: 100%;
					text-transform: uppercase;
					letter-spacing: -0.02em;

				}

				h6 {
					font-family: ${theme.typography.fonts.primary};
					font-weight: 300;
					font-style: Light;
					font-size: 1rem;
					line-height: 100%;
					color: #47632E;
					letter-spacing: -0.02em;

				}
			}

			&:hover {
				.desc h3 {
					/* color: #fff; */
				}
			}
		}
	}

	@media (max-width: 991px) {


		.div.sm_image-trail,
		.hover-reveal {
			display: none !important;
		}

		.insights__title {
			margin-bottom: 40px;
			display: flex;
			align-items: center;
		}

		@media (max-width: 767px) {
			.insights__title {
				gap: 10px;
			}
		}
	}
	@media (max-width: 767px) {
		.insights__items__single {
			gap: 15px;
		}

		.menu-button {
			width: 100%;
		}
	}
`;

export default React.memo(NewsEvents);
