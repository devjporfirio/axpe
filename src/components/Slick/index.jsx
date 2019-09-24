import React from 'react';
import Button from '../Button';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { NextArrow, PrevArrow } from './Arrow';
import { Container, Slide, Image, GradientImage, Section } from './styles';

export default function Slick({ type = 'slide', items = [] }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow type={type} />,
    prevArrow: <PrevArrow type={type} />
  };
  return (
    <Container {...settings}>
      {items &&
        items.length > 0 &&
        items.map(i => (
          <Slide
            key={i.id}
            to={i.link ? i.link.url : '#'}
            target={i.link ? i.link.target : ''}
            type={type}
          >
            <GradientImage type={type} />

            <Image type={type} mq="desktop" src={i.images.desktop} />
            <Image type={type} mq="mobile" src={i.images.mobile} />

            <Section type={type}>
              <h4>{i.title}</h4>
              {i.title && <hr />}

              {type === 'slide' ? (
                <p>{i.content}</p>
              ) : (
                <>
                  <p>
                    {i.building.infos.use}: {i.building.infos.areaTotal}
                  </p>
                  <p>Venda: {i.building.values.sell}</p>
                  <p>Aluguel: {i.building.values.rent}</p>
                  <br />
                  <p>REF {i.building.reference}</p>
                  <br />
                  <Button label="Saiba mais" />
                </>
              )}
            </Section>
          </Slide>
        ))}
    </Container>
  );
}
