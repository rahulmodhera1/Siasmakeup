"use client";

import { SmartImage } from "./SmartImage";
import { Reveal } from "./Reveal";

const frame =
  "group relative overflow-hidden rounded-[1.25rem] ring-1 ring-bronze/25 shadow-[0_30px_60px_-30px_rgba(43,41,38,0.32)]";
const zoom =
  "object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105";

export function Studio() {
  return (
    <section id="studio" className="grain bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-10">
        {/* Heading — editorial split */}
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <Reveal>
            <p className="eyebrow">The Studio</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ink md:text-5xl">
              A calm, considered
              <br />
              space to create in.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base font-light leading-relaxed text-charcoal/80 md:pl-8">
              Tucked into Toronto, the studio is a microcement-and-greenery
              retreat — warm concrete, soft daylight and room to breathe. Every
              session here is private and unhurried, so the focus stays exactly
              where it belongs: on you.
            </p>
            <p className="eyebrow mt-6 text-bronze md:pl-8">
              By appointment · Toronto &amp; the GTA
            </p>
          </Reveal>
        </div>

        {/* Staggered two-image gallery spread */}
        <div className="mt-14 grid grid-cols-12 gap-5 md:mt-16 md:gap-6">
          <Reveal className="col-span-12 md:col-span-7" y={40}>
            <figure className={frame}>
              <div className="relative aspect-[4/5]">
                <SmartImage
                  src="/images/studio/studio-a.jpg"
                  alt="Sia's Makeup studio in Toronto — a microcement space with a ring-light mirror, snake plant and orchid"
                  label="The Studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className={zoom}
                />
              </div>
            </figure>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-5 md:mt-24" y={40} delay={0.12}>
            <figure className={frame}>
              <div className="relative aspect-[4/5]">
                <SmartImage
                  src="/images/studio/studio-b.jpg"
                  alt="Makeup station with an organic wavy mirror, ring light, greenery and styling products"
                  label="The Studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className={zoom}
                />
              </div>
            </figure>
            <p className="eyebrow mt-5 text-stone">The Chair · Where it begins</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
