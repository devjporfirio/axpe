import React from 'react';
import Script from 'next/script';

function BodyScripts() {
  return (
    <>
      <noscript>
        <iframe
          title="google-tag-manager"
          src="https://www.googletagmanager.com/ns.html?id=GTM-PH2WRPFM"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
      <Script
        id="cookieyes"
        strategy="afterInteractive"
        src="https://cdn-cookieyes.com/client_data/fb20d1dbee876f8832b8baa6/script.js"
      />
    </>
  );
}

export default BodyScripts;
