import styled from 'styled-components';
import Slider from 'react-slick';
import media from 'styled-media-query';

export const Container = styled(Slider)``;

export const Slide = styled.a``;

const SectionSlideLeftMobile = `
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
      props.type === 'slide'
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
      props.type === 'slide'
        ? props.theme.colors.white
        : props.theme.colors.black};

    font-family: 'RalewaySemiBold';
    font-size: 18px;
    line-height: 25px;
  }

  ${media.lessThan('medium')`
    ${props => props.type === 'slideLeft' && SectionSlideLeftMobile}
  `};

  ${media.greaterThan('769px')`
    margin-left: 120px;
  
    ${props =>
      props.type === 'slideLeft' &&
      `
        position: absolute;
        top: 0;
        padding: 100px 30px;
        margin: 0;
        background-color: #fff;
        width: 320px;
        height: 100%;
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
  height: 507px;

  ${media.greaterThan('769px')`height: 700px`};

  ${props =>
    props.type === 'slideLeft' &&
    `
      ${props =>
        props.mq === 'mobile' &&
        media.greaterThan('769px')`
        height: auto;
      `}
  `}
`;

export const Image = styled.img`
  height: ${props => (props.mq === 'mobile' ? '507px' : '700px')};
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
    props.type === 'slideLeft' &&
    `
      width: 100%;
      margin-left: 0;

      ${media.lessThan('medium')`
        height: auto;
      `}
  `}
`;
