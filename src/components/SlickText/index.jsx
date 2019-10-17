import React from 'react';

import { Container, GroupText, Title, Text } from './styles';

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
          {item.mediaType === 'video' && (
            <iframe
              title={item.title}
              src={item.src}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          )}
          {item.mediaType === 'imagem' && (
            <img src={item.image} alt={item.title} />
          )}
          <GroupText>
            <Title>{item.title}</Title>
            <Text>{item.text}</Text>
          </GroupText>
        </div>
      ))}
    </Container>
  );
}
