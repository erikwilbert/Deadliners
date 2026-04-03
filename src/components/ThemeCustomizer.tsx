"use client";

import { useState } from "react";

const themes = ["STITCH", "GEIST", "LINEAR", "AZURE"] as const;

export default function ThemeCustomizer() {
  const [activeTheme, setActiveTheme] = useState("STITCH");

  return (
    <div className="group fixed right-6 bottom-6 z-[100]">
      <div className="glass-card absolute right-0 bottom-16 hidden w-64 flex-col gap-4 rounded-none border-white/10 bg-zinc-950/90 p-6 shadow-2xl group-hover:flex">
        <div className="border-b border-white/10 pb-3">
          <span className="font-label mb-1 block text-[10px] text-zinc-500">
            THEME_CUSTOMIZER
          </span>
          <h4 className="text-xs font-bold tracking-widest text-white uppercase">
            Deadliners System v1.0
          </h4>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <span className="font-label text-[9px] text-zinc-600">
              APPEARANCE
            </span>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setActiveTheme(theme)}
                  className={`font-label rounded-none px-3 py-1 text-[10px] font-bold transition-colors ${
                    activeTheme === theme
                      ? "bg-accent text-white"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-label text-[9px] text-zinc-600">
              TYPOGRAPHY
            </span>
            <button className="font-label flex w-full items-center justify-between border border-white/10 px-3 py-2 text-[10px] text-white transition-colors hover:border-accent/40 hover:bg-accent/10">
              SANS_SERIF
              <span className="material-symbols-outlined text-xs text-accent">
                toggle_on
              </span>
            </button>
          </div>
        </div>

        <button className="w-full bg-accent py-2 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-accent/90 active:scale-95">
          Save Configuration
        </button>
      </div>

      <button className="flex h-14 w-14 items-center justify-center bg-gradient-to-br from-accent to-neon-cyan text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-90">
        <span className="material-symbols-outlined">settings</span>
      </button>
    </div>
  );
}
