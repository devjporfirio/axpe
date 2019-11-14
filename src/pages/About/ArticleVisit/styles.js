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

  ${media.greaterThan('medium')`
    margin-top: 70px;
    
    header {
      background-color: ${({ theme }) => theme.colors.greyLight};
      width: 718px;
      height: 194px;
      margin-left: 242px;

      h2 {
        width: 398px;
        margin-left: 299px;
        padding: 30px 0;
      }
    }
    img {
      width: 482px;
      height: 584px;
      position: absolute;
      margin-top: -153px;
      padding: 0;
    }
  `}
`;

export const Group = styled.div`
  width: 400px;
  margin: 40px 0 0 545px;

  p {
    padding: 0;
  }
`;
