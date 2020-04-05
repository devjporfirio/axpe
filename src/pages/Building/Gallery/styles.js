import styled from 'styled-components';
import media from 'styled-media-query';

// components
import GalleryHeaderbar from './GalleryHeaderbar';

export const Container = styled.div`
  margin: auto;
  position: relative;
  max-width: 974px;

  & > .slick-slider .slick-slide {
    width: calc(100vw - 500px);
    max-width: 780px;
  }
`;

export const Tour360 = styled(GalleryHeaderbar)`
  height: 100vh;
  top: 0;
  background-color: ${({ theme }) => theme.colors.greenDark};

  iframe {
    height: 80%;
    margin: auto;
    width: 80%;
    display: block;
    margin-top: 6%;
  }
`;

export const Image = styled.img`
  object-fit: cover;
  border: 2.5px solid ${({ theme }) => theme.colors.white};
  border-top: none;
  border-bottom: none;
  height: 376px;

  ${media.greaterThan('medium')`
    height: 525px;
  `}
`;

export const SliderButton = styled.button`
  position: relative;
  cursor: pointer;

  ${media.greaterThan('large')`
    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
      transition: all 300ms ease;
      z-index: 2;
      ${({ theme }) => theme.hide};
    }

    &:hover {
      &:before {
        ${({ theme }) => theme.show};
      }
    }
  `}
`;

export const Button360 = styled.div`
  position: absolute;
  right: 20px;
  width: 53px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 100%;

  img {
    width: 32px;
  }

  ${media.greaterThan('medium')`
    width: 66px;
    height: 66px;
    right: unset;
    margin-left: 64%;
    margin-top: 15px;

    img {
      width: 40px;
    }
  `}

  ${media.greaterThan('large')`
    margin-left: calc(100% - 81px);
  `}
`;

export const SizeGallery = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  width: 35px;
  height: 52px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  position: sticky;
  margin-top: -62px;
  margin-left: calc(100vw - 45px);

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
