import styled from 'styled-components';
import media from 'styled-media-query';

export const Success = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  width: 100%;
  height: 100vh;

  h2 {
    margin-bottom: 30px;
    font: 30px/36px 'Bitter';
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    font: 18px/23px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    color: ${({ theme }) => theme.colors.white};
  }

  ${media.greaterThan('1024px')`
    flex-direction: row;
    padding: 0;
    height: auto;
    min-height: 480px;

    h2 {
      margin-bottom: 0;
      font-size: 40px;
      line-height: 48px;
    }

    p {
      max-width: 170px;
      font-size: 16px;
      line-height: 19px;
    }
  `}
`;

export const SuccessColumn = styled.div`
  width: 100%;

  &:first-child {
    margin-top: auto;
  }

  &:last-child {
    margin-bottom: auto;
  }

  ${media.greaterThan('1024px')`
    width: auto;
    max-width: 300px;
    padding: 0 30px;

    &:first-child,
    &:last-child {
      margin: 0;
    }
  `}
`;
