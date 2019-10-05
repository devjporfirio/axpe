import React from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
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

function SlickSection({ type = 'slick', items = [] }) {
  let slidesToShow = 1;
  let rows = 1;
  let slidesPerRow = 1;
  const lengthItems = items.length;
  if (type === 'slickLarge') {
    rows = 2;
    slidesPerRow = 1;
  }

  if (type === 'slickSmall') {
    slidesToShow =
      window.innerWidth >= 769 ? (lengthItems >= 3 ? 3 : lengthItems) : 1;
  }

  return (
    <Container
      type={type}
      length={lengthItems}
      propsArrow={{ type }}
      slidesToShow={slidesToShow}
      slidesPerRow={slidesPerRow}
      rows={rows}
    >
      {items &&
        lengthItems > 0 &&
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

SlickSection.propTypes = {
  type: PropTypes.oneOf([
    'slick',
    'slickLeft',
    'slickGrid',
    'slickLarge',
    'slickSmall'
  ]),
  items: PropTypes.array.isRequired
};

export default SlickSection;
