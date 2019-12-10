import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.section`
    background-color: ${({ theme }) => theme.colors.greyLight};
    min-height: 100vh;
`;

export const Header = styled.header`
  padding: 10vmin 5vmin 5vmin 5vmin;
  text-align: center;
  
  ${media.greaterThan('medium')`
      text-align: left;
      padding: 7vmin 5vmin 5vmin 5vmin;
  `}

  ${media.greaterThan('large')`
    padding: 70px 130px 0 130px;
  `}

  h1 {
    font-size: 7.7vmin;
    letter-spacing: 0.2vmin;
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    margin-bottom: 1.5rem;

    ${media.greaterThan('medium')`
      font-size: 6vmin;
    `}

    ${media.greaterThan('large')`
      font-size: 7.7vmin;
    `}
  
    span {
        color: ${({ theme }) => theme.colors.orange};
    }
  }

  p {
      font-family: 'Raleway';
      font-size: .9rem;
     
      ${media.greaterThan('large')`
        font-size: 1.1rem;
      `}
  }
`;

export const List = styled.ul`
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 0 5vmin 10vmin 5vmin;

  ${media.greaterThan('medium')`
      padding: 0 5vmin 7vmin 5vmin;
      flex-flow: row wrap;
      justify-content: space-between;
  `}
  
  ${media.greaterThan('large')`
    padding: 70px 130px 70px 130px;
    text-align: left;
  `}

  li {
    overflow: hidden;
    min-width: 80vw;
    min-height: 30vh;
    max-width: 100%;
    margin-bottom: .6rem;
    margin-top: .6rem;
    background-image: url('https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    text-align: center;
    box-shadow: inset 0 -50px 80px rgba(0,0,0,.5);
    box-sizing: border-box;

    ${media.greaterThan('medium')`
      min-width: 30vw;
      max-width: 30vw;
      min-height: 16vw;
    `}

    ${media.greaterThan('1024px')`
      min-width: 22.5vw;
      max-width: 22.5vw;
      min-height: 16vw;
    `}

    ${media.greaterThan('large')`
      min-width: 20vw;
      max-width: 20vw;
      min-height: 16vw;

      &:hover {
        h2 {
            margin-top: 40%;
            top: 1rem;
        }

        a:before {
            opacity: 0.5;
        }

        p {
            opacity: 1;
        }
      }
    `}
  }

  a {
    display: flex;
    flex-flow: column;
    align-items: center;
    z-index: 1;
    width: 100%;
    height: 100%;
    position: relative;

    &:before {
        content: '';
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.colors.orange};
        transition: all .2s linear;
        z-index: -1;
    }
  }

  h2 {
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 35%;
    margin-bottom: 0.4rem;
    transition: all .15s linear;
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    position: relative;

    ${media.greaterThan('medium')`
      margin-top: 20%;
    `}

    ${media.greaterThan('1024px')`
      margin-top: 35%;
    `}
    
    ${media.greaterThan('large')`
      margin-top: 45%;
      top: 2.5rem;
    `}
  }

  p {
     color: white;
     font-size: .9rem;
     width: 70%;
     transition: all .2s linear;
     font-family: 'Bitter';
     font-weight: ${({ theme }) => theme.fontsWeight.medium};
     position: relative;

     ${media.greaterThan('medium')`
      font-size: .85rem;
      width: 80%;
    `}

     ${media.greaterThan('large')`
        opacity: 0;
        width: 60%;
        top: 1.3rem;
        font-size: .9rem;
    `}
  }
`;