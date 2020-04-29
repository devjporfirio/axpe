import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// layouts
import HeaderStyles from 'layouts/vendors/headerStyles';
import BodyScriptsStart from 'layouts/vendors/bodyScriptsStart';
import BodyScriptsEnd from 'layouts/vendors/bodyScriptsEnd';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

          <meta name='application-name' content='Axpe' />
          <link rel='manifest' href='/manifest.json' />

          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel='shortcut icon' href='/favicon/favicon.ico' />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>

          {/*

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://axpe.com.br' />
          <meta name='twitter:title' content='Axpe' />
          <meta name='twitter:description' content='Axpe Description' />
          <meta name='twitter:image' content='https://axpe.com.br/favicon/android-chrome-192x192.png' />
          <meta name='twitter:creator' content='@DavidWShadow' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='Axpe' />
          <meta property='og:description' content='Axpe Description' />
          <meta property='og:site_name' content='Axpe' />
          <meta property='og:url' content='https://axpe.com.br' />
          <meta property='og:image' content='https://axpe.com.br/favicon/apple-touch-icon.png' /> */}

          <HeaderStyles />
        </Head>
        <body>
          <BodyScriptsStart />
          <Main />
          <BodyScriptsEnd />
          <NextScript />
        </body>
      </Html>
    );
  }
}