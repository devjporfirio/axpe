import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Slider from 'components/Slider';
import Modal from '../Modal';

export const Container = styled(Modal)`
  top: 0;
  background-color: ${props =>
    props.planta ? props.theme.colors.greyLight : props.theme.colors.white};

  span {
    color: ${({ theme }) => theme.colors.greenDark};
  }
  i::after,
  i::before {
    background: ${({ theme }) => theme.colors.greenDark};
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.greenDark};
  `}
`;

export const Body = styled.div`
  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.greyLight};
    max-width: 1127px;
    max-height: 738px;
    margin: auto;
    height: 100%;
  `}
`;

export const SliderNav1 = styled(Slider)`
  height: 100vw;
  top: 67px;

  img {
    max-height: 100vw;
    max-width: 100vw;
    margin: auto;
    width: auto;
  }

  ${props =>
    props.planta &&
    css`
      top: 0;
      ${media.greaterThan('medium')`
        max-width: 637px;
        max-height: 607px;
        position: absolute;
        top: 93px;
        right: 100px;

        img {
          object-fit: cover;
          width: 637px;
          height: 607px;
        }
      `}

      ${media.between('medium', '1024px')`
        right: 40px;
      `}
    `}

  ${media.greaterThan('640px')`
    img {
      max-height: calc(100vh - 170px);
    }
  `}
`;

export const SliderNav2 = styled(Slider)`
  .slick-slide {
    opacity: 0.2;
  }

  .slick-center {
    opacity: 1;
  }

  height: 100px;
  position: absolute;
  bottom: 0;
  width: 100%;

  img {
    object-fit: cover;
    height: 100px;
    width: 100px;
    margin: auto;
  }

  ${media.greaterThan('640px')`
    height: 70px;
  `}

  ${props =>
    props.planta &&
    css`
      max-width: 298px;
      margin-top: 300px;
      margin-left: 60px;
      bottom: unset;

      ${media.greaterThan('medium')`
        img {
          width: 82px;
          height: 82px;
          margin: 6px;
        }
      `}

      ${media.between('medium', '1024px')`
        margin-left: 30px;
      `}
    `}
`;

export const InfoPlanta = styled.div`
  margin: 25px 22px;

  hr {
    width: 60px;
    margin: 18px 0 20px 0;
  }

  hr:nth-child(3) {
    display: none;
  }

  ${media.greaterThan('medium')`
    padding: 93px 0 0 60px;

    hr:nth-child(3) {
      display: block;
    }

    div hr {
      display: none;
    }
  `}

  ${media.between('medium', '1024px')`
    padding: 93px 0 0 30px;
  `}
`;

export const Category = styled.p`
  font: 37px 'Bitter';

  ${media.greaterThan('medium')`
    padding-bottom: 38px;
  `}
`;

export const Title = styled.p`
  font: 18px 'Raleway';
  margin: 20px 0;
`;

export const Info = styled.div`
  p {
    font: 16px/19px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
`;
