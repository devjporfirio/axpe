import styled from 'styled-components';
import media from 'styled-media-query';
import Modal from '../Modal';
import Slider from 'components/Slider';

export const Slide = styled.div`
  max-height: calc(100vh - 76px);
  img {
    margin: auto;
    width: auto;
    height: auto;
  }

  iframe {
    width: 100%;
    height: calc(100vh - 76px);

    ${media.greaterThan('medium')`
      width: 100%;
      height: 80vh;
    `}
  }
`;

export const Container = styled(Modal)`
  height: 100vh;
  top: 0;
  background-color: ${({ theme }) => theme.colors.greenDark};

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Images = styled(Slider)`
  margin-top: 66px;
  height: calc(100vh - 76px);

  ${media.greaterThan('medium')`
    margin: 127px auto 0 auto;
    width: 80% !important;
    height: 80vh;
    display: block !important;
  `}

  .slick-slide {
    max-width: 100%;
  }
`;
