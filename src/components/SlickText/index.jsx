import React from 'react';

// components
import Slider from 'components/Slider';

// styles
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
          <Slider propsArrow={{ type: 'building', backgroundColor: 'white' }}>
            {item.gallery &&
              item.gallery.length > 0 &&
              item.gallery.map((media, index) => {
                return media.mediaType === 'imagem' ? (
                  <div key={index}>
                    {/* <Link href="/building/[reference]" as={`/building/${slug}`}> */}
                      <img src={media.image} alt="Imóvel" />
                    {/* </Link> */}
                  </div>
                ) : media.mediaType === 'video' ? (
                  <iframe
                    key={index}
                    title="video"
                    src={`https://www.youtube.com/embed/${media.src}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : null;
              })}
          </Slider>
          <GroupText>
            <Title>{item.title}</Title>
            <Text>{item.text}</Text>
          </GroupText>
        </div>
      ))}
    </Container>
  );
}
