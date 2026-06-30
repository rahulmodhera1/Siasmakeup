"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;

// The real foliage cut-outs (transparent PNGs matted from Sia's photos),
// placed in the corners like the reference. Each sways gently on its own.
const FOLIAGE = [
  {
    src: "/images/hero/euc-cut.png",
    // top-left eucalyptus
    className:
      "absolute left-[1%] top-[9%] h-[15vh] w-auto sm:top-[7%] sm:h-[20vh] md:h-[24vh]",
    origin: "0% 0%",
    flip: false,
    sway: [0, 1.4, 0, -1.1, 0],
    duration: 13,
    delay: 0,
    opacity: "opacity-90",
  },
  {
    src: "/images/hero/olive-cut.png",
    // top-right olive branch (mirrored to drape inward)
    className:
      "absolute right-[1%] top-[6%] h-[22vh] w-auto sm:h-[30vh] md:h-[36vh]",
    origin: "100% 0%",
    flip: true,
    sway: [0, -1.3, 0, 1, 0],
    duration: 16,
    delay: 1.2,
    opacity: "opacity-85",
  },
  {
    src: "/images/hero/fern-cut.png",
    // bottom-left fern frond
    className:
      "absolute -left-2 bottom-[-2%] h-[14vh] w-auto sm:h-[18vh] md:h-[22vh]",
    origin: "0% 100%",
    flip: false,
    sway: [0, 1.7, 0, -1.2, 0],
    duration: 11,
    delay: 0.6,
    opacity: "opacity-85",
  },
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
      className="grain relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* ---------- Hero background image ---------- */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/wmremove-transformed.png"
        alt=""
        aria-hidden
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover"
      />
      {/* Soft bone wash so text stays legible against the photo */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-bone/55" />

      {/* ---------- Real foliage framing — gently swaying ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {FOLIAGE.map((f) => (
          <div
            key={f.src}
            className={f.className}
            style={{ transformOrigin: f.origin, transform: f.flip ? "scaleX(-1)" : undefined }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={f.src}
              alt=""
              draggable={false}
              className={`h-full w-auto select-none blur-[1px] ${f.opacity}`}
              style={{ transformOrigin: f.origin }}
              animate={reduce ? {} : { rotate: f.sway }}
              transition={{ duration: f.duration, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        ))}

        {/* A single soft sparkle on the right, like the reference. */}
        <motion.svg
          className="absolute right-[7%] top-[60%] hidden h-5 w-5 text-sand sm:block"
          viewBox="0 0 24 24"
          fill="currentColor"
          animate={reduce ? {} : { opacity: [0.25, 0.75, 0.25], scale: [0.82, 1, 0.82] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 0 C12.7 7 17 11.3 24 12 C17 12.7 12.7 17 12 24 C11.3 17 7 12.7 0 12 C7 11.3 11.3 7 12 0 Z" />
        </motion.svg>
      </div>

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

        {/* The WOW — wordmark, revealed with a mask wipe upward. */}
        <div className="mt-6 overflow-hidden pb-2">
          <motion.h1
            className="font-wordmark text-5xl font-normal leading-[1.02] tracking-[-0.01em] text-ink sm:text-7xl md:text-8xl lg:text-[8rem]"
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
