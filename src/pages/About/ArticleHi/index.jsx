import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container, SubtTitle, Group } from 'pages/About/ArticleHi/styles';

function ArticleHi() {
  return (
    <Container id="hi-tech">
      <header>
        <TitleSection>
          <strong>Hi-tech. Hi-touch.</strong>
        </TitleSection>
        <SubtTitle>
          Tecnologia é importante, mas não dá conta de tudo.
        </SubtTitle>
      </header>
      <Group>
        <p>
          Você começa filtrando imóveis por um site. Perfeito. Afinal, os algoritmos são ótimos para encontrar os imóveis que preenchem seus critérios. O problema é que ninguém se apaixona por critérios.
        </p>
        <p>
          É aí que entram os nossos corretores, pessoas reais como você, que se conectam ao mais importante: o ser humano por trás da busca.
        </p>
      </Group>
    </Container>
  );
}

export default ArticleHi;