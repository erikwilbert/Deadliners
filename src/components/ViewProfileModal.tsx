"use client";

import Image from "next/image";
import {
  getSocialPlatformMeta,
  normalizeSocialHref,
  parseSocialLinks,
} from "@/lib/social";
import type { User, UserAccent } from "@/types/user";

const accentMap = {
  indigo: {
    text: "text-accent",
    border: "border-accent/40",
    bg: "bg-accent/10",
  },
  cyan: {
    text: "text-neon-cyan",
    border: "border-neon-cyan/40",
    bg: "bg-neon-cyan/10",
  },
  emerald: {
    text: "text-neon-emerald",
    border: "border-neon-emerald/40",
    bg: "bg-neon-emerald/10",
  },
} as const;

export default function ViewProfileModal({
  user,
  open,
  onClose,
}: {
  user: User;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const accentKey = user.accent?.toLowerCase().trim() as keyof typeof accentMap;
  const a = accentMap[accentKey] ?? accentMap.indigo;
  const socialLinks = parseSocialLinks(user.url_social);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-card flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-none border-white/10 bg-zinc-950/95 relative"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`scanline bg-gradient-to-r from-transparent via-${accentKey === 'cyan' ? 'neon-cyan' : accentKey === 'emerald' ? 'neon-emerald' : 'accent'} to-transparent opacity-100`} />

        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-label text-[10px] tracking-[0.25em] text-zinc-500 uppercase">
                Profile Directory
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-white flex items-center gap-3">
                {user.fname} {user.lname}
                {user.prodi && (
                  <span className={`font-label text-[10px] uppercase border px-2 py-1 ${a.border} ${a.text} ${a.bg}`}>
                    {user.prodi}
                  </span>
                )}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">@{user.uname}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-400 transition-colors hover:border-white/40 hover:text-white"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-col overflow-y-auto">
          <div className="grid gap-6 px-6 py-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="space-y-4">
              <div className={`overflow-hidden border border-white/10 bg-zinc-900 ${a.border}`}>
                {user.img_url ? (
                  <Image
                    src={user.img_url}
                    alt={`${user.fname} ${user.lname}`.trim() || "Profile"}
                    width={240}
                    height={240}
                    className="aspect-square h-auto w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-white/30">
                      account_circle
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-4 border border-white/10 bg-black/30 p-4">
                 <div className="text-sm">
                   <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                     Email
                   </p>
                   <p className="mt-1 break-all text-white">{user.gmail}</p>
                 </div>
                 
                 <div className="border-t border-white/10 pt-4 text-sm">
                   <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                     NPM
                   </p>
                   <p className="mt-1 text-white">{user.npm || "-"}</p>
                 </div>
                 
                 <div className="border-t border-white/10 pt-4 text-sm">
                   <p className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                     Origin
                   </p>
                   <p className="mt-1 text-white">{user.birth_location || "-"}</p>
                 </div>
              </div>
            </aside>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                  Biography
                </span>
                <div className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white text-sm leading-relaxed min-h-[5rem]">
                  {user.bio || <span className="text-zinc-600 italic">No biography provided.</span>}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                    Gender
                  </span>
                  <div className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white text-sm">
                    {user.gender || "-"}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                    Birth Date
                  </span>
                  <div className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white text-sm">
                    {user.birth_date ? new Date(user.birth_date).toLocaleDateString() : "-"}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                    Relationship Status
                  </span>
                  <div className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white text-sm capitalize">
                    {user.status_relationship || "-"}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                    Phone
                  </span>
                  <div className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white text-sm">
                    {user.phone || "-"}
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                    Address
                  </span>
                  <div className="w-full border border-white/10 bg-black/30 px-4 py-3 text-white text-sm">
                    {user.address || "-"}
                  </div>
                </div>
              </div>

              {socialLinks.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="font-label text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mt-4">
                    Social References
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => {
                      const platform = getSocialPlatformMeta(link.platform);
                      return (
                        <a
                          key={`${link.platform}-${link.url}`}
                          href={normalizeSocialHref(link.url)}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={platform.label}
                          title={platform.label}
                          className="flex items-center gap-2 border border-white/10 bg-black/30 px-4 py-3 text-sm text-white transition-colors hover:border-white/30"
                        >
                          <span className={`material-symbols-outlined text-lg ${a.text}`}>
                            {platform.icon}
                          </span>
                          <span className="hidden sm:inline-block truncate max-w-[150px]">
                            {link.url}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
