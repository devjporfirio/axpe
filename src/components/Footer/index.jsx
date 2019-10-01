import React from 'react';
import Button from 'components/Button';

import { Container, Highlighted } from './styles';

export default function Footer() {
  return (
    <Container>
      <Highlighted>
        <span>Sem tempo </span>
        <span>para buscar e visitar </span>
        <span>imóveis?</span>
      </Highlighted>
      <div>
        <p>
          Conte o que está buscando e vamos encontrar o imóvel dos seus sonhos
        </p>
        <Button label="Entre em contato" />
      </div>
      {/* <Button label="Fale conosco" /> */}
    </Container>
  );
}
