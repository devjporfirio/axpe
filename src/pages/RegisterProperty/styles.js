import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight};
`;

export const Item = styled.a`
  background-blend-mode: multiply;
  border-radius: 4px;
  height: 223px;
  width: 80%;
  margin: auto;
  margin-bottom: 20px;
  background: ${props => `url('static/${props.background}.png')`} no-repeat;
  background-size: cover;
  display: block;

  ${media.greaterThan('1024px')`
    margin: 10px;
    flex:  1 1 15em;
    height: 230px;
    border-radius: 6px;

    &:nth-child(1) {
      order: 1; 

      p {
        width: 465px;
      }
    }
    &:nth-child(2) {
      order: 2; 

      p {
        width: 465px;
      }
    }
  `}
`;

export const Gradient = styled.div`
  border-radius: 4px;
  background: linear-gradient(
    180deg,
    rgba(238, 105, 0, 0.0001) 3.13%,
    #ee6900 97.57%
  );
  background-blend-mode: multiply;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;

  ${media.greaterThan('medium')`
    background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.0001) 41.21%);
    mix-blend-mode: normal;
    opacity: 0.8;
    border-radius: 6px;
    transform: rotate(-180deg);
  `}

  &:hover {
    background: linear-gradient(
      180deg,
      #ff7000 0%,
      #ff7000 43.96%,
      #ff8e36 66.54%,
      #ffbf8e 100%
    );
    mix-blend-mode: normal;
    opacity: 0.7;
    transform: rotate(-180deg);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

export const List = styled.div`
  max-width: 955px;
  width: 100%;
  margin: 0 auto;

  p {
    font: 25px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    margin: -116px auto auto auto;
    width: 167px;
    position: absolute;
    left: 0;
    right: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  ${media.greaterThan('1024px')`
    
    display: flex;
    flex-flow: row wrap-reverse;
    margin-bottom: 120px;

    p {
      margin: -67px auto auto auto;
      width: 293px;
      left: unset;
      right: unset;
      text-shadow:: unset;
    }
  `}
`;
