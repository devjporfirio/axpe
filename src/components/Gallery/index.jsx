import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'components/Slider';
import GalleryNav from 'components/GalleryNav';
import FullImage from 'components/FullImage';
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
  const [ showFullImage, setShowFullImage ] = useState(false);
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
                        setShowFullImage(true);
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
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
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

      {showFullImage && (
        <FullImage
          goTo={imageSelected}
          items={items}
          onClose={() => setShowFullImage(false)}
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
