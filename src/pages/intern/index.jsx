import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';

import { Container } from './styles';

export default function Intern({ match }) {
  const { id } = match.params;
  return (
    <Container>
      <Breadcrumb />
      <br />
      INTERNA BUSCA - Imóvel {id}
      <br />
    </Container>
  );
}
