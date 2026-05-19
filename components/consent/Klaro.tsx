'use client'

import { useEffect } from 'react'
import * as klaro from 'klaro'
import 'klaro/dist/klaro.css'
import '@/css/klaro.css'

export default function KlaroConsent() {
  useEffect(() => {
    klaro.setup({
      version: 1,
      elementID: 'klaro',
      storageMethod: 'localStorage',
      storageName: 'klaro-consent',
      htmlTexts: true,
      embedded: false,
      groupByPurpose: true,
      cookieName: 'klaro',
      cookieExpiresAfterDays: 365,
      default: false,
      mustConsent: true,
      acceptAll: false,
      hideDeclineAll: false,

      translations: {
        en: {
          consentModal: {
            title: 'Consent preferences',
            description:
              'We use analytics to understand how people use the site and improve the experience. You can choose whether to enable analytics cookies.',
          },
        },
        acceptSelected: 'Accept selected',
        decline: 'Decline',
      },

      services: [
        {
          name: 'google-analytics',
          title: 'Google Analytics',
          purposes: ['Analytics'],
          cookies: [/^_ga/, /^_gid/],
          required: false,
          optOut: false,
          onlyOnce: true,

          callback: function (consent) {
            window.gtag?.('consent', 'update', {
              analytics_storage: consent ? 'granted' : 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
            })
          },
        },
      ],
    })
  }, [])

  return <div id="klaro" />
}
