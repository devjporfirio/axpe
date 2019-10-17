import styled, { css } from 'styled-components';
import media from 'styled-media-query';

import Section from 'components/Section';

export const Destaque1 = css`
  height: 372px;
  flex-direction: row-reverse;
`;

export const Destaque2 = css`
  height: 299px;
  flex-direction: row;
`;

export const Destaque3 = css`
  height: 299px;
  flex-direction: row-reverse;
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 1000px;
  margin: auto;
  width: calc(100vw - 40px);

  ${media.greaterThan('769px')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    ${props => props.type === 'destaque-1' && Destaque1}
    ${props => props.type === 'destaque-2' && Destaque2}
    ${props => props.type === 'destaque-3' && Destaque3}
  `};
`;

export const Image1 = css`
  height: 372px;
  max-width: 614px;
`;

export const Image2 = css`
  height: 299px;
  max-width: 560px;
`;

export const Image3 = css`
  height: 299px;
  max-width: 487px;
`;

export const Image = styled.div`
  background: url(${props => props.src}) center no-repeat;
  background-size: cover;
  height: 50vw;
  width: calc(100vw - 40px);
  border-radius: 8px 8px 0 0;

  ${media.greaterThan('769px')`
    width: 100vw;
    border-radius: 0;

    ${props => props.type === 'destaque-1' && Image1}
    ${props => props.type === 'destaque-2' && Image2}
    ${props => props.type === 'destaque-3' && Image3}
  `}
`;

export const Video = styled.iframe`
  height: 50vw;
  width: calc(100vw -  40px);
  border-radius: 8px 8px 0 0;

  ${media.greaterThan('769px')`
    width: 100vw;
    border-radius: 0;

    ${props => props.type === 'destaque-1' && Image1}
    ${props => props.type === 'destaque-2' && Image2}
    ${props => props.type === 'destaque-3' && Image3}
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
    flex-shrink: 0;

    ${props =>
      props.type === 'destaque-1' &&
      css`
        max-width: 319px;
      `}
    ${props =>
      props.type === 'destaque-2' &&
      css`
        max-width: 380px;
      `}
    ${props =>
      props.type === 'destaque-3' &&
      css`
        max-width: 400px;
      `}

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
