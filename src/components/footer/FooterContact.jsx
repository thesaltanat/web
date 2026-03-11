'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import theme from '@/src/styles/theme';

const FooterInformation = styled.div`
	${theme.grid.media.down.md} {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-direction: row;
		gap: 20px;
	}
`;

const ItemSingle = styled.div`
	margin-bottom: 40px;

	p {
		font-weight: 400;
		font-style: normal;
		font-size: 1rem; /* 16px */
		line-height: 1; /* 100% */
		letter-spacing: -0.0178rem; /* -2% */
		color: rgba(150, 136, 83, 0.7);
		margin-bottom: 15px;
		cursor: default;

		&:nth-of-type(2) {
			color: ${theme.colors.white.base};
			font-weight: 400;
			font-style: normal;
			font-size: 1rem; /* 20px */
			line-height: 1; /* 100% */
			letter-spacing: -0.0222rem; /* -2% */
			text-decoration: none;
			transition: ${theme.animations.transition.default};
			margin-bottom: 0;
			display: inline-block;
			cursor: default;
		}
	}

	a {
		color: ${theme.colors.white.base};
		font-weight: 400;
		font-style: normal;
		font-size: 1rem; /* 20px */
		line-height: 1; /* 100% */
		letter-spacing: -0.0222rem; /* -2% */
		text-decoration: none;
		transition: ${theme.animations.transition.default};
		margin-bottom: 0;
		display: inline-block;

		&:hover {
			text-decoration: underline;
		}
	}

	&:hover {
		cursor: pointer;
	}

	${theme.grid.media.down.md} {
		flex: 0 0 calc(100% - 20px);
		width: calc(100% - 20px);

		&:nth-of-type(1) {
			flex: 0 0 calc(50% - 20px);
			width: calc(50% - 20px);
		}

		&:nth-of-type(2) {
			flex: 0 0 calc(50% - 20px);
			width: calc(50% - 20px);
		}
	}
`;

const FooterContact = ({ globalData }) => {
	if (!globalData) {
		return null;
	}

	return (
		<FooterInformation>
			{globalData?.office_phone && (
				<ItemSingle>
					<p>Phone</p>
					<Link
						href={`tel:${globalData?.office_phone}`}
						target="_blank">
						{globalData?.office_phone}
					</Link>
				</ItemSingle>
			)}

			{globalData?.contact_email && (
				<ItemSingle>
					<p>Email</p>
					<Link
						href={`mailto:${globalData?.contact_email}`}
						target="_blank">
						{globalData?.contact_email}
					</Link>
				</ItemSingle>
			)}

			{globalData?.office_location && (
				<ItemSingle>
					<p>Address</p>
					<Link
						href={`${globalData?.google_map_link}`}
						target="_blank">
						{globalData?.office_location}
					</Link>
				</ItemSingle>
			)}

			{globalData?.office_hours && (
				<ItemSingle>
					<p>Availability</p>
					<p>{globalData?.office_hours}</p>
				</ItemSingle>
			)}
		</FooterInformation>
	);
};

export default React.memo(FooterContact);
