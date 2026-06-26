"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const; // strong ease-out

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance (px) the element travels up into place. */
  y?: number;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Fade + slide-up on scroll. Respects prefers-reduced-motion (renders static).
 * Use `Stagger` as the parent to cascade a group of `Reveal` children.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Cascades child `Reveal` (or motion) elements. Children should use the
 * variant names "hidden"/"show" — pass `staggerItem` to plain children.
 */
export function Stagger({
  children,
  className,
  gap = 0.12,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "section" | "ul";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
