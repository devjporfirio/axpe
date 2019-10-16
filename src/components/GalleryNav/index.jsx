import React, { useState } from 'react';
import { SliderNav2, SliderNav1 } from './styles';
import Modal from '../Modal';

export default function GalleryNav({
  className,
  items = [],
  onClose,
  isModal = true,
  nav2SlidesToShow = 4,
  nav2SlidesPerRow,
  nav2CenterMode = true,
  nav2Arrows = false,
  nav2Rows=1,
}) {
  const [ nav1, setNav1 ] = useState(null);
  const [ nav2, setNav2 ] = useState(null);
  const slider1 = React.createRef();
  const slider2 = React.createRef();

  const renderSlides = () => (
    <div className={className}>
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
        slidesPerRow={nav2SlidesPerRow}
        centerMode={nav2CenterMode}
        slidesToShow={nav2SlidesToShow}
        arrows={nav2Arrows}
        swipeToSlide={true}
        rows={nav2Rows}
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
  );

  return !isModal ? (
    renderSlides()
  ) : (
    <Modal isOpen={true} label="Galeria de fotos" closeModal={onClose}>
      {renderSlides()}
    </Modal>
  );
}
