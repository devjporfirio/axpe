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
    padding: 80px 130px 0 130px;
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

export const Footer = styled.footer`
  padding: 10vmin 5vmin;
  text-align: left;

  ${media.greaterThan('medium')`
    padding: 7vmin 5vmin;
  `}

  ${media.greaterThan('large')`
    padding: 80px 130px;
  `}

  h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.greenDark};
    line-height: 1.2;
    letter-spacing: 0.2vmin;
    font-family: 'Bitter';
    margin-bottom: 1rem;
  }

  Slider {
  }

  .slick-arrow {
    height: 3rem;

    &:before {
      color: ${({ theme }) => theme.colors.greenDark};
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
      font-size: 3rem;
    }
  }
  
  .slick-prev {
    left: -10px;

    &:before {
      content: '‹';
    }
  }

  .slick-next {
    right: -10px;
    
    &:before {
      content: '›';
    }
  }

  .slick-slide {
    padding: 0 1.5rem;
  }

  .item {
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
    min-height: 170px;
    background-image: url('https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    text-align: center;
    box-shadow: inset 0 -50px 80px rgba(0,0,0,.5);
    box-sizing: border-box;

    ${media.greaterThan('medium')`
      width: 30vw;
      min-height: 16vw;
    `}

    ${media.greaterThan('1024px')`
      width: 22.5vw;
      min-height: 16vw;
    `}

    ${media.greaterThan('large')`
      width: 20vw;
      min-height: 16vw;
    `}

    a {
      display: flex;
    }
  
    h3 {
      color: white;
      font-size: 1.1rem;
      font-weight: bold;
      margin: 70% auto auto auto;
      transition: all .15s linear;
      font-family: 'Bitter';
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
      position: relative;
    }
  }
`;