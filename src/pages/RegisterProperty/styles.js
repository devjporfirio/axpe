import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight};
`;

export const List = styled.div`
  div {
    background-blend-mode: multiply;
    border-radius: 4px;
    height: 110px;
    width: 80%;
    margin: auto;
    margin-bottom: 20px;
    background: url('static/imovel-residencial.png') no-repeat;
    background-size: cover;

    &::after {
      display: block;
      background-image: linear-gradient(
        180deg,
        rgba(238, 105, 0, 0.0001) 3.13%,
        #ee6900 97.57%
      );
      height: 100%;
      margin-top: -75px;
      content: '';
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.orange};
      opacity: 0.5;
    }

    p {
      font: 25px 'Bitter';
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
      color: ${({ theme }) => theme.colors.white};
      text-align: center;
      width: 90%;
      margin: 0 auto;
      padding-top: 42px;
    }
  }

  ${media.greaterThan('1024px')`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap-reverse;
    margin-bottom: 80px;

    div {
      margin: 10px;
      flex:  1 1 15em;
      height: 220px;
    }

    div:nth-child(1) {
      order: 1; 
    }
    div:nth-child(2) {
      order: 2; 
    }
  `}
`;
