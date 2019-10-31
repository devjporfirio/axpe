import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Slider from '../Slider';
import Link from 'components/Link';

export const ItemLink = styled(Link)`
  height: 700px;
  width: 100%;
  display: block;
  position: absolute;
  z-index: 9;
`;

const SlickLarge = media.greaterThan('769px')`
  .slick-track {
    height: 600px;
  }
  .slick-slide {
    height: 260px !important;
    
    div {
      height: 260px;
      margin-bottom: 40px;
    }
  }
`;

export const Container = styled(Slider)`
  ${props => props.type !== 'slick' && `margin-bottom: 40px;`}

  ${props =>
    props.type === 'slickLarge' && media.greaterThan('medium')`${SlickLarge}`}

  ${props =>
    props.type === 'slickGrid' &&
    props.length === 1 &&
    media.greaterThan('769px')`
      section {
        margin-left: 70%;
      }
  `}
`;

export const Slide = styled.div`
  ${props =>
    props.type === 'slickGrid' && media.greaterThan('769px')`height: 686px;`}
`;

export const Image = styled.img`
  height: ${props => (props.mq === 'mobile' ? '70vw' : '700px')};
  background-size: cover;
  display: block;
  
  ${props =>
    [ 'slickGrid' ].includes(props.type) &&
    media.lessThan('medium')`
      height: 0;
      padding-top: 66.64%;
  ` &&
    media.greaterThan('769px')`
      height: auto;
  `}
      
  ${props =>
    [ 'slick' ].includes(props.type) &&
    css`
      height: ${props => (props.mq === 'mobile' ? '70vw' : '700px')};
      min-height: 507px;
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

  ${props =>
    props.type === 'slickLeft' &&
    css`
      width: 100%;
      margin-left: 0;

      ${media.greaterThan('769px')`
        height: 680px;
      `}
    `}

  ${props =>
    props.type === 'slickLarge' &&
    media.greaterThan('769px')`
      width: 64%;
      height: 230px;
    `}

  ${props =>
    props.type === 'slickLarge' &&
    media.lessThan('medium')`
      height: 230px;
  `}

  ${props =>
    props.type === 'slickSmall' &&
    `
      height: 230px;
      `}

  ${props =>
    props.type === 'slickSmall' &&
    media.greaterThan('769px')`
      margin: 0 20px;
      width: 86%;   
  `}
`;

export const GreenBlock = styled.div`
  width: 100%;
  height: 102px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.green};
  display: flex;
  align-items: center;
  justify-content: center;
  
  p {
    font: 22px 'Bitter';
    width: 238px;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
  }

  ${media.greaterThan('medium')`
    width: 25vw;
    max-width: 331px;
    height: 277px;
    border: 3.5px solid ${({ theme }) => theme.colors.white};

    p {
      font-size: 27px;
      text-align: left;
      width: 80%;
    }
  `}
`;

export const Row1 = styled.div`
  display: flex;
  img {
    max-width: 520px;
    width: 30vw;
    height: 277px;
  }
`;

export const Row2 = styled.div`
  display: flex;
  img {
    height: 403px;
  }
  img:nth-child(1) {
    max-width: 331px;
    width: 25vw;
  }

  img:nth-child(2) {
    max-width: 520px;
    width: 30vw;
  }
`;

export const ImagesGrid = styled.div`
  display: block;

  ${media.greaterThan('medium')`
    display: flex;
    flex-direction: column;
    width: 60vw;

    img {
      border: 3.5px solid ${({ theme }) => theme.colors.white};
    }
  `}
`;

export const Gradient = styled.div`
  width: 100%;
  height: 507px;
  position: absolute;
  background-image: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0.0001) 21.8%,
    #000000 100.96%
  );
  mix-blend-mode: normal;
  opacity: 0.78;

  ${media.greaterThan('769px')`
    height: 700px;
  `}
`;
