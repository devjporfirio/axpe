import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 332px;
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    margin-bottom: 78px;

    header {
      background-color: ${({ theme }) => theme.colors.greyLight};
      width: 664px;
      height: 164px;
    }
    img {
      width: 438px;
      height: 388px;
      padding: 0;
      position: absolute;
      margin-top: -118px;
      left: 54%;
    }

    p {
      padding: 0;
      margin: 40px 35px;
      width: 400px;
    }
  `}

  ${media.greaterThan('1280px')`
    img {
      left: auto;
      margin-left: 517px;
    }
  `}
`;
