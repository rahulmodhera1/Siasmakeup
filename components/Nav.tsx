"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled
          ? "border-b border-stone/15 bg-bone/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-editorial items-center justify-between px-6 md:h-20 md:px-10">
        <a
          href="#top"
          className={`font-serif text-xl font-medium tracking-wide transition-colors duration-500 md:text-2xl ${
            scrolled ? "text-ink" : "text-bone"
          }`}
          aria-label={`${brand.name} — back to top`}
        >
          {brand.wordmark}
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`underline-grow text-sm font-light tracking-wide transition-colors duration-500 ${
                scrolled ? "text-charcoal hover:text-ink" : "text-bone/90 hover:text-bone"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`rounded-full border px-5 py-2 text-xs uppercase tracking-eyebrow transition-all duration-500 ease-out-expo ${
              scrolled
                ? "border-clay text-clay hover:bg-clay hover:text-bone"
                : "border-bone/70 text-bone hover:bg-bone hover:text-ink"
            }`}
          >
            Enquire
          </a>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`md:hidden transition-colors duration-500 ${
            scrolled ? "text-ink" : "text-bone"
          }`}
          aria-label="Open menu"
        >
          <Menu strokeWidth={1.25} className="h-7 w-7" />
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              className="absolute inset-0 bg-ink/40"
              variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="grain absolute right-0 top-0 flex h-full w-4/5 max-w-sm flex-col bg-bone px-8 py-8"
              variants={{ open: { x: 0 }, closed: { x: "100%" } }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl text-ink">{brand.wordmark}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-ink"
                >
                  <X strokeWidth={1.25} className="h-7 w-7" />
                </button>
              </div>

              <div className="mt-14 flex flex-col gap-7">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-3xl font-light text-charcoal transition-colors hover:text-clay"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-auto rounded-full border border-clay px-6 py-3 text-center text-xs uppercase tracking-eyebrow text-clay transition-colors hover:bg-clay hover:text-bone"
              >
                Enquire
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
