import styled from 'styled-components';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  h2 {
    background-color: ${({ theme }) => theme.colors.greyLight};
  }

  img {
    padding-bottom: 40px;
    height: 365px;
  }
`;
