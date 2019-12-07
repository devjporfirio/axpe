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
    justify-content: center;
    flex-direction: row;
    align-items: center;
  `}

  ${props =>
    props.type === 'contact' &&
    css`
      padding: 0;
      min-height: auto;
      margin: auto;

      ${media.greaterThan('medium')`
        justify-content: flex-start;
      `}
    `}

  ${props =>
    props.type === 'contactWork' &&
    css`
      padding: 30px;

      ${media.greaterThan('medium')`
        justify-content: flex-start;
        border-radius: 8px;
        width: 100%;

        p {
          max-width: 280px;
        }
      `}
    `}

  ${props =>
    props.type === 'landing' &&
    css`
      p {
        max-width: 275px;
      }
    `}

  ${props =>
    props.type === 'registerProperty' &&
    css`
      padding: 40px 30px;
      min-height: auto;
      margin: auto;

      ${media.greaterThan('medium')`
        padding: 139px 119px;
        height: 451px;
        margin: 0;
        justify-content: flex-start;
      `}
    `}

    ${props =>
      [ 'notfound', 'landing' ].includes(props.type) &&
      css`
        background-color: ${({ theme }) => theme.colors.greenDark};
      `}
`;

const ContactHome = css`
  width: 320px;
  span {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.black};
  }
  strong span {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
  span:nth-child(3) {
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.black};
  }
`;

const Contact = css`
  width: 100% !important;
  margin: 0 !important;

  hr {
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

    &:nth-child(1) {
      color: ${({ theme }) => theme.colors.greenLight};
      font-family: 'Raleway';
      font-weight: ${({ theme }) => theme.fontsWeight.black};
    }

    &:nth-child(2) {
      color: ${({ theme }) => theme.colors.white};
      font-family: 'Bitter';
      font-weight: ${({ theme }) => theme.fontsWeight.regular};
    }
  }

  ${media.greaterThan('large')`
    max-width: 780px;
    margin: 0;
  `}
`;

const ContactWork = css`
  width: 300px;

  span {
    font-size: 24px;
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
    color: ${({ theme }) => theme.colors.white};
    line-height: 28px;

    ${media.greaterThan('medium')`
      font-size: 40px;
      line-height: 47px;
    `}
  }

  strong span {
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.black};
  }

  div a div {
    width: 192px;
  }
`;

const NotFound = css`
  width: 300px;
  span:nth-child(1) {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }
  span:nth-child(2) {
    color: ${({ theme }) => theme.colors.greenLight};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.black};
  }
  span:nth-child(3) {
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.black};
  }
`;

const Planta = css`
  width: 257px;
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

const Landing = css`
  width: 288px;
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
  strong span:nth-child(1) {
    color: ${({ theme }) => theme.colors.orange};
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
  }
`;

const RegisterProperty = css`
  width: 316px;
  span {
    color: ${({ theme }) => theme.colors.white};
    font: 22px/27px 'Bitter';
    font-weight: ${({ theme }) => theme.fontsWeight.regular};
  }

  strong span {
    color: ${({ theme }) => theme.colors.greenLight};
    font-weight: ${({ theme }) => theme.fontsWeight.black};
    font-family: 'Raleway';
  }

  hr {
    width: 55px;
    margin: 30px 0;
  }

  ${media.greaterThan('medium')`
    width: 497px;
    margin: 0;

    span {
      font-size: 41px;
      line-height: 49px;
    }

    strong span {
      color: ${({ theme }) => theme.colors.white};
    }
  `}
`;

export const Link = styled(Button)`
  background-color: ${props => props.theme.colors[props.color]};
  color: ${({ theme }) => theme.colors.white};
  height: 45px;
  border-radius: 6px;
  display: block;
`;

const BaseHighlighted = css`
  text-align: left;

  span {
    font-size: 40px;
    line-height: 47px;
  }

  ${media.greaterThan('medium')`margin-right: 107px;`}
`;

export const HighlightedH1 = styled.h1`${BaseHighlighted}
  ${props => props.type === 'contact' && Contact}
  ${props => props.type === 'registerProperty' && RegisterProperty}
`;

export const HighlightedH4 = styled.h4`
  ${BaseHighlighted}
  ${props => props.type === 'contactWork' && ContactWork}
  ${props => props.type === 'contactHome' && ContactHome}
  ${props => props.type === 'notfound' && NotFound}
  ${props => props.type === 'planta' && Planta}
  ${props => props.type === 'landing' && Landing}
`;
