'use client';

import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import styled from 'styled-components';

const FooterCopyRightText = styled.p`
	font-weight: 500;
	font-style: normal;
	font-size: 0.78rem; /* 14px */
	line-height: 1.11rem; /* 20px ÷ 18px = 1.111rem */
	letter-spacing: 0;
	color: #ffffff;
	margin: 0;

	a {
		display: inline-flex;
		gap: 10px;

		img {
			height: 20px;
			width: 20px;
		}
	}
`;

const FooterCopyright = ({ copyrightText }) => {
	return (
		<>
			{copyrightText && (
				<FooterCopyRightText>
					{parse(copyrightText)}
				</FooterCopyRightText>
			)}

			<FooterCopyRightText>
				Site by{' '}
				<Link href="https://dcastalia.com">
					Dcastalia{' '}
					<img src="/dc-mini-logo.webp" alt="" />
				</Link>
			</FooterCopyRightText>
		</>
	);
};

export default React.memo(FooterCopyright);
