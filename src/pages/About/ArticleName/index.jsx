import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container, Group, GroupText } from 'pages/About/ArticleName/styles';

export default function ArticleName() {
  return (
    <Container id="nosso-nome">
      <Group>
        <header>
          <TitleSection>
            <span>Nosso nome</span>
            <br />
            Axpe é uma pequena aldeia no País Basco, Espanha. É um local
            especial.
          </TitleSection>
        </header>
        <img src="static/about/sec-name.jpg" alt="Imagem de quadros" />
        <GroupText>
          <hr />
          <p>
            Onde a quietude é quebrada apenas pelo sininho das ovelhas no pasto.
            Em basco, Axpe (diz-se Aspe) significa “casa ao pé da pedra” em
            referência à montanha Anboto.
          </p>
        </GroupText>
      </Group>
    </Container>
  );
}
