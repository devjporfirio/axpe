import styled from 'styled-components';
import media from 'styled-media-query';
import Headerbar from 'components/Headerbar';

export const Header = styled(Headerbar)`
  ${media.greaterThan('640px')`
    display: none;
  `}
`;

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 67px);
  position: fixed;
  left: 0;
  z-index: 110;
  overflow: hidden;
  height: 100vh;
`;

export const ButtonClose = styled.button`
  position: fixed;
  top: 23px;
  right: 30px;
  z-index: 10;

  span {
    display: none;
  }

  i {
    display: block;
    position: relative;
    width: 15px;
    height: 15px;

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1px;
      height: 15px;
      background: ${({ theme }) => theme.colors.green};
    }

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  ${media.greaterThan('640px')`
    top: 5px;
    display: block;
    background: none;
    font: 14px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    margin: 30px 78px 20px auto;
    display: flex;
    align-items: center;
    width: auto;

    span {
      color: ${({ theme }) => theme.colors.white};
      text-transform: uppercase;
      display: block;
    }

    i {
      &:before,
      &:after {
        background: ${({ theme }) => theme.colors.white};
      }
    }
  `}

  ${media.greaterThan('1281px')`
    right: 8%;
  `}
`;
