import React from 'react';
import { ArrowNext, ArrowPrev } from './styles';

import IArrowNext from 'assets/icons/arrow-next-white.svg';
import IArrowPrev from 'assets/icons/arrow-prev-white.svg';
import IArrowNextBlack from 'assets/icons/arrow-next-green.svg';
import IArrowPrevBlack from 'assets/icons/arrow-prev-green.svg';

export const NextArrow = ({
  type = 'slickSmall',
  color = 'greenDark',
  position = '',
  onClick = () => {}
}) => {
  return (
    <ArrowNext
      color={color}
      position={position}
      type={type}
      onClick={onClick}
      src={type === 'slick' || color === 'white' ? IArrowNext : IArrowNextBlack}
    />
  );
};

export const PrevArrow = ({
  type = 'slickSmall',
  color = 'greenDark',
  position = '',
  onClick = () => {}
}) => {
  return (
    <ArrowPrev
      color={color}
      position={position}
      type={type}
      onClick={onClick}
      src={type === 'slick' || color === 'white' ? IArrowPrev : IArrowPrevBlack}
    />
  );
};
