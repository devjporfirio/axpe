import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container, Group } from 'pages/About/ArticleBrokers/styles';

export default function ArticleBrokers() {
  return (
    <Container id="corretores">
      <Group>
        <header>
          <TitleSection>
            Olhar e <strong>ouvidos</strong> apurados. <strong>Entender</strong> para atender.
          </TitleSection>
        </header>
        <img src="static/about/sec-brokers.jpg" alt="Imagem de quadros" />
        <p>
          Não basta termos imóveis bacanas no portfólio, nós temos que entender qual é o ideal para você. Para ajudar nessa busca, nada melhor que corretores com o repertório parecido com o seu, com o olhar apurado e sensível às questões humanas.
        </p>
      </Group>
    </Container>
  );
}
