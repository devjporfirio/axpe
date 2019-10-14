import React from 'react';
import { ArrowNext, ArrowPrev } from './styles';

import IArrowNext from 'assets/icons/arrow-next-white.svg';
import IArrowPrev from 'assets/icons/arrow-prev-white.svg';
import IArrowNextBlack from 'assets/icons/arrow-next-black.svg';
import IArrowPrevBlack from 'assets/icons/arrow-prev-black.svg';

export const NextArrow = ({
  type = 'slickSmall',
  color = 'black',
  position = '',
  onClick = () => {}
}) => {
  return (
    <ArrowNext
      position={position}
      type={type}
      onClick={onClick}
      src={IArrowNext}
      src={type === 'slick' || color === 'white' ? IArrowNext : IArrowNextBlack}
    />
  );
};

export const PrevArrow = ({
  type = 'slickSmall',
  color = 'black',
  position = '',
  onClick = () => {}
}) => {
  return (
    <ArrowPrev
      position={position}
      type={type}
      onClick={onClick}
      src={type === 'slick' || color === 'white' ? IArrowPrev : IArrowPrevBlack}
    />
  );
};
