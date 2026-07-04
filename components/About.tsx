"use client";

import { SmartImage } from "./SmartImage";
import { Reveal } from "./Reveal";
import { Sprig } from "./Sprig";

const chips = ["Bridal", "Fashion", "Photography", "Events"];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-bone py-24 md:py-32">
      <Sprig className="-right-10 top-10 w-24 opacity-25 md:w-32" />
      <div className="relative z-10 mx-auto grid max-w-editorial items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        {/* Portrait */}
        <Reveal y={32} className="order-1 md:order-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <SmartImage
              src="/images/about/sia-portrait.jpeg"
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
                Welcome! I&rsquo;m Vasia, a Toronto-based freelance makeup
                artist with over a decade of experience specializing in bridal,
                photography and event makeup — allowing me to work with various
                ethnicities, textures and skin types. My style blends
                cutting-edge beauty trends with classic techniques, working
                across print, fashion and editorial.
              </p>
              <p>
                I believe makeup should be fun, accessible and personal. From
                the moment you sit in my chair to after you&rsquo;ve left, my
                goal is to make you feel confident in your skin and excited to
                walk out into the world, highlighting your beautiful features.
              </p>
              <p>
                Having a visual arts background, I draw inspiration from the
                countries I visit to the colors and textures in my local
                garden. When I&rsquo;m not working you can find me at music
                festivals, hiking or painting in my backyard!
              </p>
              <p>
                Working freelance means it&rsquo;s just you and me — unhurried,
                collaborative and entirely about the result. I travel across
                Toronto, the GTA and beyond — kit in hand, ready for whatever
                the day asks.
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
