import styled from 'styled-components';
import theme from '@/src/styles/theme';

export const StyledBlogDetails = styled.section`
    background: #F9F4E8;
    padding: 200px 0 120px;
    position: relative;
    overflow: hidden;



    blockquote {
        font-style: italic;
        border-left: 4px solid ${theme.colors.theme.primary.base};
        margin: 20px 0;
        padding-left: 20px;
    }

    .content-wrapper {
        overflow: hidden;
    }

    .video_single {
        margin: 0 !important;

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
        }
    }

    .blog_details__left {
        .back {
            margin-bottom: 20px;

            svg {
                width: 24px;
                height: 24px;
                fill: #84692e;
            }

            a {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                text-decoration: none;
                transition: color 0.2s;

                span {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                }

                &:hover {
                }
            }
        }

        .heading {

            ul {
                display: flex;

                li {
                    position: relative;
                    display: inline-block;
                    margin-right: 10px;
                    span {
                        margin: 0 3px;
                    }
                }
            }

            margin-bottom: 30px;
        }
    }

    .blog_details__right {
        .banner_image_wrapper {
            margin-bottom: 45px;
            padding-top: 56.25%;
            position: relative;
        }


		img{
			width: 100%;
		}

        blockquote {
            font-style: italic;
            border-left: 4px solid #2c2921;
            margin: 20px 0;
            padding-left: 20px;
        }
    }

    @media screen and (max-width: 767px) {
        padding-top: 95px;

        .social-list-wrap-div {
            margin-bottom: 30px;
        }

        .image-flex {
            margin-bottom: 40px;
        }
    }
`;