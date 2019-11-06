import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  margin: auto;
  max-width: 1000px;

  .slick-slide {
    width: calc(100vw - 500px);
    max-width: 780px;
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

export const Video = styled.iframe`
  height: 376px;

  ${media.greaterThan('medium')`
    height: 525px;
  `}
`;

export const Button360 = styled.div`
  width: 53px;
  height: 53px;
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
  position: absolute;
  right: 20px;
  margin-top: 20px;

  img {
    width: 32px;
  }

  ${media.greaterThan('medium')`
    width: 66px;
    height: 66px;

    img {
      width: 40px;
    }
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
