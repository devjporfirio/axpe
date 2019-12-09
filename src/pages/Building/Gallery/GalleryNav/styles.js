import styled from 'styled-components';
import media from 'styled-media-query';
import Slider from 'components/Slider';
import Modal from '../Modal';

export const Container = styled(Modal)`
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};

  span {
    color: ${({ theme }) => theme.colors.greenDark};
  }
  i::after,
  i::before {
    background: ${({ theme }) => theme.colors.greenDark};
  }
`;

export const SliderNav1 = styled(Slider)`
  height: 100vw;
  top: 67px;

  img {
    object-position: left;
    max-height: 100vw;
    max-width: 100vw;
    margin: auto;
    width: auto;
  }

  ${media.greaterThan('640px')`
    img {
      max-height: calc(100vh - 170px);
    }
  `}
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
    object-position: left;
    max-height: 100px;
    max-width: 100px;
    margin: auto;
  }

  ${media.greaterThan('640px')`
    height: 70px;
  `}
`;
