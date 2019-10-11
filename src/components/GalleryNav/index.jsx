import React, { useState } from 'react';
import { SliderNav2, ButtonClose, SliderNav1 } from './styles';
import Modal from '../Modal';
import IClose from 'assets/icons/close-green.svg';

export default function GalleryNav({ items = [], onClose }) {
  const [ nav1, setNav1 ] = useState(null);
  const [ nav2, setNav2 ] = useState(null);
  const slider1 = React.createRef();
  const slider2 = React.createRef();

  return (
    <Modal isOpen={true} label="Galeria de fotos" closeModal={onClose}>
      <ButtonClose onClick={onClose}>
        <img src={IClose} alt="Fechar" />
        <span>Fechar</span>
      </ButtonClose>
      <div>
        <SliderNav1
          asNavFor={nav2}
          reference={slider => {
            setNav1(slider);
            return (slider1.current = slider);
          }}
          arrows={false}
          slidesToShow={1}
        >
          {items &&
            items.length > 0 &&
            items.map((item, index) => (
              <div key={index}>
                <img src={item.src} alt="Imóvel" />
              </div>
            ))}
        </SliderNav1>

        <br />

        <SliderNav2
          asNavFor={nav1}
          reference={slider => {
            setNav2(slider);
            return (slider2.current = slider);
          }}
          centerMode={true}
          slidesToShow={3}
          arrows={false}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          {items &&
            items.length > 0 &&
            items.map((item, index) => (
              <div key={index}>
                <img src={item.src} alt="Imóvel" />
              </div>
            ))}
        </SliderNav2>
      </div>
    </Modal>
  );
}
