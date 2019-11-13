import React from 'react';
import { Header, Gradient } from './styles';

export default function Cover() {
  return (
    <Header>
      <Gradient />
      <img
        src="static/about/cover-about.jpg"
        alt="Foto de uma estante de livros"
      />
      <h1>Nosso Jeito</h1>
      <hr />
    </Header>
  );
}
