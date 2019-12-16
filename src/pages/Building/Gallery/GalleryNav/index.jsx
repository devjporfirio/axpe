import React, { useState } from 'react';
import {
  Container,
  Body,
  SliderNav2,
  SliderNav1,
  InfoPlanta,
  Category,
  Title,
  Info
} from './styles';

export default function GalleryNav({
  className,
  items = [],
  onClose,
  nav2SlidesToShow = 3,
  nav2SlidesPerRow,
  nav2CenterMode = true,
  nav2Arrows = false,
  nav2Rows = 1,
  category,
  local,
  planta = false,
  reference
}) {
  const [ nav1, setNav1 ] = useState(null);
  const [ nav2, setNav2 ] = useState(null);
  const [ plantaSelect, setPlantaSelect ] = useState(0);
  const slider1 = React.createRef();
  const slider2 = React.createRef();

  return (
    <Container
      closeModal={onClose}
      category={category}
      local={local}
      planta={planta}
    >
      <Body>
        {planta && (
          <InfoPlanta>
            <div>
              <Category>{category}</Category>
              <hr />
            </div>
            <Info>
              <p>{local}</p>
              <p>{reference}</p>
              <p>{items[plantaSelect].area}m²</p>
            </Info>
            <hr />
            <Title>{items[plantaSelect].title}</Title>
          </InfoPlanta>
        )}
        <div className={className}>
          <SliderNav1
            asNavFor={nav2}
            reference={slider => {
              setNav1(slider);
              return (slider1.current = slider);
            }}
            arrows={false}
            slidesToShow={1}
            beforeChange={(current, next) => {
              setPlantaSelect(next);
            }}
            planta={planta}
          >
            {items &&
              items.length > 0 &&
              items.map((item, index) => {
                switch (item.tipo) {
                  case 'imagem':
                    return <img src={item.src || item.image} alt="Imóvel" />;
                  case 'video':
                    return (
                      <iframe
                        title="video"
                        src={`https://www.youtube.com/embed/${item.video}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    );
                }
              })}
          </SliderNav1>

          <SliderNav2
            asNavFor={nav1}
            reference={slider => {
              setNav2(slider);
              return (slider2.current = slider);
            }}
            slidesPerRow={nav2SlidesPerRow}
            centerMode={nav2CenterMode}
            slidesToShow={nav2SlidesToShow}
            arrows={nav2Arrows}
            swipeToSlide={true}
            rows={nav2Rows}
            focusOnSelect={true}
            planta={planta}
          >
            {items &&
              items.length > 0 &&
              items.map((item, index) => (
                <div key={index}>
                  <img src={item.src || item.image} alt="Imóvel" />
                </div>
              ))}
          </SliderNav2>
        </div>
      </Body>
    </Container>
  );
}
