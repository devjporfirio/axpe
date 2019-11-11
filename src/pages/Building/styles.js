import styled from 'styled-components';
import media from 'styled-media-query';

// components
import Gallery from './Gallery';
import PanelBuildings from 'components/PanelBuildings';

export const PanelSimilar = styled(PanelBuildings)`
  header {
    max-width: 1000px;

    h4 {
      width: 100%;
      max-width: 1000px;
    }
  }
`;

export const Images = styled(Gallery)`
  margin-bottom: 5px;

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
`;
