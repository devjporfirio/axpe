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

  p {
    max-width: 240px;
    font: 18px/21px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 24px;
  }

  ${media.greaterThan('medium')`
    justify-content: space-around;
    flex-direction: row;
  `}

  ${props =>
    props.type === 'contact' &&
    css`
      padding: 0;
      min-height: auto;
    `}
`;

const ContactHome = css`
  h4:nth-child(1) {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
  h4:nth-child(2) {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
  h4:nth-child(3) {
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
`;

const Contact = css`
  width: 100% !important;
  margin: 0 !important;

  h4 {
    font-size: 22px;
    line-height: 28px;

    ${media.greaterThan('medium')`
      font-size: 41px;
      line-height: 49px;
    `}
  }

  h4:nth-child(1) {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
  h4:nth-child(2) {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }
`;

const NotFound = css`
  h4:nth-child(1) {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }
  h4:nth-child(2) {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
  h4:nth-child(3) {
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
`;

const Planta = css`
  h4:nth-child(1) {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
  h4:nth-child(2) {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
  h4:nth-child(3) {
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

export const Highlighted = styled.div`
  text-align: left;
  width: 315px;
  
  h4 {
    font-size: 40px;
    line-height: 47px;
  }

  ${props => props.type === 'contactHome' && ContactHome}
  ${props => props.type === 'contact' && Contact}
  ${props => props.type === 'notfound' && NotFound}
  ${props => props.type === 'planta' && Planta}
`;
