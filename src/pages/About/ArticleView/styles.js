import styled from 'styled-components';

export const ArticleOne = styled.article`
  padding-bottom: 55px;

  p {
    padding: 0 30px;
    font: 18px/25px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }

  p + p {
    margin-top: 25px;
  }
`;

export const BlockImage = styled.div`
  padding-bottom: 80px;

  div {
    width: calc(100vw - 90px);
    height: 461px;
    background-color: ${({ theme }) => theme.colors.greyLight};
  }

  img {
    object-fit: cover;
    width: calc(100vw - 30px);
    height: 381px;
    margin: -421px 0 0 30px;
  }
`;
