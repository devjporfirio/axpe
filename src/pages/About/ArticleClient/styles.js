import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles } from 'pages/About/styles';

export const Container = styled(BaseArticles)`
  background-color: ${({ theme }) => theme.colors.greyLight};

  img {
    padding-bottom: 40px;
    height: 348px;
  }

  ${media.greaterThan('1024px')`
    background-color: ${({ theme }) => theme.colors.white};
    padding-top: 80px;
    padding-bottom: 142px;

    img {
      width: 600px;
      height: 557px;
      position: absolute;
      padding: 0;
      left: 200px;
      margin-top: -296px;
    }
  `}

  ${media.between('1024px', '1280px')`
    img {
      width: 478px;
      height: 444px;
      left: 0;
    }
  `}
`;

export const Group = styled.div`
  ${media.greaterThan('1024px')`
    background-color: ${({ theme }) => theme.colors.greyLight};
    width: 799px;
    height: 500px;
    margin-left: auto;

    h2 {
      padding: 121px 0 40px 0;
      width: 359px;
      margin-left: auto;
      margin-right: 121px;
    }

    p {
      width: 400px;
      padding: 0;
      margin-left: auto;
      margin-right: 80px;
    }
  `}

  ${media.between('1024px', '1280px')`
    width: 745px;

    img {
      width: 478px;
      height: 444px;
    }

    h2 {
      margin-left: 307px;
    }

  `}
`;
