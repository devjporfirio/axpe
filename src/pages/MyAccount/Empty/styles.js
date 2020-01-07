import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 30px 47px;
  height: calc(100vh - 110px);

  h4 {
    font: ${({ theme }) => theme.fontsWeight.regular} 38px 'Bitter';
    margin-bottom: 20px;
  }

  p {
    font: ${({ theme }) => theme.fontsWeight.medium} 18px/21px 'Raleway';
    max-width: 262px;
  }

  ${media.greaterThan('medium')`
    padding: 146px 45px 194px 45px;
    height: auto;

    h4 {
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
      font-size: 31px;
      line-height: 42px;
      max-width: 471px;
      margin-bottom: 35px;
    }

    p {
      font-size: 16px;
      line-height: 19px;
      max-width: 350px;
    }
  `}
`;
