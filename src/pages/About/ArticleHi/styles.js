import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  ${media.greaterThan('medium')`
    margin: 40px auto 60px auto;
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
`;

export const Group = styled.div`
  ${media.greaterThan('medium')`
    column-count: 2;
  `}
`;
