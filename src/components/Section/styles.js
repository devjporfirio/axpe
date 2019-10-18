import styled, { css } from 'styled-components';
import media from 'styled-media-query';

const TypeSlickLargeDesktop = css`
  position: unset;
  margin-top: -302px;
  margin-left: 59%;
  padding: 25px 4% 0 4%;
  height: 238px;
  width: 32%;

  h4 {
    font-size: 22px;
    margin-bottom: 15px;
  }
`;

const TypeSlickLeftDesktop = css`
  position: absolute;
  top: 0;
  padding: 100px 30px;
  margin: 0;
  background-color: #fff;
  width: 320px;
  height: 100%;
`;

const TypeSlickLeftMobile = css`
  position: initial;
  width: 70%;
  margin: auto;
  padding: 20px 0;

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

const TypeSlick = css`
  h4,
  p {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const TypeSlickSmall = css`
  ${media.greaterThan('769px')`
    ${TypeSlickLeftMobile}
    margin-left: 20px !important;
    padding: 20px 8%;
    
    p {
      font-size: 16px;
    }

    button {
      display: none;
    }
  `}
`;

const TypeDestaqueTexto = css`
  width: auto !important;
  padding: 20px 30px !important;
`;

const TypeDestaqueTextoBullets = css`
  ${TypeSlick}
  ${TypeDestaqueTexto}
  background-color: ${({ theme }) => theme.colors.green};

  ul {
    columns: 2;
    padding: 0 17px;
  }
  li {
    list-style: disc;
    color: ${({ theme }) => theme.colors.white};
    font: 16px/40px 'RalewayRegular';
  }
`;

export const Container = styled.section`
  z-index: 4;
  top: 80px;
  position: absolute;
  width: 245px;
  margin-left: 20px;
  background-color: ${props =>
    props.type !== 'slick' && props.theme.colors.white};

  h4 {
    color: ${({ theme }) => theme.colors.greenDark};
    font: 41px 'BitterRegular';
  }

  hr {
    width: 50px;
    border: 2px solid ${({ theme }) => theme.colors.orange};
    margin: 40px 0 25px;

    ${props => !props.showHorizontalRule && `visibility: hidden;`}
  }

  p {
    color: ${({ theme }) => theme.colors.greenDark};
  }

  ${props => props.type === 'slick' && TypeSlick}
  ${props => props.type === 'slickSmall' && TypeSlickSmall}
  ${props => props.type === 'destaque-texto' && TypeDestaqueTexto}
  ${props =>
    props.type === 'destaque-texto-bullets' && TypeDestaqueTextoBullets}

  ${media.lessThan('medium')`
    ${props => props.type !== 'slick' && TypeSlickLeftMobile}

    ${props =>
      [ 'slickLarge', 'slickSmall' ].includes(props.type) &&
      `
      width: 86%;
      padding: 20px 8%;
  `}
  
`};

  ${media.greaterThan('769px')`
    margin-left: 120px;

    ${props => props.type === 'slickLeft' && TypeSlickLeftDesktop}
    ${props => props.type === 'slickGrid' && `margin-left: 14%;`}
    ${props => props.type === 'slickLarge' && TypeSlickLargeDesktop}
  `};
`;

export const Local = styled.p`
  text-transform: uppercase;
  font: 18px/25px 'RalewaySemiBold';
`;

export const Infos = styled.p`
  font: 18px/25px 'RalewayRegular';
`;
