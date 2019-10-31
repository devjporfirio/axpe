import styled from 'styled-components';
import Breadcrumb from 'components/Breadcrumb';
import Gallery from 'components/Gallery';

export const Header = styled(Breadcrumb)`
  margin-bottom: 20px;
`;

export const Images = styled(Gallery)`
  margin-bottom: 5px;
`;

export const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.greyLight};
  border: 1px solid ${({ theme }) => theme.colors.greyDark};
`;

export const Alert = styled.p`
  max-width: 1000px;
  margin: auto;
  padding: 20px;

  p {
    color: ${({ theme }) => theme.colors.greenDark};
    text-align: center;
    font: 10.6px 'Bitter';
  }
`;

export const Module = styled.div`
  margin-bottom: 30px;
`;
