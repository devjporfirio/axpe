import styled, { css } from 'styled-components';
import media from 'styled-media-query';

import Section from 'components/Section';

export const Destaque1 = css`
  height: 372px;
  flex-direction: row-reverse;

  section {
    height: 372px;
    max-width: 387px;
  }
`;

export const Destaque2 = css`
  height: 299px;
  flex-direction: row;
`;

export const Destaque3 = css`
  height: 299px;
  flex-direction: row-reverse;
`;

export const ImagemDestaque = css`
  width: 100vw;

  ${media.greaterThan('medium')`
    height: 454px;
  `}
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 1000px;
  margin: auto;
  width: calc(100vw - 40px);

  ${media.greaterThan('medium')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    section {
      padding: 30px 36px;
      height: 299px;
      width: 100%;
      max-width: 512px;
    }

    ${props => props.type === 'destaque-1' && Destaque1}
    ${props => props.type === 'destaque-2' && Destaque2}
    ${props => props.type === 'destaque-3' && Destaque3}
  `};

  ${props => props.type === 'imagem-destaque' && ImagemDestaque}
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

export const ImageImagemDestaque = css`
  height: 454px;
  width: 100%;
  border-radius: 0;

  ${media.greaterThan('medium')`
    max-width: 616px;
    height: 454px;
  `}
`;

export const Image = styled.img`
  height: 50vw;
  width: calc(100vw - 40px);
  border-radius: 8px 8px 0 0;

  ${media.greaterThan('medium')`
    width: 100vw;
    border-radius: 0;

    ${props => props.type === 'destaque-1' && Image1}
    ${props => props.type === 'destaque-2' && Image2}
    ${props => props.type === 'destaque-3' && Image3}
  `}
  ${props => props.type === 'imagem-destaque' && ImageImagemDestaque}
`;

export const Video = styled.iframe`
  height: 50vw;
  width: calc(100vw - 40px);
  border-radius: 8px 8px 0 0;

  ${media.greaterThan('medium')`
    width: 100vw;
    border-radius: 0;

    ${props => props.type === 'destaque-1' && Image1}
    ${props => props.type === 'destaque-2' && Image2}
    ${props => props.type === 'destaque-3' && Image3}
  `}
  ${props => props.type === 'imagem-destaque' && ImageImagemDestaque}
`;

const SectionImagemDestaque = css`
  max-width: 320px;

  ${media.greaterThan('medium')`
    h4 {
      font-size: 22px !important;
    }
    p {
      font-size: 16px !important;
    }
  `}
`;

export const Text = styled(Section)`
  width: auto;
  padding: 30px;

  h4 {
    font-size: 22px;
  }

  ${media.greaterThan('medium')`
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

    ${props => props.type === 'imagem-destaque' && SectionImagemDestaque}
    
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
