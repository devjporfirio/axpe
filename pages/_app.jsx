import React, { useEffect } from 'react'

// helpers
import CookieUtmParams from 'helpers/cookieUtmParams';

// layout
import Main from 'layouts/main';

// store
import { wrapper } from '../src/store';

import 'isomorphic-unfetch';
import 'promise-polyfill/lib/polyfill';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      CookieUtmParams.set(window.location.search);
    }
  }, []);

  return (
    <Main>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <Component {...pageProps} />
    </Main>
  );
}

export default wrapper.withRedux(MyApp);