import React from 'react';
import { Header, Gradient } from './styles';
import AboutCover from './cover-about.jpg';

export default function Cover() {
  return (
    <Header>
      <Gradient />
      <img src={AboutCover} alt="Foto de uma estante de livros" />
      <h1>Nosso Jeito</h1>
      <hr />
    </Header>
  );
}
