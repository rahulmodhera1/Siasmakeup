"use client";

import { Reveal, Stagger, staggerItem } from "./Reveal";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="grain bg-stone/25 py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <Reveal className="text-center">
          <p className="eyebrow">Kind Words</p>
        </Reveal>

        <Stagger className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 md:gap-10" gap={0.12}>
          {testimonials.map((t) => (
            <motion.figure key={t.quote} variants={staggerItem} className="text-center">
              <blockquote className="font-serif text-xl font-light leading-snug text-ink/90 md:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-sm font-medium text-ink">{t.author}</p>
              </figcaption>
            </motion.figure>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
