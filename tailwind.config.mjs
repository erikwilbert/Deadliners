const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#6366f1",
        "neon-cyan": "#06b6d4",
        "neon-emerald": "#10b981",
        surface: "#000000",
        "surface-container": "#0a0a0b",
        background: "#000000",
        "on-surface": "#e2e2e2",
        "on-surface-variant": "#a1a1aa",
      },
      fontFamily: {
        headline: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        label: ["var(--font-space-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
