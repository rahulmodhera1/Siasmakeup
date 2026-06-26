import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Sia's Makeup palette: industrial atelier meets earthy editorial ----
        bone: "#F4F1EC", // warm white background
        concrete: "#E4DFD6", // light concrete
        taupe: "#C9C0B2",
        stone: "#A89F90", // mid neutral
        charcoal: "#2B2926", // industrial charcoal
        ink: "#1A1917", // near-black text
        clay: "#A56A4E", // terracotta accent
        sand: "#CBA67C", // warm sand
        sage: "#7C8060", // earthy olive/green
        bronze: "#9A8467", // fine detail accent
      },
      fontFamily: {
        // Mapped to next/font CSS variables in app/layout.tsx
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.25em",
      },
      maxWidth: {
        editorial: "84rem",
      },
      transitionTimingFunction: {
        // Strong custom curves — built-in CSS easings are too weak.
        "out-expo": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-strong": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
