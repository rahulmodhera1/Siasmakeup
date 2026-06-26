"use client";

import { SmartImage } from "./SmartImage";
import { Reveal } from "./Reveal";

const chips = ["Bridal", "Fashion", "Photography", "Events"];

export function About() {
  return (
    <section id="about" className="bg-bone py-24 md:py-32">
      <div className="mx-auto grid max-w-editorial items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        {/* Portrait */}
        <Reveal y={32} className="order-1 md:order-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <SmartImage
              src="/images/about/portrait.jpg"
              alt="Portrait of Sia, Toronto freelance makeup artist"
              label="Portrait"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <p className="eyebrow">The Artist</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ink md:text-5xl">
              Beauty that looks like you — on your most considered day.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-7 space-y-5 text-base font-light leading-relaxed text-charcoal/85">
              <p>
                I'm Sia, a Toronto-based freelance makeup artist. For over a
                decade I've worked across weddings, editorial sets and private
                events — building a quiet, complexion-first approach that lets
                real skin and real features lead.
              </p>
              <p>
                My work lives at the intersection of polished and personal. I
                listen first, then translate a feeling into something tangible:
                a softer glow for a bride, a sharper line for a campaign, makeup
                engineered to hold up through long days and bright lights.
              </p>
              <p>
                Working freelance means it's just you and me — unhurried,
                collaborative, and entirely about the result. I travel across
                the GTA, kit in hand, ready for whatever the day asks.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-stone/40 px-4 py-1.5 text-xs uppercase tracking-eyebrow text-bronze"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
