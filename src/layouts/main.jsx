import React from 'react';
import { ThemeProvider } from 'styled-components';

// components
import Loading from 'components/Loading';
import Header from 'components/Header';
import Search from 'components/Search';

// styles
import GlobalStyle from './globalStyle';
import noUiSliderCSS from './vendors/noUiSlider';
import ThemeStyle from './themeStyle';
import { Wrapper } from './styles';

function Main({ children }) {
  return (
    <ThemeProvider theme={ThemeStyle}>
      <>
        <GlobalStyle vendorsStyle={[ noUiSliderCSS ]} />
        <Loading />
        <Header />
        <Search />
        <Wrapper>
          {children}
        </Wrapper>
      </>
    </ThemeProvider>
  );
}

export default Main;
