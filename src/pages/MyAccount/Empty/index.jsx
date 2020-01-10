import React from 'react';

import { Container } from './styles';

export default function Empty({ title, subtitle }) {
  return (
    <Container>
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </Container>
  );
}
