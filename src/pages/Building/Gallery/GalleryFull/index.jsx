import React from 'react';
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// styles
import {
  Container,
  Images,
  Slide
} from './styles';

export default function GalleryFull({ initialSlide, onClose, items, category, local }) {
  return (
    <Container category={category} local={local} close={onClose}>
      <Images
        type="gallery"
        arrowsColor="greenDark"
        settings={{
          dots: false,
          infinite: true,
          speed: 800,
          lazyLoad: true,
          initialSlide: initialSlide,
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }}
      >
        {items &&
          items.length > 0 &&
          items.map((item, itemIndex) => {
            switch (item.tipo) {
              case 'imagem':
                return (
                  <Slide key={`galleryfull-item-${item.tipo}-${itemIndex}`}>
                    <img alt="Foto do Imóvel" src={item.src} />
                    {/* <TransformWrapper>
                      <TransformComponent>
                        <img alt="Foto do Imóvel" src={item.src} />
                      </TransformComponent>
                    </TransformWrapper> */}
                  </Slide>
                );
              case 'video':
                return (
                  <Slide key={`galleryfull-item-${item.tipo}-${itemIndex}`}>
                    <iframe
                      title="video"
                      src={`https://www.youtube.com/embed/${item.video}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Slide>
                );
            }
          })}
      </Images>
      }
    </Container>
  );
}
