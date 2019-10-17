import React from 'react';

import { Container } from './styles';

export default function SlickText({ items }) {
  return (
    <Container
      propsArrow={{
        type: 'galeria-imagens-texto',
        position: 'inside',
        backgroundColor: 'white'
      }}
    >
      {items.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt="" />
          {item.title}
          {item.text}
        </div>
      ))}
    </Container>
  );
}
