import styled from 'styled-components';
import media from 'styled-media-query';

import AxpeLogoSVG from 'assets/axpe-logo.svg';
import ChristiesLogoSVG from 'assets/christies-logo.svg';
import SearchIconSVG from 'assets/icons/search.svg';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyLight2};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 100;

  h1 {
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.light};
  }

  ${media.greaterThan('768px')`
    width: 200px;
    height: 100%;
  `}

  ${props =>
    props.navToggle
      ? `
    nav {}
  `
      : ``}
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 30px;
`;

export const AxpeLogo = styled.h1`
  display: block;
  width: 60px;
  margin-right: 20px;

  a {
    background: url(${AxpeLogoSVG}) no-repeat;
  }
`;

export const ChristiesLogo = styled.h2`
  display: block;
  width: 108px;

  a {
    background: url(${ChristiesLogoSVG}) no-repeat;
  }
`;

export const LogoLink = styled.a`
  display: block;
  width: 100%;
  height: 22px;
  overflow: hidden;
  text-indent: -9999em;
  background-size: contain;
`;

export const ButtonSearch = styled.button`
  display: block;
  width: 13px;
  height: 17px;
  margin-left: auto;
  font-size: 0;
  background: url(${SearchIconSVG}) no-repeat;
  background-size: contain;
`;

export const ButtonToggle = styled.button`
  display: block;
  position: relative;
  width: 20px;
  height: 17px;
  margin-left: 20px;

  i {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.green};

    &:nth-child(2) {
      top: 8px;
    }

    &:nth-child(3) {
      top: 16px;
    }
  }
`;

export const Box = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 30px;
  height: calc(100vh - 70px);
  overflow: hidden;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
`;

export const NavMain = styled.nav`
  margin-bottom: 40px;

  li {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }
`;

export const NavMainButtonSearch = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;

  i {
    display: block;
    width: 25px;
    min-width: 25px;
    text-align: center;
  }

  svg {
    display: block;
    width: 15px;
    height: 18px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
`;

export const NavMainButton = styled.a`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  text-align: left;

  svg {
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    ${props =>
      props.type == 'register'
        ? `
      width: 22px;
      height: 18px;
    `
        : `
      width: 24px;
      height: 16px;
    `}
  }
`;

export const NavMainButtonText = styled.span`
  display: block;
  width: 100%;
  padding-left: 50px;
  text-transform: uppercase;
  text-align: left;
  font: 20px 'Raleway';
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  color: ${({ theme }) => theme.colors.green};
`;

export const NavSecondary = styled.nav`
  margin-bottom: 30px;

  li {
    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }
`;

export const NavSecondaryButton = styled.a`
  text-transform: uppercase;
  font: 18px 'Raleway';
  color: ${({ theme }) => theme.colors.green};
`;

export const NavLangs = styled.nav`
  margin-bottom: 25px;

  ul {
    width: auto;
    display: flex;
    align-items: center;
  }

  li {
    font: 14px 'Raleway';
    color: ${({ theme }) => theme.colors.green};
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};

    &:nth-child(2) {
      margin: 0 15px;
    }
  }
`;

export const NavLangsButton = styled.a`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
`;

export const Whatsapp = styled.div`
  margin-bottom: 30px;
`;

export const WhatsappButton = styled.a`
  display: flex;
  align-items: center;
  width: 190px;
  font: 19px 'Raleway';
  color: ${({ theme }) => theme.colors.green2};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};

  svg {
    display: block;
    width: 29px;
    min-width: 29px;
    height: 30px;
    margin-right: 10px;
  }
`;

export const Contact = styled.p`
  position: relative;
  padding: 20px;
  margin-bottom: 25px;
  font: 18px 'Bitter';
  color: ${({ theme }) => theme.colors.greenDark};
  text-align: center;
  background: ${({ theme }) => theme.colors.greyLight};

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 30px;
    height: 100%;
    background: ${({ theme }) => theme.colors.greyLight};
  }

  &:before {
    left: -30px;
  }

  &:after {
    right: -30px;
  }

  strong {
    display: block;
    font: 26px 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.bold};
  }
`;

export const Newsletter = styled.div`
  margin-bottom: 20px;
`;

export const NewsletterButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  font: 18px 'Raleway';
  color: ${({ theme }) => theme.colors.green};

  strong {
    display: block;
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SocialsButton = styled.button`
  display: block;
  margin: 0 12px;

  svg {
    display: block;
  }

  ${props =>
    props.type == 'facebook' &&
    `
  svg {
    width: 8px;
    height: 16px;
  }
  `}

  ${props =>
    props.type == 'instagram' &&
    `
  svg {
    width: 15px;
    height: 15px;
  }
  `}

  ${props =>
    props.type == 'linkedin' &&
    `
  svg {
    width: 14px;
    height: 14px;
  }
  `}
`;

export const Creci = styled.p`
  font: 16px 'Raleway';
  color: ${({ theme }) => theme.colors.greenDark};
  font-weight: ${({ theme }) => theme.fontsWeight.medium};
`;
