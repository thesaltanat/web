import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import  { Navigation, Pagination, Thumbs, EffectFade, Autoplay } from 'swiper/modules';
import SwiperCore from "swiper";
import styled from "styled-components";
// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Thumbs, EffectFade, Autoplay]);

// eslint-disable-next-line react/display-name
const Slider = forwardRef((props, ref) => {
	const {
		onSetTransition,
		onSlideChange,
		onProgress,
		touchStart,
		onSwiperInit,
		onBeforeInit,
		slidesPerGroup,
		children,
		effect,
		slidesPerView = 1,
		pagination = false,
		navigationLeft = null,
		navigationRight = null,
		spaceBetween = 0,
		loop = false,
		autoplay = false,
		speed = 2500,
		grabCursor = false,
		watchSlidesProgress = false,
		mousewheelControl = false,
		keyboardControl = false,
		animate,
		settings = {},
		breakpoints = {},
		className,
		on,
		direction, parentclass
	} = props;

	const sliderOptions = {
		slidesPerView,
		pagination,
		slidesPerGroup,
		navigation: {
			nextEl: navigationLeft,
			prevEl: navigationRight,
		},
		spaceBetween,
		loop,
		autoplay,
		speed,
		grabCursor,
		watchSlidesProgress,
		mousewheel: mousewheelControl,
		keyboard: keyboardControl,
		onSlideChange,
		onProgress,
		onTouchStart: touchStart,
		onSetTransition,
		breakpoints, // Adding breakpoints here
		effect,
		onBeforeInit,
		on,
		direction,
		...settings,
	};

	useEffect(() => {
		if (onSwiperInit && ref.current) {
			onSwiperInit(ref.current.swiper);
		}
	}, [onSwiperInit, ref]);

	return (
		<SliderWrap
			animate={animate}
			className={cn(parentclass)}
		>
			<Swiper {...sliderOptions} className={cn(className)} ref={ref}>
				{children}
			</Swiper>
		</SliderWrap>
	);
});

Slider.propTypes = {
	onSetTransition: PropTypes.func,
	onSlideChange: PropTypes.func,
	onProgress: PropTypes.func,
	touchStart: PropTypes.func,
	onBeforeInit: PropTypes.func,
	onSwiperInit: PropTypes.func,
	on: PropTypes.func,
	children: PropTypes.node.isRequired,
	slidesPerView: PropTypes.number,
	pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	navigationLeft: PropTypes.string,
	effect: PropTypes.string,
	navigationRight: PropTypes.string,
	spaceBetween: PropTypes.number,
	slidesPerGroup: PropTypes.number,
	loop: PropTypes.bool,
	autoplay: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
	speed: PropTypes.number,
	grabCursor: PropTypes.bool,
	watchSlidesProgress: PropTypes.bool,
	mousewheelControl: PropTypes.bool,
	keyboardControl: PropTypes.bool,
	animate: PropTypes.bool,
	settings: PropTypes.object,
	breakpoints: PropTypes.object, // Define the prop type for breakpoints
	className: PropTypes.string,
	direction: PropTypes.string,
};
export const SliderWrap = styled.div`
  position: relative;

`;
export { SwiperSlide as Slide };
export default React.memo(Slider);
