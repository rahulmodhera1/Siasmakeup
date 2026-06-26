import Image from "next/image";
import { Facebook, Instagram, Music2 } from "lucide-react";
import { brand, navLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="grain bg-charcoal text-bone">
      <div className="mx-auto max-w-editorial px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#top" aria-label={`${brand.name} — back to top`} className="inline-block">
              <Image
                src="/images/brand/logo-bone.png"
                alt={brand.name}
                width={255}
                height={224}
                className="h-24 w-auto"
              />
            </a>
            <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-bone/60">
              Freelance professional makeup artistry for bridal, fashion,
              photography and events — {brand.location}.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-light text-bone/70 transition-colors hover:text-bone"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm font-light">
            <a
              href={`mailto:${brand.email}`}
              className="text-bone/80 transition-colors hover:text-sand"
            >
              {brand.email}
            </a>
            <a
              href={brand.phoneHref}
              className="text-bone/70 transition-colors hover:text-sand"
            >
              {brand.phone}
            </a>
            <div className="mt-1 flex gap-5 text-bone/70">
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${brand.instagramHandle}`}
                className="transition-colors hover:text-sand"
              >
                <Instagram strokeWidth={1.25} className="h-5 w-5" />
              </a>
              <a
                href={brand.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`TikTok ${brand.tiktokHandle}`}
                className="transition-colors hover:text-sand"
              >
                <Music2 strokeWidth={1.25} className="h-5 w-5" />
              </a>
              <a
                href={brand.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Facebook ${brand.facebookHandle}`}
                className="transition-colors hover:text-sand"
              >
                <Facebook strokeWidth={1.25} className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-bone/15 pt-6 text-xs text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-eyebrow">{brand.location}</p>
        </div>
      </div>
    </footer>
  );
}
