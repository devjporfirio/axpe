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
    background: none;
    margin-bottom: 295px;
    height: 606px;

    header {
      margin-left: 53px;
      background-color: #F5F5F0;
      width: 600px;
      height: 227px;
      padding: 40px 35px;

      h2 {
        width: 458px;
        padding: 0;
      }
    }

    P {

      background-color: #F5F5F0;
      padding: 100px 80px 0 61px;
      margin-left: 573px;
      margin-top: 0;
      width: 550px;
      height: 340px;
    }

    img {
      width: 478px;
      height: 389px;
      margin-left: 44.5%;
      position: absolute;
      margin-top: -289px;
    }

    img:nth-child(4) {
      width: 571px;
      height: 615px;
      margin-top: -340px;
      margin-left: 0;
    }
  `}

  ${media.greaterThan('1024px')`
    header {
      margin-left: 0;
    }
  `}
`;
