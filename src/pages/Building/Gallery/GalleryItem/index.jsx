import { useState } from 'react';
import Image from 'next/image';
import { ImageWrapper } from '../styles';


export default function GalleryItem({ item }) {
  const [ isVertical, setIsVertical ] = useState(false);

  const handleImageLoad = ({ naturalWidth, naturalHeight }) => {
    setIsVertical(naturalHeight > naturalWidth);
  };

  return (
    <ImageWrapper isVertical={isVertical}>
      <Image
        src={item.src}
        alt="Imagens imóvel"
        layout="fill"
        priority
        className="next-image"
        onLoadingComplete={handleImageLoad}
        sizes="(max-width: 768px) 100vw, 780px"
      />
    </ImageWrapper>
  );
}