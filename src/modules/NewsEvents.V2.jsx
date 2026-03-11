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

const NewsEvents = ({ data }) => {
	const [selectedCategory, setSelectedCategory] = useState('all'); // Start with 'all' - first tab active
	const isMobile = useDeviceTypeMobile();
	const categoryList = [
		{ value: 'all', label: 'All' },
		{ value: 'profile', label: 'Profile' },
		{ value: 'projects', label: 'Projects' },
		{ value: 'finances', label: 'Finances' },
	];

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
			? demoData
			: demoData.filter(
				(item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
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
							{categoryList && !isMobile &&
								categoryList.length > 0 &&
								categoryList.map(item => {
									const isActive =
										selectedCategory === item.value;
									return (
										<Fragment key={item.value}>
											<div onClick={() => handleCategoryClick(item.value)}>
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
								return (
									<div
										className="insights__items__single"
										key={i.id ?? index}>
										<Link
											prefetch={true}
											href={i?.url}
											target="_blank"></Link>
										<svg
											width="23"
											height="30"
											viewBox="0 0 23 30"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M12.375 1.125C12.375 0.826631 12.2565 0.540483 12.0455 0.329505C11.8345 0.118526 11.5484 0 11.25 0C10.9516 0 10.6655 0.118526 10.4545 0.329505C10.2435 0.540483 10.125 0.826631 10.125 1.125V19.7843L4.17037 13.8296C3.9582 13.6247 3.67402 13.5113 3.37905 13.5139C3.08408 13.5164 2.80191 13.6347 2.59333 13.8433C2.38475 14.0519 2.26643 14.3341 2.26387 14.629C2.2613 14.924 2.3747 15.2082 2.57963 15.4204L10.4546 23.2954C10.6656 23.5063 10.9517 23.6248 11.25 23.6248C11.5483 23.6248 11.8344 23.5063 12.0454 23.2954L19.9204 15.4204C20.1253 15.2082 20.2387 14.924 20.2361 14.629C20.2336 14.3341 20.1153 14.0519 19.9067 13.8433C19.6981 13.6347 19.4159 13.5164 19.121 13.5139C18.826 13.5113 18.5418 13.6247 18.3296 13.8296L12.375 19.7843V1.125ZM1.125 27C0.826631 27 0.540484 27.1185 0.329505 27.3295C0.118527 27.5405 0 27.8266 0 28.125C0 28.4234 0.118527 28.7095 0.329505 28.9205C0.540484 29.1315 0.826631 29.25 1.125 29.25H21.375C21.6734 29.25 21.9595 29.1315 22.1705 28.9205C22.3815 28.7095 22.5 28.4234 22.5 28.125C22.5 27.8266 22.3815 27.5405 22.1705 27.3295C21.9595 27.1185 21.6734 27 21.375 27H1.125Z"
												fill="#5D563D"
											/>
										</svg>
										<div className="name">
											<h5>{i.title}</h5>
										</div>

										<div className="hover-reveal">
											<img
												className="hidden-img"
												src={i?.image}
												alt=""
											/>
										</div>
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
