import React from 'react';

function BodyScripts() {
  return (
    <>
      <noscript>
        <iframe
          title="google-tag-manager"
          src="https://www.googletagmanager.com/ns.html?id=GTM-5B8BH98"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
      <script
        id="cookieyes"
        type="text/javascript"
        src="https://cdn-cookieyes.com/client_data/fb20d1dbee876f8832b8baa6/script.js"
      ></script>
    </>
  );
}

export default BodyScripts;
