"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SmartImage } from "./SmartImage";
import { Lightbox } from "./Lightbox";
import { Reveal } from "./Reveal";
import {
  categories,
  featured,
  gallery,
  type Category,
  type Collection,
  type GalleryImage,
} from "@/lib/gallery";

const EASE = [0.23, 1, 0.32, 1] as const;

export function Portfolio() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // "What I Do" cards dispatch this so the grid arrives pre-filtered.
  useEffect(() => {
    const onFilter = (e: Event) => {
      const cat = (e as CustomEvent<Category>).detail;
      if (categories.some((c) => c.id === cat)) setFilter(cat);
    };
    window.addEventListener("filter-portfolio", onFilter);
    return () => window.removeEventListener("filter-portfolio", onFilter);
  }, []);

  const visible = useMemo(() => {
    if (filter !== "all") return gallery.filter((g) => g.category === filter);
    // "All" leads with the featured picks; the rest keep their natural order.
    const rank = (g: GalleryImage) => {
      const i = featured.indexOf(g.src);
      return i === -1 ? Number.MAX_SAFE_INTEGER : i;
    };
    return [...gallery].sort((a, b) => rank(a) - rank(b));
  }, [filter]);

  // When a single category is selected and it contains credited shoots,
  // group its images per shoot so each album renders with its own header.
  const shootGroups = useMemo(() => {
    if (filter === "all") return null;
    const groups: { collection: Collection | null; images: GalleryImage[] }[] = [];
    for (const g of visible) {
      const key = g.collection ?? null;
      const existing = groups.find((grp) => grp.collection === key);
      if (existing) existing.images.push(g);
      else groups.push({ collection: key, images: [g] });
    }
    return groups.some((grp) => grp.collection) ? groups : null;
  }, [filter, visible]);

  const openImage = (img: GalleryImage) => setActiveIndex(visible.indexOf(img));

  const tile = (img: GalleryImage) => (
    <motion.button
      key={img.src}
      layout
      type="button"
      onClick={() => openImage(img)}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="group relative block aspect-[4/5] w-[calc(50%-0.5rem)] overflow-hidden bg-concrete md:w-[calc(33.333%-0.667rem)]"
      aria-label={`View: ${img.alt}`}
    >
      <SmartImage
        src={img.src}
        alt={img.alt}
        label={img.category}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="p-4 text-left">
          {img.collection?.title && (
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

  // Uniform editorial grid: consistent 4:5 tiles, incomplete rows centered —
  // no ragged columns or empty corners regardless of image count.
  const grid = (images: GalleryImage[]) => (
    <motion.div layout className="flex flex-wrap justify-center gap-4">
      <AnimatePresence mode="popLayout">{images.map(tile)}</AnimatePresence>
    </motion.div>
  );

  // Centered credit header shown above each fashion shoot's grid.
  const collectionHeader = (col: Collection) => (
    <div className="border-y border-stone/30 py-9 text-center">
      {col.title && (
        <>
          <p className="text-[0.65rem] uppercase tracking-eyebrow text-bronze">
            The Collection
          </p>
          <h3 className="mt-3 font-serif text-3xl font-light italic text-ink md:text-4xl">
            {col.title}
          </h3>
          <div className="mx-auto mt-5 h-px w-12 bg-clay/60" />
        </>
      )}
      <div
        className={`mx-auto flex max-w-4xl flex-wrap justify-center gap-x-12 gap-y-7 ${col.title ? "mt-7" : ""}`}
      >
        {col.credits.map((c) => (
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
    </div>
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

        {shootGroups ? (
          // Each credited shoot is its own album — header, then its images.
          <div>
            {shootGroups.map((grp, i) => (
              <motion.div
                key={grp.collection?.title ?? `shoot-${i}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                className="mt-12"
              >
                {grp.collection && collectionHeader(grp.collection)}
                <div className="mt-10">{grid(grp.images)}</div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-12">{grid(visible)}</div>
        )}
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
