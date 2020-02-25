import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.greyLight};
  padding-bottom: 20px;
  min-height: 100vh;

  ${media.greaterThan('medium')`
    padding-left: 50px;
    padding-right: 50px;
  `}

  ${media.greaterThan('1280px')`
    padding-left: 0;
    padding-right: 0;
  `}
`;

export const Title = styled.h4`
  font: ${({ theme }) => theme.fontsWeight.bold} 18px/25px 'Bitter';
  width: 230px;

  strong {
    color: ${({ theme }) => theme.colors.orange};
  }

  ${media.greaterThan('medium')`
    font-size: 31px;
    line-height: 42px;
    width: auto;
    padding-top: 62px;
  `}
`;

export const Header = styled.header`
  padding: 30px 29px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 47px;

  h1 {
    font: 24px/28px 'Bitter';

    strong {
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
    }
  }

  ${media.greaterThan('medium')`
    padding: 94px 0 47px;
    max-width: 1000px;
    margin: 0 auto;

    h1 {
      font-size: 30px;
      line-height: 36px;

      strong {
        display: block;
      }
    }
  `}
`;

export const LinkLogOff = styled.a`
  text-decoration: underline;
  font: 14px 'Raleway';
  color: ${({ theme }) => theme.colors.green};
`;

export const Nav = styled.nav`
  position: fixed;
  background-color: white;
  z-index: 4;
  /* box-shadow: 2px 0 4px 0 rgba(178, 178, 178, 0.34); */
  width: 100%;
  margin-top: -137px;
  height: 47px;

  ul {
    white-space: nowrap;
    width: 100%;
    overflow: scroll;
  }

  ${media.greaterThan('medium')`
    position: initial;
    margin: auto;
    max-width: 1000px;

    ul {
      display: flex;
      overflow: inherit;

      li + li {
        border-right: 3px solid ${({ theme }) => theme.colors.greyLight};
      }
    }
  `}
`;

export const Li = styled.li`
  display: inline-block;
  font: 14px/44px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  height: 44px;
  padding: 0 5px;

  a {
    width: 100%;
    height: 44px;
    display: block;
    color: ${({ theme }) => theme.colors.green};
  }

  ${props =>
    props.active &&
    media.lessThan('medium')`
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
      border-bottom: 3px solid ${({ theme }) => theme.colors.orange};
    `};

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.greyLight4};
    width: 100%;
    text-align: center;

    a {
      font-family: 'Raleway';
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
    }

    ${props =>
      props.active &&
      css`
        background-color: ${({ theme }) => theme.colors.white};
      `}

      &:nth-of-type(1) {
        order: 4;
      }
      &:nth-of-type(2) {
        order: 3;
      }
      &:nth-of-type(3) {
        order: 2;
      }
      &:nth-of-type(4) {
        order: 1;
      }
  `}
`;

export const Body = styled.div`
  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    max-width: 1000px;
    margin: auto;
    padding: 0 45px;
  `}
`;
