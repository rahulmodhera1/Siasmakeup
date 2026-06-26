"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SmartImage } from "./SmartImage";

const EASE = [0.23, 1, 0.32, 1] as const;

// ---- Tagline options (swap the copy below if Sia prefers another) ----
//  1. "Makeup that feels like you, elevated."   ← in use
//  2. "Editorial beauty, made personal."
//  3. "Looking like yourself — on your very best day."

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Gentle scroll-tied parallax on the framed image.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);

  // Reveal helpers — collapse to simple fades when reduced motion is requested.
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
      ref={ref}
      id="top"
      className="grain relative flex min-h-[100svh] w-full items-center overflow-hidden bg-bone pt-24 pb-16 md:pt-28"
    >
      {/* Warm daylight wash from the top-right — breathes almost imperceptibly. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 55% at 85% 8%, rgba(203,166,124,0.40), rgba(203,166,124,0) 70%)",
        }}
        animate={reduce ? {} : { opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Soft lift from the lower-left so the room never feels flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(50% 50% at 18% 90%, rgba(244,241,236,0.7), rgba(244,241,236,0) 75%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-editorial items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.15fr_0.95fr] lg:gap-16">
        {/* ---------- Left: brand + words ---------- */}
        <div className="order-2 lg:order-1">
          <motion.p
            className="font-sans text-xs uppercase text-bronze"
            initial={{ opacity: 0, letterSpacing: reduce ? "0.25em" : "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          >
            Toronto · Freelance Makeup Artist
          </motion.p>

          {/* The WOW moment — wordmark revealed with a mask wipe upward. */}
          <div className="mt-5 overflow-hidden">
            <motion.h1
              className="font-serif text-6xl font-light leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: 26, clipPath: "inset(100% 0 0 0)" }
              }
              animate={
                reduce
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }
              }
              transition={{ duration: 0.95, ease: EASE, delay: 0.3 }}
            >
              Sia&rsquo;s Makeup
            </motion.h1>
          </div>

          {/* Hairline clay rule drawing in beneath the wordmark. */}
          <motion.div
            className="mt-6 h-px w-40 origin-left bg-clay"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: reduce ? 0.3 : 0.62 }}
          />

          <motion.p
            className="mt-7 font-serif text-2xl font-light italic text-charcoal md:text-3xl"
            {...rise(0.75)}
          >
            Makeup that feels like you,{" "}
            <span className="relative not-italic text-clay">
              elevated
              <motion.span
                className="absolute -bottom-1 left-0 h-px w-full origin-left bg-clay"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0.35 : 1.05 }}
              />
            </span>
            <span className="not-italic text-clay">.</span>
          </motion.p>

          <motion.p
            className="mt-6 max-w-md text-base font-light leading-relaxed text-stone"
            {...rise(reduce ? 0.9 : 0.95)}
          >
            Bridal, fashion, photography &amp; events — a refined, camera-tested
            approach to beauty across Toronto &amp; the GTA.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
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
              Enquire
            </a>
          </motion.div>
        </div>

        {/* ---------- Right: the image as a framed gallery piece ---------- */}
        <div className="relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none">
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] rounded-t-[7rem] ring-1 ring-bronze/30 shadow-[0_36px_70px_-28px_rgba(43,41,38,0.35)]"
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(100% 0 0 0)" }
            }
            animate={
              reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0% 0 0 0)" }
            }
            transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: imgY }}
              initial={reduce ? {} : { scale: 1.06 }}
              animate={reduce ? {} : { scale: 1 }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
            >
              <SmartImage
                src="/images/hero/hero.jpg"
                alt="Inside Sia's Makeup — a warm, light-filled Toronto studio"
                label="Sia's Studio"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
              />
            </motion.div>

            {/* Tiny editorial corner caption. */}
            <span className="absolute bottom-4 right-5 z-10 text-[0.6rem] uppercase tracking-[0.3em] text-bone/90 mix-blend-difference">
              Editorial · 2025
            </span>
          </motion.div>

          {/* Greenery sprig overlapping the lower-left corner — sways faintly. */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -left-8 z-20 w-28 origin-bottom opacity-80 md:w-32"
            style={{ transformOrigin: "bottom center" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
          >
            <motion.div
              animate={reduce ? {} : { rotate: [-1.2, 1.2, -1.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/hero/sprig.svg"
                alt=""
                width={220}
                height={320}
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>
        </div>
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
