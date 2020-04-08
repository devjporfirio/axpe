import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';

// helpers
import OneSignalHelper from 'helpers/oneSignal';

// actions
import { setLoading } from 'store/modules/loading/actions';
import { setMain } from 'store/modules/main/actions';
import { setUserByCookie } from 'store/modules/user/actions';

// components
import Loading from 'components/Loading';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Search from 'components/Search';
import NewsletterModal from 'components/Modals/Newsletter';
import NewsletterSuccessModal from 'components/Modals/NewsletterSuccess';
import LoginModal from 'components/Modals/Login';
import LoginRegisterSuccessModal from 'components/Modals/LoginRegisterSuccess';
import RegisterSuccessModal from 'components/Modals/RegisterSuccess';
import ForgotPasswordSuccess from 'components/Modals/ForgotPasswordSuccess';
import ContactSuccessModal from 'components/Modals/ContactSuccess';
import ContactModal from 'components/Modals/Contact';
import ContactBar from 'components/ContactBar';

// styles
import GlobalStyle from './globalStyle';
import noUiSliderCSS from './vendors/noUiSlider';
import ThemeStyle from './themeStyle';
import {
  Wrapper
} from './styles';

function Main({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    Router.events.on('routeChangeStart', (a) => {
      dispatch(setMain({
        searchFormActive: false,
        headerHiding: false,
        modalLoginRegisterSuccess: false
      }));
      dispatch(setLoading({ active: true }));
    });

    Router.events.on('routeChangeComplete', () => {
      dispatch(setLoading({ active: false }));
      if(window) {
        window.scrollTo(0, 0);
      }
    });

    OneSignalHelper.start();

    dispatch(setLoading({ active: false }));
    dispatch(setUserByCookie());
  }, []);

  return (
    <ThemeProvider theme={ThemeStyle}>
      <>
        <GlobalStyle vendorsStyle={[ noUiSliderCSS ]} />
        <Loading />
        <Header />
        <Search />
        <Wrapper>
          {children}
          <Footer />
        </Wrapper>
        <NewsletterModal />
        <NewsletterSuccessModal />
        <LoginModal />
        <LoginRegisterSuccessModal />
        <RegisterSuccessModal />
        <ForgotPasswordSuccess />
        <ContactSuccessModal />
        <ContactModal />
        <ContactBar />
        <div className="onesignal-customlink-container" style={{ display: 'none' }}></div>
      </>
    </ThemeProvider>
  );
}

export default Main;
