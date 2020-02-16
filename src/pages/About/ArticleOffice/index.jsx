import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container, Group, GroupText } from 'pages/About/ArticleOffice/styles';

export default function ArticleOffice() {
  return (
    <Container id="nossa-casa">
      <Group>
        <header>
          <TitleSection>
            <strong> Nosso escritório é uma delícia.</strong> <br /> A vista é
            linda, com direito a por do sol todos os dias.
          </TitleSection>
        </header>
        <img src="static/about/sec-office.jpg" alt="Imagem de quadros" />

        <GroupText>
          <p>
            E ainda está num prédio modernista projetado pelo arquiteto Rino
            Levi.
          </p>
          <hr />
        </GroupText>
      </Group>
    </Container>
  );
}
