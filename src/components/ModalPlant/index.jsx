import React, { useState } from 'react';

import {
  Container,
  Infos,
  Category,
  ImagesGroup,
  Image,
  Left,
  Right
} from './styles';

export default function ModalPlant({ onClose, property }) {
  const sliderRef = React.createRef();
  const [ imgSelect, setImgSelect ] = useState(0);

  return (
    <Container
      closeModal={onClose}
      styleC={{ overlay: { backgroundColor: '#37474F' } }}
      iconButtonWhite={false}
    >
      <Left>
        <Infos>
          <Category>Casa</Category>
          <p>Ilha Bela</p>
          <p>ax3715</p>
          <p>105M²</p>
          <hr />
          <span>Piso Superior</span>
        </Infos>

        <ImagesGroup>
          {property.gallery.map((i, index) => (
            <Image
              selected={imgSelect === index}
              key={index}
              src={i.src}
              alt="Imóvel"
              onClick={() => {
                setImgSelect(index);
                sliderRef.current.slickGoTo(index);
              }}
            />
          ))}
        </ImagesGroup>
      </Left>

      <Right
        reference={slider => {
          return (sliderRef.current = slider);
        }}
      >
        {property.gallery.length > 0 &&
          property.gallery.map((item, index) => (
            <div key={index}>
              <img src={item.src} alt="Imóvel" />
            </div>
          ))}
      </Right>
    </Container>
  );
}
