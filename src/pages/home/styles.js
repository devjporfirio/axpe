import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.main`
  height: 100vh;
  overflow-y: scroll;
`;

export const Banner = styled.img`
  cursor: pointer;
  ${props =>
    props.mq === 'mobile' &&
    media.greaterThan('769px')`
    display: none !important;
  `}

  ${props =>
    props.mq === 'desktop' &&
    media.lessThan('medium')`
    display: none !important;
  `}
`;

export const Contact = styled.div`
  background-color: ${({ theme }) => theme.colors.greyLight};
  text-align: center;
  padding: 18px;

  ${media.greaterThan('769px')`
    display: none;
  `}

  p {
    color: ${({ theme }) => theme.colors.greenDark};

    &:nth-child(1){
      font: 18px/16px 'BitterRegular';
    }

    &:nth-child(2){
      font: 20px/25px 'RalewayBold';
    }

    &:nth-child(3){
      font: 12px/12px 'RalewayMedium';
    }
  }
`;
