/* ─────── Schema des settings exposés dans l'admin ─────── */

export interface SettingField {
  key: string;
  label: string;
  type: "text" | "textarea" | "tel" | "email" | "url";
  defaultValue: string;
  placeholder?: string;
  help?: string;
}

export interface SettingsGroup {
  id: string;
  title: string;
  description?: string;
  fields: SettingField[];
}

export const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    id: "contact",
    title: "Coordonnées",
    description: "Informations affichées sur tout le site (header, footer, contact, schema.org).",
    fields: [
      { key: "phone_number", label: "Téléphone (tel:)", type: "tel", defaultValue: "+33499533390", placeholder: "+33499533390" },
      { key: "phone_display", label: "Téléphone (affiché)", type: "text", defaultValue: "04 99 53 33 90" },
      { key: "email", label: "Email contact", type: "email", defaultValue: "contact@recacor.fr" },
      { key: "address_street", label: "Adresse", type: "text", defaultValue: "1240 Route de Nîmes" },
      { key: "address_city", label: "Ville", type: "text", defaultValue: "Le Crès" },
      { key: "address_zip", label: "Code postal", type: "text", defaultValue: "34920" },
      { key: "address_country", label: "Pays (ISO)", type: "text", defaultValue: "FR" },
    ],
  },
  {
    id: "horaires",
    title: "Horaires",
    description: "Affichés sur le site et utilisés pour le badge dynamique 'Ouvert maintenant'.",
    fields: [
      { key: "hours_weekdays", label: "Lundi à vendredi", type: "text", defaultValue: "8h-17h" },
      { key: "hours_saturday", label: "Samedi", type: "text", defaultValue: "8h-12h" },
      { key: "hours_sunday", label: "Dimanche", type: "text", defaultValue: "Fermé" },
    ],
  },
  {
    id: "tracking",
    title: "Tracking & Marketing",
    description: "IDs des outils de tracking. Les pixels ne se déclenchent qu'après acceptation des cookies.",
    fields: [
      { key: "gtm_id", label: "Google Tag Manager ID", type: "text", defaultValue: "GTM-XXXXXXX", help: "Format: GTM-XXXXXXX" },
      { key: "ga4_id", label: "Google Analytics 4", type: "text", defaultValue: "", help: "Format: G-XXXXXXX (optionnel, peut être déclenché via GTM)" },
      { key: "meta_pixel_id", label: "Meta Pixel ID", type: "text", defaultValue: "" },
      { key: "tiktok_pixel_id", label: "TikTok Pixel ID", type: "text", defaultValue: "" },
      { key: "snap_pixel_id", label: "Snapchat Pixel ID", type: "text", defaultValue: "" },
    ],
  },
  {
    id: "google_business",
    title: "Google Business",
    description: "Pour l'affichage des avis Google et le bouton 'Laisser un avis'.",
    fields: [
      { key: "google_place_id", label: "Place ID", type: "text", defaultValue: "", help: "À récupérer sur https://developers.google.com/maps/documentation/places/web-service/place-id" },
      { key: "google_review_url", label: "URL 'Laisser un avis'", type: "url", defaultValue: "https://g.page/r/CQgYeWa3dlAPEAE/review" },
      { key: "google_maps_embed_url", label: "URL embed Google Maps", type: "url", defaultValue: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5!2d3.9!3d43.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLe+Cr%C3%A8s!5e0!3m2!1sfr!2sfr!4v1" },
      { key: "google_rating_fallback", label: "Note Google (fallback statique)", type: "text", defaultValue: "5,0" },
    ],
  },
  {
    id: "leads",
    title: "Réception des leads",
    description: "Où envoyer les leads quand un formulaire est soumis (en plus du stockage en base).",
    fields: [
      { key: "leads_email_to", label: "Email réception leads", type: "email", defaultValue: "recacor.fr+leads@gmail.com", placeholder: "recacor.fr+leads@gmail.com", help: "Adresse qui reçoit chaque lead. NB : sender=recacor.fr@gmail.com, donc on utilise +leads pour éviter le filtre Gmail 'envoyé à soi-même' (les mails arriveraient sinon dans Envoyés/Tous, pas Inbox). Tous les mails à recacor.fr+*@gmail.com sont délivrés à recacor.fr@gmail.com." },
      { key: "leads_webhook_url", label: "Webhook CRM", type: "url", defaultValue: "", placeholder: "https://...", help: "POST JSON envoyé pour chaque nouveau lead" },
      { key: "leads_send_confirmation", label: "Email confirmation au client (1 = activé)", type: "text", defaultValue: "", placeholder: "1", help: "Mettez '1' pour envoyer un email de confirmation au client après soumission" },
    ],
  },
  {
    id: "mailchimp",
    title: "Mailchimp",
    description: "Ajout automatique des leads à une audience Mailchimp. La clé API est définie via la variable d'environnement MAILCHIMP_API_KEY.",
    fields: [
      { key: "mailchimp_audience_id", label: "Audience ID (List ID)", type: "text", defaultValue: "", placeholder: "ex: a1b2c3d4e5", help: "Récupérez l'ID dans Mailchimp → Audience → Settings → Audience name and defaults" },
    ],
  },
  {
    id: "social",
    title: "Réseaux sociaux",
    fields: [
      { key: "social_facebook", label: "Facebook URL", type: "url", defaultValue: "" },
      { key: "social_instagram", label: "Instagram URL", type: "url", defaultValue: "" },
      { key: "social_tiktok", label: "TikTok URL", type: "url", defaultValue: "" },
      { key: "social_youtube", label: "YouTube URL", type: "url", defaultValue: "" },
    ],
  },
  {
    id: "hero_images",
    title: "Images de pages",
    description: "Image affichée au-dessus du formulaire (ou du contenu principal) de chaque page. URL d'une image hébergée (Vercel Blob, CDN, etc.). Laisser vide pour ne rien afficher.",
    fields: [
      { key: "hero_image_pneus_vl", label: "Image page Pneus Voiture", type: "url", defaultValue: "" },
      { key: "hero_image_mecanique", label: "Image page Mécanique", type: "url", defaultValue: "" },
      { key: "hero_image_pneus_pl", label: "Image page Pneus PL", type: "url", defaultValue: "" },
      { key: "hero_image_nos_centres", label: "Image page Notre Garage", type: "url", defaultValue: "" },
      { key: "hero_image_blog", label: "Image page Blog", type: "url", defaultValue: "" },
      { key: "hero_image_contact", label: "Image page Contact", type: "url", defaultValue: "" },
    ],
  },
  {
    id: "seo",
    title: "SEO global",
    fields: [
      { key: "site_url", label: "URL canonique du site", type: "url", defaultValue: "https://recacor.fr" },
      { key: "site_title", label: "Titre par défaut", type: "text", defaultValue: "Pneus Voiture Montpellier — Garage Recacor Le Crès" },
      { key: "site_description", label: "Description par défaut", type: "textarea", defaultValue: "Spécialiste pneus VL et PL à Montpellier — Le Crès. Montage sans RDV, stock immédiat, prix discount." },
    ],
  },
];

export function getDefaults(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const g of SETTINGS_GROUPS) {
    for (const f of g.fields) out[f.key] = f.defaultValue;
  }
  return out;
}

export function withDefaults(stored: Record<string, string>): Record<string, string> {
  return { ...getDefaults(), ...stored };
}
