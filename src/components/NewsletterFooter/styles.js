import styled from 'styled-components';
import media from 'styled-media-query';
import BackgroundDesktop from 'assets/bg-newsletter-bottom-desktop.png';
import BackgroundMobile from 'assets/bg-newsletter-bottom-mobile';

export const NewsletterContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.grey2};
  padding: 60px 20px;
  position: relative;
  margin-top: 10px;
  
  ${media.greaterThan('medium')`
    padding: 42px 41px 0px;
  `}
`;

export const NewsletterTextDesktop = styled.div`
  color: ${({ theme }) => theme.colors.greenDark};
  font-family: 'Bitter';

  h4 {
    font-size: 26px;
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  }

  p {
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    width: 60%;
    margin-top: 6px;
  }

  h4:nth-child(1),
  p:nth-child(2) {
    display: none;
    ${media.greaterThan('medium')`
      display: block;
    `}
  }

  h4:nth-child(3) {
    display: block;
    ${media.greaterThan('medium')`
      display: none;
    `}
  }
`;

export const FormContainer = styled.div`
  margin-top: 24px;

  ${media.greaterThan('768px')`
    display: block;
  `}
`;

export const Iframe = styled.iframe`
  display: block;
  width: 100%;
  ${media.lessThan('768px')`
    min-height: 190px;
  `}
`;

export const Background = styled.div` 
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 550px;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
  background-image: url(${BackgroundMobile});

  ${media.greaterThan('large')`
    background-repeat: repeat;
    background-image: url(${BackgroundDesktop});
  `}
`;