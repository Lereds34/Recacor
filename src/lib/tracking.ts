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
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void;
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

type ServiceType = "vl" | "pl" | "mecanique";

export function pushFormStart(serviceType: ServiceType) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "form_start_devis", service_type: serviceType });
}

export function pushFormSubmit(serviceType: ServiceType, formId: string) {
  if (typeof window === "undefined") return;
  const utm = getUtmData();
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submit_devis",
    service_type: serviceType,
    form_id: formId,
    ...utm,
  });
  sessionStorage.setItem("last_form_type", serviceType);
}

export function pushPhoneClick(location: string, serviceType: ServiceType = "vl") {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "phone_click",
    phone_location: location,
    service_type: serviceType,
    page_url: window.location.pathname,
  });
}

export function pushDevisConfirmed() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "devis_confirmed",
    service_type: sessionStorage.getItem("last_form_type") || "vl",
  });
}

/* Consent Mode v2 */
export function grantConsent() {
  if (typeof window === "undefined") return;
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  document.cookie = "cookie_consent=granted; max-age=33696000; path=/; SameSite=Lax";
}

export function denyConsent() {
  if (typeof window === "undefined") return;
  document.cookie = "cookie_consent=denied; max-age=33696000; path=/; SameSite=Lax";
}

export function hasConsent(): "granted" | "denied" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)cookie_consent=([^;]+)/);
  if (!match) return null;
  return match[1] === "granted" ? "granted" : "denied";
}

export const PHONE_NUMBER = "+33499533390";
export const PHONE_DISPLAY = "04 99 53 33 90";
export const PHONE_MOBILE = "+33607621043";
export const PHONE_MOBILE_DISPLAY = "06 07 62 10 43";
export const ADDRESS = "1240 Route de Nîmes, 34920 Le Crès";
export const BUSINESS_NAME = "Recacor Montpellier — Le Crès";
