import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleRight/styles';
import ISecRight from './sec-right.jpg';

export default function ArticleRight() {
  return (
    <Container id="certo">
      <header>
        <TitleSection>
          O que é certo é certo.
          <span>O que é errado é errado.</span>
        </TitleSection>
      </header>
      <img src={ISecRight} alt="Imagem de uma sala" />

      <p>
        Na Axpe, seguimos as regras do mercado, cumprimos todas as leis, e
        recolhemos todos os impostos. Tintim por tintim. Não abrimos espaço para
        o jeitinho e não conduzimos negócios informalmente. A Axpe escolheu o
        lado que ela quer estar - como se diz no dialeto caipira: “fazemos tudo
        nos conforme”.
      </p>
    </Container>
  );
}
