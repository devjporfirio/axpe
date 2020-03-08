import React from 'react';
import { Container, BlockImage, Title, GroupBody } from 'pages/About/ArticleView/styles';

export default function ArticleView() {
  return (
    <Container id="nosso-jeito">
      <header>
        <Title>
          Uma imobiliária com uma <strong>visão diferente</strong> do morar.
        </Title>
      </header>

      <GroupBody>
        <BlockImage>
          <div></div>
          <img src="static/about/sec-view.jpg" alt="Imagem de Sala" />
        </BlockImage>

        <div>
          <p>
            Todos os imóveis da Axpe são especiais, mas qual deles é especial para você?
          </p>
          <p>
            Escolher um lugar para fazer parte da sua história é, também, uma decisão afetiva.
          </p>
          <p>
            E para ajudar você nessa escolha tão importante, você precisa de uma imobiliária que tenha uma visão diferente do morar, que enxergue além da metragem, da disposição da planta ou do número de banheiros. Fique tranquilo, você encontrou.
          </p>
        </div>
      </GroupBody>
    </Container>
  );
}
