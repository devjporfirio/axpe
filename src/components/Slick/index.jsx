import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { NextArrow, PrevArrow } from './Arrow';
import {
  Container,
  Slide,
  Image,
  // GradientImage,
  Section,
  ImagesGrid
} from './styles';

function sectionSlick(item) {
  return (
    <>
      <h4>{item.title}</h4>
      {item.title && <hr />}
      <p>{item.content}</p>
    </>
  );
}

function selectionSlickLeft(item, labelTitle) {
  return (
    <>
      <h4>{item[labelTitle]}</h4>
      {item[labelTitle] && <hr />}
      <p>
        {item.building.infos.use}: {item.building.infos.areaTotal}
      </p>
      <p>Venda: {item.building.values.sell}</p>
      <p>Aluguel: {item.building.values.rent}</p>
      <br />
      <p>REF {item.building.reference}</p>
      <br />
      <Button label="Saiba mais" />
    </>
  );
}

function selectionSlickLarge(item) {
  return (
    <>
      <h4>{item.building.address.local}</h4>
      <p>
        {item.building.infos.use}: {item.building.infos.areaTotal}
      </p>
      <p>Venda: {item.building.values.sell}</p>
      <p>Aluguel: {item.building.values.rent}</p>
      <br />
      <p>REF {item.building.reference}</p>
      <br />
      <Button label="Saiba mais" />
    </>
  );
}

function renderBackground(type, item) {
  switch (type) {
    case 'slickGrid':
      return (
        <>
          <ImagesGrid>
            <div>
              <p>{item.titleGreen}</p>
            </div>
            <Image type={type} mq="desktop" src={item.images.desktop1} alt="" />
            <Image type={type} mq="desktop" src={item.images.desktop2} alt="" />
            <Image type={type} mq="desktop" src={item.images.desktop3} alt="" />
          </ImagesGrid>
          <Image type={type} mq="mobile" src={item.images.mobile} alt="" />
        </>
      );
    default:
      return (
        <>
          {/* <GradientImage type={type} /> */}
          <Image type={type} mq="desktop" src={item.images.desktop} />
          <Image type={type} mq="mobile" src={item.images.mobile} />
        </>
      );
  }
}

function renderSelection(type, item) {
  switch (type) {
    case 'slick':
      return sectionSlick(item);
    case 'slickLeft':
      return selectionSlickLeft(item, 'title');
    case 'slickGrid':
      return selectionSlickLeft(item, 'titleWhite');
    case 'slickLarge':
    case 'slickSmall':
      return selectionSlickLarge(item);
  }
}

function Slick({
  type = 'slick',
  rows = 0,
  slidesPerRow = 0,
  slidesToShow = 1,
  items = []
}) {
  const settings = {
    slidesToShow,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    nextArrow: <NextArrow type={type} />,
    prevArrow: <PrevArrow type={type} />
  };

  if (type === 'slickLarge') {
    settings.rows = rows;
    settings.slidesPerRow = slidesPerRow;
    settings.infinite = items.length > 3;
  }

  return (
    <Container type={type} {...settings}>
      {items &&
        items.length > 0 &&
        items.map(item => (
          <Slide
            key={item.id}
            to={item.link ? item.link.url : '#'}
            target={item.link ? item.link.target : ''}
            type={type}
          >
            {type !== 'slickLarge' ? (
              renderBackground(type, item)
            ) : (
              <>
                <Image type={type} mq="desktop" src={item.images.desktop} />
                <Image type={type} mq="mobile" src={item.images.mobile} />
              </>
            )}

            <Section type={type}>{renderSelection(type, item)}</Section>
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
