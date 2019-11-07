import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'components/Slider';
import GalleryNav from './GalleryNav';
import GalleryFull from './GalleryFull';
import I360 from 'assets/icons/360.svg';
import IGrid from 'assets/icons/grid.svg';
import { Container, Image, Video, Button360, SizeGallery } from './styles';

export default function Gallery({
  items,
  center = true,
  tour360,
  showSizeGallery = true,
  className,
  propsArrow = { position: 'center', backgroundColor: 'white' },
  showClickImage = true,
  category,
  local
}) {
  const [ showGalleryNav, setShowGalleryNav ] = useState(false);
  const [ showGalleryFull, setShowGalleryFull ] = useState(false);
  const [ imageSelected, setImageSelected ] = useState(null);

  return (
    <Container className={className}>
      {tour360 && (
        <Button360>
          <img src={I360} alt="Tour 360" />
        </Button360>
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
              variableWidth: false
            }
          }
        ]}
      >
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            switch (item.tipo) {
              case 'imagem':
                return (
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
                );
              case 'video':
                return (
                  <Video
                    key={index}
                    src={item.video}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                );
            }
          })}
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
          isModal={true}
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
