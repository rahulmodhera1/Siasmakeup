"use client";

import { SmartImage } from "./SmartImage";
import { Reveal, Stagger, staggerItem } from "./Reveal";
import { motion } from "framer-motion";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="grain bg-concrete py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What I Do</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ink md:text-5xl">
            Four specialties, one consistent standard.
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-charcoal/80">
            Every booking is tailored, but the throughline never changes:
            flawless, long-wearing makeup that photographs beautifully and feels
            like yours.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2" gap={0.1}>
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={staggerItem}
              className="group relative overflow-hidden bg-bone"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <SmartImage
                  src={service.image}
                  alt={`${service.title} makeup by Sia`}
                  label={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="p-7">
                <h3 className="underline-grow inline-block font-serif text-2xl font-normal text-ink md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-charcoal/75">
                  {service.blurb}
                </p>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
