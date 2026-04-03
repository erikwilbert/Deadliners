"use client";

import { useState } from "react";

const themes = ["STITCH", "GEIST", "LINEAR", "AZURE"] as const;

export default function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeTheme, setActiveTheme] = useState("STITCH");

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
              APPEARANCE
            </span>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setActiveTheme(theme)}
                  className={`font-label rounded-none px-3 py-2 text-[10px] font-bold transition-colors ${
                    activeTheme === theme
                      ? "bg-accent text-white"
                      : "text-zinc-500 hover:text-white hover:bg-white/5 border border-white/5"
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
            <button className="font-label flex w-full items-center justify-between border border-white/10 px-3 py-3 text-[10px] text-white transition-colors hover:border-accent/40 hover:bg-accent/10">
              SANS_SERIF
              <span className="material-symbols-outlined text-xs text-accent">
                toggle_on
              </span>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full bg-accent py-3 text-[10px] font-bold tracking-widest text-white uppercase transition-all hover:bg-accent/90 active:scale-95"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}
