"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  // The slide-in menu is portalled to <body> — rendering it inside the
  // backdrop-blurred <header> made iOS Safari treat it as a contained,
  // see-through layer (a fixed element inside a backdrop-filter ancestor).
  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] md:hidden"
          initial="closed"
          animate="open"
          exit="closed"
        >
          <motion.div
            className="absolute inset-0 bg-ink/60"
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col px-8 py-8 shadow-2xl shadow-ink/30"
            style={{ backgroundColor: "#F4F1EC" }}
            variants={{ open: { x: 0 }, closed: { x: "100%" } }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex items-center justify-between">
              <Image
                src="/images/brand/mark-charcoal.png"
                alt={brand.name}
                width={255}
                height={183}
                className="h-9 w-auto"
              />
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
              Inquire
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
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
            className="flex items-center gap-3"
            aria-label={`${brand.name} — back to top`}
          >
            <span className="relative block h-9 w-[3.3rem] md:h-10 md:w-[3.7rem]">
              <Image
                src="/images/brand/mark-charcoal.png"
                alt=""
                aria-hidden
                fill
                priority
                sizes="60px"
                className="object-contain"
              />
            </span>
            <span className="font-wordmark text-xl tracking-wide text-ink md:text-2xl">
              {brand.name}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="underline-grow text-sm font-light tracking-wide text-charcoal transition-colors duration-500 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-clay px-5 py-2 text-xs uppercase tracking-eyebrow text-clay transition-all duration-500 ease-out-expo hover:bg-clay hover:text-bone"
            >
              Inquire
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-ink transition-colors duration-500 md:hidden"
            aria-label="Open menu"
          >
            <Menu strokeWidth={1.25} className="h-7 w-7" />
          </button>
        </nav>
      </header>

      {mounted && createPortal(menu, document.body)}
    </>
  );
}
