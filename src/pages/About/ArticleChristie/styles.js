import styled from 'styled-components';
import media from 'styled-media-query';
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

  ${media.greaterThan('medium')`
    margin-bottom: 215px;
    height: 606px;

    header {
      width: 458px;
      height: 227px;
      padding: 40px 35px;

      h2 {
        padding: 0;
      }
    }

    P {
      width: 400px;
      height: 200px;
      padding: 0;
      margin-left: 517px;
      margin-top: 98px;
    }

    img {
      width: 438px;
      height: 356px;
      position: absolute;
      margin-left: 517px;
      margin-top: -289px;
    }

    img:nth-child(4) {
      width: 478px;
      height: 515px;
      margin-left: 0;
      margin-top: -299px;
    }
  `}
`;
