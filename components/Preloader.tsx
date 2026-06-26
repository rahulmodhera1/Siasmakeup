"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LOGO_DATA_URI } from "@/lib/logoData";

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Branded preloader. Renders on first paint (so there's no flash of unstyled,
 * half-loaded content), then fades away once fonts + the page's initial assets
 * are ready — with a short minimum so it never just blinks, and a safety
 * timeout so it can never get stuck.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const MIN = 650; // don't flash
    const MAX = 3500; // never get stuck
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN - (Date.now() - start));
      window.setTimeout(() => setHidden(true), wait);
    };

    // Wait for the window load event (above-the-fold assets) AND web fonts.
    const loaded = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });
    const fonts =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready.then(() => undefined)
        : Promise.resolve();

    Promise.all([loaded, fonts]).then(finish);
    const safety = window.setTimeout(finish, MAX);

    return () => window.clearTimeout(safety);
  }, []);

  // Lock scroll while the loader is up.
  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="preloader"
          className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bone"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0.25 : 0.7, ease: EASE } }}
          aria-label="Loading"
          role="status"
        >
          {/* Logo + progress bar use CSS animation (not Framer initial state) so
              they're visible the instant the HTML paints, even before JS loads. */}
          {/* Inlined data URI → renders instantly, no network round trip. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_DATA_URI}
            alt="Sia's Makeup"
            width={255}
            height={224}
            className="h-auto w-36 animate-fade-in md:w-44"
          />

          {/* Thin clay progress line. */}
          <div className="mt-9 h-px w-40 overflow-hidden bg-stone/25">
            <div className="loader-bar h-full w-full bg-clay" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
