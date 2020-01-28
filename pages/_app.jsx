import React from 'react'
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';

// layout
import Main from 'layouts/main';

// helpers
// import OneSignalHelper from 'helpers/oneSignal';

// store
import configureStore from 'store';

// actions
import { setLoading } from 'store/modules/loading/actions';
import { setMain } from 'store/modules/main/actions';
import { setUserByCookie } from 'store/modules/user/actions';

import 'isomorphic-unfetch';
import 'promise-polyfill/lib/polyfill';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const config = process.env.config;

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    const main = ctx.store.getState().main.loaded
      ? ctx.store.getState().main
      // : await fetch(`${config.apiUrl}/main`).then(response => response.json());
      : { loaded: true, config, header: {} };

    if (!ctx.store.getState().main.loaded) {
      ctx.store.dispatch(setMain(main));
    }

    return { pageProps, config, main };
  }

  componentDidMount() {
    const { dispatch } = this.props.store;

    Router.events.on('routeChangeStart', () => {
      dispatch(setMain({
        searchFormActive: false,
        headerHiding: false,
        modalLoginRegisterSuccess: false
      }));
      dispatch(setLoading({ active: true }));
    });

    Router.events.on('routeChangeComplete', () => {
      dispatch(setLoading({ active: false }));
    });

    // OneSignalHelper.start();

    dispatch(setLoading({ active: false }));
    dispatch(setUserByCookie());
  }

  render() {
    const { Component, pageProps, store, main } = this.props;

    return (
      <Provider store={store}>
        <Main data={main}>
          <Component {...pageProps} />
        </Main>
      </Provider>
    );
  }
}

export default withRedux(configureStore)(MyApp);