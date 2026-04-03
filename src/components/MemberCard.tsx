"use client";

import Image from "next/image";

import type { Member } from "@/data/members";
import { User } from "@/types/user";

const accentMap = {
  indigo: {
    cardHover:
      "hover:border-accent/40 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.2)]",
    imgHover: "group-hover:border-accent/60",
    npmHover: "group-hover:text-accent",
    deptColor: "text-accent",
    iconHover: "hover:border-accent hover:text-accent",
    scanline: "bg-gradient-to-r from-transparent via-accent to-transparent",
  },
  cyan: {
    cardHover:
      "hover:border-neon-cyan/40 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.2)]",
    imgHover: "group-hover:border-neon-cyan/60",
    npmHover: "group-hover:text-neon-cyan",
    deptColor: "text-neon-cyan",
    iconHover: "hover:border-neon-cyan hover:text-neon-cyan",
    scanline: "bg-gradient-to-r from-transparent via-neon-cyan to-transparent",
  },
  emerald: {
    cardHover:
      "hover:border-neon-emerald/40 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)]",
    imgHover: "group-hover:border-neon-emerald/60",
    npmHover: "group-hover:text-neon-emerald",
    deptColor: "text-neon-emerald",
    iconHover: "hover:border-neon-emerald hover:text-neon-emerald",
    scanline:
      "bg-gradient-to-r from-transparent via-neon-emerald to-transparent",
  },
} as const;

export default function UserCard({ user }: { user: User }) {
  const accentKey = user.accent?.toLowerCase().trim() as keyof typeof accentMap;
  const a = accentMap[accentKey];

  return (
    <div className={`glass-card group flex h-full flex-col p-8 ${a.cardHover}`}>
      <div className={`scanline ${a.scanline}`} />

      <div className="mb-8 flex items-start justify-between">
        <div
          className={`h-20 w-20 overflow-hidden border border-white/10 bg-zinc-900 grayscale transition-all group-hover:grayscale-0 ${a.imgHover}`}
        >
          <Image
            src={user.img_url}
            alt={user.fname}
            width={80}
            height={80}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex flex-col items-end">
            <span className="font-label text-[9px] text-zinc-500">NPM_ID</span>
            <span
              className={`font-label text-sm text-white transition-colors ${a.npmHover}`}
            >
              {user.npm || "-"}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label text-[9px] text-zinc-500">
              DEPARTMENT
            </span>
            <span
              className={`font-label text-[10px] font-bold uppercase ${a.deptColor}`}
            >
              {user.prodi || "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-1 text-2xl font-bold transition-transform group-hover:translate-x-1">
          {user.fname + " " + user.lname || "-"}
        </h3>
        <p className="font-label text-xs text-zinc-500">{user.uname}</p>
      </div>

      <p className="text-on-surface-variant mb-8 line-clamp-3 text-sm">
        {user.bio || "No bio available."}
      </p>

      <div className="mt-auto space-y-4 border-t border-white/5 pt-6">
        <div className="font-label flex justify-between text-[11px]">
          <span className="text-zinc-600">ORIGIN</span>
          <span className="text-white">{user.birth_location || "-"}</span>
        </div>

        
        <div className="flex gap-2 pt-4">
          {user.url_social && user.url_social.length > 0 && (
          <>
            <a
              href="#"
              className={`flex h-8 w-8 items-center justify-center border border-white/10 transition-colors ${a.iconHover}`}
            >
              <span className="material-symbols-outlined text-sm">
                {user.url_social?.[0]}
              </span>
            </a>
            <a
              href="#"
              className={`flex h-8 w-8 items-center justify-center border border-white/10 transition-colors ${a.iconHover}`}
            >
              <span className="material-symbols-outlined text-sm">
                {user.url_social?.[1]}
              </span>
            </a>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
