import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IArrowNext from 'assets/icons/arrow-next-white.svg';
import IArrowPrev from 'assets/icons/arrow-prev-white.svg';

import {
  Container,
  Slide,
  ArrowNextWhite,
  ArrowPrevWhite,
  Image,
  GradientImage,
  Section
} from './styles';

function NextArrow(props) {
  return <ArrowNextWhite onClick={props.onClick} src={IArrowNext} />;
}

function PrevArrow(props) {
  return <ArrowPrevWhite onClick={props.onClick} src={IArrowPrev} />;
}

export default function Slick({ type = 'slide', items = [] }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  return (
    <Container {...settings}>
      {items &&
        items.length > 0 &&
        items.map(i => (
          <Slide
            key={i.id}
            type={type}
            to={i.link ? i.link.url : '#'}
            target={i.link ? i.link.target : ''}
          >
            <GradientImage />
            <Image mq="desktop" src={i.images.desktop} />
            <Image mq="mobile" src={i.images.mobile} alt="" />
            <Section type={type}>
              <h4>{i.title}</h4>
              {i.title && <hr />}

              {type === 'slide' && <p>{i.content}</p>}
              {type === 'slideTextLeft' && (
                <>
                  <p>
                    {i.building.infos.use}: {i.building.infos.areaTotal}
                  </p>
                  <p>Venda: {i.building.values.sell}</p>
                  <p>Aluguel: {i.building.values.rent}</p>
                  <br />
                  <p>REF {i.building.reference}</p>
                  <button>saiba mais</button>
                </>
              )}
            </Section>
          </Slide>
        ))}
    </Container>
  );
}
