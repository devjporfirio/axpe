import Modal from 'react-modal';
import styled from 'styled-components';
import media from 'styled-media-query';
import Breadcrumb from '../Breadcrumb';

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
      color: ${props =>
        props.iconButtonWhite
          ? props.theme.colors.white
          : props.theme.colors.green};
      text-transform: uppercase;
      display: ${props => (props.iconButtonWhite ? 'block' : 'none')};
    }
  `}
`;

export const Header = styled(Breadcrumb)`
  position: absolute;
  width: 100vw;
  background-color: ${props => props.theme.colors.white};
  top: -67px;
`;
