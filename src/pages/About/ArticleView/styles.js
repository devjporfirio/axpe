import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles, TitleSection } from 'pages/About/styles';

export const Title = styled(TitleSection)`
  ${media.greaterThan('medium')`
    text-align: center;
    width: 564px;
    height: 150px;
    margin: auto;
  `}
`;

export const Container = styled(BaseArticles)`
  padding-bottom: 55px;
  margin-bottom: 0;
`;

export const BlockImage = styled.div`
  padding-bottom: 80px;

  div {
    width: calc(100vw - 90px);
    height: 461px;
    background-color: ${({ theme }) => theme.colors.greyLight};
  }

  img {
    width: calc(100vw - 30px);
    height: 381px;
    margin: -421px 0 0 30px;
  }

  ${media.greaterThan('medium')`
    padding-bottom: 40px;
    div {
      height: 538px;
      width: 478px;
    }
    img {
      margin: -478px 0 0 30px;
      height: 416px;
      width: 448px;
    }
  `}
`;

export const GroupBody = styled.div`
  ${media.greaterThan('medium')`
    display: flex;
    align-items: center;

    div:nth-child(2) {
      width: 400px;
      height: 400px;
      margin: 70px 59px;

      p {
        padding: 0;
      }
    }
  `}
`;
