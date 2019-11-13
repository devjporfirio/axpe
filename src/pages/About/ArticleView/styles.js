import styled from 'styled-components';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  padding-bottom: 55px;
  margin-bottom: 0;
`;

export const BlockImage = styled.div`
  padding-bottom: 80px;

  div {
    width: calc(100vw - 90px);
    height: 461px;
    background-color: ${({ theme }) => theme.colors.greyLight};
  }

  img {
    width: calc(100vw - 30px);
    height: 381px;
    margin: -421px 0 0 30px;
  }
`;
