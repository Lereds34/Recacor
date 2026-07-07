/* ───── Tracking utilities ───── */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-K5H57QHQ";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

export function captureUtmParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value && !sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, value);
    }
  });
  if (!sessionStorage.getItem("referrer") && document.referrer) {
    sessionStorage.setItem("referrer", document.referrer);
  }
}

export function getUtmData() {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      gclid: "",
      fbclid: "",
      referrer: "",
      page_source: "",
    };
  }
  return {
    utm_source: sessionStorage.getItem("utm_source") || "direct",
    utm_medium: sessionStorage.getItem("utm_medium") || "",
    utm_campaign: sessionStorage.getItem("utm_campaign") || "",
    utm_content: sessionStorage.getItem("utm_content") || "",
    gclid: sessionStorage.getItem("gclid") || "",
    fbclid: sessionStorage.getItem("fbclid") || "",
    referrer: sessionStorage.getItem("referrer") || "",
    page_source: window.location.pathname,
  };
}

export type ServiceType = "vl" | "pl" | "mecanique";

export function inferServiceType(pathname?: string): ServiceType {
  const path = pathname || (typeof window !== "undefined" ? window.location.pathname : "");
  if (path.includes("pneus-utilitaires-pl") || path.includes("recreusage")) return "pl";
  if (
    path.includes("mecanique") ||
    path.includes("vidange") ||
    path.includes("parallelisme") ||
    path.includes("clim")
  ) {
    return "mecanique";
  }
  return "vl";
}

export function pushFormStart(serviceType: ServiceType) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "form_start_devis", service_type: serviceType });
}

function dispatchGtagEvent(name: string, params: Record<string, string>) {
  return new Promise<void>((resolve) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      resolve();
      return;
    }

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    window.gtag("event", name, {
      ...params,
      event_callback: done,
      event_timeout: 800,
    });

    window.setTimeout(done, 850);
  });
}

export async function pushFormSubmit(
  serviceType: ServiceType,
  formId: string,
  trackingId: string,
  acceptedBy: string[],
) {
  if (typeof window === "undefined") return;
  const utm = getUtmData();
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submit_devis",
    service_type: serviceType,
    form_id: formId,
    lead_id: trackingId,
    transaction_id: trackingId,
    accepted_by: acceptedBy.join(","),
    ...utm,
  });

  const eventParams = {
    service_type: serviceType,
    form_id: formId,
    lead_id: trackingId,
    transaction_id: trackingId,
    accepted_by: acceptedBy.join(","),
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_content: utm.utm_content,
    gclid: utm.gclid,
    fbclid: utm.fbclid,
    page_source: utm.page_source,
  };

  await Promise.allSettled([
    dispatchGtagEvent("formulaire_soumis", eventParams),
    dispatchGtagEvent("generate_lead", eventParams),
  ]);
}

export function pushPhoneClick(location: string, serviceType?: ServiceType) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "phone_click",
    phone_location: location,
    service_type: serviceType || inferServiceType(),
    page_url: window.location.pathname,
  });
}

export function pushWhatsAppClick(serviceType?: ServiceType) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    service_type: serviceType || inferServiceType(),
    page_url: window.location.pathname,
  });
}

export function pushDirectionsClick(serviceType?: ServiceType) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "directions_click",
    service_type: serviceType || inferServiceType(),
    page_url: window.location.pathname,
  });
}

/* Consent Mode v2 */
function updateConsent(status: "granted" | "denied") {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args) {
      window.dataLayer.push(args);
    };
  window.gtag("consent", "update", {
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
    analytics_storage: status,
  });
}

export function grantConsent() {
  if (typeof window === "undefined") return;
  document.cookie = "cookie_consent=granted; max-age=33696000; path=/; SameSite=Lax";
  updateConsent("granted");
}

export function denyConsent() {
  if (typeof window === "undefined") return;
  document.cookie = "cookie_consent=denied; max-age=33696000; path=/; SameSite=Lax";
  updateConsent("denied");
}

export function hasConsent(): "granted" | "denied" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)cookie_consent=([^;]+)/);
  if (!match) return null;
  return match[1] === "granted" ? "granted" : "denied";
}

export const PHONE_NUMBER = "+33499533390";
export const PHONE_DISPLAY = "04 99 53 33 90";
export const PHONE_MOBILE = "+33687601575";
export const PHONE_MOBILE_DISPLAY = "06 87 60 15 75";
export const ADDRESS = "1240 Route de Nîmes, 34920 Le Crès";
export const BUSINESS_NAME = "Recacor Montpellier — Le Crès";
