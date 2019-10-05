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

  ${props =>
    props.type === 'slickGrid'
      ? media.greaterThan('769px')`right: 20%;
      margin-bottom: 60px;`
      : media.greaterThan('769px')`margin-left: 120px;
      margin-bottom: 120px;`}

  ${props =>
    props.type !== 'slick' && media.lessThan('medium')`margin-bottom: 175px;`}

  ${props =>
    props.type === 'slickLarge' &&
    window.innerWidth > 769 &&
    media.greaterThan('769px')`
        margin-left: -30px;
        margin-bottom: 308px;
      `}
 
  ${props =>
    props.type === 'slickSmall' &&
    window.innerWidth > 769 &&
    media.greaterThan('769px')`
        margin-left: -30px;
        margin-bottom: 230px;
      `}

  ${props =>
    [ 'slickLarge', 'slickSmall' ].includes(props.type) &&
    media.lessThan('medium')`margin-left: -25px;`}
`;

const ArrowNextWhite = styled(Arrow)`
  margin-top: -100px;
  margin-left: 60px;

  ${props =>
    props.type === 'slickGrid'
      ? media.greaterThan('769px')`right: 16%;`
      : media.greaterThan('769px')`margin-left: 160px;`}

  ${props =>
    props.type !== 'slick' &&
    media.lessThan('medium')`
      margin-right: 20px;
      right: 0;
    `}
  
  ${props =>
    [ 'slickLarge', 'slickSmall' ].includes(props.type) &&
    window.innerWidth > 769 &&
    media.greaterThan('769px')`
      right: -25px;
    `}

  ${props =>
    [ 'slickLarge', 'slickSmall' ].includes(props.type) &&
    media.lessThan('medium')`margin-right: -30px;`}
`;
const ArrowPrevWhite = styled(Arrow)``;

export const NextArrow = ({ type = 'slickSmall', onClick = () => {} }) => {
  return (
    <ArrowNextWhite
      type={type}
      onClick={onClick}
      src={IArrowNext}
      src={type === 'slick' ? IArrowNext : IArrowNextBlack}
    />
  );
};

export const PrevArrow = ({ type = 'slickSmall', onClick = () => {} }) => {
  return (
    <ArrowPrevWhite
      type={type}
      onClick={onClick}
      src={type === 'slick' ? IArrowPrev : IArrowPrevBlack}
    />
  );
};
