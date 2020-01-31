import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { Container, Images, Slide } from './styles';

export default function GalleryFull({ goTo, onClose, items, category, local }) {
  return (
    <Container category={category} local={local} closeModal={onClose}>
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
                    <TransformWrapper>
                      <TransformComponent>
                        <img alt="Foto do Imóvel" src={item.src} />
                      </TransformComponent>
                    </TransformWrapper>
                  </Slide>
                );
              case 'video':
                return (
                  <Slide key={index}>
                    <iframe
                      title="video"
                      src={`https://www.youtube.com/embed/${item.video}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Slide>
                );
            }
          })}
      </Images>
      }
    </Container>
  );
}
