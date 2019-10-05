import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Button({ type = 'button', label, ...props }) {
  return <Container {...props}>{label}</Container>;
}

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired
};
