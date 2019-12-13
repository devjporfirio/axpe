import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.section`
    background-color: ${({ theme }) => theme.colors.greyLight};
    min-height: 100vh;
`;

export const Header = styled.header`
  padding: 10vmin 5vmin;
  text-align: center;
  
  ${media.greaterThan('medium')`
    padding: 7vmin 5vmin 0 5vmin;
  `}

  ${media.greaterThan('large')`
    padding: 70px 130px 0 130px;
  `}

  h1 {
    color: ${({ theme }) => theme.colors.orange};
    font-size: 1.3rem;
    letter-spacing: 0.2vmin;
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    margin-bottom: 4rem;
    position: relative;
  
    span {
        color: ${({ theme }) => theme.colors.greenDark};
        font-weight: ${({ theme }) => theme.fontsWeight.medium};
        margin-top: 1rem;
        display: block;
        font-size: 7.7vmin;
        font-family: 'Bitter';

        ${media.greaterThan('medium')`
          font-size: 6vmin;
        `}

        ${media.greaterThan('large')`
          font-size: 7.7vmin;
        `}
    }

    &:after {
      content: '';
      width: 200px;
      height: 4px;
      background-color: ${({ theme }) => theme.colors.orange};
      position: absolute;
      top: 115%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  p {
      font-family: 'Raleway';
      font-size: 1.1rem;
      text-style: sans-serif; //TODO set font family
      max-width: 60%;
      margin: 0 auto;
     
      ${media.greaterThan('large')`
        font-size: 1.1rem;
      `}
  }
`;

export const List = styled.main`
  padding: 0 5vmin 10vmin 5vmin;

  ${media.greaterThan('medium')`
      padding: 0 5vmin 7vmin 5vmin;
  `}
  
  ${media.greaterThan('large')`
    padding: 70px 130px 70px 130px;
    text-align: left;
  `}

  h2 {
    color: ${({ theme }) => theme.colors.greenDark};
    font-size: 5vmin;
    max-width: 800px;
    line-height: 1.2;
    letter-spacing: 0.2vmin;
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    margin-bottom: 4rem;
  
    span {
        color: ${({ theme }) => theme.colors.orange};
    }
  }
`;