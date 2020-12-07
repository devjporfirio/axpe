import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  width: 100%;
`;

export const Text = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font: 18px 'Raleway';
  color: ${({ theme }) => theme.colors.green};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  span {
    font-size: 14px;
    font-weight: 700;
  }

  ${media.greaterThan('medium')`
    font-size: 13px;

    span {
      font-size: 10px;
    }
  `};
`;

export const Slider = styled.div`
  width: 100%;

  &.noUi-horizontal {
    height: 12px;
    border: 0;
    background: transparent;
    box-shadow: none;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background: ${({ theme }) => theme.colors.orange};
      opacity: 0.4;
      border-radius: 4px;
    }
  }

  .noUi-handle {
    display: block;
    width: 12px;
    height: 12px;
    top: 1px !important;
    right: -6px !important;
    border: 0;
    font-size: 0;
    background: ${({ theme }) => theme.colors.orange};
    border-radius: 50%;
    box-shadow: none;
    z-index: 5;
    cursor: pointer;

    &:before,
    &:after {
      display: none;
    }
  }

  .noUi-connect {
    position: absolute;
    background: transparent;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background: ${({ theme }) => theme.colors.orange};
      opacity: 0.4;
      border-radius: 4px;
    }
  }
`;
