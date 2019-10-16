import styled, { css } from 'styled-components';
import media from 'styled-media-query';

const SectionSlickLeftMobile = css`
  position: initial;
  width: 70%;
  margin: auto;
  padding: 20px 0;

  h4 {
    font-size: 22px;
  }

  hr {
    margin: 20px 0;
  }

  button {
    width: 100%;
  }
`;

export const Container = styled.section`
  z-index: 4;
  top: 80px;
  position: absolute;
  width: 245px;
  margin-left: 20px;
  background-color: ${props =>
    props.type !== 'slick' && props.theme.colors.white};

  h4 {
    color: ${props =>
      props.type === 'slick'
        ? props.theme.colors.white
        : props.theme.colors.greenDark};
    font: 41px 'BitterRegular';
  }

  hr {
    width: 50px;
    border: 2px solid ${({ theme }) => theme.colors.orange};
    margin: 40px 0 25px;
  }

  p {
    color: ${props =>
      props.type === 'slick'
        ? props.theme.colors.white
        : props.theme.colors.greenDark};
    
  }

  ${media.lessThan('medium')`
  ${props => props.type !== 'slick' && SectionSlickLeftMobile}

  ${props =>
    [ 'slickLarge', 'slickSmall' ].includes(props.type) &&
    `
    width: 86%;
    padding: 20px 8%;
  `}
  
`};

  ${props =>
    props.type === 'slickSmall' &&
    media.greaterThan('769px')`
    ${SectionSlickLeftMobile}
    margin-left: 20px !important;
    padding: 20px 8%;
    
    p {
      font-size: 16px;
    }

    button {
      display: none;
    }
  `}

  ${media.greaterThan('769px')`
  margin-left: 120px;

  ${props =>
    props.type === 'slickLeft' &&
    `
      position: absolute;
      top: 0;
      padding: 100px 30px;
      margin: 0;
      background-color: #fff;
      width: 320px;
      height: 100%;
  `}

  ${props => props.type === 'slickGrid' && `margin-left: 14%;`}
  ${props =>
    props.type === 'slickLarge' &&
    `
    position: unset;
    margin-top: -302px;
    margin-left: 59%;
    padding: 25px 4% 0 4%;
    height: 238px;
    width: 32%;

    h4 {
      font-size: 22px; 
      margin-bottom: 15px;
    }
  `}
`};
`;

export const Local = styled.p`
  text-transform: uppercase;
  font: 18px/25px 'RalewaySemiBold';
`;

export const Infos = styled.p`
  font: 18px/25px 'RalewayRegular';
`;