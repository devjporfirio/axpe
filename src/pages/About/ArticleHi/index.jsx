import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container, SubtTitle } from 'pages/About/ArticleHi/styles';

export default function ArticleHi() {
  return (
    <Container id="hi-tech">
      <header>
        <TitleSection>
          <span>Hi-tech. Hi-touch.</span>
        </TitleSection>
        <SubtTitle>
          Tecnologia é importante, mas não dá conta de tudo.
        </SubtTitle>
      </header>

      <p>
        Você começa filtrando imóveis por um site. Perfeito. Afinal, os
        algoritmos são ótimos para encontrar imóveis que preenchem todos os seus
        critérios. O problema é que ninguém se apaixona por critérios.
      </p>

      <p>É aí que entram os seres humanos.</p>

      <p>
        Nosso site filtra, nossos corretores refinam. Você fala, eles ouvem.
        Você sonha, eles interpretam. Você tem a agenda corrida, eles poupam o
        seu tempo. E, no final, encontrar o imóvel que vai ser seu canto é muito
        mais fácil, tranquilo e gostoso.{' '}
      </p>

      <p>Como tem que ser. </p>
    </Container>
  );
}
