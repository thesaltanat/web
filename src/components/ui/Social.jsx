// File: core/components/ui/Social.jsx
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import theme from '@/src/styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Social = ({ iconColor, data, margin, marginMobile, direction = 'row' , gap = '15px'}) => {
	return (
		<StyledSocial className="social-item-wrapper" margin={margin} gap={gap} marginMobile={marginMobile} direction={direction}>
			<ul className="social">
				{data && data.length > 0 && data.map((item, index) => (
					<li key={index}>
						<Link href={item?.url} prefetch={true} target="_blank" rel="noreferrer">
							<FontAwesomeIcon
								// Use either an imported icon object (faTwitter) or an array like ['fab','twitter']
								icon={item?.icon}
								color={iconColor || theme.colors.white?.base}
								size="lg"
							/>
						</Link>
					</li>
				))}
			</ul>
		</StyledSocial>
	);
};

const StyledSocial = styled.div`
	margin: ${props => props.margin ? props.margin : theme.numericScale.margin['0']};
	.social {
		display: flex;
		flex-direction: ${props => props.direction};
		gap: ${props => props.gap};
		li {
			list-style: none !important;
			margin: 0;
			flex: unset !important;
			width: unset !important;
			a {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: ${theme.numericScale.margin['0']} !important;
				cursor: pointer;
				border-radius: 50%;
				height: 30px;
				width: 30px;
				border: 1px solid white;
				transition: ${theme.animations.transition.default};

				svg {
					overflow: ${theme.overflow.hidden};
					background: ${theme.colors.transparent};
					height: 15px;

					.hover_circle, path, rect {
						transition: ${theme.animations.transition.default};
					}
				}

				&:after {
					content: '' !important;
					position: ${theme.positioning.type.absolute} !important;
					inset: ${theme.numericScale.inset['0']} !important;
					height: ${theme.numericScale.height.full} !important;
					width: ${theme.numericScale.width.full} !important;
					border-radius: 50% !important;
					transition: ${theme.animations.transition.default};
					background: ${theme.colors.theme.secondary.base} !important;
					transform: scale(0);
					z-index: -1;
				}

				&:hover {
					border: 1px solid ${theme.colors.theme.secondary.base};

					&:after {
						transform: scale(1);
					}

					svg {

						path {
							fill: ${props => (props.iconhover ? props.iconhover : theme.colors.theme.hoverColor.base)} !important;
						}
					}
				}

			}
		}
	}
	
	${theme.grid.media.down.md} {
		margin: ${props => props.marginMobile ? props.marginMobile : theme.numericScale.margin['0']} !important;
	}


`;

export default React.memo(Social);

// File: pages/_app.js (Next.js) - add once in your app
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
// ...rest of your _app code

// Optional: File to register icons (e.g. core/icons/fa.js)
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebookF, faYoutube, faLinkedin, faInstagram, faTiktok, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
library.add(faTwitter, faFacebookF, faYoutube, faLinkedin, faInstagram, faTiktok, faLinkedinIn);
// Then set item.icon to the imported icon (faTwitter) or use ['fab','twitter'] in data.