import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 332px;
  }

  ${media.greaterThan('1024px')`
    background-color: ${({ theme }) => theme.colors.white};
    padding-bottom: 95px;

    header {
      background-color: ${({ theme }) => theme.colors.greyLight};
      width: 850px;
      height: 164px;

      h2 {
        padding: 40px 97px;
      }
    }
    img {
      width: 438px;
      height: 388px;
      padding: 0;
      position: absolute;
      margin-top: -118px;
      left: 61%;
    }

    p {
      padding: 0;
      margin: 40px 97px;
      width: 400px;
    }
  `}

  ${media.between('1024px', '1279px')`
    header {
      width: 664px;
      h2 {
        padding: 30px 35px;
      }
    }
    img {
      left: 54%;
    }
    p {
      margin: 40px 35px;
    }
  `}
`;
