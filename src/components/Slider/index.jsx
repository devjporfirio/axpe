import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from './Arrow';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Slick({
  slidesPerRow = 1,
  slidesToShow = 1,
  slidesToScroll = 1,
  swipeToSlide = false,
  focusOnSelect = false,
  asNavFor = null,
  centerMode = false,
  rows = 1,
  propsArrow,

  reference = null,
  children,
  type,
  lenght,
  className
}) {
  const settings = {
    slidesPerRow,
    slidesToShow,
    slidesToScroll,
    swipeToSlide,
    focusOnSelect,
    asNavFor,
    centerMode,
    rows,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    nextArrow: <NextArrow {...propsArrow} />,
    prevArrow: <PrevArrow {...propsArrow} />
  };

  return (
    <Slider
      {...settings}
      className={className}
      type={type}
      lenght={lenght}
      ref={reference}
    >
      {children}
    </Slider>
  );
}

Slick.propTypes = {
  slidesPerRow: PropTypes.number,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  swipeToSlide: PropTypes.bool,
  focusOnSelect: PropTypes.bool,
  asNavFor: PropTypes.object,
  rows: PropTypes.number,
  
  propsArrow: PropTypes.object,
  reference: PropTypes.func,
  children: PropTypes.array,
  type: PropTypes.string,
  lenght: PropTypes.number,
  className: PropTypes.string
};
