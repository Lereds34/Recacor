import { getAllSettings } from "./db";
import { withDefaults } from "./settings-schema";

export interface SiteConfig {
  phoneNumber: string;
  phoneDisplay: string;
  email: string;
  addressStreet: string;
  addressCity: string;
  addressZip: string;
  addressCountry: string;
  addressFull: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  hoursSunday: string;
  gtmId: string;
  ga4Id: string;
  metaPixelId: string;
  tiktokPixelId: string;
  snapPixelId: string;
  googlePlaceId: string;
  googleReviewUrl: string;
  googleMapsEmbedUrl: string;
  googleRatingFallback: string;
  leadsEmailTo: string;
  leadsWebhookUrl: string;
  socialFacebook: string;
  socialInstagram: string;
  socialTiktok: string;
  socialYoutube: string;
  siteUrl: string;
  siteTitle: string;
  siteDescription: string;
}

let cache: { data: SiteConfig; ts: number } | null = null;
const TTL = 60_000; // 60s

export async function getSiteConfig(): Promise<SiteConfig> {
  if (cache && Date.now() - cache.ts < TTL) return cache.data;

  const stored = await getAllSettings();
  const s = withDefaults(stored);

  const data: SiteConfig = {
    phoneNumber: s.phone_number,
    phoneDisplay: s.phone_display,
    email: s.email,
    addressStreet: s.address_street,
    addressCity: s.address_city,
    addressZip: s.address_zip,
    addressCountry: s.address_country,
    addressFull: `${s.address_street}, ${s.address_zip} ${s.address_city}`,
    hoursWeekdays: s.hours_weekdays,
    hoursSaturday: s.hours_saturday,
    hoursSunday: s.hours_sunday,
    gtmId: s.gtm_id,
    ga4Id: s.ga4_id,
    metaPixelId: s.meta_pixel_id,
    tiktokPixelId: s.tiktok_pixel_id,
    snapPixelId: s.snap_pixel_id,
    googlePlaceId: s.google_place_id,
    googleReviewUrl: s.google_review_url,
    googleMapsEmbedUrl: s.google_maps_embed_url,
    googleRatingFallback: s.google_rating_fallback,
    leadsEmailTo: s.leads_email_to,
    leadsWebhookUrl: s.leads_webhook_url,
    socialFacebook: s.social_facebook,
    socialInstagram: s.social_instagram,
    socialTiktok: s.social_tiktok,
    socialYoutube: s.social_youtube,
    siteUrl: s.site_url,
    siteTitle: s.site_title,
    siteDescription: s.site_description,
  };

  cache = { data, ts: Date.now() };
  return data;
}

export function invalidateConfigCache() {
  cache = null;
}
