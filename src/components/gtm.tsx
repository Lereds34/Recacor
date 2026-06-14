"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  captureUtmParams,
  GTM_ID,
  pushDirectionsClick,
  pushPhoneClick,
  pushWhatsAppClick,
} from "@/lib/tracking";

const GTM_ENABLED = /^GTM-[A-Z0-9]+$/.test(GTM_ID) && GTM_ID !== "GTM-XXXXXXX";

export function GtmConsent() {
  if (!GTM_ENABLED) return null;
  return (
    <Script id="gtm-consent" strategy="beforeInteractive">
      {`
        const c = document.cookie.match(/cookie_consent=([^;]+)/)?.[1];
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          ad_storage: c === 'granted' ? 'granted' : 'denied',
          analytics_storage: c === 'granted' ? 'granted' : 'denied',
          ad_user_data: c === 'granted' ? 'granted' : 'denied',
          ad_personalization: c === 'granted' ? 'granted' : 'denied',
          wait_for_update: 500,
        });
      `}
    </Script>
  );
}

export function GtmHead() {
  if (!GTM_ENABLED) return null;
  return (
    <Script id="gtm-head" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

export function GtmNoscript() {
  if (!GTM_ENABLED) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

export function UtmCapture() {
  useEffect(() => {
    captureUtmParams();

    const trackExternalAction = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.href;
      if (href.startsWith("tel:") && !link.classList.contains("phone-link")) {
        pushPhoneClick("unclassified_link");
      } else if (href.includes("wa.me/")) {
        pushWhatsAppClick();
      } else if (href.includes("maps.google.com/") || href.includes("google.com/maps")) {
        pushDirectionsClick();
      }
    };

    document.addEventListener("click", trackExternalAction);
    return () => document.removeEventListener("click", trackExternalAction);
  }, []);
  return null;
}
