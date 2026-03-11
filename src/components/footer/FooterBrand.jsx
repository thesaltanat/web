'use client';

import React from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';
import theme from '@/src/styles/theme';
import Social from '@/src/components/ui/Social';

const FooterLogo = styled.div`
	${theme.grid.media.down.tab} {
		img {
			height: 80px;
		}
	}
`;

const FooterText = styled.p`
	font-weight: 400;
	font-style: normal;
	font-size: 0.8889rem; /* 16px */
	line-height: 1; /* 100% */
	letter-spacing: -0.0178rem; /* -2% */
	color: #ffffff;
	margin-top: 60px;

	${theme.grid.media.up.laptop} {
		padding-right: 10rem;
	}
`;

const FooterBrand = ({ logoFooter, footerHeading, socialMedia }) => {
	return (
		<>
			{logoFooter?.path && (
				<FooterLogo>
					<img
						src={
							process.env.NEXT_PUBLIC_API_URL +
							'/admin/' +
							logoFooter?.path
						}
						height={120}
						alt="Footer logo"
					/>
				</FooterLogo>
			)}

			{footerHeading && <FooterText>{parse(footerHeading)}</FooterText>}

			{socialMedia && socialMedia?.length > 0 && (
				<Social
					data={socialMedia}
					margin={'60px 0 0'}
					marginMobile={'60px 0 60px'}
					iconColor={'white'}
				/>
			)}
		</>
	);
};

export default React.memo(FooterBrand);
