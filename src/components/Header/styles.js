import styled from 'styled-components';

export const Container = styled.header`
  width: 200px;
  height: 100vh;
  float: left;

  h1 {
    font-family: 'RalewayLight';
  }

  ${({ theme }) =>
    theme.maxScreen(
      'tablet',
      `
        display: none;
      `
    )};
`;
