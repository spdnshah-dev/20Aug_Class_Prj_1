import type { Config } from "tailwindcss";

// Design tokens from the build spec (section 2). The colour values themselves
// live as CSS variables in app/globals.css — change them there, not here.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        muted: "var(--muted)",
        brand: "var(--brand)",
        "brand-hover": "var(--brand-hover)",
        "brand-tint": "var(--brand-tint)",
        "on-brand-muted": "var(--on-brand-muted)",
        whatsapp: "var(--whatsapp)",
        star: "var(--star)",
        "footer-text": "var(--footer-text)",
        "footer-muted": "var(--footer-muted)",
        "footer-line": "var(--footer-line)",
        "placeholder-bg": "var(--placeholder-bg)",
        "placeholder-border": "var(--placeholder-border)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Segoe UI", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Segoe UI", "system-ui", "sans-serif"],
      },
      screens: {
        // The header switches to the menu button below this width.
        nav: "900px",
      },
      borderRadius: {
        btn: "10px",
        card: "16px",
      },
    },
  },
};

export default config;
