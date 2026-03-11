'use client';
import React from 'react';
import styled from 'styled-components';
import Link from "next/link";
import theme from "@/src/styles/theme";

const LinkOnly = ({
                    onSubmit,         // Form submission handler
                    onClick,          // Click event handler
                    text,             // Text to display on the button
                    src,              // Link URL
                    img,              // Background image for the button
                    hoverImg,         // Hover state background image
                    icon,             // Icon to display
                    fontSize,         // Font size
                    fontWeight,       // Font weight
                    color,            // Text color
                    hovercolor,       // Text color on hover
                    letterSpacing,    // Letter spacing
                    lineHeight,       // Line height
                    margin,           // Margin around the button
                    marginSm,         // Margin for small devices
                    padding,          // Padding inside the button
                    background,       // LinkOnly background color
                    hoverbackground,  // Hover state background color
                    borderRadius,     // Border radius
                    border,           // Border styles
                    borderColor,      // Border color
                    width,            // LinkOnly width
                    height,           // LinkOnly height
                    target,           // Target attribute for links
                    className,        // Additional classes
                    transition,       // Transition effect duration and timing
                    boxShadow,        // Shadow styles
                    zIndex,           // Z-index
                }) => {
    return (
        <StyledBtn
            onClick={onClick}
            onSubmit={onSubmit}
            className={`${className ? className : ''} dc-btn-link`}
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
            background={background}
            hovercolor={hovercolor}
            hoverbackground={hoverbackground}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
            margin={margin}
            marginSm={marginSm}
            padding={padding}
            border={border}
            borderRadius={borderRadius}
            borderColor={borderColor}
            width={width}
            height={height}
            img={img}
            hoverImg={hoverImg}
            zIndex={zIndex}
            boxShadow={boxShadow}
            transition={transition}
        >

            {
                icon ?

                    <Link prefetch={true} className={'icon-hover-main'} href={src || '/public'} target={target ? target : '_self'}>
                        {
                            text &&
                            <div className="d-flex">
                                <span>{text}</span>
                                <span>{text}</span>
                            </div>

                        }

                        <svg width="77" height="22" viewBox="0 0 77 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M66.0662 1L75.9999 11" stroke={theme.colors.white.base} strokeWidth="2" strokeLinecap="round" />
                            <path d="M66.0662 21L75.9999 11" stroke={theme.colors.white.base} strokeWidth="2" strokeLinecap="round" />
                            <path d="M75.5033 11H1" stroke={theme.colors.white.base} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </Link>
                    :
                    <Link prefetch={true} href={src || '/public'} target={target ? target : '_self'}>
                        <span>{text}</span>
                        <span>{text}</span>
                    </Link>

            }

        </StyledBtn>
    );
};

const StyledBtn = styled.div`
    &.dc-btn-link {
        margin: ${props => props.margin || theme.numericScale.margin['0']};
        width: ${props => props.width || 'fit-content'};
        height: ${props => props.height || 'auto'};
        cursor: pointer;
        position: relative;
        z-index: ${props => props.zIndex || 0};
        transition: 0.7s all ${props => props.transition || theme.animations.transition.default};
        overflow: hidden;
        display: inline-block;

        a {
            display: flex;
            width: auto;
            height: auto;
            align-items: ${theme.layout.flex.align.center};
            justify-content: ${theme.layout.flex.justify.center};
            font-size: ${props => props.fontSize || 'inherit'};
            font-weight: ${props => props.fontWeight || 'inherit'};
            color: ${props => props.color || theme.colors.black?.base};
            letter-spacing: ${props => props.letterSpacing || 'inherit'};
            line-height: ${props => props.lineHeight || 'inherit'};
            background: ${props => `url(${props.img || ''})`} no-repeat center/cover;
            border-color: ${props => props.borderColor || theme.colors.transparent};
            position: relative;
            overflow: hidden;
            transition: ${theme.animations.transition.default};
            &.icon-hover-main{
                display: flex;
                gap: 30px;
                svg{
                    transition:${theme.animations.transition.default};
                    will-change: transform;
                    path{
                        transition:${theme.animations.transition.default};
                        
                    }
                }
            }
            span{
                position: relative;
                transition: ${theme.animations.transition.default};
                transform-style: preserve-3d;
                &:first-child{
                    transform: translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                }
                &:last-child{
                    position: ${theme.positioning.type.absolute};
                    top: 102%;
                    transform: translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                }
            }
            &:hover {
                span{
                    &:first-child{
                        transform:translate3d(0px, -100%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                        
                    }
                    &:last-child{
                        transform: translate3d(0px, -100%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
                    }
                }
            }
        }

   
    }
`;

export default React.memo(LinkOnly);
