import React from 'react'
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

// helpers
import CookieUtmParams from 'helpers/cookieUtmParams';

// layout
import Main from 'layouts/main';

// store
import configureStore from 'store';

import 'isomorphic-unfetch';
import 'promise-polyfill/lib/polyfill';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class MyApp extends App {

  componentDidMount() {
    CookieUtmParams.set(location.search);
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Main>
          <Component {...pageProps} />
        </Main>
      </Provider>
    );
  }
}

export default withRedux(configureStore)(MyApp);