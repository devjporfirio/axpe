import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  width: 100%;

  .slick-list,
  .slick-slide {
    font-size: 0;
  }

  .slick-slider {
    ${props => props.hasVerticalBar && css`
      ${media.greaterThan('large')`
        &:before {
          content: '';
          display: block;
          position: absolute;
          bottom: 62px;
          left: 134px;
          width: 2px;
          height: 25px;
          z-index: 10;
          background: ${({ theme }) => theme.colors.white};
        }
      `}
    `}
  }

  .slick-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: auto;
    right: auto;
    bottom: 30px;
    left: 20px;
    width: 30px;
    height: 30px;
    transform: none;
    z-index: 10;
    font-size: 0;
    transition: all 300ms ease;

    ${media.greaterThan('large')`
      bottom: 60px;
    `}

    &:before {
      display: none;
    }

    svg {
      display: block;
      width: 22px;
      height: 22px;
      margin: auto;

      ${props => props.arrowsColor && css`
        rect {
          fill: ${({ theme }) => theme.colors[props.arrowsColor]};
        }
      `}
    }

    &.slick-prev {
      ${media.greaterThan('medium')`
        left: 100px;
      `}

      ${media.greaterThan('large')`
        &:hover {
          transform: translateX(-2px);
        }
      `}

      svg {
        transform: rotate(-180deg);
      }
    }

    &.slick-next {
      left: 60px;

      ${media.greaterThan('medium')`
        left: 140px;
      `}

      ${media.greaterThan('large')`
        &:hover {
          transform: translateX(2px);
        }
      `}
    }

    &.slick-disabled,
    &[disabled] {
      opacity: 0.2;
      cursor: default;
    }
  }
`;