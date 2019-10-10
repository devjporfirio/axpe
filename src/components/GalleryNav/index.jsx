import React, { useState } from 'react';
import Slider from '../Slider';
import { Container } from './styles';
import Modal from '../Modal';

export default function GalleryNav() {
  const [ nav1, setNav1 ] = useState(null);
  const [ nav2, setNav2 ] = useState(null);
  const slider1 = React.createRef();
  const slider2 = React.createRef();

  return (
    <Modal isOpen={true} label="Galeria de fotos">
      <Container>
        <h4>First Slider</h4>
        <Slider
          asNavFor={nav2}
          reference={slider => {
            setNav1(slider);
            return (slider1.current = slider);
          }}
          slidesToShow={1}
        >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
        </Slider>

        <h4>Second Slider</h4>
        <Slider
          asNavFor={nav1}
          reference={slider => {
            setNav2(slider);
            return (slider2.current = slider);
          }}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
        </Slider>
      </Container>
    </Modal>
  );
}
