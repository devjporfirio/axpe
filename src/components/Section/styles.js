import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// assets
import IRectangle from 'assets/icons/rectangle.svg';

const TypeSlickLargeDesktop = css`
  position: initial;
  padding: 25px 4% 0 4%;
  height: 258px;
  width: 100%;
  max-width: 319px;
  margin-left: 0;

  p:nth-child(1) {
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
  p:nth-child(4) {
    margin: 0 0 16px 0;
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

  hr {
    margin: 20px 0;
  }
`;

const TypeSlick = css`
  h4 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 41px;
  }
  p {
    color: ${({ theme }) => theme.colors.white};
  }

  ${media.greaterThan('medium')`
    h4 {
      font-size: 38px;
    }
  `};
`;

const TypeSlickSmall = css`
  ${media.greaterThan('medium')`
    ${TypeSlickLeftMobile}
    width: calc(100% - 14px);
    margin-left: 0 !important;
    padding: 20px;
    height: 240px;
    
    p {
      font-size: 16px;

      &:nth-child(1){
        font-weight: ${({ theme }) => theme.fontsWeight.bold}
      }
    }

    a {
      display: none;
    }
  `}
`;

const TypeDestaqueTexto = css`
  width: auto !important;
  padding: 20px 30px !important;

  ${media.greaterThan('medium')`
    background: url(${IRectangle}) center no-repeat;
    position: initial;
    max-width: 1000px;
    padding: 0 !important;
    display: flex;
    margin: auto;
    margin-left: auto !important;
    height: 479px;

    h4 {
      font: 23px/28px 'Bitter';
    }

    p {
      font: 16px/23px 'Raleway';
    }
  `}
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
    font: 16px/40px 'Raleway';
  }
`;

export const Block1DestaqueTexto = styled.div`
  p {
    margin-bottom: 25px;
  }

  ${media.greaterThan('medium')`
    width: 50%;
    height: 371px;
    padding: 30px;
    background-color: ${({ theme }) => theme.colors.white};
  `}
`;

export const Block2DestaqueTexto = styled.div`
  ${media.greaterThan('medium')`
    width: 50%;
    height: 371px;
    background-color: ${({ theme }) => theme.colors.green};
    margin-top: 109px;

    p {
      color: ${({ theme }) => theme.colors.white} !important;
      width: 411px;
      margin: 30px auto;
    }
  `}
`;

export const Block1DestaqueTextoBullet = styled(Block1DestaqueTexto)`
  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.green};
  `}
`;

export const Block2DestaqueTextoBullet = styled(Block2DestaqueTexto)`
  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};

    ul {
      margin: 60px;
    }

    li {
      color: ${({ theme }) => theme.colors.greenDark} !important;
    }
  `}
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
    font: 22px 'Bitter';

    ${media.greaterThan('medium')`
      font-size: 37px;
    `}
  }

  hr {
    width: 50px;
    border: 2px solid ${({ theme }) => theme.colors.orange};
    margin: 40px 0 25px;

    ${props => !props.showHorizontalRule && `visibility: hidden;`}
  }

  p {
    font: 18px/25px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
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
      width: 100%;
      padding: 20px 8%;
  `}
  
`};

  ${media.greaterThan('medium')`
    margin-left: 120px;

    ${props => props.type === 'slickLeft' && TypeSlickLeftDesktop}
    ${props => props.type === 'slickGrid' && `margin-left: 14%;`}
    ${props => props.type === 'slickLarge' && TypeSlickLargeDesktop}
  `};
`;

export const Local = styled.p`
  text-transform: uppercase;
  font: 18px/25px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  margin-bottom: 25px;
`;

export const Infos = styled.p`
  font: 18px/25px 'Raleway';
`;

export const Reference = styled(Infos)`
  margin: 25px 0;
`;

export const LinkContainer = styled.div`
  & > a {
    width: 100%;

    ${media.greaterThan('medium')`
      width: auto;
    `}
  }
`;
