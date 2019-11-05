import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import Button from 'components/Button';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 268px;
  padding: 30px;
  align-items: flex-start;
  justify-content: flex-start;

  div {
    margin-top: 20px;
  }

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
    align-items: center;
  `}

  ${props =>
    props.type === 'contact' &&
    css`
      padding: 0;
      min-height: auto;
      max-width: 1000px;
      margin: auto;
    `}

  ${props =>
    props.type === 'contactWork' &&
    css`
      padding: 30px;

      ${media.greaterThan('medium')`
        border-radius: 8px;
        width: 100%;
        max-width: 416px;
      `}
    `}
`;

const ContactHome = css`
  span {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
  strong span {
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

const Contact = css`
  width: 100% !important;
  margin: 0 !important;

  hr {
    border: 2px solid ${({ theme }) => theme.colors.orange};
    width: 55px;
    margin: 30px 0;
  }

  span {
    font-size: 22px;
    line-height: 28px;

    ${media.greaterThan('medium')`
      font-size: 41px;
      line-height: 49px;
    `}
  }

  span:nth-child(1) {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }
`;

const ContactWork = css`
  span {
    font-size: 24px;
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
    color: ${({ theme }) => theme.colors.white};
    line-height: 28px;

    ${media.greaterThan('medium')`
      font-size: 40px;
      line-height: 47px;
    `}
  }

  strong span {
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }

  div a div {
    width: 192px;
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
  span {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
  strong span {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
`;

export const Link = styled(Button)`
  background-color: ${props => props.theme.colors[props.color]};
  color: ${({ theme }) => theme.colors.white};
  height: 45px;
  border-radius: 6px;
  display: block;
`;

export const Highlighted = styled.h4`
  text-align: left;
  max-width: 320px;

  span {
    font-size: 40px;
    line-height: 47px;
  }

  ${props => props.type === 'contactHome' && ContactHome}
  ${props => props.type === 'contact' && Contact}
  ${props => props.type === 'contactWork' && ContactWork}
  ${props => props.type === 'notfound' && NotFound}
  ${props => props.type === 'planta' && Planta}
`;
