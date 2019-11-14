import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.section`
  img {
    object-fit: cover;
  }
`;

export const Tab = styled.nav`
  ul {
    white-space: nowrap;
    padding-left: 30px;
    width: 100%;
    overflow: scroll;
  }

  ${media.greaterThan('medium')`
    box-shadow: 2px 0px 4px rgba(178, 178, 178, 0.335768);
    margin-bottom: 23px;

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
      border-bottom: 2px solid ${({ theme }) => theme.colors.orange};
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
    width: calc(100% - 200px);
    margin-top: -127px;
    z-index: 3;
  }

  hr {
    border: 2px solid ${({ theme }) => theme.colors.orange};
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

    img {
      width: 100%;
      height: 512px;
    }

    hr {
      left: 200px;
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
  width: calc(100% - 200px);
  z-index: 2;

  ${media.greaterThan('medium')`
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 25.36%, #000000 97.86%);
    height: 512px;
  `}
`;

export const TitleSection = styled.h2`
  padding: 30px 35px;
  font: 24px/28px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  color: ${({ theme }) => theme.colors.greenDark};

  span {
    font: 24px/28px 'Raleway';
    color: ${({ theme }) => theme.colors.orange};
  }
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
    border: 2px solid ${({ theme }) => theme.colors.orange};
    width: 72px;
    margin: 22px 0 0 30px;
  }

  ${media.greaterThan('medium')`
    max-width: 1119px;
    margin: auto;
  `}
`;
