import styled, { css } from 'styled-components';
import media from 'styled-media-query';

const backgroundColorWhite = css`
  background-color: rgba(255, 255, 255, 0.5);
  width: 35px;
  height: 35px;
`;

const positionCenterNext = css`
  top: 0;
  right: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
`;
const positionCenterPrev = css`
  top: 0;
  left: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
`;

const positionInsideNext = css`
  right: 0;
`;
const positionInsidePrev = css`
  margin-left: 0;
`;

const positionOutsideNext = css`
  top: 0;
  bottom: 0;
  right: -24px;
  margin-top: auto;
  margin-bottom: auto;
`;
const positionOutsidePrev = css`
  top: 0;
  bottom: 0;
  left: -44px;
  margin-top: auto;
  margin-bottom: auto;
`;

const galeriaImagensTexto = css`
  margin: 0;
  top: 181px;
`;

const galeriaShow3 = css`
  ${media.greaterThan('medium')`
    top: 252px;
    margin-right: auto;
    margin-left: 8%;
  `}

  ${media.lessThan('medium')`
    top: 176px;
  `}

  ${media.between('medium', '1202px')`
    margin-left: 15%;
  `}
`;

const galeriaShow3Next = css`
  ${media.greaterThan('medium')`
    right: 8%;
  `}

  ${media.lessThan('medium')`
    right: 0;
  `}

  ${media.between('medium', '1202px')`
    right: 15%;
  `}
`;

const typeTogether = css`
  padding: 2px 10px;

  ${media.lessThan('medium')`
    top: 400px;
    border: none;
  `}
`;

const typeTogetherPrev = css`
  top: 610px;
  left: 112px;
  border-right: 2px solid ${props => props.theme.colors[props.color]};
  padding-right: 20px;

  ${media.lessThan('medium')`
    top: 70vw !important;
    ${positionCenterPrev}
  `}
`;

const typeTogetherNext = css`
  top: 610px;
  left: 142px;
  border-left: 2px solid ${props => props.theme.colors[props.color]};
  padding-left: 20px;

  ${media.lessThan('medium')`
    left: auto;
    top: 70vw !important;
    ${positionCenterNext}
  `}
`;

const positionRightPrev = css`
  right: 299px;
  left: auto;
`;

const positionRightNext = css`
  right: 269px;
  left: auto;
`;

const positionLeftPrev = css`
  left: 15px;
  bottom: 40px;
  margin-bottom: 0;

  ${media.greaterThan('medium')`
    top: 610px ;
    left: 112px;
  `}
`;

const positionLeftNext = css`
  left: 78px;
  bottom: 40px;
  margin-bottom: 0;

  ${media.greaterThan('medium')`
    top: 610px;
    left: 141px;
  `}
`;

const Arrow = styled.div`
  cursor: pointer;
  background: url(${props => props.src}) center center no-repeat;
  width: 24px;
  height: 24px;
  z-index: 3;
  position: absolute;

  ${props => props.backgroundColor === 'white' && backgroundColorWhite}
  ${props => props.type === 'galeria-imagens-texto' && galeriaImagensTexto}
  ${props => props.type === 'gallery-show-3' && galeriaShow3}
  ${props => props.type === 'together' && typeTogether}
`;

export const ArrowNext = styled(Arrow)`
  ${props => props.position === 'center' && positionCenterNext}
  ${props => props.position === 'inside' && positionInsideNext}
  ${props => props.position === 'outside' && positionOutsideNext}
  ${props => props.type === 'together' && typeTogetherNext}
  ${props => props.type === 'gallery-show-3' && galeriaShow3Next}
  ${props => props.position === 'right' && positionRightNext}
  ${props => props.position === 'left' && positionLeftNext}
`;

export const ArrowPrev = styled(Arrow)`
  ${props => props.position === 'center' && positionCenterPrev}
  ${props => props.position === 'inside' && positionInsidePrev}
  ${props => props.position === 'outside' && positionOutsidePrev}
  ${props => props.type === 'together' && typeTogetherPrev}
  ${props => props.position === 'right' && positionRightPrev}
  ${props => props.position === 'left' && positionLeftPrev}
`;
