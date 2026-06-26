"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { priceList } from "@/lib/content";

const EASE = [0.23, 1, 0.32, 1] as const;

// Scrolls to the contact form and pre-fills the subject via a custom event
// that <Contact /> listens for.
function enquire(subject: string) {
  window.dispatchEvent(new CustomEvent("prefill-enquiry", { detail: subject }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export function Pricing() {
  const [active, setActive] = useState(priceList[0].id);
  const category = priceList.find((c) => c.id === active) ?? priceList[0];

  return (
    <section id="pricing" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Investment</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ink md:text-5xl">
            A price list, simply put.
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-charcoal/80">
            Transparent rates to help you plan. Every booking is confirmed with a
            personal quote — tell me what you have in mind and I'll tailor it.
          </p>
        </Reveal>

        {/* Category tabs */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {priceList.map((cat) => {
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-5 py-2 text-xs uppercase tracking-eyebrow transition-all duration-300 ease-out-expo ${
                    isActive
                      ? "border-clay bg-clay text-bone"
                      : "border-stone/40 text-charcoal/70 hover:border-clay hover:text-clay"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Animated price list for the active category */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {category.intro && (
                <p className="mb-10 text-xs uppercase tracking-eyebrow text-bronze">
                  {category.intro}
                </p>
              )}

              <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
                {category.blocks.map((block) => (
                  <div key={block.title ?? "block"} className="break-inside-avoid">
                    {block.title && (
                      <h3 className="mb-5 font-serif text-2xl font-normal text-ink">
                        {block.title}
                      </h3>
                    )}
                    <ul className="space-y-5">
                      {block.items.map((item) => (
                        <li key={item.name}>
                          <div className="flex items-baseline gap-3">
                            <span className="font-serif text-lg text-ink">
                              {item.name}
                              {item.unit && (
                                <span className="ml-2 text-xs uppercase tracking-eyebrow text-stone">
                                  {item.unit}
                                </span>
                              )}
                            </span>
                            <span
                              className="mb-1 h-px flex-1 border-b border-dotted border-stone/40"
                              aria-hidden
                            />
                            <span className="font-serif text-lg text-clay">
                              {item.price}
                            </span>
                          </div>
                          {item.includes && (
                            <p className="mt-1.5 max-w-prose text-sm font-light leading-relaxed text-charcoal/65">
                              {item.includes}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {category.footnote && (
                <p className="mt-12 text-xs uppercase tracking-eyebrow text-bronze">
                  {category.footnote}
                </p>
              )}

              <button
                type="button"
                onClick={() => enquire(category.subject)}
                className="mt-8 rounded-full border border-clay px-7 py-3 text-xs uppercase tracking-eyebrow text-clay transition-all duration-300 ease-out-expo hover:bg-clay hover:text-bone active:scale-[0.98]"
              >
                Enquire about {category.label}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal>
          <p className="mt-16 border-t border-stone/20 pt-8 text-center text-sm font-light text-charcoal/70">
            Travel within the GTA available · Custom quotes for full bridal
            parties &amp; productions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
