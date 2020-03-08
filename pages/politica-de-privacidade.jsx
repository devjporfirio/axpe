import React from 'react';
import Head from 'next/head';

// components
import PrivacyPolicy from 'components/PrivacyPolicy';

// helpers
import SeoData from 'helpers/seo';

function Privacy() {
  return (
    <>
      <Head>
        <title>{`Política de Privacidade - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <PrivacyPolicy />
    </>
  );
}

export default Privacy;
