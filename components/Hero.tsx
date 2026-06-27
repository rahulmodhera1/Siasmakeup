"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;

// Slow, drifting pools of warm light in Sia's palette — keeps the bone hero
// alive without any photography. Low opacity so it stays elegant, never garish.
const ORBS = [
  {
    color: "rgba(203,166,124,0.45)", // warm sand
    className: "-left-[12%] top-[2%] h-[60vw] w-[60vw] md:h-[42vw] md:w-[42vw]",
    anim: { x: [0, 50, 0], y: [0, 36, 0], scale: [1, 1.12, 1] },
    duration: 19,
  },
  {
    color: "rgba(165,106,78,0.20)", // clay
    className: "right-[-10%] top-[12%] h-[55vw] w-[55vw] md:h-[40vw] md:w-[40vw]",
    anim: { x: [0, -44, 0], y: [0, 40, 0], scale: [1.08, 1, 1.08] },
    duration: 23,
  },
  {
    color: "rgba(124,128,96,0.26)", // sage — a touch more green
    className: "bottom-[-12%] left-[14%] h-[60vw] w-[60vw] md:h-[40vw] md:w-[40vw]",
    anim: { x: [0, 40, 0], y: [0, -34, 0], scale: [1, 1.14, 1] },
    duration: 26,
  },
  {
    color: "rgba(154,132,103,0.22)", // bronze
    className: "bottom-[2%] right-[6%] h-[46vw] w-[46vw] md:h-[32vw] md:w-[32vw]",
    anim: { x: [0, -32, 0], y: [0, -28, 0], scale: [1.06, 1, 1.06] },
    duration: 21,
  },
];

// Soft shimmer motes drifting upward — a quiet "glow / highlighter" touch that
// gives the hero a makeup-artist feel. Deterministic so SSR stays stable.
const MOTES = [
  { left: "16%", size: 6, dur: 13, delay: 0, drift: 16, c: "203,166,124" },
  { left: "29%", size: 4, dur: 16, delay: 3.5, drift: -12, c: "154,132,103" },
  { left: "43%", size: 7, dur: 14, delay: 1.5, drift: 10, c: "244,241,236" },
  { left: "57%", size: 5, dur: 17, delay: 5, drift: -14, c: "203,166,124" },
  { left: "68%", size: 6, dur: 15, delay: 2.5, drift: 12, c: "154,132,103" },
  { left: "81%", size: 4, dur: 18, delay: 6.5, drift: -9, c: "244,241,236" },
  { left: "90%", size: 5, dur: 14, delay: 4, drift: 11, c: "203,166,124" },
];

