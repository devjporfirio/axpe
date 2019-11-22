import React from 'react';
import { ThemeProvider } from 'styled-components';

// components
import Loading from 'components/Loading';
import Header from 'components/Header';
import Search from 'components/Search';
import NewsletterModal from 'components/Modals/Newsletter';
import NewsletterSuccessModal from 'components/Modals/NewsletterSuccess';
import LoginModal from 'components/Modals/Login';
import LoginSuccessModal from 'components/Modals/LoginSuccess';

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
        <NewsletterModal />
        <NewsletterSuccessModal />
        <LoginModal />
        <LoginSuccessModal />
      </>
    </ThemeProvider>
  );
}

export default Main;
