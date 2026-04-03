"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const APPEARANCES = ["STITCH", "GEIST", "LINEAR", "AZURE", "EMERALD", "CRIMSON"] as const;
const FONTS = ["Arial", "Comic Sans", "Calibri", "Times New Roman", "Poppins", "Helvetica", "Montserrat", "Consolas"] as const;

export default function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { appearance, typography, refreshSettings } = useTheme();
  
  const [activeTheme, setActiveTheme] = useState(appearance);
  const [activeFont, setActiveFont] = useState(typography);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveTheme(appearance);
  }, [appearance]);

  useEffect(() => {
    setActiveFont(typography);
  }, [typography]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (activeTheme !== appearance) {
        await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "appearance", value: activeTheme }),
        });
      }
      
      if (activeFont !== typography) {
         await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "typography", value: activeFont }),
        });
      }

      await refreshSettings();
      onClose();
    } catch (e) {
      console.error("Failed to save settings", e);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card flex w-full max-w-sm flex-col gap-4 rounded-none border border-white/10 bg-zinc-950 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="font-label mb-1 block text-[10px] text-zinc-500">
              THEME_CUSTOMIZER
            </span>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Deadliners System v1.0
            </h4>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 transition-colors hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <span className="font-label text-[9px] text-zinc-600">
              APPEARANCE MAPPING
            </span>
            <div className="grid grid-cols-2 gap-2">
              {APPEARANCES.map((themeName) => (
                <button
                  key={themeName}
                  onClick={() => setActiveTheme(themeName)}
                  className={`font-label rounded-none px-3 py-2 text-[10px] font-bold transition-colors ${
                    activeTheme === themeName
                      ? "bg-accent text-white"
                      : "text-zinc-500 hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                >
                  {themeName}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-label text-[9px] text-zinc-600">
              TYPOGRAPHY MAPPING
            </span>
            <div className="grid grid-cols-2 gap-2">
              {FONTS.map((fontName) => (
                <button
                  key={fontName}
                  onClick={() => setActiveFont(fontName)}
                  className={`font-label rounded-none px-3 py-2 text-[8px] font-bold transition-colors ${
                    activeFont === fontName
                      ? "bg-accent text-white"
                      : "text-zinc-500 hover:text-white hover:bg-white/5 border border-white/5"
                  }`}
                >
                  {fontName.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-2 w-full bg-accent py-3 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-accent/90 active:scale-95 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    </div>
  );
}
