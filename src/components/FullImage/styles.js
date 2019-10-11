import styled from 'styled-components';
import media from 'styled-media-query';
import Modal from '../Modal';

export const Container = styled(Modal)`
  height: 100vh;
  top: 0;
  background-color: ${({ theme }) => theme.colors.greenDark};

  img {
    max-width: 100vw;
    max-height: calc(100vh - 67px);

    ${media.greaterThan('769px')`
      width: auto !important;
      margin: auto;
      display: block !important;
      max-height: calc(100vh - 150px);
    `}
  }
  
  .slick-slider {
    width: 80%;
    margin: auto;

    ${media.lessThan('medium')`
      width: 100%;
    `}
  }
`;

export const ButtonClose = styled.button`
  display: none;

  ${media.greaterThan('769px')`
    display: block;
    color: ${({ theme }) => theme.colors.white};
    font: 14px 'RalewaySemiBold';
    margin: 75px 78px 20px auto;
    display: flex;
    align-items: center;
  `}
`;
