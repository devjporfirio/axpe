import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

import IArrowNext from 'assets/icons/arrow-next-white.svg';
import IArrowPrev from 'assets/icons/arrow-prev-white.svg';
import IArrowNextBlack from 'assets/icons/arrow-next-black.svg';
import IArrowPrevBlack from 'assets/icons/arrow-prev-black.svg';

const Arrow = styled.img`
  width: 24px;
  height: 24px;
  z-index: 3;
  position: absolute;
  bottom: 0;
  margin-left: 20px;
  margin-bottom: 30px;

  ${media.greaterThan('769px')`
    ${props =>
      props.type === 'slickGrid' ?
    `
      right: 20%;
      margin-bottom: 60px;
    `
    : `
      margin-left: 120px;
      margin-bottom: 120px;
    `}
  `};

  ${media.lessThan('medium')`
    ${props =>
      (props.type === 'slickLeft' || props.type === 'slickGrid') &&
      `
        margin-bottom: 175px;
    `}
  `};
`;

const ArrowNextWhite = styled(Arrow)`
  margin-top: -100px;
  margin-left: 60px;

  ${media.greaterThan('769px')`
    ${props =>
      props.type === 'slickGrid' ?
    `
      right: 16%;
    `
    : `
      margin-left: 160px;
    `}
  `};

  ${media.lessThan('medium')`
    ${props =>
      (props.type === 'slickLeft' || props.type === 'slickGrid') &&
      `
        margin-right: 20px;
        right: 0;
    `}
  `};
`;
const ArrowPrevWhite = styled(Arrow)``;

export const NextArrow = props => {
  return (
    <ArrowNextWhite
      type={props.type}
      onClick={props.onClick}
      src={IArrowNext}
      src={props.type === 'slick' ? IArrowNext : IArrowNextBlack}
    />
  );
};

export const PrevArrow = props => {
  return (
    <ArrowPrevWhite
      type={props.type}
      onClick={props.onClick}
      src={props.type === 'slick' ? IArrowPrev : IArrowPrevBlack}
    />
  );
};
