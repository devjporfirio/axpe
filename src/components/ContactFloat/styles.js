import styled from 'styled-components';
import media from 'styled-media-query';

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.orange};
  box-sizing: border-box;
  height: 49px;
  width: 177px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 24.5px;
  box-shadow: 7px 10px 25px 0 rgba(0, 0, 0, 0.33);
  font: ${({ theme }) => theme.fontsWeight.semiBold} 18px/25px 'Raleway';
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  position: fixed;
  bottom: 26px;
  right: 26px;

  ${media.greaterThan('medium')`
    bottom: 40px;
    right: 40px;
  `}
`;

export const ButtonClose = styled.button`
  position: absolute;
  margin-top: -30px;
  right: 8px;
  width: 15px;
  height: 15px;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 10px;
    background: ${({ theme }) => theme.colors.white};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  ${media.greaterThan('medium')`
    right: 15px;
    width: 20px;
    height: 20px;

    &:before,
    &:after {
      height: 15px;
    }
  `}
`;

export const ListContacts = styled.div`
  height: 84px;
  width: 100%;
  opacity: 0.95;
  background-color: ${({ theme }) => theme.colors.orange};
  box-shadow: 7px 10px 25px 0 rgba(0, 0, 0, 0.33);
  z-index: 9;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 15px;
  bottom: 0;
  right: 0;

  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }

  a {
    text-align: center;
  }

  p {
    color: ${({ theme }) => theme.colors.white};
    font: ${({ theme }) => theme.fontsWeight.semiBold} 16px/24px 'Raleway';
    margin-top: 9px;
    display: block;
  }

  svg:nth-child(1) {
    height: 26px;
    width: 25px;
  }
  svg:nth-child(2) {
    height: 22px;
    width: 33px;
  }
  svg:nth-child(3) {
    height: 22px;
    width: 23px;
  }
  svg:nth-child(4) {
    height: 26px;
    width: 26px;
  }

  ${media.greaterThan('medium')`
    padding: 0;
    

    .desktop {
      display: block !important;
    }
    .mobile {
      display: none;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 84px;
    }

    p {
      text-align: left;
      margin-left: 14.5px;
    }

    a + a {
      border-left: 1px solid #FF8627;
    }
  `}

  ${media.greaterThan('1170px')`
    width: calc(100% - 200px);
  `}
`;
