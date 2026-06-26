"use client";

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SmartImage } from "./SmartImage";
import type { GalleryImage } from "@/lib/gallery";

type LightboxProps = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  // Keyboard controls + body scroll lock.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, prev, next]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 text-bone/80 transition-colors hover:text-bone"
          >
            <X strokeWidth={1.25} className="h-8 w-8" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 z-10 p-2 text-bone/70 transition-colors hover:text-bone md:left-8"
          >
            <ChevronLeft strokeWidth={1} className="h-9 w-9" />
          </button>

          <motion.div
            key={current.src}
            className="relative mx-12 max-h-[82vh] w-full max-w-4xl md:mx-20"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/4] max-h-[82vh] w-full sm:aspect-[4/5]">
              <SmartImage
                src={current.src}
                alt={current.alt}
                label="Photo coming soon"
                fill
                sizes="(max-width: 768px) 90vw, 60vw"
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-center text-xs uppercase tracking-eyebrow text-bone/60">
              {current.category}
            </p>
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 z-10 p-2 text-bone/70 transition-colors hover:text-bone md:right-8"
          >
            <ChevronRight strokeWidth={1} className="h-9 w-9" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
