import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleBrokers/styles';

export default function ArticleBrokers() {
  return (
    <Container id="corretores">
      <header>
        <TitleSection>
          Corretores com <span>olhar</span> e <span>ouvidos</span> apurados.
        </TitleSection>
      </header>
      <img src="static/about/sec-brokers.jpg" alt="Imagem de quadros" />

      <p>
        Não basta ter os imóveis bacanas no nosso portfolio, nós temos que
        entender qual é o ideal para você.
      </p>
      <p>
        Afinal, para te ajudar, ninguém melhor que pessoas com o repertório
        parecido com o seu, capazes de ouvir atentamente e entender o que você
        precisa para ser feliz.
      </p>
      <p>
        Por isso, nossa equipe de corretores têm mais do que o olhar apurado.
        Têm uma maneira toda especial, cuidadosa e realmente única de entender e
        atender você.
      </p>
    </Container>
  );
}
