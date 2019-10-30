import React from 'react';

import { Container } from './styles';

export default function TextCustom({ children, color, fontFamily, fontWeight }) {
  return (
    <Container color={color} fontFamily={fontFamily} fontWeight={fontWeight}>
      {children}
    </Container>
  );
}
