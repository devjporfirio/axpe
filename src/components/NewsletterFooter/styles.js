import styled from 'styled-components';
import media from 'styled-media-query';

export const NewsletterContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.grey2};
  padding: 60px 20px;
  position: relative;
  margin-top: 10px;
  min-height: 250px;
  
  ${media.greaterThan('medium')`
    padding: 42px 41px 0px;
  `}
`;

export const NewsletterTextDesktop = styled.div`
  color: ${({ theme }) => theme.colors.greenDark};
  font-family: 'Bitter';
  z-index: 10;

  h4 {
    font-size: 26px;
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
  }

  p {
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontsWeight.medium};
    width: 70%;
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
  min-height: 190px;

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
  background-image: url('/static/bg-newsletter-bottom-mobile.svg');

  ${media.greaterThan('large')`
    background-repeat: repeat;
    background-image: url('/static/bg-newsletter-bottom-desktop.png');
  `}
`;