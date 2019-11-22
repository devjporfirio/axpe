import React from 'react';

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
    />
  );
};
