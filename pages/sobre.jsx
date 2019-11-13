import React from 'react';
import ArticleView from 'pages/About/ArticleView';
import ArticleBrokers from 'pages/About/ArticleBrokers';
import ArticleVisit from 'pages/About/ArticleVisit';
import ArticleHi from 'pages/About/ArticleHi';
import ArticleRight from 'pages/About/ArticleRight';
import ArticleClient from 'pages/About/ArticleClient';
import ArticleChristie from 'pages/About/ArticleChristie';
import ArticleElement from 'pages/About/ArticleElement';
import ArticleSecurity from 'pages/About/ArticleSecurity';
import ArticleOffice from 'pages/About/ArticleOffice';
import ArticleName from 'pages/About/ArticleName';
import Cover from 'pages/About/Cover';

import { Container, Tab, Li } from 'pages/About/styles';

function About() {
  return (
    <Container>
      <Tab>
        <ul>
          <Li active>
            <a href="#nosso-jeito">Nosso jeito</a>
          </Li>
          <Li>
            <a href="#nossa-casa">Nossa casa</a>
          </Li>
          <Li>
            <a href="#nosso-nome">Nosso nome</a>
          </Li>
          <Li>
            <a href="#christie">Christie’s International Real Estate</a>
          </Li>
        </ul>
      </Tab>
      <Cover />

      <ArticleView />
      <ArticleBrokers />
      <ArticleVisit />
      <ArticleHi />
      <ArticleRight />
      <ArticleClient />
      <ArticleChristie />
      <ArticleElement />
      <ArticleSecurity />
      <ArticleOffice />
      <ArticleName />
    </Container>
  );
}

export default About;
