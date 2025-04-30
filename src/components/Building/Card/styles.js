import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Slider from 'components/Slider';

export const Container = styled.article`
  margin-bottom: 10px;

  ${media.greaterThan('medium')`
    max-width: 450px;
    ${props => props.layout === 'horizontal' && css`
      padding: 15px 10px;
    `}

    ${props => props.layout === 'vertical' && css`
      padding-top: 5px;
      padding-bottom: 5px;
    `}
  `}

  ${media.greaterThan('large')`
    max-width: 480px;
  `}
`;

export const LinkTag = styled.a`
  display: block;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.greenDark};

  :hover {
    text-decoration: none;
  }

  ${media.greaterThan('large')`
    transition: all 300ms ease;

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

      div[class*='Gallery']:before {
        ${({ theme }) => theme.show};
      }
    }
  `}
`;

export const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  
  ${media.greaterThan('medium')`
    ${props => props.layout === 'horizontal' && css`
      display: flex;
      align-items: center;
    `}
  `}
`;

export const GallerySlider = styled(Slider)`
  position: relative;

  .slick-slide > div {
    margin-left: 0px;
    padding-right: 0px;
  }

  .slick-slide > div:last-child {
    padding-right: 0px;
  }
  
 button[class*="ArrowPrev"] {
    position: absolute !important;
    left: 10px;
    top: 50% !important;
    transform: translateY(-50%);
    z-index: 10;
    color: ${({ theme }) => theme.colors.white};
  }

  button[class*="ArrowNext"] {
    position: absolute !important;
    right: 10px;
    top: 50% !important;
    transform: translateY(-50%);
    z-index: 10;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Gallery = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 250px;
  border-radius: 8px;
  
  &:before {
    content: '';
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2;
    transition: all 300ms ease;
    ${({ theme }) => theme.hide};
  }

  img {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translateX(-50%);
  }

  ${media.greaterThan('medium')`

    ${props => props.layout === 'horizontal' && css`
      width: 65%;
      height: 260px;

      img {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: auto;
        transform: translateY(-50%);
      }
    `}
  `}

  ${media.greaterThan('large')`
    &:before {
      display: block;
    }
  `}
`;

export const Image = styled.img`
  display: block;
  transition: all 300ms ease;

  ${props => props.mq === 'mobile' && media.greaterThan('medium')`
    display: none !important;
  `}

  ${props => props.mq === 'desktop' && media.lessThan('medium')`
    display: none !important;
  `}
`;

export const Column = styled.div`
  margin-top: 14px;
  padding: 8px;
  border-radius: 8px;

  ${media.greaterThan('medium')`
    ${props => props.layout === 'horizontal' && css`
      width: 35%;
      padding: 0 30px;
    `}
  `}

  ${media.greaterThan('large')`
    transition: all 300ms ease;
  `}
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap:2px;

  h4 {
    text-transform: uppercase;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.orange};
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    min-height: 19px;
  }

  p {
    font-family: 'Bitter';
    font-size: 16px;
    color: ${({ theme }) => theme.colors.green};
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    text-transform: uppercase;

    :last-of-type {
      text-transform: none;
      font-size: 14px;

      ${media.lessThan('medium')`
      display: none;
      `};
    }
  }

  span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.green};
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    min-height: 19px;
  }

  div {
    display: flex;

    span {
      font-family: 'Raleway';
      font-size: 16px;
      color: ${({ theme }) => theme.colors.green};
      font-weight: ${({ theme }) => theme.fontsWeight.medium};
      margin: 0 2px;
    }
  }
`;

export const ButtonContainer = styled.span`
  display: block;
  width: 100%;
  height: 45px;
  margin-top: 30px;
  border-radius: 4px;
  font: 15px/44px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  padding: 0 25px;
  transition: all 300ms ease;

  &[disabled] {
    opacity: 0.2;
    cursor: default;
  }

  ${media.greaterThan('medium')`
    width: auto;
    display: inline-block;

    ${props => props.layout === 'vertical' && css`
      display: none;
    `}
  `}
`;

export const Inactive = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  opacity: 0.7;
  background-color: black;

  svg {
    margin-left: auto;
    margin-right: 27px;
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 27px;
    max-height: 48px;
  }

  p {
    margin: 75px 0 0 21px;
    width: 180px;
  }

  p,
  strong {
    font: 24px/25px 'Bitter';
    color: ${({ theme }) => theme.colors.white};
  }

  strong {
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
`;