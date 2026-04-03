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
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "neon-cyan": "rgb(var(--color-neon) / <alpha-value>)",
        "neon-emerald": "#10b981",
        surface: "#000000",
        "surface-container": "#0a0a0b",
        background: "#000000",
        "on-surface": "#e2e2e2",
        "on-surface-variant": "#a1a1aa",
      },
      fontFamily: {
        headline: ["var(--font-global, Arial)", "sans-serif"],
        body: ["var(--font-global, Arial)", "sans-serif"],
        label: ["var(--font-global, Arial)", "monospace"],
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
