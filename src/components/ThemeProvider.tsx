"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  appearance: string;
  typography: string;
  refreshSettings: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType>({
  appearance: "STITCH",
  typography: "Arial",
  refreshSettings: async () => {},
});

export const useTheme = () => useContext(ThemeContext);

const THEME_MAP: Record<string, { accent: string; neon: string }> = {
  STITCH: { accent: "99 102 241", neon: "6 182 212" }, // Indigo / Cyan
  GEIST: { accent: "250 250 250", neon: "161 161 170" }, // White / Zinc 
  LINEAR: { accent: "244 63 94", neon: "234 179 8" }, // Rose / Yellow
  AZURE: { accent: "59 130 246", neon: "139 92 246" }, // Blue / Violet
  EMERALD: { accent: "16 185 129", neon: "132 204 22" }, // Emerald / Lime
  CRIMSON: { accent: "239 68 68", neon: "249 115 22" }, // Red / Orange
};

const FONT_MAP: Record<string, string> = {
  "Arial": "Arial, sans-serif",
  "Comic Sans": "'Comic Sans MS', cursive, sans-serif",
  "Calibri": "Calibri, sans-serif",
  "Times New Roman": "'Times New Roman', Times, serif",
  "Poppins": "'Poppins', sans-serif",
  "Helvetica": "Helvetica, Arial, sans-serif",
  "Montserrat": "'Montserrat', sans-serif",
  "Consolas": "Consolas, 'Courier New', monospace",
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState("STITCH");
  const [typography, setTypography] = useState("Arial");

  const refreshSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.appearance) setAppearance(data.appearance);
        if (data.typography) setTypography(data.typography);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const loadInitialSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.appearance) setAppearance(data.appearance);
          if (data.typography) setTypography(data.typography);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadInitialSettings();
  }, []);

  useEffect(() => {
    const colors = THEME_MAP[appearance] || THEME_MAP.STITCH;
    document.documentElement.style.setProperty("--color-accent", colors.accent);
    document.documentElement.style.setProperty("--color-neon", colors.neon);

    const fontString = FONT_MAP[typography] || FONT_MAP.Arial;
    document.documentElement.style.setProperty("--font-global", fontString);

    const existingLink = document.getElementById("google-font-dynamic");
    if (existingLink) {
      existingLink.remove();
    }

    if (typography === "Poppins") {
      const link = document.createElement("link");
      link.id = "google-font-dynamic";
      link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    } else if (typography === "Montserrat") {
      const link = document.createElement("link");
      link.id = "google-font-dynamic";
      link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, [appearance, typography]);

  return (
    <ThemeContext.Provider value={{ appearance, typography, refreshSettings }}>
      {children}
    </ThemeContext.Provider>
  );
}
