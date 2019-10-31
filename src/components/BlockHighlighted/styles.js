import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Button from 'components/Button';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 268px;
  padding: 30px;

  div {
    width: 315px;
    margin-top: 24px;

    p {
      max-width: 240px;
      font: 18px/21px 'Raleway';
      font-weight: ${({ theme }) => theme.fontsWeight.medium};
      color: ${({ theme }) => theme.colors.white};
      margin-bottom: 24px;
    }
  }

  ${media.greaterThan('769px')`
    justify-content: space-around;
    flex-direction: row;

    div {
      width: 240px;
    }
  `}
`;

const Contact = css`
  span:nth-child(1) {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
  span:nth-child(2) { 
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
  span:nth-child(3) {
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
`;

const NotFound = css`
  span:nth-child(1) {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
  span:nth-child(3) {
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
`;

const Planta = css`
  span:nth-child(1) {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
  span:nth-child(3) {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
`;

export const Link = styled(Button)`
  background-color: ${props => props.theme.colors[props.color]};
  color: ${({ theme }) => theme.colors.white};
  width: 240px;
  height: 45px;
  border-radius: 6px;
  display: block;
`;

export const Highlighted = styled.p`
  text-align: left;
  width: 315px;
  
  span {
    font-size: 40px;
    line-height: 47px;
  }

  ${props => props.type === 'contact' && Contact}
  ${props => props.type === 'notfound' && NotFound}
  ${props => props.type === 'planta' && Planta}
`;
