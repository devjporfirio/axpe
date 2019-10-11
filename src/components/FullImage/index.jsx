import React from 'react';
import Slider from '../Slider';
import IClose from 'assets/icons/close-white.svg';

import { Container, ButtonClose } from './styles';

export default function FullImage({ goTo, onClose, items }) {
  const hanldeOnClickImage = () => {
    setImageSelected(item);
    setShowFullImage(true);
  };

  return (
    <Container
      isOpen={true}
      label="Galeria de fotos"
      closeModal={onClose}
      stylesC={{ overlay: { top: window.innerWidth > 769 ? 0 : '67px' } }}
    >
      <ButtonClose onClick={onClose}>
        Fechar
        <img src={IClose} alt="Fechar" />
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
                return (
                  <div
                    key={index}
                    onClick={hanldeOnClickImage}
                    role="presentation"
                  >
                    <img alt="Foto do Imóvel" src={item.src} />
                  </div>
                );
            }
          })}
      </Slider>
    </Container>
  );
}
