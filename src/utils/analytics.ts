// src/utils/analytics.ts
// Charge Google Analytics (GA4) uniquement si l'utilisateur a donné son consentement.
// L'ID de mesure vient d'une variable d'environnement (voir .env.example),
// pour ne jamais coder l'ID en dur dans le code source.

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

let gaLoaded = false

export function loadGoogleAnalytics(): void {
  if (gaLoaded) return
  if (!GA_MEASUREMENT_ID) {
    console.warn(
      '[analytics] VITE_GA_MEASUREMENT_ID non défini : Google Analytics ne sera pas chargé.',
    )
    return
  }

  // Script officiel gtag.js
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  // anonymize_ip garde une couche de respect de la vie privée même avec consentement
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true })

  gaLoaded = true
}

export function isGoogleAnalyticsLoaded(): boolean {
  return gaLoaded
}
