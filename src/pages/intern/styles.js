import styled from 'styled-components';

export const Container = styled.main`
  height: 100vh;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.greyLight};
  border: 1px solid ${({ theme }) => theme.colors.greyDark};
`;
