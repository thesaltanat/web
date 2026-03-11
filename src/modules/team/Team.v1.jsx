"use client";
import styled from "styled-components";
import theme from '@/src/styles/theme';
import ThemeLayout from '@/src/components/ui/themeLayout';
import { Col } from 'react-bootstrap';
import Title from '@/src/components/ui/Title';
import TeamSingle from '@/src/components/ui/single-item/TeamSingle';


export default function TeamV1({data}) {

	const teamList = data?.images?.list

	return (
		<StyledWrapper>
			<div className={'fixed-element '} data-size={10}>
				<img src={'/images/static/leaf-bg-6.svg'} alt="" />
			</div>
			<ThemeLayout>
				<Col md={7}>
					<Title
						color={theme.colors.white.base}
						margin={'0 0 60px 0'}
						text={
							data?.section_data?.subtitle
								? data?.section_data?.subtitle
								: title
						}
						tag="h2"
						textTransform="uppercase"
						animate={false}
					/>
				</Col>
			</ThemeLayout>
			<ThemeLayout>
				{
					teamList && teamList?.length > 0 &&
					teamList?.map((teamItem , index) => {
						return (
							<Col key={index} md={3} className="mb-5">
								<TeamSingle
									imagePaddingTop={'calc(410 / 270 * 100%)'}
									imageSrc={
										teamItem?.urls?.large
											? 'https://bestinbd.com' +
												teamItem?.urls?.large
											: 'https://bestinbd.com' +
												teamItem?.full_path
									}
									name={teamItem?.short_title}
									designation={teamItem?.short_desc}
								/>
							</Col>
						);
					})
				}
			</ThemeLayout>
		</StyledWrapper>
	);
}


const StyledWrapper = styled.section`
	position: relative;
	background-color: #141a12;
	z-index: 0;
	padding-top: 140px;
	padding-bottom: 120px;
	.fixed-element {
		position: ${theme.positioning.type.absolute};
		right: 0;
		top: -15%;
		img {
			opacity: 0.2;
		}
	}

	@media (max-width: 767px) {
		padding-top: 0;
		padding-bottom: 80px;
	}
`;