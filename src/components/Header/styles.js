import styled, { css } from 'styled-components';
import media from 'styled-media-query';

import AxpeLogoSVG from 'assets/axpe-logo.svg';
import AxpeFullLogoSVG from 'assets/axpe-full-logo.svg';
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

  ${media.lessThan('1023px')`
    transition: all 50ms ease;
  `}

  ${media.greaterThan('large')`
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    border-bottom: 0;
  `}

  ${css`
    @media (min-width: 768px) and (max-height: 640px) {
      display: block;
      overflow: hidden;
      overflow-y: auto;
    }
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 30px;

  ${media.greaterThan('large')`
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    height: auto;
  `}

  ${css`
    @media (min-width: 768px) and (max-height: 640px) {
      padding: 30px;
    }
  `}
`;

export const AxpeLogo = styled.h1`
  display: block;
  width: 60px;
  margin-right: 20px;

  ${media.greaterThan('large')`
    width: 83px;
    margin: 0 auto 20px auto;
  `}

  a {
    background: url(${AxpeLogoSVG}) no-repeat;
    background-size: contain;

    ${media.greaterThan('large')`
      height: 40px;
      background-image: url(${AxpeFullLogoSVG});
    `}
  }
`;

export const ChristiesLogo = styled.h2`
  display: block;
  width: 108px;

  ${media.greaterThan('large')`
    width: 97px;
    margin: 0 auto 35px auto;
  `}

  a {
    background: url(${ChristiesLogoSVG}) no-repeat;
    background-size: contain;
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

  ${media.greaterThan('large')`
    display: none;
  `}
`;

export const ButtonToggle = styled.button`
  display: block;
  position: relative;
  width: 20px;
  height: 17px;
  margin-left: 20px;

  ${media.greaterThan('large')`
    display: none;
  `}

  i {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.green};
    transition: all 300ms ease;

    &:nth-child(2) {
      top: 8px;
    }

    &:nth-child(3) {
      top: 16px;
    }

    ${props =>
      props.navToggle &&
      `
      &:nth-child(1) {
        top: 8px;
        transform: rotate(45deg);
      }

      &:nth-child(2) {
        width: 0%;
      }

      &:nth-child(3) {
        top: 8px;
        transform: rotate(-45deg);
      }
    `}
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

  ${props => (props.navToggle ? `display: block;` : `display: none;`)}

  ${media.greaterThan('large')`
    display: block;
    height: auto;
    position: relative;
    top: 0;
    overflow: none;
    padding: 0;
    background: transparent;
  `}
`;

export const NavMain = styled.nav`
  margin-bottom: 35px;

  ${media.greaterThan('large')`
    margin-bottom: 30px;
  `}

  li {
    &:not(:last-child) {
      margin-bottom: 25px;

      ${media.greaterThan('large')`
        margin-bottom: 10px;
      `}
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

    path,
    polyline {
      transition: all 300ms ease;
    }
  }

  ${media.greaterThan('large')`
    &:hover {
      span {
        color: ${({ theme }) => theme.colors.orange};
      }

      svg path,
      svg polyline {
        stroke: ${({ theme }) => theme.colors.orange};
      }
    }
  `}

  ${props => props.active && NavMainButtonSearchActive}
`;

export const NavMainButtonSearchActive = css`
  svg path,
  svg polyline {
    stroke: ${({ theme }) => theme.colors.orange};
  }

  span {
    color: ${({ theme }) => theme.colors.orange};
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

  ${media.greaterThan('large')`
    &:hover {
      span {
        color: ${({ theme }) => theme.colors.orange};
      }

      svg path,
      svg polyline {
        stroke: ${({ theme }) => theme.colors.orange};
      }
    }
  `}
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
  transition: all 300ms ease;

  ${media.greaterThan('large')`
    padding-left: 40px;
    font-size: 14px;
    line-height: 20px;
  `}
`;

export const NavSecondary = styled.nav`
  margin-bottom: 30px;

  ${media.greaterThan('large')`
    margin-bottom: 24px;
  `}

  li {
    &:not(:last-child) {
      margin-bottom: 20px;

      ${media.greaterThan('large')`
        margin-bottom: 8px;
      `}
    }
  }
`;

export const NavSecondaryButton = styled.a`
  text-transform: uppercase;
  font: 18px 'Raleway';
  color: ${({ theme }) => theme.colors.green};

  ${media.greaterThan('large')`
    font-size: 14px;
  `}
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

    &:nth-child(2),
    &:nth-child(4) {
      margin: 0 15px;

      ${media.greaterThan('large')`
        margin: 0 5px;
      `}
    }
  }

  ${media.greaterThan('large')`
    margin-bottom: 30px;
    height: 23px;
  `}
`;

export const NavLangsButton = styled.a`
  position: relative;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 120%;
    height: 2px;
    background: ${({ theme }) => theme.colors.green};
    transition: all 300ms ease;
    ${({ theme }) => theme.hide};
  }

  ${props =>
    props.active &&
    css`
      &:after {
        ${({ theme }) => theme.show};
      }
    `}
`;

export const Whatsapp = styled.div`
  margin-bottom: 30px;

  ${media.greaterThan('large')`
    margin-bottom: 19px;
  `}
`;

export const WhatsappButton = styled.a`
  display: flex;
  align-items: center;
  width: 190px;
  font: 19px 'Raleway';
  color: ${({ theme }) => theme.colors.green2};
  font-weight: ${({ theme }) => theme.fontsWeight.semiBold};

  ${media.greaterThan('large')`
    width: 100%;
    font-size: 14px;
    line-height: 16px;
  `}

  svg {
    display: block;
    width: 29px;
    min-width: 29px;
    height: 30px;
    margin-right: 10px;

    ${media.greaterThan('large')`
      width: 16px;
      min-width: 16px;
      height: 17px;
    `}
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

  ${media.greaterThan('large')`
    padding: 0;
    margin-bottom: 15px;
    background: transparent;
    font-size: 0;
    text-align: left;
  `}

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 30px;
    height: 100%;
    background: ${({ theme }) => theme.colors.greyLight};

    ${media.greaterThan('large')`
      display: none;
    `}
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

    ${media.greaterThan('large')`
      font-size: 16px;
    `}
  }
`;

export const Newsletter = styled.div`
  margin-bottom: 20px;

  ${media.greaterThan('large')`
    margin-bottom: 12px;
  `}
`;

export const NewsletterButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  font: 18px 'Raleway';
  color: ${({ theme }) => theme.colors.green};

  ${media.greaterThan('large')`
    font-size: 11px;
    text-align: left;
  `}

  strong {
    display: block;
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.greaterThan('large')`
    display: block;
  `}
`;

export const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.greaterThan('large')`
    justify-content: flex-start;
  `}
`;

export const SocialsButton = styled.button`
  display: block;
  margin: 0 12px;

  ${media.greaterThan('large')`
    margin: 0 8px 0 0;

    &:first-child {
      margin-left: 0;
    }
  `}

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

  ${media.greaterThan('large')`
    font-size: 11px;
  `}
`;
