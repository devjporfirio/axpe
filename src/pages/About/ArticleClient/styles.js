import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 348px;
  }

  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.white};
    padding-bottom: 142px;

    header {
      h2 {
        padding: 121px 0 40px 307px;
      }
    }

    p {
      padding: 0 38px 121px 307px;
    }

    img {
      width: 478px;
      height: 444px;
      position: absolute;
      padding: 0;
      margin-left: -210px;
      margin-top: -304px;
    }
  `}
`;

export const Group = styled.div`
  ${media.greaterThan('medium')`
    background-color: ${({ theme }) => theme.colors.greyLight};
    width: 745px;
    height: 500px;
    margin-left: 210px;
  `}
`;
