import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  ${media.greaterThan('medium')`
    margin: 80px 0 60px ;
  `}
  ${media.greaterThan('1281px')`
    h2, h3, div {
      padding-left: 97px;
    }

    div {
      padding-right: 69px;
    }

    p {
      padding: 0;
    }
  `}
`;

export const SubtTitle = styled.h3`
  font: 24px/28px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  padding: 0 35px 40px 35px;
  color: ${({ theme }) => theme.colors.greenDark};

  ${media.greaterThan('medium')`
    font-size: 37px;
    line-height: 42px;
    width: 536px; 
  `}

  ${media.greaterThan('1025px')`
    width: auto; 
  `}
`;

export const Group = styled.div`
  ${media.greaterThan('medium')`
    column-count: 2;
  `}
`;
