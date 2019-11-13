import React from 'react';
import { TitleSection } from 'pages/About/styles';
import { Container } from 'pages/About/ArticleBrokers/styles';

export default function ArticleElement() {
  return (
    <Container id="materia-prima">
      <header>
        <TitleSection>
          <span>Concreto, vidro e criatividade:</span>
          matéria-prima dos imóveis comerciais na Axpe
        </TitleSection>
      </header>
      <img src="static/about/sec-element.jpg" alt="Imagem de sala" />

      <p>
        Somos reconhecidos por nosso apuro estético, um olho clínico
        especializado em selecionar imóveis especiais.
      </p>
      <p>
        Com nossos imóveis comerciais o critério não é diferente. Por isso,
        somos cada vez mais procurados por empresas de tecnologia, agências de
        publicidade e digital media, produtoras e startups.
      </p>
      <p>
        São empresas que sabem que é fundamental trabalhar em espaços criativos
        para atrair clientes e talentos igualmente criativos e inovadores.
      </p>
    </Container>
  );
}
