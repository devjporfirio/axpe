import styled from 'styled-components';
import media from 'styled-media-query';
import { BaseArticles, TitleSection } from 'pages/About/styles';

export const Title = styled(TitleSection)`
  ${media.greaterThan('medium')`
    text-align: center;
    font-size: 37px;
    line-height: 42px;
    width: 564px;
    height: 150px;
    margin: auto;
    span {
      font-size: 37px;
      line-height: 42px;
    }
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
      max-width: 583px;
      width: 100%;
    }
    img {
      margin: -500px 0 0 101px;
      height: 463px;
      max-width: 499px;
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
      margin: auto;

      p {
        padding: 0;
      }
    }
  `}
`;
