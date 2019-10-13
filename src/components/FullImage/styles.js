import styled from 'styled-components';
import media from 'styled-media-query';
import Modal from '../Modal';

export const Container = styled(Modal)`
  height: 100vh;
  top: 0;
  background-color: ${({ theme }) => theme.colors.greenDark};

  img,
  iframe {
    max-width: 100vw;
    max-height: calc(100vh - 67px);

    ${media.greaterThan('769px')`
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

    ${media.greaterThan('769px')`
      width: 80%;
      margin: auto;
      top: 77px;
    `}
  }
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: -47px;
  right: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  width: 30px;
  height: 30px;

  img {
    width: 15px;
    height: 15px;
  }

  span {
    display: none;
  }

  ${media.greaterThan('769px')`
    display: block;
    background: none;
    font: 14px 'RalewaySemiBold';
    margin: 75px 78px 20px auto;
    display: flex;
    align-items: center;
    width: auto;

    span {
      color: ${({ theme }) => theme.colors.white};
      display: block;
    }
  `}
`;
