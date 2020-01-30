import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import Slider from 'components/Slider';
import GalleryNav from './GalleryNav';
import GalleryFull from './GalleryFull';

// assets
import I360 from 'assets/icons/360';
import IGrid from 'assets/icons/grid';

// styles
import { Container, Tour360, Image, Button360, SizeGallery } from './styles';

function Gallery({
  items,
  center = true,
  tour360,
  showSizeGallery = true,
  className,
  propsArrow = { position: 'center', backgroundColor: 'white' },
  showClickImage = true,
  category,
  local,
  reference
}) {
  const [ showGalleryNav, setShowGalleryNav ] = useState(false);
  const [ showGalleryFull, setShowGalleryFull ] = useState(false);
  const [ imageSelected, setImageSelected ] = useState(null);
  const [ showTour, setShowTour ] = useState('');
  const linkTour = `https://www.banibconecta.com/site/tour/axpe-imoveis-especiais/${reference}/autostart`;

  return (
    <Container className={className}>
      {tour360 && (
        <Button360 onClick={() => setShowTour(true)}>
          <img src={I360} alt="Tour 360" />
        </Button360>
      )}

      {showTour && (
        <Tour360
          category={category}
          local={local}
          closeModal={() => setShowTour(false)}
        >
          <iframe title="tour360" src={linkTour} frameBorder="0"></iframe>
        </Tour360>
      )}

      <Slider
        lazyLoad={false}
        propsArrow={propsArrow}
        slidesToShow={1}
        centerMode={true}
        className={center ? 'center' : ''}
        variableWidth={true}
        responsive={[
          {
            breakpoint: 769,
            settings: {
              centerMode: false,
              variableWidth: false,
              initialSlide: -1
            }
          }
        ]}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <Image
              onClick={() => {
                if (showClickImage) {
                  setImageSelected(index);
                  setShowGalleryFull(true);
                }
              }}
              key={index}
              src={item.src}
            />
          ))}
      </Slider>

      {showSizeGallery && (
        <SizeGallery onClick={() => setShowGalleryNav(true)}>
          <img src={IGrid} alt="Galeria de fotos" />
          <span>{items.length}</span>
        </SizeGallery>
      )}

      {showGalleryNav && (
        <GalleryNav
          items={items}
          onClose={() => setShowGalleryNav(false)}
          category={category}
          local={local}
        />
      )}

      {showGalleryFull && (
        <GalleryFull
          goTo={imageSelected}
          items={items}
          onClose={() => setShowGalleryFull(false)}
          category={category}
          local={local}
        />
      )}
    </Container>
  );
}

Gallery.propTypes = {
  items: PropTypes.array.isRequired
};

export default Gallery;
