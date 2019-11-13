import styled, { css } from 'styled-components';
// import media from 'styled-media-query';

export const Container = styled.section``;

export const Tab = styled.nav`
  ul {
    white-space: nowrap;
    padding-left: 30px;
    width: 100vw;
    overflow: scroll;
  }
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
    border: 2px solid ${({ theme }) => theme.colors.orange};
    width: 40%;
    position: absolute;
    margin: -42px auto 0 auto;
    left: 0;
    right: 0;
    z-index: 3;
  }

  img {
    height: 314px;
    object-fit: cover;
  }
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
`;

export const TitleSection = styled.h2`
  padding: 30px 35px;
  font: 24px/28px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  color: ${({ theme }) => theme.colors.greenDark};

  span {
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
`;
