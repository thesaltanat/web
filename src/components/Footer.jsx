'use client';

import { Col, Container, Row } from 'react-bootstrap';
import React, { useMemo } from 'react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { gsap } from 'gsap';
import styled from 'styled-components';
import theme from '@/src/styles/theme';
import FooterBrand from '@/src/components/footer/FooterBrand';
import FooterNavigation from '@/src/components/footer/FooterNavigation';
import FooterContact from '@/src/components/footer/FooterContact';
import FooterCopyright from '@/src/components/footer/FooterCopyright';

gsap.registerPlugin(ScrollTrigger);

export const StyledFooter = styled.section`
	padding: 80px 0 65px;
	background-color: ${theme.colors.theme.footerBackground.base};
	position: ${theme.positioning.type.relative};

	&:after {
		content: '';
		position: absolute;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		background-size: contain;
		background: url('${theme.assets.images.footerTexture}') no-repeat center right;
		opacity: 0.04;
		z-index: 1;
	}

	.container {
		position: relative;
		z-index: 3 !important;
	}

	${theme.grid.media.up.laptop} {
		.container {
			padding: 0 35px;
		}
	}

	${theme.grid.media.down.md} {
		&:after {
			background-position: top right;
		}
	}
`;

const Footer = ({ data }) => {
	const globalData = data?.data?.global_settings_data;

	// Safe JSON parsing with fallback
	const logoFooter = useMemo(() => {
		try {
			return globalData?.logo_footer
				? JSON.parse(globalData.logo_footer)
				: null;
		} catch (error) {
			return null;
		}
	}, [globalData?.logo_footer]);

	const socialMedia = useMemo(() => {
		try {
			return globalData?.social_media_links
				? JSON.parse(globalData?.social_media_links)
				: null;
		} catch (error) {
			return null;
		}
	}, [globalData?.social_media_links]);

	const menuFooter = useMemo(() => {
		try {
			return data?.data?.menus?.[2] ? data?.data?.menus?.[2] : null;
		} catch (error) {
			return null;
		}
	}, [data?.data?.menus]);

	return (
		<StyledFooter className="footer" data-scroll-section>
			<Container style={{ position: 'relative', zIndex: 2 }}>
				<Row>
					<Col md={5}>
						<FooterBrand
							logoFooter={logoFooter}
							footerHeading={globalData?.footer_heading}
							socialMedia={socialMedia}
						/>
					</Col>

					<Col md={4}>
						<FooterNavigation menuFooter={menuFooter} />
					</Col>

					<Col md={3}>
						<FooterContact globalData={globalData} />
					</Col>

					<Col md={5}>
						<FooterCopyright
							copyrightText={globalData?.copyright_text}
						/>
					</Col>
				</Row>
			</Container>
		</StyledFooter>
	);
};

export default React.memo(Footer);
