import styled from 'styled-components';
import media from 'styled-media-query';
import Breadcrumb from 'components/Breadcrumb';
import Gallery from 'components/Gallery';
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

export const Header = styled(Breadcrumb)`
  ${media.greaterThan('medium')`
    margin-bottom: 20px;
  `}
`;

export const Images = styled(Gallery)`
  margin-bottom: 5px;
  padding-top: 60px;

  ${media.greaterThan('medium')`
    padding-top: 80px;
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
