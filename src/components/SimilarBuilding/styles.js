import styled, { css } from 'styled-components';
import media from 'styled-media-query';

import Gallery from 'components/Gallery';

export const Container = styled.a`
  background-color: ${({ theme }) => theme.colors.white};

  ${media.greaterThan('769px')`
    max-width: 1000px;
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

  ${media.greaterThan('769px')`
    padding: 40px 55px;
    width: 100%;
  `}
`;

export const Slider = styled(Gallery)`
  position: initial;
    
  .slick-slide img {
    ${media.greaterThan('769px')`
      max-width: 565px;
      max-height: 470px;
    `}
  }
  
  ${media.greaterThan('769px')`
    .slick-slider{
      max-width: 565px;
      max-height: 470px;
    }
  `}

  ${props =>
    props.mq === 'mobile' &&
    media.greaterThan('769px')`
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
  font-weight: 700;

  ${media.greaterThan('769px')`
    font-size: 16px;
  `};
`;

export const Reference = styled.p`
  font: 14px 'Raleway';
`;

export const Price = styled.p`
  font: 18px 'Raleway';
  font-weight: 700;

  ${media.greaterThan('769px')`
    font-size: 16px;
  `};
`;

export const Disclaimer = styled.p`
  font: 17px 'RaleRegular';
`;

const CenterBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CaracteristicsGroup = styled.div`
  ${CenterBetween};
  flex-wrap: wrap;
  margin-top: 20px;

  div {
    flex-basis: 50%;
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
