import styled, { css } from 'styled-components';
import media from 'styled-media-query';


export const Container = styled.section`
    background-color: ${({ theme }) => theme.colors.greyLight};
    min-height: 100vh;
`;

export const Header = styled.header`
  padding: 70px 130px 50px 130px;

  h1 {
    font-size: 8.5vmin;
    font-weight: bold;
    margin-bottom: 1rem;
  
    span {
        color: #e0702c;
    }
  }

  p {
      font-size: 1.2rem;
      text-style: sans-serif; //TODO set font family
  }
`;

export const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0 130px;
  
  li {
    overflow: hidden;
    min-width: 20vw;
    min-height: 15vw;
    margin: 1rem 0;
    background-image: url('https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    text-align: center;

    &:hover {
        h2 {
            margin-top: 45%;
        }

        a:before {
            opacity: 0.5;
        }

        p {
            opacity: 1;
        }
    }
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
        background-color: #e0702c;
        transition: all .2s linear;
        z-index: -1;
    }
  }

  h2 {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 50%;
    transition: all .2s linear;
  }

  p {
     color: white;
     font-size: 1rem;
     opacity: 0;
     width: 95%;
     transition: all .2s linear;
  }
`;