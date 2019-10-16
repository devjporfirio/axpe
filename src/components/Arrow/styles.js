import styled, { css } from 'styled-components';
import media from 'styled-media-query';

const galleryFullArrow = css`
  background-color: #fff;
  opacity: 0.8;
  margin: auto;
  bottom: unset;
  top: 45%;
  margin-left: -24px;

  ${media.lessThan('medium')`
    display: none;
  `}
`;

const galleryFullNext = css`
  margin-left: 100% !important;
  margin-top: 0;

  ${media.lessThan('medium')`
    display: none;
  `}
`;

/* Gallery */
const galleryArrow = `
  ${media.greaterThan('769px')`
    background-color: #fff;
    opacity: 0.8;
    top: 0;
    margin-top: 252px;
    margin-right: auto;
    margin-left: 173px;
  `.join('')}

  ${media.lessThan('medium')`
    background-color: #fff;
    opacity: 0.8;
    top: 0;
    margin: 176px 0 0 0;
  `.join('')}

  ${media.between('769px', '1202px')`
    margin-left: 15%;
  `.join('')}
`;
const galleryNext = `
  ${media.greaterThan('769px')`
      right: 173px;
  `.join('')}

  ${media.lessThan('medium')`
    right: 0;
    margin-right: 0 !important;
  `.join('')}

  ${media.between('769px', '1202px')`
    right: 15%;
  `.join('')}
`;

/* Slick Grid */
const slickGridArrow = css`
  ${media.greaterThan('769px')`
    margin-left: 70%
    margin-bottom: 40px;
  `}
`;
const slickGridNext = css`
  ${media.greaterThan('769px')`
    margin-left: calc(70% + 34px);
  `}
`;

/* SlickLarge*/
const slickLargeArrow = css`
  ${media.greaterThan('769px')`
    margin-left: -30px;
    margin-bottom: 308px;
  `}
`;

/* SlickSmall*/
const slickSmallArrow = css`
  ${media.greaterThan('769px')`
    margin-left: -30px;
    margin-bottom: 230px;
  `}
`;

const Arrow = styled.div`
  cursor: pointer;
  background: url(${props => props.src}) center center no-repeat;
  width: 24px;
  height: 24px;
  z-index: 3;
  position: absolute;
  bottom: 0;
  margin-left: 20px;
  margin-bottom: 30px;
  
  ${props =>
    [ 'slick', 'slickLeft', 'slickGrid' ].includes(props.type) &&
    media.greaterThan('769px')`
      padding: 10px 10px 0 0;
      border-right: 2px solid ${props => props.theme.colors[props.color]};
    `}

  ${props => props.type === 'gallery' && galleryArrow}
  ${props => props.type === 'galleryFull' && galleryFullArrow}
  ${props => props.type === 'slickGrid' && slickGridArrow}
  ${props => props.type === 'slickLarge' && slickLargeArrow}
  ${props => props.type === 'slickSmall' && slickSmallArrow}
  
  ${props =>
    [ 'slick', 'slickLeft' ].includes(props.type) &&
    media.greaterThan('769px')`
    margin-left: 126px;
    margin-bottom: 120px;
  `}

  ${props =>
    props.type !== 'slick' &&
    media.lessThan('medium')`
      margin-bottom: 175px;
    `}

  ${props =>
    [ 'slickLarge', 'slickSmall' ].includes(props.type) &&
    media.lessThan('medium')`margin-left: -25px;`}

  ${props =>
    props.position === 'center' &&
    `
    margin-bottom: 120px !important;
    margin-left: -12 !important;
  `}
`;

export const ArrowNext = styled(Arrow)`
  margin-top: -100px;
  margin-left: 60px;

  ${props =>
    [ 'slick', 'slickLeft', 'slickGrid' ].includes(props.type) &&
    media.greaterThan('769px')`
      border-right: none;
      border-left: 2px solid ${props => props.theme.colors[props.color]};
    `}

  ${media.greaterThan('769px')`margin-left: 160px;`}
  ${props => props.type === 'gallery' && galleryNext}
  ${props => props.type === 'galleryFull' && galleryFullNext}
  ${props => props.type === 'slickGrid' && slickGridNext}

  ${props =>
    props.type !== 'slick' &&
    media.lessThan('medium')`
      margin-right: 20px;
      right: 0;
    `}
  
  ${props =>
    [ 'slickLarge', 'slickSmall' ].includes(props.type) &&
    window.innerWidth > 769 &&
    media.greaterThan('769px')`
      right: -25px;
    `}

  ${props =>
    [ 'slickLarge', 'slickSmall' ].includes(props.type) &&
    media.lessThan('medium')`margin-right: -30px;`}

  ${props =>
    props.position === 'center' &&
    `
    margin-right: 0 !important;
    right: 0;
  `}
`;

export const ArrowPrev = styled(Arrow)``;
