import styled, { css } from 'styled-components';
import media from 'styled-media-query';

import Gallery from 'components/Gallery';

export const Container = styled.a`
  background-color: ${({ theme }) => theme.colors.white};

  ${media.greaterThan('medium')`
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
  height: 365px;
    
  .slick-slide {
    width: auto;

    img {
      ${media.greaterThan('medium')`
        max-width: 565px;
        max-height: 365px;
      `}
    }
  }
  
  ${media.greaterThan('medium')`
    .slick-slider{
      max-width: 565px;
      max-height: 365px;
    }
  `}

  ${props =>
    props.mq === 'mobile' &&
    media.greaterThan('medium')`
      display: none !important;
  `}

  ${props =>
    props.mq === 'desktop' &&
    media.lessThan('medium')`
      display: none !important;
  `}
`;

export const Favorito = styled.img`
  width: 17px;
`;

export const Category = styled.h4`
  font: 24px 'Bitter';
`;

export const Local = styled.h4`
  color: ${({ theme }) => theme.colors.orange} !important;
  font: 18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};

  ${media.greaterThan('medium')`
    font-size: 16px;
  `};
`;

export const Reference = styled.p`
  font: 14px 'Raleway';
`;

export const Price = styled.p`
  font: 18px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.bold};

  ${media.greaterThan('medium')`
    font-size: 16px;
  `};
`;

export const Description = styled.p`
  font: 17px 'Raleway';
  margin-top: 20px;
`;

const CenterBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CaracteristicsGroup = styled.div`
  ${CenterBetween};
  flex-wrap: wrap;

  div {
    flex-basis: 50%;
    height: 65px;
  }
`;

export const ValuesFavGroup = styled.div`
  ${CenterBetween};
  margin-top: 20px;
`;

export const CatLocGroup = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
