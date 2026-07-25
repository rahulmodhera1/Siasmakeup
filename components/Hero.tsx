"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const EASE = [0.23, 1, 0.32, 1] as const;

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
      {/* ---------- Photographic foliage background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/hero/wmremove-transformed.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Whisper-soft cream scrim to keep the centred text crisp. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 50%, rgba(244,241,236,0.45), transparent 75%)",
          }}
        />
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
            className="whitespace-nowrap font-wordmark font-normal uppercase leading-[1.02] tracking-[-0.01em] text-ink [font-size:clamp(1.7rem,8.5vw,5.5rem)]"
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
