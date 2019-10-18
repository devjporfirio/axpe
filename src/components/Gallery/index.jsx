import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import { Container, Image, Video, Button360, SizeGallery } from './styles';
import I360 from 'assets/icons/360.svg';
import IGrid from 'assets/icons/grid.svg';
import GalleryNav from '../GalleryNav';
import FullImage from '../FullImage';

export default function Gallery({ items, tour360 }) {
  const [ showGalleryNav, setShowGalleryNav ] = useState(false);
  const [ showFullImage, setShowFullImage ] = useState(false);
  const [ imageSelected, setImageSelected ] = useState(null);

  return (
    <Container>
      {tour360 && (
        <Button360>
          <img src={I360} alt="Tour 360" />
        </Button360>
      )}
      <Slider
        propsArrow={{ type: 'gallery-show-3', backgroundColor: 'white' }}
        slidesToShow={1}
        centerMode={window.innerWidth >= 769 ? true : false}
        className="center"
        variableWidth={window.innerWidth >= 769 ? true : false}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            switch (item.tipo) {
              case 'imagem':
                return (
                  <Image
                    onClick={() => {
                      setImageSelected(index);
                      setShowFullImage(true);
                    }}
                    key={index}
                    src={item.src}
                  />
                );
              case 'video':
                return (
                  <Video
                    key={index}
                    src={item.video}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                );
            }
          })}
      </Slider>
      <SizeGallery onClick={() => setShowGalleryNav(true)}>
        <img src={IGrid} alt="Galeria de fotos" />
        <span>{items.length}</span>
      </SizeGallery>

      {showGalleryNav && (
        <GalleryNav items={items} onClose={() => setShowGalleryNav(false)} />
      )}

      {showFullImage && (
        <FullImage
          goTo={imageSelected}
          items={items}
          onClose={() => setShowFullImage(false)}
        />
      )}
    </Container>
  );
}

Gallery.propTypes = {
  items: PropTypes.array.isRequired
};
