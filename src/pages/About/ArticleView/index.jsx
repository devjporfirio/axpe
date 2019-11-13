import React from 'react';
import AboutSec1 from 'pages/About/sec1-about.jpg';
import { TitleSection } from 'pages/About/styles';
import { ArticleOne, BlockImage } from 'pages/About/ArticleView/styles';

export default function ArticleView() {
  return (
    <ArticleOne id="view">
      <header>
        <TitleSection>
          Uma imobiliária com uma <span>visão diferente</span> do morar.
        </TitleSection>
      </header>

      <BlockImage>
        <div></div>
        <img src={AboutSec1} alt="" />
      </BlockImage>

      <p>
        Todos os imóveis da Axpe são especiais, mas qual deles é especial para
        você?
      </p>
      <p>
        Qual tem aquele astral, aquele charme capaz de fazer você enxergar ali o
        seu canto?
      </p>
      <p>
        Escolher um lugar para fazer parte da sua história é, também, uma
        decisão afetiva.
      </p>
      <p>
        E para ajudar você nessa escolha tão importante, capaz de influenciar
        sua vida, você precisa de uma imobiliária que tenha uma visão diferente
        do morar, que enxergue além da metragem, da disposição da planta ou do
        número de banheiros.
      </p>
      <p>Fique tranquilo, você encontrou.</p>
    </ArticleOne>
  );
}
