import styled from 'styled-components';
import media from 'styled-media-query';
import Section from 'components/Section';

export const Container = styled.div`
  max-width: 1000px;
  margin: auto;

  ${media.greaterThan('medium')`
    display: flex;
  `}
`;

export const Mapa = styled.div`
  width: 100vw;
  height: 182px;
  background-color: #143643;

  iframe {
    width: 100%;
    height: 100%;

    .directions-card {
      display: none;
    }
  }

  ${media.greaterThan('medium')`
    max-width: 572px;
    height: 426px;
  `}
`;

export const Pin = styled.img`
  display: ${props => (props.mq === 'desktop' ? 'none' : 'block')};
  width: 28px;
  margin: -20px 0 0 30px;

  ${media.greaterThan('medium')`
    display: ${props => (props.mq === 'mobile' ? 'none' : 'block')};
    margin: 0 -80px 0 0;
    z-index: 5;
  `}
`;

export const Text = styled(Section)`
  position: initial;
  width: auto;
  margin-top: -20px;
  padding: 20px;

  ${media.greaterThan('medium')`
    padding: 60px 0 0 60px;
    width: 70%;
    margin: -1px 0 0 0;
    height: 428px;

    p {
      margin-top: 120px;
    }
  `}

  p {
    font-family: 'Raleway';
    font-weight: ${({ theme }) => theme.fontsWeight.semiBold};
    width: 240px;
  }
`;
