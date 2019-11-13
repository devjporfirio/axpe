import styled from 'styled-components';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};
`;

export const SubtTitle = styled.h3`
  font: 24px/28px 'Bitter';
  font-weight: ${({ theme }) => theme.fontsWeight.regular};
  padding: 0 35px 40px 35px;
  color: ${({ theme }) => theme.colors.greenDark};
`;
