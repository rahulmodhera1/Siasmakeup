"use client";

import { useEffect, useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Music2, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { Sprig } from "./Sprig";
import { brand, eventTypes } from "@/lib/content";

// ----------------------------------------------------------------------------
//  CONTACT FORM DELIVERY  —  Formspree (inbox delivery), mailto fallback
//  ---------------------------------------------------------------------------
//  Submissions are delivered straight to an inbox via Formspree.
//
//  SETUP (one step):
//    1. Create a free form at https://formspree.io (use Siasmakeup@hotmail.com).
//    2. Paste the endpoint it gives you below  — e.g. "https://formspree.io/f/abcdwxyz".
//       (Or, instead of editing code, set NEXT_PUBLIC_FORMSPREE_ENDPOINT in your
//        Vercel project settings — either source works.)
//
//  Until an endpoint is set, the form gracefully falls back to opening the
//  visitor's email client pre-filled to Siasmakeup@hotmail.com, so the site is
//  always functional and deploys to Vercel with zero config.
// ----------------------------------------------------------------------------
const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? ""; // ← paste your Formspree endpoint here

type Status = "idle" | "submitting" | "success";

export function Contact() {
  const [eventType, setEventType] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");

  // Pricing "Enquire" buttons dispatch this to pre-select a relevant type.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const subject = (e as CustomEvent<string>).detail?.toLowerCase() ?? "";
      const match = eventTypes.find((t) => subject.includes(t.toLowerCase()));
      if (match) setEventType(match);
    };
    window.addEventListener("prefill-enquiry", onPrefill);
    return () => window.removeEventListener("prefill-enquiry", onPrefill);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const type = String(data.get("eventType") ?? "");
    const date = String(data.get("date") ?? "");
    const message = String(data.get("message") ?? "");

    // --- Option A: Formspree (real inbox delivery) ---
    if (FORMSPREE_ENDPOINT) {
      setStatus("submitting");
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        if (res.ok) {
          form.reset();
          setEventType("");
          setStatus("success");
          return;
        }
      } catch {
        /* fall through to mailto below */
      }
    }

    // --- Option B (default): mailto compose ---
    const subject = encodeURIComponent(
      `${type ? type + " inquiry" : "Makeup inquiry"} — ${name || "New inquiry"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nEvent type: ${type}\nDate: ${date}\n\n${message}`
    );
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    setStatus("success");
  }

  const inputClass =
    "w-full border-b border-stone/40 bg-transparent py-3 text-sm text-ink placeholder:text-stone/70 focus:border-clay focus:outline-none transition-colors";

  return (
    <section id="contact" className="relative overflow-hidden bg-bone py-24 md:py-32">
      <Sprig className="-left-10 bottom-8 w-28 opacity-20 md:w-36" flip />
      <div className="relative z-10 mx-auto grid max-w-editorial gap-14 px-6 md:grid-cols-[5fr_6fr] md:gap-20 md:px-10">
        {/* Left: invitation + direct details */}
        <div>
          <Reveal>
            <p className="eyebrow">Get in Touch</p>
            <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-ink md:text-5xl">
              Let's create something beautiful together.
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-charcoal/80">
              Tell me about your day — the date, the vibe, the people. I'll reply
              personally with availability and a tailored quote.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 space-y-5">
              <a
                href={`mailto:${brand.email}`}
                className="group flex items-center gap-4 text-ink"
              >
                <Mail strokeWidth={1.25} className="h-5 w-5 shrink-0 text-clay" />
                <span className="underline-grow break-all font-serif text-xl font-light md:text-2xl">
                  {brand.email}
                </span>
              </a>

              <a
                href={brand.phoneHref}
                className="group flex items-center gap-4 text-charcoal"
              >
                <Phone strokeWidth={1.25} className="h-5 w-5 shrink-0 text-clay" />
                <span className="underline-grow text-sm font-light tracking-wide">
                  {brand.phone}
                </span>
              </a>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
                <a
                  href={brand.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-charcoal"
                >
                  <Instagram strokeWidth={1.25} className="h-5 w-5 text-clay" />
                  <span className="underline-grow text-sm font-light tracking-wide">
                    {brand.instagramHandle}
                  </span>
                </a>
                <a
                  href={brand.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-charcoal"
                >
                  <Music2 strokeWidth={1.25} className="h-5 w-5 text-clay" />
                  <span className="underline-grow text-sm font-light tracking-wide">
                    {brand.tiktokHandle}
                  </span>
                </a>
                <a
                  href={brand.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-charcoal"
                >
                  <Facebook strokeWidth={1.25} className="h-5 w-5 text-clay" />
                  <span className="underline-grow text-sm font-light tracking-wide">
                    {brand.facebookHandle}
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-4 pt-1 text-charcoal/80">
                <MapPin strokeWidth={1.25} className="h-5 w-5 shrink-0 text-clay" />
                <span className="text-sm font-light tracking-wide">
                  Based in {brand.location} · {brand.serviceArea}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.15}>
          {status === "success" ? (
            <div className="grain flex h-full min-h-[20rem] flex-col items-center justify-center border border-stone/20 bg-concrete/40 p-10 text-center">
              <p className="font-serif text-3xl font-light text-ink">Thank you.</p>
              <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-charcoal/80">
                Your inquiry is on its way to {brand.email}. I'll be in touch
                personally, usually within a day or two.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 text-xs uppercase tracking-eyebrow text-clay underline-grow"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Formspree: nicer inbox subject + honeypot spam trap. */}
              <input
                type="hidden"
                name="_subject"
                value={`New ${eventType || "makeup"} inquiry — ${brand.name}`}
              />
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="eyebrow text-stone">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={`mt-2 ${inputClass}`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow text-stone">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    className={`mt-2 ${inputClass}`}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="eventType" className="eyebrow text-stone">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className={`mt-2 cursor-pointer ${inputClass}`}
                  >
                    <option value="">Select…</option>
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="eyebrow text-stone">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className={`mt-2 cursor-pointer ${inputClass}`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="eyebrow text-stone">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me a little about what you're planning…"
                  className={`mt-2 resize-none ${inputClass}`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-full bg-ink px-7 py-4 text-xs uppercase tracking-eyebrow text-bone transition-all duration-300 ease-out-expo hover:bg-clay active:scale-[0.99] disabled:opacity-60 sm:w-auto sm:px-12"
              >
                {status === "submitting" ? "Sending…" : "Send Inquiry"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
