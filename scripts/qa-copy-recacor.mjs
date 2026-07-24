#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_TARGETS = [
  "src/data/vehicle-brand-pages.ts",
  "src/app/(public)/pneus-voiture/[marque]/client.tsx",
  "src/app/(public)/pneus-voiture/client.tsx",
  "src/app/(public)/services/vidange/client.tsx",
  "src/app/(public)/services/parallelisme-geometrie/client.tsx",
  "src/app/(public)/services/climatisation-auto-montpellier/client.tsx",
];

const rules = [
  {
    id: "weak-page-utile",
    severity: "high",
    label: "Formulation faible",
    pattern: /\bune page utile pour\b/gi,
    why: "Sonne comme un commentaire de brief, pas comme un texte de site.",
    suggestion: "Remplacer par un titre concret oriente service ou action locale.",
  },
  {
    id: "weak-conducteurs",
    severity: "medium",
    label: "Vocabulaire froid",
    pattern: /\bconducteurs?\b/gi,
    why: "Trop froid ou administratif pour Recacor dans beaucoup de contextes.",
    suggestion: "Preferer `clients`, `vehicules`, la marque ou le cas concret.",
  },
  {
    id: "internal-page-goal",
    severity: "high",
    label: "Meta commentaire",
    pattern: /\b(l'objectif|le but) de cette page\b/gi,
    why: "Explique la page au lieu de parler au client.",
    suggestion: "Dire directement ce que Recacor prend en charge ou ce que le client peut faire.",
  },
  {
    id: "internal-this-page",
    severity: "medium",
    label: "Logique interne visible",
    pattern: /\bcette page\b/gi,
    why: "Souvent signe d'un texte qui parle de sa structure et non du besoin client.",
    suggestion: "Remplacer par le service, la marque ou l'action atelier.",
  },
  {
    id: "seo-cluster",
    severity: "high",
    label: "Jargon SEO",
    pattern: /\bcluster( seo)?\b/gi,
    why: "Vocabulaire interne, jamais a afficher dans le contenu public.",
    suggestion: "Supprimer.",
  },
  {
    id: "seo-prioritaire",
    severity: "medium",
    label: "Jargon de priorisation",
    pattern: /\bprioritaire\b/gi,
    why: "Sonne comme un document de pilotage, pas comme une page commerciale.",
    suggestion: "Remplacer par un fait concret ou supprimer.",
  },
  {
    id: "seo-parc-local",
    severity: "medium",
    label: "Expression faible",
    pattern: /\bparc local\b/gi,
    why: "Expression analytique souvent froide si elle n'est pas justifiee.",
    suggestion: "Parler directement des modeles ou usages courants.",
  },
  {
    id: "weak-verifier-rapidement",
    severity: "medium",
    label: "Tic de langage SEO",
    pattern: /\bverifier rapidement\b/gi,
    why: "Formulation generique recurrente qui sonne IA/brief.",
    suggestion: "Dire precisement ce qu'on verifie : dimension, stock, prix, devis.",
  },
  {
    id: "weak-sans-perdre-de-temps",
    severity: "low",
    label: "Promesse automatique",
    pattern: /\bsans perdre de temps\b/gi,
    why: "Peut sonner artificiel si rien de concret ne suit.",
    suggestion: "Remplacer par une preuve concrete : devis clair, atelier sur place, appel avant venue.",
  },
  {
    id: "internal-maillage",
    severity: "high",
    label: "Vocabulaire interne",
    pattern: /\bmaillage\b/gi,
    why: "Terme de construction SEO, pas de copy publique.",
    suggestion: "Supprimer du contenu public.",
  },
  {
    id: "internal-angle-editorial",
    severity: "high",
    label: "Vocabulaire interne",
    pattern: /\bangle editorial\b/gi,
    why: "Terme de cadrage, pas de texte client.",
    suggestion: "Supprimer du contenu public.",
  },
  {
    id: "soft-solution-complete",
    severity: "low",
    label: "Promesse creuse",
    pattern: /\bsolution complete\b/gi,
    why: "Formulation marketing faible si elle n'est pas prouvee.",
    suggestion: "Dire ce qui est fait concretement au garage.",
  },
];

const positiveSignals = [
  { id: "local-le-cres", pattern: /\bau cres\b/i, label: "ancrage local Le Cres" },
  { id: "local-montpellier", pattern: /\bmontpellier\b/i, label: "ancrage local Montpellier" },
  { id: "atelier", pattern: /\batelier\b/i, label: "mention atelier" },
  { id: "devis", pattern: /\bdevis\b/i, label: "mention devis" },
];

function parseArgs(argv) {
  const targets = [];
  let strict = false;
  for (const arg of argv) {
    if (arg === "--strict") strict = true;
    else targets.push(arg);
  }
  return { strict, targets: targets.length ? targets : DEFAULT_TARGETS };
}

function collectFindings(content) {
  const lines = content.split("\n");
  const findings = [];

  for (const rule of rules) {
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      rule.pattern.lastIndex = 0;
      if (rule.pattern.test(line)) {
        findings.push({
          line: index + 1,
          severity: rule.severity,
          label: rule.label,
          ruleId: rule.id,
          why: rule.why,
          suggestion: rule.suggestion,
          excerpt: line.trim().slice(0, 220),
        });
      }
    }
  }

  return findings.sort((a, b) => a.line - b.line);
}

function hasPositiveSignals(content) {
  return positiveSignals
    .filter((signal) => signal.pattern.test(content))
    .map((signal) => signal.label);
}

function severityScore(severity) {
  if (severity === "high") return 3;
  if (severity === "medium") return 2;
  return 1;
}

const { strict, targets } = parseArgs(process.argv.slice(2));
const cwd = process.cwd();
let hasBlockingFindings = false;
let scanned = 0;

for (const target of targets) {
  const absPath = path.resolve(cwd, target);
  if (!fs.existsSync(absPath)) {
    console.log(`SKIP ${target} (introuvable)`);
    continue;
  }

  const content = fs.readFileSync(absPath, "utf8");
  const findings = collectFindings(content);
  const positives = hasPositiveSignals(content);
  scanned += 1;

  console.log(`\n=== ${target} ===`);
  if (positives.length) {
    console.log(`Signaux positifs : ${positives.join(", ")}`);
  } else {
    console.log("Signaux positifs : aucun ancrage local/atelier/devis detecte");
  }

  if (!findings.length) {
    console.log("Aucun signal faible detecte.");
    continue;
  }

  let fileHasBlocking = false;
  for (const finding of findings) {
    const marker = finding.severity.toUpperCase();
    console.log(
      `- [${marker}] ligne ${finding.line} · ${finding.label} · ${finding.ruleId}\n  ${finding.excerpt}\n  Pourquoi : ${finding.why}\n  Suggestion : ${finding.suggestion}`,
    );
    if (severityScore(finding.severity) >= (strict ? 2 : 3)) {
      fileHasBlocking = true;
    }
  }

  if (fileHasBlocking) {
    hasBlockingFindings = true;
  }
}

if (!scanned) {
  console.error("Aucun fichier scanne.");
  process.exit(2);
}

if (hasBlockingFindings) {
  console.error(`\nControle copy Recacor : ECHEC${strict ? " (strict)" : ""}`);
  process.exit(1);
}

console.log(`\nControle copy Recacor : OK${strict ? " (strict)" : ""}`);
