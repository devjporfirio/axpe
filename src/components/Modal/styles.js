import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#main');

export const Container = styled(Modal)`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100vw;
  height: calc(100vh - 67px);
  position: absolute;
  bottom: 0;
  z-index: 5;
`;
