import styled from 'styled-components';
import Slider from '../Slider';
import Modal from 'components/Modal';

export const Container = styled(Modal)`
  top: 0;
`;

export const SliderNav1 = styled(Slider)`
  height: 100vw;
  top: 67px;

  img {
    object-fit: cover;
    max-height: 100vw;
    max-width: 100vw;
    margin: auto;
    width: auto;
  }
`;

export const SliderNav2 = styled(Slider)`
  .slick-slide {
    opacity: 0.2;
  }

  .slick-center {
    opacity: 1;
  }

  height: 100px;
  position: absolute;
  bottom: 0;
  width: 100%;

  img {
    object-fit: cover;
    max-height: 100px;
    max-width: 100px;
    margin: auto;
  }
`;
