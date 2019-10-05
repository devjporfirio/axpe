import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { NextArrow, PrevArrow } from './Arrow';
import { Container, Slide, Image, ImagesGrid } from './styles';

function renderBackground(type, item) {
  switch (type) {
    case 'slickGrid':
      return (
        <>
          <ImagesGrid>
            <div>
              <p>{item.titleGreen}</p>
            </div>
            <Image type={type} mq="desktop" url={item.images.desktop1} />
            <Image type={type} mq="desktop" url={item.images.desktop2} />
            <Image type={type} mq="desktop" url={item.images.desktop3} />
          </ImagesGrid>
          <Image type={type} mq="mobile" url={item.images.mobile} />
        </>
      );
    default:
      return (
        <>
          <Image type={type} mq="desktop" url={item.images.desktop} />
          <Image type={type} mq="mobile" url={item.images.mobile} />
        </>
      );
  }
}

function Slick({ type = 'slick', slidesToShow = 1, items = [] }) {
  const settings = {
    slidesToShow,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    lazyLoad: true,
    nextArrow: <NextArrow type={type} />,
    prevArrow: <PrevArrow type={type} />
  };

  if (type === 'slickLarge') {
    settings.rows =
      window.innerWidth >= 769 ? (items.length >= 2 ? 2 : items.length) : 1;
    settings.slidesPerRow = 1;
  }

  if (type === 'slickSmall') {
    settings.slidesToShow =
      window.innerWidth >= 769 ? (items.length >= 3 ? 3 : items.length) : 1;
  }

  return (
    <Container type={type} {...settings} length={items.length}>
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <Slide
            key={item.id || index}
            to={item.link ? item.link.url : '#'}
            target={item.link ? item.link.target : ''}
            type={type}
          >
            {renderBackground(type, item)}

            <Section type={type} item={item} />
          </Slide>
        ))}
    </Container>
  );
}

Slick.propTypes = {
  type: PropTypes.oneOf([
    'slick',
    'slickLeft',
    'slickGrid',
    'slickLarge',
    'slickSmall'
  ]),
  items: PropTypes.array.isRequired
};

export default Slick;
