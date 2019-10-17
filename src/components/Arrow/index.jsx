import React from 'react';
import { ArrowNext, ArrowPrev } from './styles';

import IArrowNext from 'assets/icons/arrow-next-white.svg';
import IArrowPrev from 'assets/icons/arrow-prev-white.svg';
import IArrowNextBlack from 'assets/icons/arrow-next-green.svg';
import IArrowPrevBlack from 'assets/icons/arrow-prev-green.svg';

export const NextArrow = ({
  type = '',
  color = 'greenDark',
  position = '',
  backgroundColor= '',
  onClick = () => {}
}) => {
  return (
    <ArrowNext
      color={color}
      position={position}
      type={type}
      backgroundColor={backgroundColor}
      onClick={onClick}
      src={color === 'white' ? IArrowNext : IArrowNextBlack}
    />
  );
};

export const PrevArrow = ({
  type = '',
  color = 'greenDark',
  position = '',
  backgroundColor= '',
  onClick = () => {}
}) => {
  return (
    <ArrowPrev
      color={color}
      position={position}
      type={type}
      backgroundColor={backgroundColor}
      onClick={onClick}
      src={color === 'white' ? IArrowPrev : IArrowPrevBlack}
    />
  );
};
