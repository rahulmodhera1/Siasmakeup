"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SmartImage } from "./SmartImage";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";
import { categories, gallery, forbiddenDesire, type Category } from "@/lib/gallery";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Portfolio() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter]
  );

  return (
    <section id="work" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Selected Work</p>
          <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ink md:text-5xl">
            A portfolio built on real skin and real moments.
          </h2>
        </Reveal>

        {/* Filter pills */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const active = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFilter(cat.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-5 py-2 text-xs uppercase tracking-eyebrow transition-all duration-300 ease-out-expo ${
                    active
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

        {/* Collection credit — appears when browsing the Fashion editorial. */}
        <AnimatePresence>
          {filter === "fashion" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mt-12 border-y border-stone/30 py-8 text-center"
            >
              <p className="text-[0.65rem] uppercase tracking-eyebrow text-bronze">
                The Collection
              </p>
              <h3 className="mt-3 font-serif text-3xl font-light italic text-ink md:text-4xl">
                {forbiddenDesire.title}
              </h3>
              <div className="mx-auto mt-5 h-px w-12 bg-clay/60" />
              <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
                {forbiddenDesire.credits.map((c) => (
                  <div key={c.role} className="text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-bronze">{c.role}</p>
                    {c.lines.map((line) => (
                      <p
                        key={line}
                        className="mt-1.5 whitespace-nowrap font-serif text-lg italic leading-snug text-ink/85 md:text-xl"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masonry-style gallery (CSS columns for an organic, editorial rhythm). */}
        <motion.div layout className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          <AnimatePresence mode="popLayout">
            {visible.map((img) => {
              // Index within the *currently visible* set so lightbox nav stays in-filter.
              const indexInVisible = visible.indexOf(img);
              return (
                <motion.button
                  key={img.src}
                  layout
                  type="button"
                  onClick={() => setActiveIndex(indexInVisible)}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="group relative block w-full overflow-hidden break-inside-avoid bg-concrete"
                  aria-label={`View: ${img.alt}`}
                >
                  <SmartImage
                    src={img.src}
                    alt={img.alt}
                    label={img.category}
                    width={800}
                    height={1000}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="h-auto w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="p-4 text-left">
                      {img.collection && (
                        <span className="block font-serif text-base italic text-bone">
                          {img.collection.title}
                        </span>
                      )}
                      <span className="mt-0.5 block text-xs uppercase tracking-eyebrow text-bone/80">
                        {img.category}
                      </span>
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        images={visible}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
