import styled from 'styled-components';
import media from 'styled-media-query';
import SVG from 'react-inlinesvg';
import MyAccount from '..';

export const Container = styled(MyAccount)``;

export const Body = styled.div``;

export const Empty = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 30px 47px;
  height: calc(100vh - 110px);

  h4 {
    font: ${({ theme }) => theme.fontsWeight.regular} 38px 'Bitter';
    margin-bottom: 20px;
  }

  p {
    font: ${({ theme }) => theme.fontsWeight.medium} 18px/21px 'Raleway';
    max-width: 262px;
  }

  ${media.greaterThan('medium')`
    padding: 146px 45px 194px 45px;
    height: auto;

    h4 {
      font-weight: ${({ theme }) => theme.fontsWeight.bold};
      font-size: 31px;
      line-height: 42px;
      max-width: 471px;
      margin-bottom: 35px;
    }

    p {
      font-size: 16px;
      line-height: 19px;
      max-width: 350px;
    }
  `}
`;

export const Amount = styled.div`
  padding: 0 29px 30px 29px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h4 {
    font: ${({ theme }) => theme.fontsWeight.bold} 18px/25px 'Bitter';
    width: 230px;

    strong {
      color: ${({ theme }) => theme.colors.orange};
    }
  }

  ${media.greaterThan('medium')`
    align-items: flex-end;

    h4 {
      font-size: 31px;
      line-height: 42px;
      width: auto;
      margin-top: 62px;
    }
  `}
`;

export const ShareIcon = styled(SVG)`
  width: 19.2px;
  height: 24px;
  position: absolute;
  right: 29px;

  ${media.greaterThan('medium')`
    display: none;
  `}
`;

export const GroupIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
`;

export const WhatsIcon = styled(SVG)`
  display: none;

  ${media.greaterThan('medium')`
    display: block;
    width: 23px;
    height: 23px;
  `}
`;

export const MailIcon = styled(SVG)`
  display: none;

  ${media.greaterThan('medium')`
    display: block;
    width: 26px;
    height: 16.71px;
  `}
`;
