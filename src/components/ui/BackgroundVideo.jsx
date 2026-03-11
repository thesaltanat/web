import React, { forwardRef } from 'react';
import styled from 'styled-components';

const StyledBackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: ${props => (props.$isActive ? 3 : 1)};
  clip-path: ${props =>
    props.$isActive
      ? 'circle(150% at 50% 50%)'
      : 'circle(0% at 50% 50%)'};
  transition: clip-path 2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: clip-path;
  opacity: 1;
`;

const BackgroundVideo = forwardRef(({
  src,
  type = 'video/mp4',
  autoPlay = false,
  loop = true,
  muted = true, // Default to true for autoplay compliance
  playsInline = true,
  isActive = false,
  theme,
  onLoadedData,
  onError,
  ...rest
}, ref) => (
  <StyledBackgroundVideo
    ref={ref}
    autoPlay={autoPlay}
    loop={loop}
    muted={muted}
    playsInline={playsInline}
    $isActive={isActive}
    $theme={theme}
    onLoadedData={onLoadedData}
    onError={onError}
    {...rest}
  >
    <source src={src} type={type} />
    Your browser does not support the video tag.
  </StyledBackgroundVideo>
));

BackgroundVideo.displayName = 'BackgroundVideo';

export default BackgroundVideo;

