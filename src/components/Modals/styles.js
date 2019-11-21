import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  z-index: 101;
  background: ${({ theme }) => theme.colors.white};

  ${media.greaterThan('1024px')`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(38, 50, 56, 0.8);
    overflow: visible;
  `}
`;

export const Wrapper = styled.div`
  ${media.greaterThan('1024px')`
    position: relative;
    width: 880px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.white};
  `}
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  font-size: 0;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 30px;
    background: ${({ theme }) => theme.colors.white};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  ${media.greaterThan('1024px')`
    &:before,
    &:after {
      background: ${({ theme }) => theme.colors.greenDark};
    }
  `}
`;

export const Texts = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.green};

  .slick-arrow {
    display: none !important;
  }

  .slick-slider {
    button[class*='styles__Arrow'] {
      bottom: 20px;
      left: 25px;

      &:last-of-type {
        left: 50px;
      }
    }
  }

  ${media.greaterThan('1024px')`
    width: 65%;
    border-radius: 8px 0 0 8px;

    .slick-slider {
      button[class*='styles__Arrow'] {
        bottom: -40px;
        left: 0;
        opacity: 0.4;
        transition: all 300ms ease;

        &:last-of-type {
          left: 25px;
        }

        &:hover {
          opacity: 1;
        }
      }
    }
  `}
`;

export const Text = styled.div`
  padding: 60px 30px;

  h2 {
    width: 100%;
    margin-bottom: 20px;
    font: 30px/36px 'Bitter';
    color: ${({ theme }) => theme.colors.white};

    span {
      color: ${({ theme }) => theme.colors.orange};
    }

    strong {
      color: ${({ theme }) => theme.colors.greenLight};
    }
  }

  p {
    width: 100%;
    max-width: 410px;
    font: 16px/23px 'Raleway';
    color: ${({ theme }) => theme.colors.white};
  }

  ${media.greaterThan('1024px')`
    min-height: 500px;
    display: flex !important;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px 60px 20px 80px;

    h2 {
      margin-top: auto;
      font-size: 40px;
      line-height: 48px;

      &.big {
        font-size: 58px;
        line-height: 70px;
      }
    }

    p {
      margin-bottom: auto;
      line-height: 19px;
      font-weight: ${({ theme }) => theme.fontsWeight.medium};
    }
  `}
`;

export const Column = styled.div`
  padding: 20px 30px;

  ${media.greaterThan('1024px')`
    width: 35%;
  `}
`;
