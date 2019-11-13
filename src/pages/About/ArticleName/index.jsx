import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleBrokers/styles';

export default function ArticleName() {
  return (
    <Container id="nosso-nome">
      <header>
        <TitleSection>
          <span>Nosso nome</span>
          <br />
          Axpe é uma pequena aldeia no País Basco, Espanha. É um local especial.
        </TitleSection>
      </header>
      <img src="static/about/sec-name.jpg" alt="Imagem de quadros" />
      <hr />
      <p>
        Onde a quietude é quebrada apenas pelo sininho das ovelhas no pasto. Em
        basco, Axpe (diz-se Aspe) significa “casa ao pé da pedra” em referência
        à montanha Anboto.
      </p>
    </Container>
  );
}
