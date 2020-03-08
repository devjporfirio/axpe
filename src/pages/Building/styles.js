import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// components
import Gallery from './Gallery';

export const Images = styled(Gallery)`
  margin-bottom: 2px;

  ${media.greaterThan('medium')`
    padding-top: 20px;
  `}
`;

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.greyLight};
`;

export const Alert = styled.div`
  max-width: 974px;
  margin: auto;
  padding: 20px;

  p {
    color: ${({ theme }) => theme.colors.greenDark};
    text-align: center;
    font: 10.62px 'Bitter';
  }
`;

export const Module = styled.div`
  margin-bottom: 30px;

  ${props => props.type === 'plantas' && css`
    ${media.greaterThan('medium')`
      margin-bottom: 60px;
    `}
  `}
`;
