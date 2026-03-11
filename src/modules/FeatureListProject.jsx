'use client';
import Title from '@/src/components/ui/Title';
import useContainerOffset from '@/src/hooks/useContainerOffset';
import { useShowSetting } from '@/src/store/ShowSettingProvider';
import theme from '@/src/styles/theme';
import parse from 'html-react-parser';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';


/**
 * Gallery FeatureList template component
 * Props:
 *  - images: array of { src, alt } objects
 *  - title: string
 *
 * This uses the project's `Title` component for the heading and provides a
 * lightweight, dependency-free lightbox (named `LightGallery` locally) so we
 * don't have to rely on external wrappers. Clicking a thumbnail opens the
 * modal; arrow keys navigate and Esc closes.
 */

const AmenitiesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 0; /* Remove gap to allow borders to connect */
	margin-top: 40px;
	//border: 1px solid rgba(255, 255, 255, 0.1); /* Outer border */

	@media (max-width: 992px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
		margin-top: 30px;
	}

`;

const AmenityCard = styled.div`
	background: transparent;
	padding: 45px;
	transition: all 0.3s ease;
	cursor: pointer;
	border-right: 1px solid rgba(255, 255, 255, 0.1);
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);

	/* Remove right border for last column items */
	&:nth-child(5n) {
		border-right: none;
	}

	/* Remove bottom border for last row items */
	&:nth-last-child(-n+5) {
		border-bottom: none;
	}

	&:hover {
		background: rgba(255, 255, 255, 0.02);
		border-color: rgba(255, 255, 255, 0.2);
	}

	@media (max-width: 992px) {
		/* Adjust for 3 columns */
		&:nth-child(5n) {
			border-right: 1px solid rgba(255, 255, 255, 0.1);
		}
		&:nth-child(3n) {
			border-right: none;
		}
		&:nth-last-child(-n+5) {
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		}
		&:nth-last-child(-n+3) {
			border-bottom: none;
		}
	}

	@media (max-width: 768px) {
		/* Adjust for 2 columns */
		&:nth-child(3n) {
			border-right: 1px solid rgba(255, 255, 255, 0.1);
		}
		&:nth-child(2n) {
			border-right: none;
		}
		&:nth-last-child(-n+3) {
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		}
		&:nth-last-child(-n+2) {
			border-bottom: none;
		}
		padding: 30px;
	}

`;

const AmenityIcon = styled.div`
	margin: 0 auto 30px;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	color: #fef6ec;

	img {
		width: 50px;
		height: 50px;
	}

`;

const AmenityTitle = styled.p`
	color: #FFF;
	margin: 0;
	${theme.grid.media.up.laptop} {
		width: 80%;
	}
`;


const FeatureList = ({ title = 'Title', data }) => {
	const dataAvailable = useShowSetting();
	const defaultAmenities = [
		{
			title: "Effortless Comfort",
			icon: '/images/dynamic/icon/1.svg'
		},
		{
			title: "Perfectly Connected",
			icon: '/images/dynamic/icon/2.svg'

		},
		{
			title: "Refined Experiences",
			icon: '/images/dynamic/icon/3.svg'

		},
		{
			title: "Safety And Assurance",
			icon: '/images/dynamic/icon/4.svg'

		},
		{
			title: "A Place To Belong",
			icon: '/images/dynamic/icon/5.svg'

		},
		{
			title: "Inspired Architecture",
			icon: '/images/dynamic/icon/6.svg'

		},
		{
			title: "Culinary Delight",
			icon: '/images/dynamic/icon/7.svg'

		},
		{
			title: "Seamless Accessibility",
			icon: '/images/dynamic/icon/8.svg'

		},
		{
			title: "Moments Of Serenity",
			icon: '/images/dynamic/icon/9.svg'

		},
		{
			title: "Hospitality With Heart",
			icon: '/images/dynamic/icon/10.svg'

		}
	];

	const offset = useContainerOffset('.container')

	return (
		<StyledFeatureList offset={offset}>
			<div className="fixed-element animated-bottom" data-size={10}>
				<img src="/images/static/fixed-element-2.png" alt="" />
			</div>
			<Container>
				<Row>
					<Col md={{ span: 12 }} className="form_template__content">
						<Title
							color={theme.colors.white.base}
							text={
								data?.section_data?.subtitle
									? data?.section_data?.subtitle
									: data?.data?.subtitle ? data?.data?.subtitle : title
							}
							tag="h2"
							margin={'0 0 0'}
							textTransform="uppercase"
							animate={false}
						/>


					</Col>
					<Col md={12}>
						{/* Amenities Grid */}
						{defaultAmenities?.length > 0 && (
							<AmenitiesGrid>
								{defaultAmenities.map((amenity, index) => (
									<AmenityCard key={index}>
										<AmenityIcon>
											<img src={amenity?.icon} alt={amenity?.title}/>
										</AmenityIcon>
										<AmenityTitle>
											{parse(amenity?.title)}
										</AmenityTitle>
									</AmenityCard>
								))}
							</AmenitiesGrid>
						)}
					</Col>
				</Row>
			</Container>
		</StyledFeatureList>
	);
};

const StyledFeatureList = styled.section`
	padding: 150px 0;
    background: #24231C url('/images/static/feature_list_project.webp') center / cover no-repeat fixed;
    background-blend-mode: color-dodge, normal;
    position: ${theme.positioning.type.relative};


    &:after {
        position: ${theme.positioning.type.absolute};
        content: '';
        inset: 0;
        width: ${theme.numericScale.width.full};
        height: ${theme.numericScale.height.full};
        background: rgba(20, 26, 18, 0.5);

    }

    .fixed-element {
        position: absolute;
        left: ${props => props.offset - 80}px;
        top: -50px;
        z-index: 1;
    }

    .container {
        position: ${theme.positioning.type.relative};
        z-index: 2;
    }

    .title-with-navigation {
        margin-bottom: 100px;
    }


    ${theme.grid.media.up.laptop} {

    }

    ${theme.grid.media.down.tab} {
    }

    ${theme.grid.media.down.md} {
        padding: 100px 0;

        .title-with-navigation {
            margin-bottom: 60px;
        }

    }
`;

export default FeatureList;
