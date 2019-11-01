import styled from 'styled-components';
import media from 'styled-media-query';
import Modal from 'components/Modal';

export const Container = styled(Modal)`
  height: 100vh;
  top: 0;
  background-color: ${({ theme }) => theme.colors.greenDark};

  img,
  iframe {
    max-width: 100vw;
    max-height: calc(100vh - 67px);

    ${media.greaterThan('medium')`
      margin: auto;
      display: block !important;
      max-height: calc(100vh - 150px);
    `}
  }

  iframe {
    display: none;
    height: calc(100vh - 100px);
  }

  .slick-slider {
    width: 100%;
    margin-top: 67px;

    ${media.greaterThan('medium')`
      width: 80%;
      margin: auto;
      top: 77px;
    `}
  }
`;
