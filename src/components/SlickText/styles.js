import styled from 'styled-components';
import media from 'styled-media-query';
import Slider from 'components/Slider';

export const Container = styled(Slider)`
  max-width: 1000px;
  margin: auto;

  img,
  iframe {
    width: 100vw;
    height: 376px;

    ${media.greaterThan('769px')`
      max-width: 1000px;
      height: 385px;
    `}
  }
`;

export const Title = styled.h1`
  font: 22px/28px 'BitterRegular';
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 20px;

  ${media.greaterThan('769px')`
    font: 20px/25px 'BitterRegular';
    margin-right: 60px;
  `}
`;

export const Text = styled.p`
  font: 18px/25px 'RalewayRegular';
  color: ${({ theme }) => theme.colors.white};

  ${media.greaterThan('769px')`
    font: 16px/23px 'RalewayRegular';
  `}
`;

export const GroupText = styled.div`
  background-color: ${({ theme }) => theme.colors.greenDark};
  padding: 20px 30px;

  ${media.greaterThan('769px')`
    display: flex;
  `}
`;
