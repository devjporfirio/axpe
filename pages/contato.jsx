import React from 'react';
import Head from 'next/head';

// components
import FormContact from 'components/FormContact';

// helpers
import SeoData from 'helpers/seo';

function Contact() {
  return (
    <>
      <Head>
        <title>{`Fale com a gente - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <FormContact />
    </>
  );
}

export default Contact;
