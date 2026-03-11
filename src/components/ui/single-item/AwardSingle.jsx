'use client';
import styled from 'styled-components';
import Link from 'next/link';
import parse from 'html-react-parser';
import theme from '@/src/styles/theme';


const AwardSingle = ({title, link,  description, img}) => {

	const bannerImge = img?.find((f) => f?.banner === 'on');
	const thumbImge = img?.find((f) => f?.thumb === 'on');


	const PhotoItem = ({ bannerImge, group, thumbImge, title }) => (
			<div className="flipper">
				<img src={thumbImge?.full_path || '/images/static/blur.jpg'} alt={parse(title)} />
				<img src={bannerImge?.full_path || '/images/static/blur.jpg'} alt={parse(title)} />
			</div>
	);

	return (
		<StyledAwardSingle className="award-single ">

			<div className="award-single__inner">
				{
					link &&
					<Link prefetch={true} href={link || "/public"}></Link>

				}
				<PhotoItem title={title} group={'group'} bannerImge={bannerImge ? bannerImge : '/images/static/blur.jpg'} thumbImge={thumbImge} />
			</div>
			<h6 className={''}>{title}</h6>
			<p className={''}>{description}</p>
		</StyledAwardSingle>
	);
};

const StyledAwardSingle = styled.div`
    //width: 100%;

    .award-single__inner {
        position: relative;
        border-radius: 4px;
        background: #EFEFEF;
        overflow: hidden;
        cursor: pointer;
        padding: 75px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 270px;

		.flipper{
            -webkit-transition: 1.5s;
            -webkit-transform-style: preserve-3d;
            position: absolute;
			inset: 0;
		}
        img {
            transition: ${theme.animations.transition.default};
            -webkit-transition: 1.5s;
            -webkit-transform-style: preserve-3d;
            position: absolute;
			inset: 0;
			margin: auto;
			object-fit: contain;
            -webkit-backface-visibility: hidden;
			&:nth-of-type(1){
                z-index: 2;
			}
			&:nth-of-type(2){
				transform: rotateY(180deg);
                -webkit-transform: rotateY(180deg);
                width: 80%;
                margin: auto;
                height: 80%;
			}
        }

        .global-image {
            transition: ${theme.animations.transition.default};
            transform: scale(1.01);

            img {

            }
        }

        a {
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 3;
        }


        &:hover {
            .global-image {
                transform: scale(1.04);

            }
            .flipper {
                -webkit-transform: rotateY(180deg);
            }
            img {
            }

            h6 {
                    color: ${theme.colors.theme.hoverColor.base};
            }

            p {
                color: rgba(237, 32, 36, 0.3);
            }
        }

    }

    h6 {
        color: ${theme.colors.black.base};
        font-size: 1.25rem; /* 20px converted to rem */
        font-style: normal;
        font-weight: 700;
        line-height: 1.5rem; /* 24px converted to rem */
        transition: ${theme.animations.transition.default};
        transition-delay: 0.3s;
        margin: 20px 0 0;
    }

    p {
        color: #152637;
        font-size: 1.25rem; /* 20px converted to rem */
        font-style: normal;
        font-weight: 500;
        line-height: 1.75rem; /* 28px converted to rem */
        transition: ${theme.animations.transition.default};
        transition-delay: 0.3s;
    }


`;
export default AwardSingle;
