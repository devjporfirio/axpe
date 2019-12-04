import React from 'react'
import { Container, Header, List } from 'pages/Dream/styles';
import BlockHighlighted from 'components/BlockHighlighted';

function Dream() {
  return (
    <Container>
      <Header>
        <h1>Só Quero <span>Sonhar</span></h1>
        <p>Espaços para você sonhar junto com a gente. Dê uma olhada na nossa seleção de imóveis.</p>
        <p>Sempre temos um perfeito para o seu estilo e momento de vida.</p>
      </Header>

      <main>
        <List>
          <li>
            <a href="so-quero-sonhar-detalhe">
              <h2>Descolados</h2>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </li>
          <li>
            <a href="so-quero-sonhar-detalhe">
              <h2>Vintage</h2>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </li>
          <li>
            <a href="so-quero-sonhar-detalhe">
              <h2>Mirante</h2>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </li>
          <li>
            <a href="so-quero-sonhar-detalhe">
              <h2>Arquitetura de Autor</h2>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </li>
          <li>
            <a href="so-quero-sonhar-detalhe">
              <h2>Verde que te quero verde</h2>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </li>
          <li>
            <a href="so-quero-sonhar-detalhe">
              <h2>Clássico contemporâneo</h2>
              <p>Soluções espertas para imóveis despojados.</p>
            </a>
          </li>
        </List>
      </main>
      <BlockHighlighted type="dream" />
    </Container>
  )
}

export default Dream;
