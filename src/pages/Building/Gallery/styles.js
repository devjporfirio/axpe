import styled from 'styled-components';
import media from 'styled-media-query';

// components
import GalleryHeaderbar from './GalleryHeaderbar';

export const Container = styled.div`
  position: relative;

  & > .slick-slider .slick-slide {
    width: calc(100vw - 400px);
  }

  .slick-list {
    overflow: hidden;
    width: 100%;
  }

  @media (max-width: 768px) {
    & > .slick-slider .slick-slide {
      width: 100vw;
    }
  }
`;

export const ActionsWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: fit-content;
  height: fit-content;

  z-index: 10;

  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 8px;
  background: #FFF;
  gap: 20px;
  padding: 10px;

  ${media.greaterThan('medium')`
    top: auto;
    right: auto;
    left: 112px;
    bottom: 40px;
  `}

  button:first-child img {
    width: 30px !important;
    height: 30px !important;
  }
`;

export const Tour360 = styled(GalleryHeaderbar)`
  height: 100vh;
  top: 0;
  background-color: ${({ theme }) => theme.colors.greenDark};

  iframe {
    width: 80%;
    height: 80%;

    display: block;

    margin: auto;
    margin-top: 6%;

    border: 0;
  }

  @media (max-width: 768px) {
    iframe {
      width: 100%;
      height: 100%;
      margin-top: 0;
    }
  }
`;

export const ImageWrapper = styled.div`
  position: relative;

  border-top: none;
  border-bottom: none;

  height: 470px;

  overflow: hidden;

  @media (min-width: 768px) {
    height: 525px;
  }

  .next-image {
    width: 100%;
    height: 100%;

    ${props =>
      props.isVertical
        ? 'object-fit: contain;'
        : 'object-fit: cover;'}
  }
`;

export const PlayButton = styled.img`
  position: absolute;

  top: 50%;
  left: 50%;

  z-index: 3;

  max-width: 18%;

  transform: translate(-50%, -50%);

  filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.5));

  opacity: 1;

  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  ${media.greaterThan('large')`
    max-width: 13.5%;
  `}

  &:hover {
    opacity: 0.85;
    transform: translate(-50%, -50%) scale(1.12);
  }
`;

export const SliderButton = styled.button`
  position: relative;

  width: 100%;

  cursor: pointer;

  border: 0;
  padding: 0;
  background: transparent;

  ${media.greaterThan('large')`
    &:before {
      content: '';

      position: absolute;
      left: 0;
      bottom: 0;

      width: 100%;
      height: 50%;

      z-index: 2;

      background: linear-gradient(
        to bottom,
        transparent,
        rgba(0, 0, 0, 0.6)
      );

      opacity: 0;

      transition: opacity 300ms ease;
    }

    &:hover {
      &:before {
        opacity: 1;
      }
    }
  `}
`;

export const Button360 = styled.button`
  position: relative;


  cursor: pointer;

  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  img {
    width: 32px;
  }

  &:hover {
    opacity: 0.92;
  }

  ${media.greaterThan('medium')`
    img {
      width: 40px;
    }
  `}
`;

export const VideoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  span {
    color: ${({ theme }) => theme.colors.white};

    font-size: 14px;
    font-weight: 600;

    white-space: nowrap;
  }

  img {
    width: 28px;
    height: 28px;
  }

  &:hover {
    opacity: 0.92;
  }

  ${media.greaterThan('medium')`
    span {
      font-size: 15px;
    }

    img {
      width: 28px;
      height: 28px;
    }
  `}
`;

export const SizeGallery = styled.div`
  position: sticky;

  margin-top: -62px;
  margin-left: calc(100vw - 45px);

  width: 35px;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.green};

  z-index: 4;

  span {
    font: 10px 'Bitter';
    color: ${({ theme }) => theme.colors.grey};
  }

  img {
    width: 24px;
    margin-top: 7px;
  }

  ${media.greaterThan('medium')`
    display: none;
  `}
`;