import React from 'react';

import { Container } from './styles';

export default function TextCustom({ children, color, fontFamily }) {
  return (
    <Container color={color} fontFamily={fontFamily}>
      {children}
    </Container>
  );
}
