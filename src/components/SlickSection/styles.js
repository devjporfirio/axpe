import styled from 'styled-components';
import media from 'styled-media-query';
import Slider from '../Slider';

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
  ${props =>
    props.type === 'slickLarge' && window.innerWidth > 769 && SlickLarge}

  ${props =>
    props.type === 'slickGrid' &&
    props.length === 1 &&
    media.greaterThan('769px')`
      section {
        margin-left: 70%;
      }
  `}
`;

export const Slide = styled.a`
  ${props =>
    props.type === 'slickGrid' && media.greaterThan('769px')`height: 680px;`}
`;

export const Image = styled.img`
  height: ${props => (props.mq === 'mobile' ? '70vw' : '700px')};
  background-size: cover;
  display: block;
  /* background: url(${props => props.url}) center center no-repeat; */
  
  
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
    `      
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
    `
      width: 100%;
      margin-left: 0;
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

export const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: 25% 40%;
  grid-template-rows: 277px 403px;

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
      font: 27px 'BitterRegular';
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
