import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleChristie/styles';

export default function ArticleChristie() {
  return (
    <Container id="christie">
      <header>
        <TitleSection>
          Um convite da <strong>Christie’s</strong> não chega a qualquer
          imobiliária.
        </TitleSection>
      </header>
      <img src="static/about/sec-christie1.jpg" alt="Imagem de quadros" />

      <p>
        A Christie’s International Real Estate é a única rede global de
        imobiliárias que pertence integralmente a uma casa de leilões, a
        Christie’s. Ao contrário de uma franquia, para integrar a rede, as
        imobiliárias são selecionadas e convidadas com os mesmos critérios que
        definem a atuação da casa de leilões: a transparência, confiança,
        discrição e excelência.
      </p>

      <img src="static/about/sec-christie2.jpg" alt="Imagem de quadros" />
    </Container>
  );
}
