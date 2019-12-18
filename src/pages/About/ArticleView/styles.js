import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles, TitleSection } from 'pages/About/styles';

export const Title = styled(TitleSection)`
  ${media.greaterThan('1024px')`
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

  ${media.greaterThan('1024px')`
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

  ${media.greaterThan('1170px')`
    div {
      height: 538px;
      width: 538px;
    }
    img {
      margin: -500px 0 0 101px;
      height: 463px;
      width: 499px;
    }
  `};
`;

export const GroupBody = styled.div`
  ${media.greaterThan('1024px')`
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

  ${media.greaterThan('1170px')`
    div:nth-child(2) {
      margin: 0 0 0 50px;
    }
  `};
`;
