import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 362px;
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 280px;

    header {
      width: 430px;
      margin-left: 104px;

      h2 {
        padding-top: 216px;
      }
    }

    img {
      width: 934px;
      height: 362px;
      position: absolute;
      padding: 0;
      margin-top: -650px;
      left: 200px;
    }
  `}

  ${media.between('medium', '1024px')`
    img {
      left: 0;
      width: 100%;
    }
  `}

  ${media.greaterThan('1280px')`
    header {
      /* margin: 0; */

      h2 {
        /* padding: 40px 60px; */
      }
    }
  `}
`;

export const Group = styled.div`
  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.greyLight};
    max-width: 851px;
    width: 100%;
    height: 476px;
    margin-left: auto;
  `}
`;

export const GroupText = styled.div`
  ${media.greaterThan('medium')`
    width: 203px;
    position: absolute;
    margin-top: -119px;
    margin-left: 545px;

    p {
      padding: 0;
    }

    hr {
      margin: 22px 0 0 0;
    }
  `}
`;
