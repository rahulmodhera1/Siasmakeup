"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, staggerItem } from "./Reveal";
import { pricing } from "@/lib/content";

// Scrolls to the contact form and pre-fills the subject via a custom event
// that <Contact /> listens for.
function enquire(subject: string) {
  window.dispatchEvent(new CustomEvent("prefill-enquiry", { detail: subject }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Investment</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ink md:text-5xl">
            Transparent packages, tailored to your day.
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-charcoal/80">
            A starting point to help you plan. Every booking is finalised with a
            personal quote — just tell me what you have in mind.
          </p>
        </Reveal>

        <div className="mt-14 space-y-16">
          {pricing.map((group) => (
            <div key={group.label}>
              <Reveal>
                <div className="flex items-baseline justify-between border-b border-stone/25 pb-4">
                  <h3 className="font-serif text-2xl font-normal text-ink md:text-3xl">
                    {group.label}
                  </h3>
                  {group.note && (
                    <span className="hidden text-xs uppercase tracking-eyebrow text-bronze sm:block">
                      {group.note}
                    </span>
                  )}
                </div>
              </Reveal>

              <Stagger className="mt-8 grid gap-6 md:grid-cols-3" gap={0.1}>
                {group.tiles.map((tile) => (
                  <motion.div
                    key={tile.name}
                    variants={staggerItem}
                    className="grain flex flex-col border border-stone/20 bg-concrete/40 p-7 transition-colors duration-500 hover:border-clay/50"
                  >
                    <h4 className="font-serif text-xl font-normal text-ink">
                      {tile.name}
                    </h4>
                    <p className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl font-light text-clay">
                        {tile.price}
                      </span>
                      {tile.unit && (
                        <span className="text-xs uppercase tracking-eyebrow text-stone">
                          {tile.unit}
                        </span>
                      )}
                    </p>

                    <ul className="mt-6 space-y-2.5 text-sm font-light text-charcoal/80">
                      {tile.inclusions.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span className="mt-2 h-px w-3 shrink-0 bg-bronze" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => enquire(tile.subject)}
                      className="mt-7 w-full rounded-full border border-clay px-5 py-2.5 text-xs uppercase tracking-eyebrow text-clay transition-all duration-300 ease-out-expo hover:bg-clay hover:text-bone active:scale-[0.98]"
                    >
                      Enquire
                    </button>
                  </motion.div>
                ))}
              </Stagger>

              {group.note && (
                <p className="mt-5 text-xs uppercase tracking-eyebrow text-bronze sm:hidden">
                  {group.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <Reveal>
          <p className="mt-14 text-center text-sm font-light text-charcoal/70">
            Travel within the GTA available · Custom quotes for full bridal
            parties &amp; productions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
