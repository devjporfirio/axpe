import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleClient/styles';

export default function ArticleClient() {
  return (
    <Container id="cliente">
      <header>
        <TitleSection>
          Cliente é <span>como filho</span>
        </TitleSection>
      </header>
      <img src="static/about/sec-client.jpg" alt="Imagem de sala" />

      <p>
        A gente nem prefere e nem gosta mais de um do que do outro. Toda
        transação tem dois lados: o do proprietário e o do comprador ou
        locatário. Todos são igualmente importantes e, por isso, defenderemos o
        interesse de ambos, de forma justa e sem puxar a brasa para a sardinha
        de ninguém.
      </p>
    </Container>
  );
}
