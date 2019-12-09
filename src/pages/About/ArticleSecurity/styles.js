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

  ${media.greaterThan('1280px')`
    h2 {
      padding: 40px 93px;
    }

    p {
      padding-left: 93px;
      padding-right: 93px;
    }

    br {
      display: none;
    }
  `}
`;
