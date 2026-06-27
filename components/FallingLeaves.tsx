"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Adapted from a generic "falling leaves" background. Changes for this project:
//  - scoped to its parent (absolute, not fixed) so it lives inside the hero only
//  - confined to narrow left/right edge bands so it never covers the centre
//  - recoloured to the brand's muted sage/olive (vivid green clashed)
//  - leaf count kept modest + no blur filter, to stay smooth on phones

type Leaf = {
  id: number;
  x: number;
  drift: [number, number, number];
  rotation: number;
  scale: number;
  delay: number;
  duration: number;
  hue: number;
  sat: number;
  light: number;
};

export function FallingLeaves() {
  const reduce = useReducedMotion();
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    if (reduce) {
      setLeaves([]);
      return;
    }
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const count = wide ? 16 : 7;
    const arr: Leaf[] = [];
    for (let i = 0; i < count; i++) {
      // Desktop: spread evenly across the full width so the leaves never clump
      // at the edges — they drift behind the centred text (z-10), never over it.
      // Mobile (liked as-is): narrow left/right edge bands only.
      let x: number;
      if (wide) {
        x = ((i + 0.1 + Math.random() * 0.8) / count) * 100;
      } else {
        x = i % 2 === 0 ? Math.random() * 12 : 88 + Math.random() * 12;
      }
      arr.push({
        id: i,
        x,
        drift: [
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 7,
        ],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.75,
        delay: Math.random() * 9,
        duration: 16 + Math.random() * 10,
        hue: 70 + Math.random() * 26, // olive → sage
        sat: 15 + Math.random() * 12, // muted
        light: 36 + Math.random() * 12,
      });
    }
    setLeaves(arr);
  }, [reduce]);

  if (!leaves.length) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute will-change-transform"
          initial={{
            x: `${leaf.x}vw`,
            y: "-12vh",
            rotate: leaf.rotation,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: [
              `${leaf.x}vw`,
              `${leaf.x + leaf.drift[0]}vw`,
              `${leaf.x + leaf.drift[1]}vw`,
              `${leaf.x + leaf.drift[2]}vw`,
            ],
            y: ["-12vh", "35vh", "75vh", "112vh"],
            rotate: [
              leaf.rotation,
              leaf.rotation + 120,
              leaf.rotation + 240,
              leaf.rotation + 360,
            ],
            scale: [0, leaf.scale, leaf.scale, 0],
            opacity: [0, 0.55, 0.55, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1],
          }}
        >
          <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 2C20 2 8 8 8 20C8 28 12 35 20 38C28 35 32 28 32 20C32 8 20 2 20 2Z"
              fill={`hsl(${leaf.hue}, ${leaf.sat}%, ${leaf.light}%)`}
              fillOpacity="0.55"
            />
            <path
              d="M20 4C20 4 14 11 14 20C14 26 16 32 20 38"
              stroke={`hsl(${leaf.hue}, ${leaf.sat + 10}%, ${Math.max(0, leaf.light - 12)}%)`}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
