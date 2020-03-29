import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// assets
import ArrowIconSVG from 'assets/icons/arrow';

export const Container = styled.section`
  background: ${({ theme }) => theme.colors.greyLight3};
  min-height: calc(100vh - 70px);

  ${media.greaterThan('medium')`
    padding-left: 24px;
    min-height: 100vh;
  `}

  ${media.greaterThan('large')`
    padding-left: 0;
  `}
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 954px;
  padding: 0 0 30px 0;

  ${media.greaterThan('medium')`
    padding: 0 30px 60px 30px;
    margin: 0 auto;
    min-height: calc(100vh - 268px);
  `}

  ${media.greaterThan('1280px')`
    padding-left: 0;
    padding-right: 0;
  `}
`;

export const Header = styled.header`
  padding: 15px;
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 15px;

  h3 {
    font: 25px/28px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    color: ${({ theme }) => theme.colors.green};

    strong {
      color: ${({ theme }) => theme.colors.orange};
    }
  }

  ${media.greaterThan('medium')`
    padding: 50px 0 0;
    flex-direction: row;
    align-items: flex-end;

    h3 {
      width: 60%;
      font-size: 40px;
      line-height: 50px;
    }
  `}

  ${media.greaterThan('medium')`
    margin-bottom: 30px;
  `}
`;

export const HeaderOrder = styled.div`
  margin-bottom: 30px;
  position: relative;
  z-index: 2;

  ${media.greaterThan('medium')`
    margin-left: auto;
    margin-bottom: 0;
  `}
`;

export const HeaderOrderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font: 13px 'Raleway';
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
  border: 2px solid ${({ theme }) => theme.colors.green};
  border-radius: 4px;

  span {
    margin-left: 10px;
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }

  &:after {
    content: '';
    display: block;
    width: 13px;
    height: 13px;
    margin-left: 10px;
    background: url(${ArrowIconSVG}) no-repeat;
    background-size: contain;
    transform: rotate(90deg);
    transition: all 300ms ease;
  }

  ${media.greaterThan('medium')`
    padding: 0 15px;
    border: 0;
    height: auto;
    line-height: 15px;
  `}

  ${media.greaterThan('large')`
    ${props => props.active && css`
      &:after {
        transform: rotate(270deg);
      }
    `}
  `}
`;

export const HeaderOrderSelect = styled.select`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 2;
  opacity: 0;

  ${media.greaterThan('large')`
    display: none;
  `}
`;

export const HeaderOrderList = styled.div`
  display: none;

  ${media.greaterThan('large')`
    display: block;
    position: absolute;
    top: 15px;
    right: 10px;
    padding: 10px 10px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 6px;
    ${({ theme }) => theme.hide};
    transition: all 300ms ease;

    ${props => props.active && css`
      top: 20px;
      ${({ theme }) => theme.show};
    `}
  `}
`;

export const HeaderOrderListButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 5px 5px 0;
  text-align: left;
  font: ${({ theme }) => theme.fontsWeight.regular} 13px 'Raleway';
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.greyLight};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;


export const ButtonBack = styled.button`
  display: none;

  ${media.greaterThan('medium')`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 24px;
    height: calc(100%);
    background: ${({ theme }) => theme.colors.green};
    font-size: 0;
    z-index: 2;

    svg {
      display: block;
      width: 24px;
      height: 24px;
      transform: rotate(180deg);

      rect {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `}

  ${media.greaterThan('large')`
    left: 200px;
  `}
`;

export const Buildings = styled.div`
  width: 100%;
`;

export const BuildingsNotFound = styled.div`
  width: 100%;
  padding: 50px 30px;
  margin-bottom: 50px;

  h6 {
    margin-bottom: 20px;
    font: 30px/40px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    color: ${({ theme }) => theme.colors.orange};

    span {
      display: block;
      color: ${({ theme }) => theme.colors.orange};
    }
  }

  p {
    font: 30px/36px 'Bitter';
  }

  button {
    text-decoration: underline;
  }

  ${media.greaterThan('medium')`
    h6 {
      font-size: 45px;
      line-height: 55px;

      span {
        display: inline;
      }
    }

    p {
      line-height: 49px;
    }
  `}
`;

export const BuildingsLoadMore = styled.div`
  display: flex;
  justify-content: center;
`;
