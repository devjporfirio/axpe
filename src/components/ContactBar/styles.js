import styled, { css, keyframes } from 'styled-components';
import media from 'styled-media-query';

const animateBalloonLeft = keyframes`
  0% { transform: scale(1); }
  2.5% { transform: scale(1.1); }
  12.5% { transform: scale(1.1); }
  15% { transform: scale(1); }
`;

const animateBalloonRight = keyframes`
  0% { transform: scale(1); }
  2.5% { transform: scale(1.1); }
  47.5% { transform: scale(1.1); }
  50% { transform: scale(1); }
`;

const animateBalloonDot = keyframes`
  0% { transform: translateY(0px); }
  3.5% { transform: translateY(-3px); }
  7% { transform: translateY(0.25px); }
  9.5% { transform: translateY(-0.75px); }
  11% { transform: translateY(0px); }

  18% { transform: translateY(0px); }
  21.5% { transform: translateY(-3px); }
  25% { transform: translateY(0.25px); }
  27.5% { transform: translateY(-0.75px); }
  29% { transform: translateY(0px); }
`;

export const ButtonStyle = css`
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 25px;
  width: 245px;
  height: 50px;
  background: ${({ theme }) => theme.colors.orange};
  border-radius: 36px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  right: 50%;
  z-index: 10;
  transform: translateX(50%);

  span {
    display: none;
  }

  div {
    font-weight: 600;
    font-size: 16px;
    text-align: left;
    margin-left: 20px;
    color: white;

    span {
      font-size: 13px;
    }
  }

  ${media.greaterThan('large')`
    right: 25px;
    bottom: 20px;
    width: 256px;
    transform: unset;
    transition: all 300ms ease;

    &:hover {
      transform: scale(1.05);
      transition-duration: 200ms;
    }

    div span {
      display: block;
    }
  `}

  svg {
    display: block;
    width: 30px;
    height: 30px;

    .hollow-bg {
      fill: ${({ theme }) => theme.colors.orange};
    }

    .left-balloon {
      transform-origin: bottom left;
      animation: ${animateBalloonLeft} 8s 6.25s;
      animation-iteration-count: infinite;
    }

    .right-balloon {
      transform-origin: center;
      animation: ${animateBalloonRight} 8s 0s;
      animation-iteration-count: infinite;
    }

    .chat-dots {
      .chat-dot {
        transform-origin: center;
        animation-name: ${animateBalloonDot};
        animation-duration: 8s;
        animation-iteration-count: infinite;

        &:first-child {
          animation-delay: 1s;
        }

        &:nth-child(2) {
          animation-delay: 1.0625s;
        }

        &:nth-child(3) {
          animation-delay: 1.125s;
        }
      }
    }
  }
`;

export const LinkFloat = styled.a`
  ${ButtonStyle}
`;

export const ButtonFloat = styled.button`
  ${ButtonStyle}
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
  position: relative;
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

  ${(props) =>
    props.isBuilding &&
    css`
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

    ${(props) =>
      props.isBuilding &&
      css`
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
  height: 100vh;
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
      font-size: 16px;
    }
  }

  &.highlight {
    span {
      font-size: 20px;
      line-height: 24px;

      strong {
        font-weight: 800;
      }
    }

    .no-fill {
      path,
      circle {
        fill: none;
      }
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
