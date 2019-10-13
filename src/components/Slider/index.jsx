import React from 'react';
import PropTypes from 'prop-types';
import { NextArrow, PrevArrow } from '../Arrow';

import { Container } from './styles';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Slick({
  adaptiveHeight = false,
  initialSlide = 0,
  slidesPerRow = 1,
  slidesToShow = 1,
  slidesToScroll = 1,
  swipeToSlide = false,
  focusOnSelect = false,
  asNavFor = null,
  centerMode = false,
  rows = 1,
  variableWidth = false,
  propsArrow,
  arrows = true,

  reference = null,
  children,
  type,
  lenght,
  className
}) {
  const settings = {
    adaptiveHeight,
    initialSlide,
    slidesPerRow,
    slidesToShow,
    slidesToScroll,
    swipeToSlide,
    focusOnSelect,
    asNavFor,
    rows,
    centerPadding: '0px',
    centerMode,
    variableWidth,
    // fade: true,
    infinite: true,
    speed: 500,
    lazyLoad: !centerMode,
    arrows,
    nextArrow: <NextArrow {...propsArrow} />,
    prevArrow: <PrevArrow {...propsArrow} />
  };

  return (
    <Container
      {...settings}
      className={className}
      type={type}
      lenght={lenght}
      ref={reference}
    >
      {children}
    </Container>
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  type: PropTypes.string,
  lenght: PropTypes.number,
  className: PropTypes.string
};
