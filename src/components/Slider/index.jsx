import React from 'react';
import { Container } from './styles';
import { NextArrow, PrevArrow } from './Arrow';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Slider({
  slidesPerRow = 1,
  slidesToShow = 1,
  slidesToScroll = 1,
  rows = 1,
  children,
  propsArrow,
  type,
  lenght,
  className
}) {
  const settings = {
    slidesPerRow,
    slidesToShow,
    slidesToScroll,
    rows,
    infinite: true,
    speed: 500,
    lazyLoad: true,
    nextArrow: <NextArrow {...propsArrow} />,
    prevArrow: <PrevArrow {...propsArrow} />
  };

  return (
    <Container className={className} {...settings} type={type} lenght={lenght}>
      {children}
    </Container>
  );
}
