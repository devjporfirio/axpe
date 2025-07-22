import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// layouts
import HeaderStyles from 'layouts/vendors/headerStyles';
import BodyScriptsStart from 'layouts/vendors/bodyScriptsStart';
import BodyScriptsEnd from 'layouts/vendors/bodyScriptsEnd';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    // SEO Metadata
    const metaData =
    this.props.__NEXT_DATA__?.props?.pageProps?.meta ?? null;
    const metaTitle = metaData?.title ?? null;
    const metaDescription = metaData?.description ?? null;
    const metaImage = metaData?.image ?? null;

    return (
      <Html lang="pt-br" dir="ltr">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

          <meta name="application-name" content="Axpe" />
          <link rel="manifest" href="/manifest.json" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,700;1,400&family=Raleway:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>

          {metaTitle && (
            <>
              <title>{metaTitle}</title>
              <meta property="og:title" content={metaTitle} />
            </>
          )}

          {metaDescription && (
            <>
              <meta name="description" content={metaDescription} />
              <meta property="og:description" content={metaDescription} />
            </>
          )}

          {metaImage && <meta property="og:image" content={metaImage} />}

          {metaTitle && metaDescription && (
            <>
              <meta property="og:type" content="website" />
              <meta property="og:site_name" content="Axpe" />
            </>
          )}

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'WebSite',
                name: 'AXPE',
                url: 'https://www.axpe.com.br/',
              }),
            }}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'LocalBusiness',
                name: 'AXPE',
                image: 'https://www.axpe.com.br/logo.png',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress:
                    'Av. Nove de Julho, 5017 - 10 andar - Jardim Paulista',
                  addressLocality: 'São Paulo',
                  addressRegion: 'SP',
                  postalCode: '01407-200',
                  addressCountry: 'BR',
                },
                telephone: '+55 11 3074-3600',
                url: 'https://www.axpe.com.br/',
                sameAs: [
                  'https://www.facebook.com/axpe.imoveis',
                  'https://www.linkedin.com/company/axpe-imoveis',
                  'https://www.instagram.com/axpe_imoveis/',
                ],
              }),
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PH2WRPFM');`,
            }}
          />

          <HeaderStyles />
        </Head>
        <body>
        <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PH2WRPFM"
              height="0"
              width="0"
              title='Google Tag Manager'
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>

          <BodyScriptsStart />
          <Main />
          <BodyScriptsEnd />
          <NextScript />
        </body>
      </Html>
    );
  }
}
