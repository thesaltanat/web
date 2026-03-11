'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import theme from '@/src/styles/theme';

const FooterNavigationWrapper = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 20px;

	li {
		a {
			color: ${theme.colors.white.base};
			font-weight: 500;
			font-style: normal;
			font-size: 1.1111rem; /* 20px */
			line-height: 1; /* 100% */
			letter-spacing: -0.0222rem; /* -2% */
			text-transform: uppercase;
			transition: ${theme.animations.transition.default};

			&:hover {
				text-decoration: underline;
			}
		}
	}

	${theme.grid.media.down.md} {
		margin-bottom: 60px;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-direction: row;

		li {
			flex: 0 0 calc(50% - 20px);
			width: calc(50% - 20px);
		}
	}
`;

const FooterNavigation = ({ menuFooter }) => {
	if (!menuFooter || menuFooter?.length === 0) {
		return null;
	}

	const sortedMenu = [...menuFooter].sort(
		(a, b) => (a?.sort_order || 0) - (b?.sort_order || 0),
	);

	return (
		<FooterNavigationWrapper>
			{sortedMenu.map((menuItem, index) => (
				<li key={index}>
					<Link href={menuItem?.item_url} prefetch={false}>
						{menuItem?.item_title}
					</Link>
				</li>
			))}
		</FooterNavigationWrapper>
	);
};

export default React.memo(FooterNavigation);