export function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay: delay * 0.5 } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-bone px-6 pt-24 pb-16"
    >
      {/* ---------- Living warm-light background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {ORBS.map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[60px] will-change-transform ${orb.className}`}
            style={{ background: `radial-gradient(circle, ${orb.color}, transparent 68%)` }}
            animate={reduce ? {} : orb.anim}
            transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* Steady warm wash from the top-right + soft lift from below. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 50% at 85% 6%, rgba(203,166,124,0.30), transparent 70%), radial-gradient(45% 45% at 12% 96%, rgba(244,241,236,0.6), transparent 75%)",
          }}
        />
        {/* A whisper of green pooled in the lower-left, near the sprig. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(34% 34% at 6% 92%, rgba(124,128,96,0.22), transparent 70%)",
          }}
        />

        {/* Floating shimmer motes */}
        {MOTES.map((m, i) => (
          <motion.span
            key={`m${i}`}
            className="absolute bottom-0 rounded-full blur-[1.5px] will-change-transform"
            style={{
              left: m.left,
              width: m.size,
              height: m.size,
              background: `radial-gradient(circle, rgba(${m.c},0.9), rgba(${m.c},0) 70%)`,
            }}
            animate={
              reduce
                ? { opacity: 0 }
                : { y: [40, -760], x: [0, m.drift, 0], opacity: [0, 0.7, 0.7, 0], scale: [0.6, 1, 0.6] }
            }
            transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Faint floating greenery — calm, tucked toward the edges.
          Bottom-left shows on every size; the others are desktop/tablet only so
          they never crowd the centred text (or get clipped) on a phone. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-4 bottom-0 z-0 w-28 opacity-[0.6] sm:w-32 md:w-44"
        animate={reduce ? {} : { rotate: [-2.5, 2.5, -2.5], y: [0, -9, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "bottom center" }}
      >
        <Image src="/images/hero/sprig.svg" alt="" width={200} height={340} className="h-auto w-full" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-6 top-28 z-0 hidden w-24 -scale-x-100 opacity-[0.5] md:block lg:right-12 lg:w-28"
        animate={reduce ? {} : { rotate: [2, -2, 2], y: [0, 9, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top center" }}
      >
        <Image src="/images/hero/sprig.svg" alt="" width={200} height={340} className="h-auto w-full" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-6 top-1/3 z-0 hidden w-16 opacity-[0.3] lg:block lg:left-12 lg:w-20"
        animate={reduce ? {} : { rotate: [1.5, -1.5, 1.5], y: [0, 7, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top center" }}
      >
        <Image src="/images/hero/sprig.svg" alt="" width={200} height={340} className="h-auto w-full" />
      </motion.div>

      {/* ---------- Centered brand statement ---------- */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          className="font-sans text-xs uppercase text-bronze sm:text-sm"
          initial={{ opacity: 0, letterSpacing: reduce ? "0.25em" : "0.55em" }}
          animate={{ opacity: 1, letterSpacing: "0.28em" }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        >
          Toronto · Freelance Makeup Artist
        </motion.p>

        {/* The WOW — fancy high-contrast display serif, mask-wiped upward. */}
        <div className="mt-6 overflow-hidden pb-3">
          <motion.h1
            className="font-wordmark text-6xl font-normal leading-[0.98] tracking-[0.01em] text-ink sm:text-7xl md:text-8xl lg:text-[8.5rem]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, clipPath: "inset(100% 0 0 0)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            Sia&rsquo;s Makeup
          </motion.h1>
        </div>

        {/* Hairline clay rule drawing in beneath the wordmark. */}
        <motion.div
          className="mt-7 h-px w-28 bg-clay"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: reduce ? 0.3 : 0.62 }}
        />

        <motion.p
          className="mt-7 font-serif text-2xl font-light italic text-charcoal md:text-3xl"
          {...rise(0.75)}
        >
          Toronto&rsquo;s brush for bridal, fashion{" "}
          <span className="relative whitespace-nowrap not-italic font-normal text-sand">
            &amp; beyond
            <motion.span
              className="absolute -bottom-1 left-0 h-px w-full origin-left bg-sand"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0.35 : 1.05 }}
            />
          </span>
        </motion.p>

        <motion.p
          className="mt-6 max-w-xl text-base font-light leading-relaxed text-stone"
          {...rise(reduce ? 0.9 : 0.95)}
        >
          A refined, camera-tested approach to beauty for bridal, fashion,
          photography and events across Toronto and the GTA.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          {...rise(reduce ? 1 : 1.1)}
        >
          <a
            href="#work"
            className="rounded-full bg-ink px-8 py-3.5 text-xs uppercase tracking-eyebrow text-bone transition-all duration-300 ease-out-expo hover:bg-charcoal active:scale-[0.98]"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-clay px-8 py-3.5 text-xs uppercase tracking-eyebrow text-clay transition-all duration-300 ease-out-expo hover:bg-clay hover:text-bone active:scale-[0.98]"
          >
            Inquire
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to learn more"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-stone"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <motion.span
          className="block"
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown strokeWidth={1} className="h-6 w-6" />
        </motion.span>
      </motion.a>
    </section>
  );
}
