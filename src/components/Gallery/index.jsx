import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import { Container, Image } from './styles';

export default function Gallery({ items }) {
  return (
    <Container>
      <Slider
        propsArrow={{ type: 'gallery' }}
        slidesToShow={1}
        centerMode={true}
        className="center"
        variableWidth={true}
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
    </Container>
  );
}

Gallery.propTypes = {
  items: PropTypes.array.isRequired
};
