import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import IStar from 'assets/icons/star-blue.svg';
import ICheck from 'assets/icons/check-green.svg';
import ISofa from 'assets/icons/sofa.svg';

const ICONS = {
  star: IStar,
  check: ICheck,
  sofa: ISofa
};

export default function Button({
  type = 'button',
  label,
  icon,
  color,
  ...props
}) {
  return (
    <Container {...props} color={color}>
      {icon && <img src={ICONS[icon]} alt={label} />}
      {label}
    </Container>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOf([ 'star', 'check' ])
};
