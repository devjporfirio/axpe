import React from 'react';
import Slider from '../Slider';
import IClose from 'assets/icons/close-white.svg';
import ICloseGreen from 'assets/icons/close-green.svg';

import { Container, ButtonClose } from './styles';

export default function FullImage({ goTo, onClose, items }) {
  return (
    <Container
      isOpen={true}
      label="Galeria de fotos"
      closeModal={onClose}
      stylesC={{ overlay: { top: window.innerWidth > 769 ? 0 : '67px' } }}
    >
      <ButtonClose onClick={onClose}>
        <span>Fechar</span>
        <img
          src={window.innerWidth > 769 ? IClose : ICloseGreen}
          alt="Fechar"
        />
      </ButtonClose>

      <Slider
        propsArrow={{ type: 'galleryFull' }}
        slidesToShow={1}
        initialSlide={goTo}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            switch (item.tipo) {
              case 'imagem':
                return <img key={index} alt="Foto do Imóvel" src={item.src} />;
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
