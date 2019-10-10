import Modal from 'react-modal';
import styled from 'styled-components';
import media from 'styled-media-query';

Modal.setAppElement('#main');

export const Container = styled(Modal)`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100vw;
  height: calc(100vh - 67px);
  position: absolute;
  bottom: 0;
  z-index: 5;
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

  ${media.greaterThan('769px')`
    display: none;
  `}
`;
