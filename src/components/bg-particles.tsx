"use client";

import { motion } from "framer-motion";

function Particle({ delay, x, size, color, duration, drift }: { delay: number; x: number; size: number; color: string; duration: number; drift: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: -20,
        width: size,
        height: size,
        backgroundColor: color,
      }}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, drift, 0],
        opacity: [0, 0.9, 0.7, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

const colors = [
  "rgba(255,255,255,0.28)",
  "rgba(27,79,216,0.26)",
  "rgba(255,201,40,0.22)",
  "rgba(255,255,255,0.18)",
  "rgba(27,79,216,0.2)",
  "rgba(255,201,40,0.16)",
];

// PRNG entier 32 bits (mulberry32) : opérations bit à bit exactes sur tous
// les moteurs JS, donc serveur et client calculent des valeurs identiques
// pour une même seed. Évite le mismatch d'hydratation qu'un Math.random()
// non seedé provoquait ici (valeurs différentes SSR vs premier rendu client).
function seededRandom(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// 40 particules réparties sur la largeur, positions stables (déterministes par index)
const dots = Array.from({ length: 40 }, (_, i) => ({
  x: i * 2.5 + seededRandom(i * 2) * 2,
  size: 3 + seededRandom(i * 2 + 1) * 4,
  delay: seededRandom(i * 2 + 100) * 12,
  duration: 6 + seededRandom(i * 2 + 101) * 6,
  drift: seededRandom(i * 2 + 200) > 0.5 ? 25 : -25,
  color: colors[i % colors.length],
}));

export function BgParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {dots.map((d, i) => (
        <Particle key={i} x={d.x} size={d.size} delay={d.delay} duration={d.duration} drift={d.drift} color={d.color} />
      ))}
    </div>
  );
}
