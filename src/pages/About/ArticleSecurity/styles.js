import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 272px;
  }

  ${media.greaterThan('medium')`
    margin-bottom: 80px;

    img {
      display: none;
    }
  `}
`;
