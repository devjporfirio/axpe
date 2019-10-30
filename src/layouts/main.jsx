import React from 'react';
import { ThemeProvider } from 'styled-components';

// components
import Header from 'components/Header';

// styles
import GlobalStyle from './globalStyle';
import ThemeStyle from './themeStyle';
import { Wrapper } from './styles';

function Main({ children }) {
  return (
    <ThemeProvider theme={ThemeStyle}>
      <>
        <GlobalStyle />
        <Header />
        <Wrapper>
          {children}
        </Wrapper>
      </>
    </ThemeProvider>
  );
}

export default Main;
