import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../Slider';
import { Container } from './styles';

export default function Gallery({ items }) {
  return (
    <Container>
      <Slider slidesToShow={3} centerMode={true}>
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            switch (item.tipo) {
              case 'imagem':
                return <img key={index} src={item.src} alt="" />;
            }
          })}
      </Slider>
    </Container>
  );
}

Gallery.propTypes = {
  items: PropTypes.array.isRequired
};
