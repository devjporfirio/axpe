import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import { Container, Image, Button360, SizeGallery } from './styles';
import I360 from 'assets/icons/360.svg';
import IGrid from 'assets/icons/grid.svg';

export default function Gallery({ items, tour360 }) {
  return (
    <Container>
      {tour360 && (
        <Button360>
          <img src={I360} alt="Tour 360" />
        </Button360>
      )}
      <Slider
        propsArrow={{ type: 'gallery' }}
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
                return <Image key={index} url={item.src} />;
            }
          })}
      </Slider>
      <SizeGallery>
        <img src={IGrid} alt="Galeria de fotos" />
        <span>{items.length}</span>
      </SizeGallery>
    </Container>
  );
}

Gallery.propTypes = {
  items: PropTypes.array.isRequired
};
