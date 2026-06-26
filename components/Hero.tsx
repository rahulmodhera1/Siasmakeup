"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SmartImage } from "./SmartImage";
import { brand } from "@/lib/content";

// ---- Headline options (pick a favourite; swap the <h1> copy below) ----
//  1. "Makeup that feels like you, elevated."   ← in use
//  2. "Editorial beauty, made personal."
//  3. "The quiet confidence of looking like yourself — on your best day."

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax + scale on the hero image as the user scrolls past.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[600px] w-full items-end overflow-hidden bg-charcoal"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 h-full w-full">
        <SmartImage
          src="/images/hero/hero.jpg"
          alt="Editorial beauty portrait — makeup by Sia, a Toronto makeup artist"
          label="Hero image"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Soft dark gradient at the bottom for legibility. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" />

      <div className="relative z-10 mx-auto w-full max-w-editorial px-6 pb-20 md:px-10 md:pb-28">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow text-sand"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          >
            {brand.tagline.toUpperCase()}
          </motion.p>

          <motion.h1
            className="mt-6 font-serif text-5xl font-light leading-[1.05] text-bone sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.35 }}
          >
            Makeup that feels
            <br />
            like you, <em className="not-italic text-sand">elevated.</em>
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-base font-light leading-relaxed text-bone/80 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
          >
            Bridal, fashion, photography and events — a refined, camera-tested
            approach to beauty for clients across Toronto and the GTA.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.65 }}
          >
            <a
              href="#work"
              className="rounded-full bg-bone px-7 py-3 text-xs uppercase tracking-eyebrow text-ink transition-all duration-300 ease-out-expo hover:bg-sand active:scale-[0.98]"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-bone/60 px-7 py-3 text-xs uppercase tracking-eyebrow text-bone transition-all duration-300 ease-out-expo hover:border-bone hover:bg-bone/10 active:scale-[0.98]"
            >
              Enquire
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to learn more"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-bone/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
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
