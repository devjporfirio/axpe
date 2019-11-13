import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleBrokers/styles';

export default function ArticleOffice() {
  return (
    <Container id="nossa-casa">
      <header>
        <TitleSection>
          <span> Nosso escritório é uma delícia.</span> A vista é linda, com
          direito a por do sol todos os dias.
        </TitleSection>
      </header>
      <img src="static/about/sec-office.jpg" alt="Imagem de quadros" />

      <p>
        E ainda está num prédio modernista projetado pelo arquiteto Rino Levi.
      </p>
      <hr/>
    </Container>
  );
}
