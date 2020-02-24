import styled, { css } from 'styled-components';
import media from 'styled-media-query';

// components
import Gallery from './Gallery';
import PanelBuildings from 'components/PanelBuildings';

export const PanelSimilar = styled(PanelBuildings)`
  width: 100%;
  margin: 0 auto;

  ${media.greaterThan('1024px')`
    width: 100%;
    max-width: 954px;
    padding-left: 0;
    padding-right: 0;
  `}

  header {
    max-width: 100%;

    h4 {
      max-width: 100%;
      width: 100%;

      ${media.greaterThan('1024px')`
        text-align: left;
      `}
    }
  }
`;

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
  max-width: 1000px;
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
