import React from 'react'
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import Router from 'next/router';
import Main from 'layouts/main';

// store
import configureStore from 'store';

// actions
import { setLoading } from 'store/modules/loading/actions';
import { setMain } from 'store/modules/main/actions';

import 'isomorphic-unfetch';
// import 'babel-polyfill';
// import 'promise-polyfill/src/polyfill';

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
    Router.onRouteChangeStart = () => {
      this.props.store.dispatch(setLoading(true));
    };

    Router.onRouteChangeComplete = () => {
      this.props.store.dispatch(setLoading(false));
    };
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