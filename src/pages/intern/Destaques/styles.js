import styled from 'styled-components';
import media from 'styled-media-query';

import Section from 'components/Section';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 1000px;
  margin: auto;

  ${media.greaterThan('769px')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
    height: 372px;
  `};
`;

export const Image = styled.div`
  background: url(${props => props.src}) center no-repeat;
  background-size: cover;
  width: 100vw;
  height: 50vw;

  ${media.greaterThan('769px')`
    height: 372px;
    max-width: 614px;
  `}
`;

export const Video = styled.iframe`
  width: 100vw;
  height: 50vw;

  ${media.greaterThan('769px')`
    height: 372px;
    max-width: 614px;
  `}
`;

export const Text = styled(Section)`
  width: auto;
  padding: 30px;

  h4 {
    font-size: 22px;
  }

  ${media.greaterThan('769px')`
    position: initial;
    margin-left: 0;
    max-width: 319px;
    flex-shrink: 0;

    hr {
      margin: 20px 0 25px;
    }

    h4 {
      font-size: 37px;
    }

    p {
      font-size: 16px;
    }
  `}
`;
