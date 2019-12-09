import styled from 'styled-components';
import media from 'styled-media-query';

import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 426px;
  }

  ${media.greaterThan('medium')`
    margin-top: 25px;
    background-color: ${({ theme }) => theme.colors.white};  

    header {
      max-width: 510px;
      margin: 80px 0 0 0;
    }

    p {
      max-width: 400px;
      padding: 0px;
      margin-left: 32px;
    }

    img {
      width: 419px;
      height: 584px;
      padding: 0;
      position: absolute;
      margin-top: 54px;
      left: 56%;
    }
  `}

  ${media.greaterThan('1280px')`
    header {
      margin: 80px 0 0 62px;
    }
    p {
      margin-left: 97px;
    }

    img {
      left: auto;
      margin-left: 48.5%;
    }
  `}
`;

export const Group = styled.div`
  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.greyLight};
    max-width: 777px;
    height: 609px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  `}
`;
