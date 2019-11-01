import React from 'react';
import Slider from '../Slider';

import { Container } from './styles';

export default function FullImage ({ goTo, onClose, items, category, local }) {
  return (
    <Container
      category={category}
      local={local}
      isOpen={true}
      closeModal={onClose}
    >
      <Slider
        propsArrow={{ position: 'center', backgroundColor: 'white' }}
        slidesToShow={1}
        initialSlide={goTo}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            switch (item.tipo) {
              case 'imagem':
                return (
                  <img key={index} alt="Foto do Imóvel" src={item.src} />
                );
              case 'video':
                return (
                  <iframe
                    key={index}
                    title={index}
                    src={item.video}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                );
            }
          })}
      </Slider>
    </Container>
  );
}
