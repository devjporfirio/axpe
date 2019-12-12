import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// assets
import IRectangle from 'assets/icons/rectangle.svg';

const TypeSlickLargeDesktop = css`
  position: initial;
  padding: 25px 4% 0 4%;
  height: 258px;
  width: 100%;
  max-width: 325px;
  margin-left: 0;
  border-radius: 0 6px 6px 0;

  p:nth-child(1) {
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
  p:nth-child(4) {
    margin: 0 0 16px 0;
  }
`;

const TypeSlickLeftDesktop = css`
  position: initial;
  background-color: #fff;
  width: 320px;
  height: 100%;
`;

const TypeSlickLeftMobile = css`
  position: initial;
  width: 70%;
  margin: auto;
  padding: 15px 0;
  height: 299px;

  hr {
    margin: 20px 0;

    & + p {
      display: none;
    }
  }

  p {
    font-size: 18px;
    line-height: 19px;
  }
`;

const TypeSlickGridDesktop = css`
  margin: auto auto auto 60px;
  position: initial;
  background-color: #fff;
`;

const TypeSlick = css`
  margin-left: 28px !important;
  top: 109px;
  animation: ${({ theme }) => theme.fadeInOpacity} 600ms ease-in;

  hr {
    margin: 29px 0;
  }

  h4 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 38px;
    line-height: 38px;
  }
  p {
    color: ${({ theme }) => theme.colors.white};
    font-size: 18px;
    line-height: 19px;
  }

  ${media.greaterThan('medium')`
    margin-left: 120px !important;
    h4 {
      font-size: 41px;
      line-height: 40px;
    }
  `};
`;

const TypeSlickSmall = css`
  ${media.greaterThan('medium')`
    ${TypeSlickLeftMobile}
    width: 100%;
    margin-left: 0 !important;
    padding: 20px;
    height: 184px;
    border-radius: 0 0 6px 6px;
    
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
  height: auto !important;
  padding: 20px 30px !important;

  hr + p {
    display: block !important;
  }

  p {
    line-height: 25px !important;
  }

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
  margin-left: 0 !important;

  h4 {
    font-size: 22px;
    line-height: 28.6px;
  }

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
  opacity: 1;

  h4 {
    font: 22px 'Bitter';

    ${media.greaterThan('medium')`
      font-size: 37px;
      line-height: 42px;
    `}
  }

  hr {
    width: 50px;
    margin: 40px 0 25px;

    ${props => !props.showHorizontalRule && `visibility: hidden;`}
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
      height: 240px;
      border-radius: 0 0 6px 6px;
  `}
`};

  ${media.greaterThan('medium')`
    margin: auto;

    ${props => props.type === 'slickLeft' && TypeSlickLeftDesktop}
    ${props => props.type === 'slickGrid' && TypeSlickGridDesktop}
    ${props => props.type === 'slickLarge' && TypeSlickLargeDesktop}
  `};
`;

export const Local = styled.p`
  text-transform: uppercase;
  font: 18px/25px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  margin-bottom: 15px;
`;

export const Infos = styled.p`
  font: 18px/25px 'Raleway';
`;

export const Reference = styled(Infos)`
  margin: 25px 0;

  ${props =>
    props.type === 'slickSmall' &&
    media.greaterThan('medium')`
      position: absolute;
      bottom: 25px;
      margin: 0;
    `}
`;

export const LinkContainer = styled.div`
  & > a {
    width: 100%;

    ${media.greaterThan('medium')`
      width: auto;
    `}
  }
`;
