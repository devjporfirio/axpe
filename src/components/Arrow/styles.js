import styled from 'styled-components';
import media from 'styled-media-query';

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
const slickGridArrow = `
  ${media.greaterThan('769px')`
    right: 20%;
    margin-bottom: 50px;
  `.join('')}
`;
const slickGridNext = `
  ${media.greaterThan('769px')`right: 16%;`.join('')}
`;

/* SlickLarge*/
const slickLargeArrow = `
  ${media.greaterThan('769px')`
    margin-left: -30px;
    margin-bottom: 308px;
  `.join('')}
`;

/* SlickSmall*/
const slickSmallArrow = `
  ${media.greaterThan('769px')`
    margin-left: -30px;
    margin-bottom: 230px;
  `.join('')}
`;

const Arrow = styled.div`
  background: url(${props => props.src}) center center no-repeat;
  width: 24px;
  height: 24px;
  z-index: 3;
  position: absolute;
  bottom: 0;
  margin-left: 20px;
  margin-bottom: 30px;

  ${props => props.type === 'gallery' && galleryArrow}
  ${props => props.type === 'slickGrid' && slickGridArrow}
  ${props => props.type === 'slickLarge' && slickLargeArrow}
  ${props => props.type === 'slickSmall' && slickSmallArrow}
  
  ${props =>
    [ 'slick', 'slickLeft' ].includes(props.type) &&
    media.greaterThan('769px')`
    margin-left: 120px;
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
`;

export const ArrowNext = styled(Arrow)`
  margin-top: -100px;
  margin-left: 60px;

  ${props => props.type === 'gallery' && galleryNext}
  ${props => props.type === 'slickGrid' && slickGridNext}

  ${media.greaterThan('769px')`margin-left: 160px;`}

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
`;

export const ArrowPrev = styled(Arrow)``;
