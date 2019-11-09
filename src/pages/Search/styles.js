import styled from 'styled-components';
import media from 'styled-media-query';

// assets
import ArrowIconSVG from 'assets/icons/arrow';

export const Container = styled.section`
  background: ${({ theme }) => theme.colors.greyLight3};
  min-height: calc(100vh - 70px);

  ${media.greaterThan('medium')`
    min-height: 100vh;
  `}
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 0 30px 0;

  ${media.greaterThan('medium')`
    padding: 0 30px 60px 30px;
    margin: 0 auto;
    min-height: calc(100vh - 268px);
  `}

  ${media.greaterThan('1024px')`
    width: 80%;
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
`;

export const HeaderCombo = styled.div`
  margin-bottom: 30px;
  position: relative;

  button {
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
    }
  }

  select {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 2;
    opacity: 0;
  }

  ${media.greaterThan('medium')`
    margin-left: auto;
    margin-bottom: 0;

    button {
      padding: 0 15px;
      border: 0;
      height: auto;
      line-height: 15px;
    }
  `}
`;

export const ButtonBack = styled.button`
  display: none;

  ${media.greaterThan('medium')`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 200px;
    width: 24px;
    height: calc(100%);
    background: ${({ theme }) => theme.colors.green};
    font-size: 0;

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
