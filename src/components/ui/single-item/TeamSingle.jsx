import React from 'react';
import PropTypes from 'prop-types';
import { SingleImage } from '@/src/components/ui/SingleImage';
import styled from 'styled-components';
import theme from '@/src/styles/theme';

const TeamSingle = ({
  imageSrc,
  imgAlt = '',
  name,
  designation,
  imagePaddingTop = 16, // px or CSS value (e.g. '2rem')
  className = '',
  ...rest
}) => {
  const paddingTopValue =
    typeof imagePaddingTop === 'number' ? `${imagePaddingTop}px` : imagePaddingTop;

  return (
    <StyledTeamSingle className={`team-single ${className}`} {...rest}>
      <div
        className="team-single__image-wrapper"
        style={{ paddingTop: paddingTopValue, position: 'relative'}}
      >
        {imageSrc ? (
         <SingleImage     src={imageSrc}
						  alt={imgAlt || name}/>
        ) : null}

		  <svg className={'icon-hover'} width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
			  <g filter="url(#filter0_d_334_470)">
				  <circle cx="40.7" cy="36.7002" r="29" stroke="white" shapeRendering="crispEdges"/>
			  </g>
			  <path d="M40.3447 29.3506L40.3268 43.2796M33.3503 36.3151H47.2794" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			  <defs>
				  <filter id="filter0_d_334_470" x="-4.86374e-05" y="0.000195503" width="81.4" height="81.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
					  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
					  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
					  <feOffset dy="4"/>
					  <feGaussianBlur stdDeviation="5.6"/>
					  <feComposite in2="hardAlpha" operator="out"/>
					  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.47 0"/>
					  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_334_470"/>
					  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_334_470" result="shape"/>
				  </filter>
			  </defs>
		  </svg>

	  </div>

      <div className="team-single__content" style={{ textAlign: 'left', marginTop: 12 }}>
        {name ? <div className="team-single__name" style={{ fontWeight: 500, color: 'white', marginBottom: '10px', fontSize: '1.333rem', lineHeight: 1, letterSpacing: '-0.0267rem' }}>{name}</div> : null}
        {designation ? <div className="team-single__designation" style={{ color: 'rgba(255,255,255,0.5)',fontSize: '1rem', fontWeight: 300, lineHeight: 1.2 }}>{designation}</div> : null}
      </div>
    </StyledTeamSingle>
  );
};

const StyledTeamSingle = styled.div`
	.team-single__image-wrapper {
		position: relative;

		.icon-hover {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50% , -50%) scale(0);
			z-index: 3;
			transition: ${theme.animations.transition.default};
		}

		&:after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: #3333331C;
			backdrop-filter: blur(10.9px);
			transition: ${theme.animations.transition.default};
			opacity: 0;
			display: none;
			

		}
	}
	&:hover{
		.team-single__image-wrapper {
			&:after {
				opacity: 1;
				display: none;
			}
			.icon-hover {
				transform: translate(-50% , -50%) scale(1);
				display: none;
				
			}
	}

`;

TeamSingle.propTypes = {
  imageSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  designation: PropTypes.string,
  imagePaddingTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

export default TeamSingle;