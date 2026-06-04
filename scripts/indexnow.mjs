// Soumet toutes les URLs importantes à IndexNow après chaque déploiement.
// Usage : node scripts/indexnow.mjs
// Ou automatiquement via GitHub Actions (.github/workflows/indexnow.yml)

const KEY = "89933ede4c6b643f6667c45b8eea2d9c889231d7c81760d9a3b4d8832b3475d7";
const HOST = "www.recacor.fr";

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/pneus-voiture`,
  `https://${HOST}/mecanique`,
  `https://${HOST}/pneus-utilitaires-pl`,
  `https://${HOST}/contact`,
  `https://${HOST}/nos-centres`,
  `https://${HOST}/a-propos`,
  `https://${HOST}/services/parallelisme-geometrie`,
  `https://${HOST}/services/recreusage`,
  `https://${HOST}/montpellier`,
  `https://${HOST}/lunel`,
  `https://${HOST}/castelnau-le-lez`,
  `https://${HOST}/lattes`,
  `https://${HOST}/mauguio`,
  `https://${HOST}/vendargues`,
  `https://${HOST}/jacou`,
  `https://${HOST}/perols`,
  `https://${HOST}/saint-jean-de-vedas`,
];

async function submit() {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: URLS,
  };

  console.log(`Soumission de ${URLS.length} URLs à IndexNow...`);

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  if (res.ok || res.status === 202) {
    console.log(`✅ IndexNow OK (HTTP ${res.status}) — ${URLS.length} URLs soumises`);
    URLS.forEach((u) => console.log(`   ${u}`));
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
