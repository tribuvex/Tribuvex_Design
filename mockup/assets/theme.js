/**
 * Tribuvex Tailwind CDN theme.
 * Source of truth for hex values: design-system/tribuvex/tokens.css
 * (primitive --tvx-* → semantic --primary / --background / …).
 * Dark mode surfaces & semantic pairs are overridden in app.css to match .dark in tokens.css
 * (CDN utilities bake light hex at build-time).
 */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* tokens.css :root semantic */
        primary: { DEFAULT: "#1E3A5F", hover: "#254A73", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "#2563EB", hover: "#3B82F6", foreground: "#FFFFFF" },
        accent: { DEFAULT: "#16A34A", hover: "#15803D", foreground: "#FFFFFF" },
        warning: { DEFAULT: "#D97706", subtle: "#FFEDD5", foreground: "#B45309" },
        destructive: {
          DEFAULT: "#DC2626",
          hover: "#B91C1C",
          subtle: "#FEE2E2",
          foreground: "#FFFFFF",
        },
        success: { subtle: "#DCFCE7", foreground: "#15803D" },
        info: { subtle: "#DBEAFE", foreground: "#1E40AF" },
        background: "#F8FAFC",
        foreground: "#0F172A",
        card: { DEFAULT: "#FFFFFF", foreground: "#0F172A" },
        muted: { DEFAULT: "#E9EEF5", foreground: "#475569" },
        border: "#CBD5E1",
        ring: "#1E3A5F",
        sidebar: { DEFAULT: "#1E3A5F", foreground: "#FFFFFF" },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        tribuvex: "0 4px 6px rgb(15 23 42 / 0.08)",
        "tribuvex-lg": "0 10px 15px rgb(15 23 42 / 0.10)",
      },
    },
  },
};
