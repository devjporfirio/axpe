import styled from 'styled-components';
import Slider from '../Slider';

export const SliderNav1 = styled(Slider)`
  height: 100vw;

  img {
    max-height:100vw;
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

  img {
    max-height: 100px;
    max-width: 100px;
    margin: auto;
  }
`;