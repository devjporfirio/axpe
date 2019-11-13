import styled from 'styled-components';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};
  padding-bottom: 0;

  p {
    padding: 0 30px 34px 30px;
  }

  img {
    padding-bottom: 40px;
    height: 304px;
  }

  img:nth-child(4) {
    padding-bottom: 0;
    height: 404px;
  }
`;
