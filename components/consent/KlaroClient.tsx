// components/consent/KlaroClient.tsx
'use client'

import dynamic from 'next/dynamic'

const KlaroConsent = dynamic(() => import('./Klaro'), {
  ssr: false,
})

export default function KlaroClient() {
  return <KlaroConsent />
}
