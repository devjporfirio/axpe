import styled from 'styled-components';
import media from 'styled-media-query';

export const InfoLogin = styled.div`
  width: 100%;
  height: 190px;
  padding-top: 23px;

  svg {
    position: absolute;
    margin-top: -23px;
    margin-left: 15px;
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    width: 370px;
    min-width: 360px;
    height: 88px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 42px;

    svg {
      width: 32px;
      height: 46px;
      position: initial;
      margin: 0;
    }
  `}
`;

export const Info = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  height: 167px;
  padding: 49px 15px 0 15px;

  p,
  button {
    font: 14px/18px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};

    strong {
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
    }
  }

  button {
    padding: 0;
    margin-left: calc(100% - 88px);
    text-decoration: underline;
    display: block;
    margin-top: -18px;
  }

  ${media.greaterThan('medium')`
    height: auto;
    padding: 0;
    max-width: 300px;

    button {
      color: ${({ theme }) => theme.colors.orange};
      margin: 0;
      display: inline;
    }
  `}
`;
