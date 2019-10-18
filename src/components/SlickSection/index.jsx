import React from 'react';
import PropTypes from 'prop-types';
import Section from 'components/Section';
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
            <Image type={type} mq="desktop" src={item.images.desktop1} />
            <Image type={type} mq="desktop" src={item.images.desktop2} />
            <Image type={type} mq="desktop" src={item.images.desktop3} />
          </ImagesGrid>
          <Image type={type} mq="mobile" src={item.images.mobile} />
        </>
      );
    default:
      return (
        <>
          <Image type={type} mq="desktop" src={item.images.desktop} />
          <Image type={type} mq="mobile" src={item.images.mobile} />
        </>
      );
  }
}

function SlickSection({ type = 'slick', items = [], color }) {
  let slidesToShow = 1;
  let rows = 1;
  let slidesPerRow = 1;
  const lengthItems = items.length;

  if (type === 'slickLarge') {
    rows = 2;
    slidesPerRow = 1;
  }

  if (type === 'slickSmall') {
    slidesToShow = lengthItems >= 3 ? 3 : lengthItems;
  }

  const responsive = {
    slickSmall: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: lengthItems >= 3 ? 3 : lengthItems
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ],
    slickLarge: [
      {
        breakpoint: 769,
        settings: {
          rows: 2,
          slidesToShow: 2,
          slidesPerRow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          rows: 1,
        }
      }
    ]
  };

  return (
    <Container
      type={type}
      length={lengthItems}
      propsArrow={{ type }}
      slidesToShow={slidesToShow}
      slidesPerRow={slidesPerRow}
      rows={rows}
      responsive={responsive[type]}
      propsArrow={{
        typeSection: type,
        color: color,
        type: [ 'slick', 'slickLeft', 'slickGrid' ].includes(type)
          ? 'together'
          : '',
        position:
          type === 'slickGrid' ? 'right' : type === 'slick' ? 'left' : 'outside'
      }}
    >
      {items &&
        lengthItems > 0 &&
        items.map((item, index) => (
          <Slide
            key={item.id || index}
            href={item.link ? item.link.url : '#'}
            target={item.link && item.link.external ? '_blank' : '_self'}
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
