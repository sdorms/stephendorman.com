'use client'

import Script from 'next/script'

export default function GoogleConsentMode() {
  return (
    <Script id="google-consent-mode" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}

        gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          functionality_storage: 'granted',
          security_storage: 'granted'
        });
      `}
    </Script>
  )
}
