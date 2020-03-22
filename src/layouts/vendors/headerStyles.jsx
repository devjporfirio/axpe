import React from 'react'

function HeaderStyles() {
  const { googleClientId, googleApiKey } = process.env.config;

  return (
    <>
      <meta name="google-signin-client_id" content={googleClientId} />
      <link href="https://fonts.googleapis.com/css?family=Bitter:400,400i,700|Raleway:300,400,500,600,700,800,900&display=swap" rel="stylesheet"></link>
      <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
      <script>var OneSignal = OneSignal || [];</script>
      <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=geometry`}></script>
    </>
  )
}

export default HeaderStyles;
