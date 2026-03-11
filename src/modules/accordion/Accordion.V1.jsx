'use client';

import { AnimatePresence, motion } from 'framer-motion';

import ThemeLayout from '@/src/components/ui/themeLayout';
import Title from '@/src/components/ui/Title';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import { useState } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export default function AccordionV1({ data }) {
	const faqList = data?.posts?.list;
	const [activeIndex, setActiveIndex] = useState(null);

	console.log('faqList', faqList);

	const toggleAccordion = index => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<StyledWrapper>
			<div className={'fixed-element '} data-size={10}>
				<img src={'/images/static/fixed-element-1.png'} alt="" />
			</div>
			<div className={'fixed-element-2 '} data-size={10}>
				<img src={'/images/static/accordion_pattern.png'} alt="" style={{opacity: 0.1}} />
			</div>

			<ThemeLayout>
				<Col md={{ span: 9, offset: 3 }}>
					<Title
						color={'#4D3E2D'}
						margin={'0 0 60px 0'}
						text={
							data?.section_data?.subtitle
								? data?.section_data?.subtitle
								: 'Frequently Asked Questions'
						}
						tag="h2"
						textTransform="uppercase"
						animate={false}
					/>

					{/* Accordion Component */}
					<AccordionContainer>
						{faqList &&
							faqList.length > 0 &&
							faqList.map((item, index) => (
								<AccordionItem key={item.id || index}>
									<AccordionHeader
										onClick={() => toggleAccordion(index)}
										className={
											activeIndex === index
												? 'active'
												: ''
										}>
										<AccordionNumber>
											{String(index + 1).padStart(2, '0')}
											.
										</AccordionNumber>
										<AccordionTitle>
											{parse(
												item.title ||
													item?.data?.title ||
													'',
											)}
										</AccordionTitle>
										<AccordionIcon
											className={
												activeIndex === index
													? 'active'
													: ''
											}>
											<motion.svg
												width="35"
												height="35"
												viewBox="0 0 35 35"
												fill="none"
												initial={false}
												animate={{
													rotate:
														activeIndex === index
															? 0
															: 0,
												}}
												transition={{
													duration: 0.3,
													ease: 'easeInOut',
												}}>
												<circle
													cx="17.5"
													cy="17.5"
													r="15"
													fill={'#527048'}
													stroke="transparent"
													strokeWidth="1.5"
												/>
												<path
													d="M10.5 17.5h14"
													stroke="white"
													strokeWidth="1.5"
													strokeLinecap="round"
												/>
												<motion.path
													d="M17.5 10.5v14"
													stroke="white"
													strokeWidth="1.5"
													strokeLinecap="round"
													initial={false}
													animate={{
														opacity:
															activeIndex ===
															index
																? 0
																: 1,
													}}
													transition={{
														duration: 0.2,
														ease: 'easeInOut',
													}}
												/>
											</motion.svg>
										</AccordionIcon>
									</AccordionHeader>

									<AnimatePresence>
										{activeIndex === index && (
											<motion.div
												initial={{
													height: 0,
													opacity: 0,
												}}
												animate={{
													height: 'auto',
													opacity: 1,
												}}
												exit={{ height: 0, opacity: 0 }}
												transition={{
													duration: 0.3,
													ease: 'easeInOut',
												}}
												style={{ overflow: 'hidden' }}>
												<AccordionContent>
													{parse(
														item.content ||
															item.data
																?.description ||
															item.description ||
															'',
													)}
												</AccordionContent>
											</motion.div>
										)}
									</AnimatePresence>
								</AccordionItem>
							))}
					</AccordionContainer>
				</Col>
			</ThemeLayout>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.section`
	position: relative;
	background-color: transparent;
	z-index: 0;
	padding-top: 140px;
	padding-bottom: 120px;
	
	.container{
		position: relative;
		z-index: 2;
	}
	
	.fixed-element {
		position: ${theme.positioning.type.absolute};
		left: -80px;
		top: 100px;
		z-index: -1;
		@media(max-width: 767px){
			left: -50px;
			top: 20px;
			img{
				height: 100px;
			}
		}
	}
	.fixed-element-2{
		position: ${theme.positioning.type.absolute};
		right: 0;
		top: 0;
		left: 0;
	}
`;

const AccordionContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0;
	margin-top: 60px;
`;

const AccordionItem = styled.div`
	border-bottom: 1px solid #35342D38;

	&:last-child {
		border-bottom: none;
	}
`;

const AccordionHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 40px 10px 40px 40px;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		//background-color: rgba(77, 62, 45, 0.02);
	}

	&.active {
		//background-color: rgba(77, 62, 45, 0.05);
	}
	@media(max-width: 767px){
		padding: 20px 10px 20px 10px;
	}
`;

const AccordionNumber = styled.span`
	font-family: ${theme.typography.fonts.primary};
	font-weight: 500;
	font-size: 1.333rem;
	color: #292929;
	margin-right: 20px;
	min-width: 40px;
	line-height: 1;
	letter-spacing: -0.02em;
	${theme.grid.media.mobile} {
		font-size: 16px;
		margin-right: 20px;
		min-width: 30px;
	}
`;

const AccordionTitle = styled.h3`
	font-family: ${theme.typography.fonts.primary};
	font-weight: 500;
	font-size: 1.333rem;
	color: #292929;
	line-height: 1;
	letter-spacing: -0.02em;
	margin: 0;
	flex: 1;
	padding-right: 10px;

	${theme.grid.media.mobile} {
		font-size: 18px;
	}
`;

const AccordionIcon = styled.div`
	width: 35px;
	height: 35px;
	color: #4d3e2d;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;

	svg {
		width: 35px;
		height: 35px;
	}
`;

const AccordionContent = styled.div`
	padding: 25px 70px 45px 100px;
	font-family: ${theme.typography.fonts.primary};
	font-size: 16px;
	line-height: 1.6;
	color: #666;

	p {
		margin: 0 0 15px 0;

		&:last-child {
			margin-bottom: 0;
		}
	}

	${theme.grid.media.mobile} {
		padding: 20px 0 20px 0;
		font-size: 14px;
	}
`;
