import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// components
import { ButtonStyle } from 'components/Button/styles';

export const Container = styled.section`
  .buildingsSeen + .buildingsForYou {
    > div {
      padding-top: 0;
    }
  }
  .buildingsForYou + .buildingsSeen {
    > div {
      padding-top: 0;
    }
  }
`;

export const GroupSlider = styled.div`
  max-width: 954px;
  margin: auto;
`;

export const Banner = styled.a`
  cursor: pointer;

  img {
    margin-bottom: 10px;

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
  }
`;

export const Hero = styled.div`
  margin-bottom: 10px;
  position: relative;
  min-height: 580px;

  .slick-slider:before{
    content: inherit;
  }

  .slick-prev{
    right: inherit!important;
    left: 20px!important;
  }

  .slick-arrow svg{
    width: 20px;
    height: 24px;
  }

  .slick-prev, .slick-next{
    position: absolute;
    top: 50%;    
  }

  .slick-next{
    right: 20px !important;
    left: inherit !important;
  }

  .slick-dots{
    bottom: 44px;
    width: auto;
    padding: 0 100px;
    display: flex !important;
    align-items: center;
    pointer-events: none;
    moz-pointer-events: none;
  }

  .slick-dots li{
    width: auto;
  }

  .slick-dots li span{
    color: #fff;
    font-size: 14px;    
    font-family: 'Bitter', sans-serif;
  }

  ul.slick-dots li{
    display: none;
  }
   
  ul.slick-dots li.slick-active{
    display: block;    
  }

  @media (max-width: 991px){
    .slick-prev{
      left: -5px !important;
    }

    .slick-next{
      right: -5px !important;
    }

    .slick-dots{
      padding: 0 30px;
    }
  }

  .slick-slide.active {
    .hero-info {
      div, h2, p, span {
        transition-duration: 300ms;
        transform: translateX(0);
        ${({ theme }) => theme.show};
      }

      div {
        transition-delay: 200ms;
      }

      h2 {
        transition-delay: 200ms;
      }

      p {
        transition-delay: 400ms;
      }

      span {
        transition-delay: 600ms;
      }
    }

    .hero-image {
      transform: scale(1.05);
      transition-delay: 0s;
      transition-duration: 7s;
    }
  }
`;

export const HeroItem = styled.article``;

export const HeroLink = styled.a``;

export const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  transition: all 100ms 500ms ease;

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

export const HeroItemWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  ${media.greaterThan('medium')`
    max-height: 580px;
  `}

  ${props => props.hasContent && css`
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        270deg,
        rgba(0, 0, 0, 0.01) -23.53%,
        rgba(0, 0, 0, 0.6) 100.96%
      );
      z-index: 2;
    }
  `}
`;

export const HeroItemInfo = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  padding: 0 30px;
  z-index: 4;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.white};

  ${media.greaterThan('medium')`
    padding: 0 100px;
  `}

  div {
    display: inline-block;
    line-height: 35px;
    margin-bottom: 20px;

    img {
      display: inline-block;
      vertical-align: text-top;
    }
  }

  div, h2, p, span {
    transform: translateX(50px);
    transition: all 300ms 500ms ease;
    ${({ theme }) => theme.hide};
  }

  h2 {
    max-width: 400px;
    font: 32px/34px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};

    ${media.greaterThan('medium')`
      font-size: 41px;
      line-height: 40px;
    `}

    &.with-separator:after {
      content: '';
      display: block;
      width: 55px;
      height: 4px;
      margin-top: 25px;
      background: ${({ theme }) => theme.colors.orange};
    }

    & + p {
      margin-top: 25px;
    }
  }

  p {
    max-width: 240px;
    font: 18px/25px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};

    & + span {
      margin-top: 25px;
    }
  }

  span {
    ${ButtonStyle}
  }
`;