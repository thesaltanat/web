'use client';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useRouter} from 'next/navigation';
import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import parse from "html-react-parser";
import { StyledBlogDetails } from '@/src/modules/blog-details/blogdetails.style';
import LinkOnly from '@/src/components/ui/LinkOnly';
import SocialShare from '@/src/components/ui/SocialShare';
import { SingleImage } from '@/src/components/ui/SingleImage';
import Descriptions from '@/src/modules/blog-details/Descriptions';

gsap.registerPlugin(ScrollTrigger);


const BlogDetails = ({data, solution, industry}) => {
    const router = useRouter();
    const [getBlogData, setBlogData] = useState(() => data);

    // Memoize the arrow icon to prevent unnecessary re-renders
    const arrowIcon = useMemo(() => (
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L1 5L5 9" stroke="transparent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>


    ), []);

    useEffect(() => {
        let mounted = true;

        const updateData = () => {
            if (!mounted) return;

            if (data) {
                setBlogData(data);
            }

        };

        updateData();

        return () => {
            mounted = false;
        };

    }, []);

    // Memoize the handleBack function to prevent unnecessary re-renders
    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    // Memoize the formatDate function to prevent unnecessary re-renders
    const formatDate = useCallback((dateString) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        if (!dateString) return {day: "", month: "", year: ""};

        const dateObj = new Date(dateString);
        return {
            day: dateObj.getDate(),
            month: months[dateObj.getMonth()],
            year: dateObj.getFullYear()
        };
    }, []);

    // Memoize the date object to prevent unnecessary re-renders
    const {day, month, year} = useMemo(() =>
            formatDate(data?.data?.date),
        [data?.data?.date, formatDate]
    );

    // Memoize the banner image to prevent unnecessary re-renders
    const bannerImages = useMemo(
        () => data?.images?.filter((f) => f?.banner === 'on'),
        [data?.images]
    );

    // Memoize the sections list to prevent unnecessary re-renders
    const sections_list = useMemo(() =>
            data?.posts?.list,
        [data?.posts?.list]
    );

    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Memoize the handleModalOpen function to prevent unnecessary re-renders
    const handleModalOpen = useCallback((e) => {
        e.preventDefault();
        window.history.pushState(null, '', '#get-a-quote-product');
        setModalIsOpen(true);
    }, []);

    // Memoize the handleModalClose function to prevent unnecessary re-renders
    const handleModalClose = useCallback(() => {
        setModalIsOpen(false);
        window.location.hash = '';
    }, []);

    useEffect(() => {
        if (window.location.hash === '#get-a-quote-product') {
            setModalIsOpen(true);
        }
    }, []);

    const sectionSingle = useRef();
    const detailsRef = useRef();
    const rightWrapperRef = useRef();



    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const leftElement = sectionSingle.current;
        const rightElement = rightWrapperRef.current;

        if (window.innerWidth >= 768 && leftElement && rightElement) {
            // Wait for images to load before initializing pin
            const initPin = () => {
                const rightHeight = rightElement.offsetHeight;
                const leftHeight = leftElement.offsetHeight;
                const extraScroll = rightHeight - leftHeight;

                const trigger = ScrollTrigger.create({
                    trigger: leftElement,
                    start: "top top+=200",
                    end: () => `+=${Math.max(extraScroll, 0)}`,
                    pin: true,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    markers: false
                });

                return trigger;
            };

            let trigger;

            // Initialize after all content is loaded
            if (document.readyState === 'complete') {
                // Small delay to ensure all GSAP updates are complete
                setTimeout(() => {
                    trigger = initPin();
                }, 100);
            } else {
                window.addEventListener('load', () => {
                    trigger = initPin();
                }, {once: true});
            }

            return () => {
                if (trigger) {
                    trigger.kill();
                }
                ScrollTrigger.getAll().forEach(t => t.kill());
            };
        }
    }, []);

    return (
        <>
            {/*<InnerBanner  data={getBlogData}/>*/}
            <StyledBlogDetails className="blog_details">
                <Container ref={detailsRef}>
                    <Row>
                        <Col md={4} className={'blog_details__left'} id={'blog_details'}>

                            <div ref={sectionSingle} className="content-wrapper">
                                <div className="back">
                                    <LinkOnly onClick={handleBack} src={'javascript:void(0)'}
                                              text={<>{arrowIcon} Back</>}/>
                                </div>
                                <div className="heading">
                                    <h1>{parse(data?.data?.title)}</h1>
                                    <ul>
                                        <li>
                                            {
                                                data?.data?.category_id === 1 ? 'Events' :
                                                    'Blog'

                                            }
                                            <span>|</span>
                                        </li>

                                        <li>{day + ' ' + month + ' ' + year}</li>
                                    </ul>
                                </div>
                                <SocialShare />
                            </div>
                        </Col>

                        <Col md={8} className="blog_details__right">
                            <div ref={rightWrapperRef}>
                                {
                                    bannerImages?.length > 0 &&
                                    bannerImages.map((img, idx) => (
                                        <div className="banner_image_wrapper" key={idx}>
                                            <SingleImage key={idx} src={img?.full_path}
                                                 alt={data?.data?.title || `banner-${idx}`}/>
                                        </div>
                                    ))
                                }
                                {
                                    data?.data?.body &&
                                    parse(data?.data?.body)
                                }
                                {sections_list?.length > 0 &&
                                    sections_list.map((item, index) => {

                                        switch (item?.data?.template) {
                                            case 'general_template':
                                                return <Descriptions data={item} key={index}/>;
                                            default:
                                                return null;
                                        }
                                    })
                                }
                            </div>
                        </Col>

                    </Row>
                </Container>
            </StyledBlogDetails>
        </>
    );
};


export default React.memo(BlogDetails);
