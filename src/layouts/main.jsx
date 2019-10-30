import React from 'react';
import { ThemeProvider } from 'styled-components';

// components
import Header from 'components/Header';

// styles
import GlobalStyle from './globalStyle';
import ThemeStyle from './themeStyle';

function Main({ children }) {
  return (
    <ThemeProvider theme={ThemeStyle}>
      <>
        <GlobalStyle />
        <Header />
        {children}
      </>
    </ThemeProvider>
  );
}

export default Main;
