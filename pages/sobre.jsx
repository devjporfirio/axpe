import React from 'react';
import ArticleView from 'pages/About/ArticleView';

import AboutCover from 'pages/About/cover-about.jpg';
import { Container, Tab, Li, Header, Gradient } from 'pages/About/styles';

function About() {
  return (
    <Container>
      <Tab>
        <ul>
          <Li active>
            <a href="#view">Nosso jeito</a>
          </Li>
          <Li>
            <a href="#home">Nossa casa</a>
          </Li>
          <Li>
            <a href="name">Nosso nome</a>
          </Li>
          <Li>
            <a href="#christie’s">Christie’s International Real Estate</a>
          </Li>
        </ul>
      </Tab>
      <Header>
        <Gradient />
        <img src={AboutCover} alt="Foto de uma estante de livros" />
        <h1>Nosso Jeito</h1>
        <hr />
      </Header>
      <ArticleView />
    </Container>
  );
}

export default About;
