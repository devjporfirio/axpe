import styled from 'styled-components';
import media from 'styled-media-query';

// components
import Button from 'components/Button';

// assets
import ArrowIconSVG from 'assets/icons/arrow';

export const Container = styled.div`
  min-height: 65px;
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 10px 30px 10px 60px;
  background: ${({ theme }) => theme.colors.white};
  z-index: 10;
  transition: all 50ms ease;

  h2 {
    font: 18px/28px 'Bitter';
    color: ${({ theme }) => theme.colors.orange};
    font-weight: ${({ theme }) => theme.fontsWeight.regular};

    &:first-letter {
      text-transform: uppercase;
    }
  }

  h3 {
    font: 14px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }

  ${media.greaterThan('medium')`
    top: 0;
    left: 200px;
    width: calc(100% - 200px);
    padding: 15px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      margin-left: 30px;
    }
  `}
`;

export const Column = styled.div`
  position: absolute;
  bottom: 10px;
  right: 30px;

  ${media.greaterThan('medium')`
    position: relative;
    bottom: auto;
    right: auto;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `}
`;

export const ButtonBack = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 20px;
  width: 32px;
  height: 32px;
  font-size: 0;

  &:before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: url(${ArrowIconSVG}) no-repeat;
    transform: rotate(180deg);
  }

  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const ButtonIcon = styled.button`
  svg {
    display: block;

    path {
      transition: all 300ms ease;
    }
  }

  &:nth-child(1) {
    svg {
      width: 22px;
      height: 22px;

      path {
        fill: ${({ theme }) => theme.colors.green};
      }
    }

    ${media.greaterThan('1024px')`
      &:hover {
       svg path {
        fill: ${({ theme }) => theme.colors.orange};
       }
      }
    `}
  }

  &:nth-child(2) {
    margin-left: 15px;

    svg {
      width: 20px;
      height: 24px;
    }

    ${media.greaterThan('1024px')`
      &:hover {
        svg path {
          stroke: ${({ theme }) => theme.colors.orange};
        }
      }
    `}
  }
`;

export const ButtonContact = styled(Button)`
  ${media.lessThan('767px')`
    display: none;
  `}
`;
