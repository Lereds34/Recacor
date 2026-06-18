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
  "rgba(109,40,217,0.4)",
  "rgba(59,130,246,0.35)",
  "rgba(139,92,246,0.35)",
  "rgba(109,40,217,0.3)",
  "rgba(59,130,246,0.4)",
  "rgba(167,139,250,0.3)",
];

// Generate 40 particles spread across the width
const dots = Array.from({ length: 40 }, (_, i) => ({
  x: (i * 2.5) + Math.random() * 2,
  size: 3 + Math.random() * 4,
  delay: Math.random() * 12,
  duration: 6 + Math.random() * 6,
  drift: Math.random() > 0.5 ? 25 : -25,
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
