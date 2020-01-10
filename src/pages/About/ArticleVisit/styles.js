import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  h2 {
    background-color: ${({ theme }) => theme.colors.greyLight};
  }

  img {
    padding-bottom: 40px;
    height: 365px;
  }

  ${media.greaterThan('1024px')`
    margin-top: 70px;
    
    header {
      background-color: ${({ theme }) => theme.colors.greyLight};
      width: 718px;
      height: 164px;
      margin-left: auto;

      h2 {
        width: 441px;
        padding: 40px 0;
        margin: 0 28px 0 auto ;
      }
    }
    img {
      width: 600px;
      height: 584px;
      position: absolute;
      margin-top: -124px;
      padding: 0;
    }
  `}

  ${media.between('1024px', '1279px')`
    img {
      width: 482px;
      height: 584px;
      margin-top: -153px;
    }
  `}
`;

export const Group = styled.div`
  ${media.greaterThan('1024px')`
    width: 400px;
    margin: 40px 69px 0 auto;

    p {
      padding: 0;
    }
  `}
`;
