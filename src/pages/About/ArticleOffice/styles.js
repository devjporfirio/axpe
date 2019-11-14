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
      width: 848px;
      height: 362px;
      position: absolute;
      padding: 0;
      margin-top: -650px;
      margin-left: -104px;
    }
  `}
`;

export const Group = styled.div`
  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.greyLight};
    width: 851px;
    height: 476px;
    margin-left: 104px;
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
