import styled, { css } from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.section`
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.greyLight};
`;

export const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 974px;
  padding: 30px 50px;

  ${media.greaterThan('medium')`
    padding: 50px;
  `}

  ${media.greaterThan('1280px')`
    padding: 50px 0;
  `}
`;

export const Header = styled.header`
  margin-bottom: 30px;

  ${media.greaterThan('medium')`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 10px;
  `}

  h3 {
    font: 22px/32px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    color: ${({ theme }) => theme.colors.greenDark};
    text-align: center;

    ${media.greaterThan('medium')`
      font-size: 34px;
      line-height: 34px;
      text-align: left;
    `}

    ${media.greaterThan('large')`
      font-size: 40px;
      line-height: 40px;
    `}

    strong {
      color: ${({ theme }) => theme.colors.orange};
    }
  }

  p {
    display: none;
    max-width: 280px;
    margin-left: 30px;
    padding-left: 30px;
    font-size: 16px;
    line-height: 19px;
    border-left: 2px solid ${({ theme }) => theme.colors.orange};
    font-weight: ${({ theme }) => theme.fontsWeight.light};

    ${media.greaterThan('medium')`
      display: block;
    `}

    ${media.greaterThan('large')`
      border-left-width: 4px
    `}
  }

  ${props => props.headerBig && HeaderBig}
`;

const HeaderBig = css``;

export const Items = styled.div`
  position: relative;
  width: 100%;
`;