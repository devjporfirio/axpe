import React from 'react';
import { ThemeProvider } from 'styled-components';

// components
import Header from 'components/Header';
import Loading from 'components/Loading';

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
        <Loading />
        <Wrapper>
          {children}
        </Wrapper>
      </>
    </ThemeProvider>
  );
}

export default Main;
