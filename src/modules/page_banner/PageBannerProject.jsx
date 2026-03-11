'use client';
import BodyText from '@/src/components/ui/BodyText';
import LinkOnly from '@/src/components/ui/LinkOnly';
import { SingleImageParallax } from '@/src/components/ui/SingleImageParallax';
import ThemeLayout from '@/src/components/ui/themeLayout';
import Title from '@/src/components/ui/Title';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';

const PageBannerProject = ({ data, forContact }) => {

	const getGlobalData = useShowSetting();
	const settingsData = getGlobalData?.getSettings?.data?.global_settings_data;
	// data?.global_settings_data

	const bannerImage =
		data?.images.list?.find(img => img.background === 'on') || '';
	const subtitle = (
		<>
			<Title
				center={'center'}
				animate={true}
				textTransform="uppercase"
				color="white"
				text={data?.product_data?.subtitle}
				tag="h1"
			/>
			<BodyText color="white" margin="30px 0 0 0">
				{parse(data?.product_data?.short_desc)}
			</BodyText>
		</>
	);


	return (
		<>
			<StyledPageBanner>
				<SingleImageParallax
					src={
						(process.env.NEXT_PUBLIC_STORAGE_URL ||
							'https://bestinbd.com') +
						bannerImage?.urls?.large ? bannerImage?.urls?.large :bannerImage?.full_path || '/images/static/blur.jpg'
					}
					alt={bannerImage?.short_title || 'Page Banner'}
				/>
				<ThemeLayout
					columns={1}
					containerClass={'text-center'}
					colSizes={{ xs: 12, md: 12 }}
					colData={[subtitle]}
				/>
			</StyledPageBanner>

			{forContact && (
				<StyledContactInformation>
					<ThemeLayout>
						<Col md={2}>
							<h5>Let&#39;s talk!</h5>
						</Col>
						{
							settingsData?.google_map_link &&
							<Col md={4}>
								<div className="single-link">
									<div className="svg-icon">
										<svg
											width="12"
											height="14"
											viewBox="0 0 12 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M5.87654 0C9.12005 0 11.7531 2.53903 11.7531 5.66673C11.7531 7.29542 10.9103 8.97177 9.8522 10.3795C8.37477 12.3455 6.52711 13.7788 6.52711 13.7788C6.14721 14.0735 5.60588 14.0738 5.22598 13.7792C5.22598 13.7792 3.37832 12.3455 1.90089 10.3795C0.842763 8.97177 0 7.29542 0 5.66673C0 2.53903 2.63304 0 5.87654 0ZM5.87654 3.33337C7.2119 3.33337 8.2963 4.37905 8.2963 5.66673C8.2963 6.95441 7.2119 8.00009 5.87654 8.00009C4.54118 8.00009 3.45679 6.95441 3.45679 5.66673C3.45679 4.37905 4.54118 3.33337 5.87654 3.33337Z"
												fill="white"
											/>
										</svg>
									</div>
									<LinkOnly
										className={'address'}
										color={'#fff'}
										src={settingsData?.google_map_link}
										target={'_blank'}
										text={parse(
											settingsData?.office_location,
										)}
									/>
								</div>
							</Col>
						}
						{
							settingsData?.office_phone &&
							<Col md={3}>
								<div className="single-link">
									<div className="svg-icon">
										<svg
											width="14"
											height="14"
											viewBox="0 0 14 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M13.3524 10.2746L11.4348 8.32084C10.75 7.62307 9.58572 7.90221 9.31178 8.80927C9.10633 9.43729 8.42148 9.78617 7.80512 9.64659C6.43543 9.29771 4.58635 7.48352 4.24392 6.01822C4.03847 5.3902 4.44938 4.69244 5.06574 4.48313C5.95604 4.20403 6.22998 3.01783 5.54513 2.32007L3.62756 0.366326C3.07969 -0.122109 2.25787 -0.122109 1.77848 0.366326L0.477274 1.69208C-0.823933 3.08761 0.614243 6.78576 3.83302 10.0652C7.05179 13.3447 10.6815 14.8798 12.0512 13.4843L13.3524 12.1585C13.8318 11.6003 13.8318 10.763 13.3524 10.2746Z"
												fill="white"
											/>
										</svg>
									</div>
									<LinkOnly
										className={'email'}
										color={'#fff'}
										src={`tel:${settingsData?.office_phone}`}
										text={parse(settingsData?.office_phone)}
									/>
								</div>
							</Col>
						}
						{
							settingsData?.contact_email &&
							<Col md={3}>
								<div className="single-link">
									<div className="svg-icon">
										<svg
											width="15"
											height="11"
											viewBox="0 0 15 11"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M8.3946 7.15495C8.03672 7.39855 7.62102 7.52732 7.19243 7.52732C6.76386 7.52732 6.34816 7.39855 5.99028 7.15495L0.0957773 3.1426C0.0630742 3.12034 0.031214 3.09714 0 3.07327V9.64794C0 10.4017 0.599135 11 1.32422 11H13.0606C13.7989 11 14.3848 10.3883 14.3848 9.64794V3.07324C14.3536 3.09717 14.3216 3.12043 14.2889 3.14272L8.3946 7.15495Z"
												fill="white"
											/>
											<path
												d="M0.563313 2.42658L6.45782 6.43895C6.68095 6.59085 6.93667 6.66678 7.1924 6.66678C7.44815 6.66678 7.7039 6.59082 7.92704 6.43895L13.8215 2.42658C14.1743 2.18662 14.3849 1.78502 14.3849 1.35158C14.3849 0.6063 13.791 0 13.0611 0H1.32377C0.593853 2.86857e-05 0 0.606329 0 1.3523C0 1.78502 0.210603 2.18662 0.563313 2.42658Z"
												fill="white"
											/>
										</svg>
									</div>
									<LinkOnly
										color={'#fff'}
										src={`mailto:${settingsData?.contact_email}`}
										text={parse(
											settingsData?.contact_email,
										)}
									/>
								</div>
							</Col>
						}

					</ThemeLayout>
				</StyledContactInformation>
			)}
		</>
	);
};
const StyledContactInformation = styled.section`
	background: #5D563D;
	padding: 40px 0;

	h5 {
		color: ${theme.colors.white.base};
		font-weight: 400;
		font-style: normal;
		font-size: 1.33rem; /* 24px based on 18px body font */
		line-height: 1.2; /* 120% */
		letter-spacing: -0.05em; /* -5% */
		margin: 0;
	}

	.row {
		align-items: center;
		@media (max-width: 991px) and (min-width: 768px) {
			flex-direction: column;
			align-items: flex-start;
			gap: 30px;
			.col-md-2,
			.col-md-3,
			.col-md-4 {
				width: 100% !important;
				max-width: 100% !important;
				flex: 0 0 100% !important;
			}
		}
		@media (max-width: 767px) {
			gap: 30px;
		}
	}

	.single-link {
		display: flex;
		gap: 10px;

		svg {
			margin:  0 0;
			padding: 0;
			height: 20px;
			width: 20px;
		}

		a {
			font-weight: 400;
			font-style: normal;
			font-size: 1rem; /* 16px based on 18px body font */
			line-height: 1.5; /* 120% */
			letter-spacing: -0.02em; /* -2% */
			margin-bottom: 0 !important;
		}
	}
`;
const StyledPageBanner = styled.section`
	position: ${theme.positioning.type.relative};
	padding-top: ${theme.aspectRatio.pageBanner};
	.container {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 100px;
		z-index: 1;
	}
	${theme.grid.media.down.tab} {
		padding-top: ${theme.aspectRatio.pageBannerTab};
	}
	${theme.grid.media.down.md} {
		padding-top: ${theme.aspectRatio.pageBannerMobile};
	}
`;
export default React.memo(PageBannerProject);
