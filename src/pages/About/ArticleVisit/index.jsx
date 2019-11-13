import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleVisit/styles';

export default function ArticleVisit() {
  return (
    <Container id="visitar">
      <header>
        <TitleSection>
          Visitar imóveis comuns?
          <span>Ninguém merece.</span>
        </TitleSection>
      </header>
      <img src="static/about/sec-visit.jpg" alt="Imagem de uma sala" />

      <p>
        Com certeza, mais cedo ou mais tarde, às vezes bem mais tarde, você vai
        encontrar o imóvel perfeito. Como você quer que seja esse processo?{' '}
      </p>

      <p>Demorado e desgastante ou fluído e assertivo?</p>

      <p>
        Trabalhamos para você economizar seu precioso tempo. Todos os nossos
        imóveis são visitados antes pelos nossos corretores, justamente para
        você não precisar visitar o que não interessa. Ou seja: a gente faz a
        parte demorada e desgastante pra você.
      </p>

      <p>Ufa!</p>
    </Container>
  );
}
