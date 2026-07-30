import React from 'react';
import PropTypes from 'prop-types';

import { Hero, Image, Title, GroupText, TextContainer, Text, SeeMore } from './styles';

function HeroSection({ images, title, text, transparent, textRef, onSeeMore }) {
  return (
    <>
      {images.desktop || images.mobile ? (
        <Hero>
          <Image mq="desktop" src={images.desktop} />
          <Image mq="mobile" src={images.mobile} />
        </Hero>
      ) : null}
      <Title>{title}</Title>
      <hr />
      <GroupText>
        <TextContainer transparent={transparent}>
          <Text ref={textRef}>{text}</Text>
        </TextContainer>
        {!transparent && (
          <SeeMore type="button" onClick={onSeeMore}>
            Veja Mais
          </SeeMore>
        )}
      </GroupText>
    </>
  );
}

HeroSection.propTypes = {
  images: PropTypes.shape({
    desktop: PropTypes.string,
    mobile: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  transparent: PropTypes.bool.isRequired,
  textRef: PropTypes.object,
  onSeeMore: PropTypes.func.isRequired,
};

export default HeroSection;
