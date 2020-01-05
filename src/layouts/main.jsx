import React from 'react';
import { ThemeProvider } from 'styled-components';

// components
import Loading from 'components/Loading';
import Header from 'components/Header';
import Search from 'components/Search';
import NewsletterModal from 'components/Modals/Newsletter';
import NewsletterSuccessModal from 'components/Modals/NewsletterSuccess';
import LoginModal from 'components/Modals/Login';
import LoginRegisterSuccessModal from 'components/Modals/LoginRegisterSuccess';
import RegisterSuccessModal from 'components/Modals/RegisterSuccess';

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
        <LoginRegisterSuccessModal />
        <RegisterSuccessModal />
      </>
    </ThemeProvider>
  );
}

export default Main;
