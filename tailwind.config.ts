import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Semantic tokens — pulled from CSS variables in globals.css so dark mode just works.
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        // Brand exact colors (used for gradients, glow, accents only).
        brand: {
          pink: "#fa66c6",
          magenta: "#d568d2",
          violet: "#a76be2",
          indigo: "#836dee",
          blue: "#5470fe",
          ink: "#00092d",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Editorial scale used for hero/section headlines.
        "display-2xl": ["clamp(3.25rem, 5.5vw + 1rem, 5.75rem)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(2.5rem, 4vw + 1rem, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2rem, 3vw + 0.75rem, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        glow: "0 0 60px 0 rgba(132, 109, 238, 0.45)",
        "glow-lg": "0 0 120px 0 rgba(132, 109, 238, 0.55)",
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
        card: "0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 12px 32px rgba(0, 0, 0, 0.18)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #fa66c6 0%, #a76be2 45%, #5470fe 100%)",
        "brand-soft":
          "radial-gradient(120% 80% at 50% 0%, rgba(250, 102, 198, 0.35), transparent 50%), radial-gradient(80% 70% at 80% 60%, rgba(84, 112, 254, 0.35), transparent 60%)",
        grid:
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "float-slow": "float-slow 8s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
