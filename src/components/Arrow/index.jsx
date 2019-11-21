import React from 'react';

// assets
import IArrowNext from 'assets/icons/arrow-next-white';
import IArrowPrev from 'assets/icons/arrow-prev-white';
import IArrowNextBlack from 'assets/icons/arrow-next-green';
import IArrowPrevBlack from 'assets/icons/arrow-prev-green';

// styles
import { ArrowNext, ArrowPrev } from './styles';

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
