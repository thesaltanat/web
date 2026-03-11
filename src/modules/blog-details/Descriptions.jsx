'use client';
import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import theme from '@/src/styles/theme';
const BlogList = ({ data, title }) => {

	const section_data = data?.section_data || data?.data;
	const image_data = data?.images;
	const bannerimage = image_data?.list ? image_data?.list?.filter((f => f?.banner === 'on')) : image_data?.filter((f => f?.banner === 'on'));
	const video = image_data?.list ? image_data?.list?.find((f => f?.is_video === 'on')) : image_data?.find((f => f?.is_video === 'on'));
	const thumb = image_data?.list ? image_data?.list?.filter((f => f?.thumb === 'on')) : image_data?.filter((f => f?.thumb === 'on'));
	return (
		<StyledBlogList className="" >
			<div className="image-blog-wrapper">
				{
					section_data?.subtitle &&
					<p>{parse(section_data?.subtitle)}</p>
				}
				{
					section_data?.short_desc &&
					<p>{parse(section_data?.short_desc)}</p>
				}
				{
					thumb?.length > 0 ?
						<div className="image-flex">
							{
								thumb?.map((e,index) => {
									return(
										<div className="single-image_data" key={index}>
											<img loading="lazy"  src={e?.full_path} alt={e?.short_title}  />
										</div>
									)
								})
							}
						</div>
						: ''
				}
				{
					bannerimage && bannerimage?.length > 0 ?

						bannerimage?.map((e, index) => {

							return(
								<React.Fragment key={index}>
									<img loading="lazy"  src={e?.full_path} alt={title} />
									<p>{e?.short_title}</p>
								</React.Fragment>
							)
						})

						:
					<>
						<img loading="lazy"  src={bannerimage?.full_path} alt={title} />
						<p>{bannerimage?.short_title}</p>
					</>

				}
				{
					section_data?.descriptiosn &&
					parse(section_data?.description)
				}
			</div>

		</StyledBlogList>
	);
};

const StyledBlogList = styled.div`


    .image-blog-wrapper {
        margin-top: 40px;
        margin-bottom: 40px;

        h3 {
            font-weight: 500;
            margin-bottom: 20px;

        }

        img {
            width: 100%;
            height: auto;
        }

        p {
            margin-top: 20px;
            font-weight: 500;
            font-size: 1rem; /* 16px */
            line-height: 1.5rem; /* 24px */
            letter-spacing: 0;
            margin-bottom: 20px;

        }

        blockquote {
            padding: 18px 25px;
            opacity: 0.92;
            background: ${theme.colors.theme.primary.base};
            color: ${theme.colors.white.base};
            font-size: 0.9rem;
            font-style: normal;
            font-weight: 300;
            line-height: 1.377rem;
            letter-spacing: -0.027rem;
            margin: 60px 0;
        }

        .image-flex {
            display: flex;
            gap: 0;
            flex-wrap: nowrap;
            margin-bottom: 60px;
            justify-content: space-between;

            .single-image_data {
                flex: 0 0 50%;
                max-width: 50%;
            }
        }

        .video_single {
            margin: 0 0 60px;

            .video-box {
                padding-top: calc(430 / 770 * 100%) !important;
            }
        }

        .round-list {
            margin-top: 40px;
            list-style: none;

            li {
                border-bottom: 1px solid ${theme.colors.theme.primary.base};
                padding-bottom: 10px;
                margin-bottom: 10px;
                font-weight: 400;
                font-size: 1rem; /* 16px */
                line-height: 1.5rem; /* 24px */
                letter-spacing: 0; /* 0% */
                position: relative;
                counter-increment: count;
                padding-left: 32px;
                list-style: none;

                h3 {
                    font-weight: 400;
                    font-size: 1.25rem; /* 20px */
                    line-height: 1.5rem; /* 24px */
                    letter-spacing: 0;
                    margin-bottom: 10px;
                }

                p {
                    margin: 0;
                }

                &:before {
                    width: 20px;
                    height: 20px;
                    background: ${theme.colors.theme.secondary.base};
                    content: counter(count, decimal);
                    font-weight: 400;
                    font-size: 0.625rem; /* 10px */
                    line-height: 0.75rem; /* 12px */
                    letter-spacing: 0;
                    text-align: center;
                    position: absolute;
                    left: 0;
                    top: 5px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }

        ul {
            list-style: disc;
            padding-left: 15px;
            margin-bottom: 60px;

            li {
                list-style: disc;
                font-size: 1rem;
                font-style: normal;
                font-weight: 400;
                line-height: 1.53rem;
                letter-spacing: -0.023rem;
                margin-bottom: 10px;

                ::marker {
                    color: ${theme.colors.theme.primary.base};
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-weight: 400;
            font-size: 1rem; /* 16px */
            line-height: 1.5rem; /* 24px */
            letter-spacing: 0;
            margin-bottom: 60px;
            border-color: ${theme.colors.theme.secondary.base};

        }

        tr {
            display: flex;
        }

        th, td {
            width: 50%; /* Each cell takes 50% */
            border-bottom: 1px solid ${theme.colors.theme.primary.base}; /* Light gray border */
            padding: 20px;
            text-align: left;
            border-color: ${theme.colors.theme.primary.base};
        }

        th {
            font-weight: 700;
            border-bottom: 1px solid ${theme.colors.theme.primary.base}; /* Light gray border */

        }


        caption {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 10px;
        }
    }


`;


export default BlogList;
