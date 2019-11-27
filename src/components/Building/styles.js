import styled, { css } from 'styled-components';
import media from 'styled-media-query';

import Gallery from 'components/Slider';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: calc(100vw - 32px);
  margin: auto;

  ${media.greaterThan('medium')`
    width: 100%;
    max-width: 1000px;
    height: 365px;
    margin: auto auto 20px auto;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  `}

  p, h4 {
    color: ${({ theme }) => theme.colors.greenDark};
  }
`;

export const Infos = styled.div`
  display: block;
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.colors.white};

  ${media.greaterThan('medium')`
    padding: 40px 55px;
    width: 100%;
  `}
`;

export const Slider = styled(Gallery)`
  position: initial;
  height: 244px;

  iframe,
  img {
    height: 244px;
    object-fit: cover;
  }

  ${media.greaterThan('medium')`
    width: 565px;
    height: 365px;

    iframe,img {
      width: 565px;
      height: 365px;
    }
  `}
`;

export const CatLocGroup = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  ${media.greaterThan('medium')`
    align-items: flex-end;
  `}
`;

export const Category = styled.h4`
  font: 24px 'Bitter';
`;

export const Local = styled.h4`
  color: ${({ theme }) => theme.colors.orange} !important;
  font: 18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  text-transform: uppercase;

  ${media.greaterThan('medium')`
    font-size: 16px;
  `};
`;

export const Reference = styled.p`
  font: 14px 'Raleway';
`;

export const Description = styled.p`
  font: 17px 'Raleway';
  margin-top: 20px;

  ${media.greaterThan('medium')`
    font-size: 16px;
  `};
`;

const CenterBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CaracteristicsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  div {
    margin-top: 17px;
    height: 40px;
    flex: 0 50%;

    p {
      font-size: 17px;
    }
  }

  ${media.greaterThan('medium')`
    div {
      margin-top: 20px;
      height: 31px;
      flex: 0 50%;
    }
    p{ 
      font-size: 14px !important;
      line-height: 14px !important;
    }
  `};
`;

export const ValuesFavGroup = styled.div`
  ${CenterBetween};
  margin-top: 20px;
`;

export const Favorito = styled.img`
  width: 17px;
`;

export const Price = styled.p`
  width: 100%;
  font: 18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};
  line-height: 28px;

  ${media.greaterThan('medium')`
    line-height: 16px;
    font-size: 16px;
  `};
`;
