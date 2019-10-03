import React from 'react';
import { Container } from './styles';

export default function Button({ type = 'button', label, ...props }) {
  return <Container {...props}>{label}</Container>;
}
