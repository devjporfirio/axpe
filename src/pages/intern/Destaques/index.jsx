import React from 'react';

import { Container, Text, Image, Video } from './styles';

export default function Destaque({ type, item }) {
  return (
    <Container type={type}>
      {item.mediaType == 'video' && (
        <Video
          type={type}
          src={item.src}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      )}
      {item.mediaType == 'imagem' && <Image type={type} src={item.image} />}
      <Text type={type} item={item} />
    </Container>
  );
}
