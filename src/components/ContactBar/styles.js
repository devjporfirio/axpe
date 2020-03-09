import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const ButtonFloat = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 80px;
  right: 30px;
  width: 70px;
  height: 70px;
  font-size: 0;
  background: ${({ theme }) => theme.colors.orange};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.white};

  ${media.greaterThan('large')`
    right: 70px;
    transition: all 300ms ease;

    &:hover {
      transform: scale(1.05);
      transition-duration: 200ms;
    }
  `}

  svg {
    display: block;
    width: 30px;
    height: 30px;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.greyLight};
  z-index: 105;

  ${media.greaterThan('medium')`
    overflow: hidden;
    background: rgba(38, 50, 56, 0.8);
    cursor: pointer;
  `}
`;

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  ${media.greaterThan('medium')`
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
    overflow-y: auto;
    width: 375px;
    height: 100vh;
    background: ${({ theme }) => theme.colors.greyLight};
    cursor: default;
  `}
`;

export const Header = styled.header`
  position: relative;
  padding: 30px 60px 30px 30px;
  background: ${({ theme }) => theme.colors.green};

  h3 {
    font: 30px/36px 'Bitter';
    color: ${({ theme }) => theme.colors.white};

    strong {
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
      color: ${({ theme }) => theme.colors.greenLight};
    }
  }

  ${props => props.isBuilding && css`
    background: ${({ theme }) => theme.colors.white};

    h3 {
      max-width: 210px;
      font-size: 18px;
      line-height: 21px;
      color: ${({ theme }) => theme.colors.greenDark};
    }
  `}
`;

export const ButtonClose = styled.button`
  display: block;
  position: absolute;
  top: 30px;
  right: 30px;
  width: 24px;
  height: 24px;
  font-size: 0;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: 100%;
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.white};

    ${props => props.isBuilding && css`
      background: ${({ theme }) => theme.colors.greenDark};
    `}
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const IframeContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
`;

export const Iframe = styled.iframe`
  display: block;
  width: 100%;
`;

export const Column = styled.div`
  padding: 30px;

  & > p {
    margin-bottom: 30px;
    font: 14px/18px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};

    ${media.greaterThan('large')`
      margin-bottom: 10px;
    `}
  }
`;

export const List = styled.ul`
  display: block;

  li {
    &:not(:last-child) {
      margin-bottom: 30px;

      ${media.greaterThan('large')`
        margin-bottom: 10px;
      `}
    }
  }
`;

const ListButtonStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  i {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 90px;
    height: 90px;
    background: ${({ theme }) => theme.colors.greyLight};

    ${media.greaterThan('large')`
      height: 70px;
    `}
  }

  svg {
    display: block;
    width: 30px;
    height: 30px;

    path,
    circle {
      fill: ${({ theme }) => theme.colors.orange};
    }
  }

  span {
    padding-left: 30px;
    font: 14px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    color: ${({ theme }) => theme.colors.orange};

    &.big {
      font-size: 20px;
    }
  }

  strong {
    font-size: 20px;
    line-height: 24px;
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }

  ${media.greaterThan('large')`
    &:hover {
      background: ${({ theme }) => theme.colors.greyLight};
    }
  `}
`;

export const ListLink = styled.a`
  ${ListButtonStyle}
`;

export const ListButton = styled.button`
  ${ListButtonStyle}
`;