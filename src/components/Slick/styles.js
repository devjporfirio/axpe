import styled from 'styled-components';
import Slider from 'react-slick';
import media from 'styled-media-query';

const SlickLarge = media.greaterThan('769px')`
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

  ${props =>
    props.type === 'slickSmall' && media.greaterThan('769px')`
      padding: 0 24px;
    `}
`;

const SectionSlickLeftMobile = `
  position: initial;
  width: 75%;
  margin: 15px auto;

  h4 {
    font-size: 22px;
  }

  hr {
    margin: 20px 0;
  }

  button {
    width: 100%;
  }
`;

export const Section = styled.section`
  z-index: 4;
  top: 110px;
  position: absolute;
  width: 245px;
  margin-left: 20px;

  h4 {
    color: ${props =>
      props.type === 'slick'
        ? props.theme.colors.white
        : props.theme.colors.black};
    font-family: 'BitterRegular', ${props => props.type};
    font-size: 41px;
  }

  hr {
    width: 50px;
    border: 2px solid ${({ theme }) => theme.colors.orange};
    margin: 40px 0 25px;
  }

  p {
    color: ${props =>
      props.type === 'slick'
        ? props.theme.colors.white
        : props.theme.colors.black};

    font-family: 'RalewaySemiBold';
    font-size: 18px;
    line-height: 25px;
  }

  ${media.lessThan('medium')`
    ${props =>
      props.type !== 'slick' && SectionSlickLeftMobile}
  `};

  ${props =>
    props.type === 'slickSmall' &&
    media.greaterThan('759px')`
      ${SectionSlickLeftMobile}

      margin-top: 20px;
      margin-left: auto !important;

      button {
        display: none;
      }
    `}

  ${media.greaterThan('769px')`
    margin-left: 120px;
  
    ${props =>
      props.type === 'slickLeft' &&
      `
        position: absolute;
        top: 0;
        padding: 100px 30px;
        margin: 0;
        background-color: #fff;
        width: 320px;
        height: 100%;
    `}

    ${props => props.type === 'slickGrid' && `margin-left: 14%;`}
    ${props =>
      props.type === 'slickLarge' &&
      `
        position: unset;
        margin-top: -250px;
        margin-left: 62%;
    `}
  `};
`;

export const GradientImage = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 100),
    rgba(0, 0, 0, 0)
  );
  opacity: 0.6;
  height: auto;

  ${media.greaterThan('769px')`height: 700px`};

  ${props =>
    props.type === 'slickLeft' &&
    props.mq === 'mobile' &&
    media.greaterThan('769px')`
      height: auto;
    `}
`;

export const Image = styled.img`
  height: ${props => (props.mq === 'mobile' ? 'auto' : '700px')};
  z-index: 1;
  object-fit: cover;

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

      ${media.lessThan('medium')`
        height: auto;
      `}
  `}

  ${props =>
    props.type === 'slickSmall' && `
      width: 90%;
      height: auto;
      margin: auto;
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
