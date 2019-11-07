import React from 'react';

import { Container, Images, Slide } from './styles';

export default function GalleryFull({ goTo, onClose, items, category, local }) {
  return (
    <Container
      category={category}
      local={local}
      isOpen={true}
      closeModal={onClose}
    >
      <Images
        propsArrow={{ position: 'outside', backgroundColor: 'white' }}
        initialSlide={goTo}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            switch (item.tipo) {
              case 'imagem':
                return (
                  <Slide key={index}>
                    <img alt="Foto do Imóvel" src={item.src} />
                  </Slide>
                );
              case 'video':
                return (
                  <Slide key={index}>
                    <iframe
                      title={index}
                      src={item.video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Slide>
                );
            }
          })}
      </Images>
    </Container>
  );
}
