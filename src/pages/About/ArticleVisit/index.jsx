import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container, Group } from 'pages/About/ArticleVisit/styles';

export default function ArticleVisit() {
  return (
    <Container id="visitar">
      <header>
        <TitleSection>
          Visitar imóveis comuns? <br />
          <strong> Ninguém merece.</strong>
        </TitleSection>
      </header>
      <img src="static/about/sec-visit.jpg" alt="Imagem de uma sala" />

      <Group>
        <p>
          Cedo ou tarde, às vezes bem mais tarde, você vai encontrar o imóvel perfeito. Como você quer que seja esse processo? Demorado e desgastante ou fluído e assertivo?
        </p>
        <p>
          Seu tempo vale muito, por isso nossos corretores analisam bem os imóveis antes de apresentá-los a você.
        </p>
      </Group>
    </Container>
  );
}
