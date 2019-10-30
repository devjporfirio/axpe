import React from 'react';
import { ThemeProvider } from 'styled-components';

// components
import Header from 'components/Header';

// styles
import GlobalStyle from './globalStyle';
import ThemeStyle from './themeStyle';
import { Container } from './styles';

function Main({ children }) {
  return (
    <ThemeProvider theme={ThemeStyle}>
      <>
        <GlobalStyle />
        <Header />
        <Container>
          {children}
        </Container>
      </>
    </ThemeProvider>
  );
}

export default Main;
