"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image wrapper with a graceful fallback. If a photo hasn't been added to
 * /public yet (or fails to load), we show an on-brand concrete placeholder with
 * a quiet label instead of a broken image — so the layout never breaks while
 * Sia is still uploading work.
 */
export function SmartImage({
  alt,
  label,
  className,
  ...props
}: ImageProps & { label?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`grain flex items-center justify-center bg-concrete text-stone ${className ?? ""}`}
        aria-label={alt}
        role="img"
      >
        <span className="eyebrow text-stone/70">{label ?? "Sia's Makeup"}</span>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
