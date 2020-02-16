import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.section`
  img {
    object-fit: cover;
  }
`;

export const Tab = styled.nav`
  position: fixed;
  background-color: white;
  z-index: 4;
  box-shadow: 2px 0 4px 0 rgba(178, 178, 178, 0.34);
  width: 100%;

  ul {
    white-space: nowrap;
    padding-left: 30px;
    width: 100%;
    overflow: scroll;
  }

  ${media.greaterThan('1170px')`
    width: calc(100% - 200px);

    ul {
      max-width: 1000px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 0;
    }
  `}
`;

export const Li = styled.li`
  display: inline-block;
  font: 14px/44px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  height: 44px;

  a {
    padding: 8px;
  }

  ${props =>
    props.active &&
    css`
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
      border-bottom: 3px solid ${({ theme }) => theme.colors.orange};
    `};

  ${media.greaterThan('medium')`
    font-size: 16px;
    line-height: 60px;
    height: 60px;
  `}
`;

export const Header = styled.header`
  height: 314px;

  h1 {
    ${({ theme }) => css`
      font-weight: ${theme.fontsWeight.regular};
      color: ${theme.colors.white};
    `};
    font: 50px 'Bitter';
    line-height: 40px;
    text-align: center;
    position: absolute;
    width: 100%;
    margin-top: -127px;
    z-index: 3;
  }

  hr {
    width: 193px;
    position: absolute;
    margin: -42px auto 0 auto;
    left: 0;
    right: 0;
    z-index: 3;
  }

  img {
    width: 100vw;
    height: 314px;
  }

  ${media.greaterThan('medium')`
    height: 512px;

    h1 {
      width: calc(100% - 200px);
    }

    img {
      width: 100%;
      height: 512px;
    }

    hr {
      left: 200px;
    }
  `}

  ${media.between('medium', '1024px')`
    h1 {
      width: 100%;
    }
    hr {
      left: 0;
    }
  `}
`;

export const Gradient = styled.div`
  background-image: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0.01) -23.53%,
    rgba(0, 0, 0, 0.6) 100.96%
  );
  background-blend-mode: multiply;
  mix-blend-mode: normal;
  height: 314px;
  position: absolute;
  width: 100%;
  z-index: 2;

  ${media.greaterThan('medium')`
    width: calc(100% - 200px);
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 25.36%, #000000 97.86%);
    height: 512px;
  `}
  ${media.between('medium', '1024px')`
    width: 100%;
  `}
`;

export const TitleSection = styled.h2`
  padding: 30px 35px;
  font: 24px/28px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  color: ${({ theme }) => theme.colors.greenDark};

  strong {
    font: 24px/28px 'Raleway';
    color: ${({ theme }) => theme.colors.orange};
    font-weight: ${({ theme }) => theme.fontsWeight.black};
  }

  ${media.greaterThan('medium')`
    font-size: 37px;
    line-height: 42px;

    strong {
      font-size: 37px;
      line-height: 42px;
    }
  `}
`;

export const BaseArticles = styled.article`
  padding-bottom: 40px;
  margin-bottom: 20px;

  p {
    padding: 0 30px;
    font: 18px/25px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
    color: ${({ theme }) => theme.colors.greenDark};
  }

  p + p {
    margin-top: 25px;
  }

  hr {
    width: 72px;
    margin: 22px 0 0 30px;
  }

  ${media.greaterThan('medium')`
    max-width: 1119px;
  `}
`;
