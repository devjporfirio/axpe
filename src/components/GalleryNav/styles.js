import styled from 'styled-components';
import Slider from '../Slider';

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
    max-width: 100vw;
    margin: auto;
  }
`;

export const SliderNav1 = styled(Slider)`
  height: calc(100vh - 168px);

  img {
    max-height: calc(100vh - 250px);
    max-width: 100vw;
    margin: auto;
    width: auto;
  }
`;
