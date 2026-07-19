// Soumet les URLs du site à IndexNow (Bing + moteurs partenaires — PAS Google).
// Les URLs sont lues dynamiquement depuis le sitemap : tout nouvel article,
// page ville ou service est couvert automatiquement.
// Usage : node scripts/indexnow.mjs                  → toutes les URLs du sitemap
//         node scripts/indexnow.mjs <url1> <url2>    → seulement ces URLs
// Ou automatiquement via GitHub Actions (.github/workflows/indexnow.yml)

const KEY = "89933ede4c6b643f6667c45b8eea2d9c889231d7c81760d9a3b4d8832b3475d7";
const HOST = "www.recacor.fr";
const SITEMAP = `https://${HOST}/sitemap.xml`;

// Fallback minimal si le sitemap est injoignable
const FALLBACK_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/pneus-voiture`,
  `https://${HOST}/mecanique`,
  `https://${HOST}/pneus-utilitaires-pl`,
  `https://${HOST}/contact`,
];

async function getUrls() {
  const args = process.argv.slice(2).filter((a) => a.startsWith("http"));
  if (args.length > 0) return args;

  try {
    const res = await fetch(SITEMAP);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
    if (urls.length === 0) throw new Error("sitemap vide");
    console.log(`Sitemap lu : ${urls.length} URLs`);
    return urls;
  } catch (e) {
    console.warn(`⚠️ Sitemap injoignable (${e.message}) — fallback sur ${FALLBACK_URLS.length} URLs statiques`);
    return FALLBACK_URLS;
  }
}

async function submit() {
  const urls = await getUrls();
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  };

  console.log(`Soumission de ${urls.length} URLs à IndexNow...`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  if (res.ok || res.status === 202) {
    console.log(`✅ IndexNow OK (HTTP ${res.status}) — ${urls.length} URLs soumises`);
    urls.forEach((u) => console.log(`   ${u}`));
  } else {
    const text = await res.text().catch(() => "");
    console.error(`❌ IndexNow erreur HTTP ${res.status}: ${text}`);
    process.exit(1);
  }
}

submit().catch((e) => {
  console.error("❌ Erreur réseau:", e.message);
  process.exit(1);
});
