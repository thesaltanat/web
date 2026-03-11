import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton,
    EmailIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';
import theme from '@/src/styles/theme';

const SocialShare = ({direction}) => {
    let [shareUrl, setShareUrl] = useState('');
    useEffect(() => {
        setShareUrl(window.location.href);
    }, [shareUrl]);

    return (
        <StyledSocial className={'social-list-wrap-div'} direction={direction}>
            <p>Share:</p>
            <ul className={'social'}>
                <li>
                    <FacebookShareButton url={shareUrl}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="30" rx="4" fill={theme.colors.white.base}/>
                            <path
                                d="M12.4534 16.1602C12.3858 16.1602 10.8989 16.1602 10.2231 16.1602C9.86264 16.1602 9.75 16.025 9.75 15.6871C9.75 14.786 9.75 13.8623 9.75 12.9612C9.75 12.6008 9.88517 12.4881 10.2231 12.4881H12.4534C12.4534 12.4205 12.4534 11.1139 12.4534 10.5056C12.4534 9.60451 12.6111 8.74844 13.0616 7.95995C13.5347 7.14894 14.2106 6.60826 15.0666 6.29287C15.6298 6.09011 16.1931 6 16.8013 6H19.0091C19.3245 6 19.4596 6.13517 19.4596 6.45056V9.01877C19.4596 9.33417 19.3245 9.46934 19.0091 9.46934C18.4008 9.46934 17.7926 9.46934 17.1843 9.49186C16.576 9.49186 16.2606 9.78473 16.2606 10.4155C16.2381 11.0914 16.2606 11.7447 16.2606 12.4431H18.8739C19.2344 12.4431 19.3695 12.5782 19.3695 12.9387V15.6646C19.3695 16.025 19.2569 16.1377 18.8739 16.1377C18.0629 16.1377 16.3282 16.1377 16.2606 16.1377V23.4819C16.2606 23.8648 16.148 24 15.7425 24C14.7963 24 13.8727 24 12.9265 24C12.5885 24 12.4534 23.8648 12.4534 23.5269C12.4534 21.1615 12.4534 16.2278 12.4534 16.1602Z"
                                fill={theme.colors.theme.primary.base}/>
                        </svg>
                    </FacebookShareButton>
                </li>
                <li>
                    <LinkedinShareButton url={shareUrl}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="30" rx="4" fill={theme.colors.white.base}/>
                            <path
                                d="M22.5004 22.4994V17.0057C22.5004 14.3057 21.9191 12.2432 18.7691 12.2432C17.2504 12.2432 16.2379 13.0682 15.8254 13.8557H15.7879V12.4869H12.8066V22.4994H15.9191V17.5307C15.9191 16.2182 16.1629 14.9619 17.7754 14.9619C19.3691 14.9619 19.3879 16.4432 19.3879 17.6057V22.4807H22.5004V22.4994Z"
                                fill={theme.colors.theme.primary.base}/>
                            <path d="M7.74414 12.4878H10.8566V22.5003H7.74414V12.4878Z"
                                  fill={theme.colors.theme.primary.base}/>
                            <path
                                d="M9.3 7.5C8.30625 7.5 7.5 8.30625 7.5 9.3C7.5 10.2938 8.30625 11.1187 9.3 11.1187C10.2938 11.1187 11.1 10.2938 11.1 9.3C11.1 8.30625 10.2938 7.5 9.3 7.5Z"
                                fill={theme.colors.theme.primary.base}/>
                        </svg>

                    </LinkedinShareButton>
                </li>
                <li>
                    <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon size={30} borderRadius={10} fill={theme.colors.white.base}/>
                    </WhatsappShareButton>
                </li>
                <li>
                    <EmailShareButton url={shareUrl}>
                        <EmailIcon size={30} borderRadius={10} fill={theme.colors.white.base}/>
                    </EmailShareButton>
                </li>
                <li>
                    <TwitterShareButton url={shareUrl}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="30" rx="4" fill={theme.colors.white.base}/>
                            <path
                                d="M16.6774 13.6218L23.2342 6H21.6805L15.9872 12.6179L11.44 6H6.19531L13.0716 16.0074L6.19531 24H7.74916L13.7614 17.0113L18.5636 24H23.8083L16.677 13.6218H16.6774ZM14.5492 16.0956L13.8525 15.0991L8.30903 7.16971H10.6956L15.1693 13.5689L15.866 14.5655L21.6812 22.8835H19.2946L14.5492 16.096V16.0956Z"
                                fill={theme.colors.theme.primary.base}/>
                        </svg>

                    </TwitterShareButton>
                </li>
            </ul>
        </StyledSocial>

    );
};

const StyledSocial = styled.div`
    margin-bottom: ${theme.numericScale.margin['0']};

    p {
        margin-bottom: ${theme.numericScale.margin[11]} !important;
        color: ${theme.colors.theme.primary.base};
        letter-spacing: ${theme.numericScale.margin['0']}; /* 0em */
    }

    .social {
        display: ${theme.layout.display.flex};
        flex-direction: ${props => props.direction ? theme.layout.flex.direction.column : theme.layout.flex.direction.row};
        gap: 10px !important;
        padding: 0 !important;

        li {
            list-style: none !important;
            height: 40px;
            width: 40px;
            border: 1px solid ${theme.colors.theme.secondary.base};
            border-radius: 50%;
            position: ${theme.positioning.type.relative};
            display: ${theme.layout.display.inlineFlex};
            align-items: ${theme.layout.flex.align.center};
            justify-content: ${theme.layout.flex.align.center};
			


            &:after {
                display: ${theme.layout.display.none} !important;
            }

            &:before {
                display: ${theme.layout.display.none} !important;
            }

            a {
                &:after {
                    display: ${theme.layout.display.none} !important;
                }

                &:before {
                    display: ${theme.layout.display.none} !important;
                }
            }
        }

        svg {
            overflow: ${theme.overflow.hidden};

            circle {
                fill: ${theme.colors.transparent};
                stroke: rgba(25, 29, 28, 25%);

            }

            rect {
                fill: ${theme.colors.transparent};
            }

            path {
                fill: rgb(25, 29, 28);
            }

            .white_circle, path, #Rectangle_6283 {
                transition: ${theme.numericScale.transitions.mainTransition};
            }
        }

        li {
            margin-left: ${theme.numericScale.margin['0']};
            margin-bottom: ${theme.numericScale.margin['0']} !important;

            &:first-child {
                margin-left: ${theme.numericScale.margin['0']};
            }

            button {
                &:white {
                    svg {
                        .white_circle {
                            r: 12.5px;
                            opacity: 1;
                        }

                        #Ellipse_99 {
                            r: 15px;
                        }

                        path {
                            fill: ${theme.colors.transparent};
                        }

                        #Path_174, #path_173 {
                            fill: none !important;
                            stroke: ${theme.colors.black.base} !important;
                        }

                    }
                }
            }
        }
    }

    @media (max-width: 992px) and (min-width: 767px) {
        .social {
            flex-wrap: ${theme.layout.flex.wrap.wrap};
            align-items: flex-end;
            justify-content: flex-end;
            gap: 20px;

            li {
                margin-left: 0;
            }
        }
    }
    @media (max-width: 767px) {
        margin-top: 30px;
        display: ${theme.layout.display.flex};
        align-items: ${theme.layout.flex.align.center};
        justify-content: space-between;
        .social {
            flex-direction: row;
        }
    }
`;

export default React.memo(SocialShare);














