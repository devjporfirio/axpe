import styled from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border: 1px solid ${({ theme }) => theme.colors.greyDark};
`;

export const Alert = styled.p`
  max-width: 970px;
  margin: auto;
  text-align: center;
  font: 10.6px 'Bitter';
  color: ${({ theme }) => theme.colors.greenDark};
  padding: 15px;
`;
