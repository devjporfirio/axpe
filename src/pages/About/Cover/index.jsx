import React from 'react';

// styles
import { Header, Gradient } from 'pages/About/styles';

function Cover() {
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

export default Cover;