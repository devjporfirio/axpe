import styled from 'styled-components';
import Slider from 'react-slick';
import media from 'styled-media-query';

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

    img {
      width: 58%; 
      height: 260px;
    }
  }
`;

export const Container = styled(Slider).attrs(props => ({
  className:
    props.type === 'slickLarge' && window.innerWidth > 769 && 'slick-vertical'
}))`
  ${props =>
    props.type === 'slickLarge' && window.innerWidth > 769 && SlickLarge}
`;

export const Slide = styled.a`
  ${props =>
    props.type === 'slickGrid' && media.greaterThan('769px')`height: 650px;`}
`;

export const Image = styled.div`
  height: ${props => (props.mq === 'mobile' ? '507px' : '700px')};
  z-index: 1;
  object-fit: cover;
  background-repeat: no-repeat;
  /* background-size: cover; */

  ${media.lessThan('medium')`
    background-size: 100% 100%;
  `}

  ${props =>
    [ 'slick' ].includes(props.type) &&
    `      
      background-size: 100% 100%;
      ::after {
        content: ""; 
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
          to right,
          rgba(0, 0, 0, 100),
          rgba(0, 0, 0, 0)
        );
        opacity: 0.3;
      }
    `}

  ${props =>
    props.mq === 'mobile'
      ? media.greaterThan('769px')`
        display: none !important;
      `
      : media.lessThan('medium')`
        display: none !important;
      `}

  ${props =>
    props.type === 'slickLeft' &&
    `
      width: 100%;
      margin-left: 0;
      background-size: 100% 100%;
    `}

  ${props =>
    props.type === 'slickLarge' &&
    media.greaterThan('769px')`
      width: 64%;
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

export const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: 25% 40%;
  grid-template-rows: 277px 403px;

  img {
    max-height: 403px;
  }

  div {
    text-align: center;
    background-color: ${({ theme }) => theme.colors.green};
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      grid-area: title;
      width: 80%;
      color: ${({ theme }) => theme.colors.white};
      font-family: 'BitterRegular';
      font-size: 27px;
      text-align: left;
    }
  }

  ${media.lessThan('medium')`
    display: block;

    div {
      height: 102px;
      p {
        font-size: 22px;
        width: 238px;
        text-align: center;
      }

      img {
        display: none;
      }
    }
  `}
`;
