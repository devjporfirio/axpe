import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.greyLight};
  padding-bottom: 20px;
  min-height: 100vh;
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
`;

export const Nav = styled.nav`
  position: fixed;
  background-color: white;
  z-index: 4;
  box-shadow: 2px 0 4px 0 rgba(178, 178, 178, 0.34);
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

      li + li {
        border-left: 3px solid ${({ theme }) => theme.colors.greyLight};
      }
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
  `}
`;

export const Body = styled.div`
  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    max-width: 1000px;
    margin: auto;
    padding: 0 10px;
  `}
`;
