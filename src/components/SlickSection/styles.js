import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Slider from 'components/Slider';
import Button from 'components/Button';

export const ItemLink = styled(Button)`
  position: absolute;
  background-color: transparent !important;
  z-index: 9;
  height: 507px;

  ${media.greaterThan('medium')`
    height: 700px;
  `}
`;

const SlickLarge = media.greaterThan('medium')`
  .slick-track {
    height: 560px;
  }
  .slick-slide {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }

  .slick-slide.slick-active div {
    width: 100%;
  }
`;

export const Container = styled(Slider)`
  ${props =>
    props.type !== 'slick' &&
    media.greaterThan('medium')`
    margin-bottom: 40px;
  `}

  ${props =>
    props.type === 'slickLarge' && media.greaterThan('medium')`${SlickLarge}`}

  ${props =>
    props.type === 'slickGrid' &&
    props.length === 1 &&
    media.greaterThan('medium')`
      section {
        margin-left: 70%;
      }
  `}
`;

export const Slide = styled.div`
  ${props =>
    props.type === 'slickGrid' &&
    media.greaterThan('medium')`
      display: flex !important;
      height: 686px;
      justify-content: space-between;
  `}
  ${props =>
    props.type === 'slickLarge' &&
    media.greaterThan('medium')`
      display: flex !important;
      height: 258px;
      margin-bottom: 40px;
      max-width: 954px;
      width: auto !important;
    `}

  ${props =>
    props.type === 'slickLeft' &&
    media.greaterThan('medium')`
      display: flex !important;
      align-items: center;
      justify-content: space-between;
      flex-direction: row-reverse;
  `}

  ${props =>
    props.type === 'slickSmall' &&
    media.greaterThan('medium')`max-width: 304px;`}
`;

export const Image = styled.img`
  height: ${props => (props.mq === 'mobile' ? '70vw' : '700px')};
  background-size: cover;
  display: block;
  object-fit: cover;
  
  ${props =>
    [ 'slickGrid' ].includes(props.type) &&
    media.lessThan('medium')`
      height: 0;
      padding-top: 66.64%;
  ` &&
    media.greaterThan('medium')`
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
    media.greaterThan('medium')`
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
      max-width: 705px;
      max-height: 244px;
      margin-left: 0;

      ${media.greaterThan('medium')`
        max-height: 680px;
      `}
    `}

  ${props =>
    props.type === 'slickLarge' &&
    media.greaterThan('medium')`
      width: 64%;
      max-width: 635px;
      height: 258px;
    `}

  ${props =>
    props.type === 'slickLarge' &&
    media.lessThan('medium')`
      height: 230px;
  `}

  ${props =>
    props.type === 'slickGrid' &&
    media.lessThan('medium')`
      max-height: 221px;
  `}

  ${props =>
    props.type === 'slickSmall' &&
    `
      height: 230px;
      `}

  ${props =>
    props.type === 'slickSmall' &&
    media.greaterThan('medium')`
      max-width: 304px;
      border-radius: 6px;
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
    width: 331px;
    height: 277px;
    border: 3.5px solid ${({ theme }) => theme.colors.white};

    p {
      font-size: 37px;
      text-align: left;
    }
  `}
`;

export const Row1 = styled.div`
  display: flex;
  img {
    width: 520px;
    height: 277px;
  }
`;

export const Row2 = styled.div`
  display: flex;
  img {
    height: 403px;
  }
  img:nth-child(1) {
    width: 331px;
  }

  img:nth-child(2) {
    width: 520px;
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
  width: 100vw;
  height: 507px;
  position: absolute;
  background-image: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0.01) -23.53%,
    rgba(0, 0, 0, 0.6) 100.96%
  );
  background-blend-mode: multiply;
  mix-blend-mode: normal;
  opacity: 0.6;

  ${media.greaterThan('medium')`
    background-image: linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.0001) 21.8%,
      #000000 100.96%
    );
    width: calc(100vw - 200px);
    height: 700px;
  `}
`;
