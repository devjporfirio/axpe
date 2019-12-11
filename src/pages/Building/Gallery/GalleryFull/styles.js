import styled from 'styled-components';
import media from 'styled-media-query';
import Modal from '../Modal';
import Slider from 'components/Slider';

export const Slide = styled.div`
  height: calc(100vh - 70px);
  width: 100vw !important;
  display: table-cell !important;
  vertical-align: middle;

  img {
    margin: auto;
    width: auto;
    height: auto;
  }

  iframe {
    width: 100%;
  }

  ${media.greaterThan('medium')`
    height: calc(100vh - 150px);
  `}
`;

export const Container = styled(Modal)`
  height: 100vh;
  top: 0;
  background-color: ${({ theme }) => theme.colors.greenDark};

  img {
    max-width: 100%;
    max-height: calc(100vh - 105px);
  }

  iframe {
    height: calc(100vh - 105px);
  }

  ${media.greaterThan('640px')`
    img, iframe {
      margin-top: 0;
    }
  `}

  ${media.greaterThan('medium')`
    img {
      max-height: 80vh;
    }

    iframe {
      height: 80vh;
    }
  `}
`;

export const Images = styled(Slider)`
  height: calc(100vh - 66px);

  ${media.greaterThan('640px')`
    margin-top: 10%;
    height: calc(100vh - 40px);
  `}

  ${media.greaterThan('medium')`
    margin: 95px auto 0 auto;
    width: 80% !important;
    height: 80vh;
    display: block !important;
  `};

  .slick-slide {
    max-width: 100%;
  }
`;
