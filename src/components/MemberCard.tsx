"use client";

import Image from "next/image";
import { useState } from "react";

import SocialPlatformIcon from "./SocialPlatformIcon";
import ViewProfileModal from "./ViewProfileModal";

import {
  getSocialPlatformMeta,
  normalizeSocialHref,
  parseSocialLinks,
} from "@/lib/social";
import type { User } from "@/types/user";
import { getAccentRgb } from "@/types/user";

export default function UserCard({ user }: { user: User }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const socialLinks = parseSocialLinks(user.url_social);

  return (
    <>
    <div
      className="glass-card group flex h-full flex-col p-8 cursor-pointer hover:-translate-y-1 hover:border-user-accent/40 hover:shadow-[0_10px_40px_-10px_rgb(var(--color-user-accent)/0.2)]"
      style={{ "--color-user-accent": getAccentRgb(user.accent) } as React.CSSProperties}
      onClick={() => setIsModalOpen(true)}
    >
      <div className="scanline bg-gradient-to-r from-transparent via-user-accent to-transparent" />

      <div className="mb-8 flex items-start justify-between">
        <div
          className="h-20 w-20 overflow-hidden border border-white/10 bg-zinc-900 grayscale transition-all group-hover:grayscale-0 group-hover:border-user-accent/60"
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
              className="font-label text-sm text-white transition-colors group-hover:text-user-accent"
            >
              {user.npm || "-"}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label text-[9px] text-zinc-500">
              DEPARTMENT
            </span>
            <span
              className="font-label text-[10px] font-bold uppercase text-user-accent"
            >
              {user.prodi || "-"}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-1 text-2xl font-bold transition-transform group-hover:translate-x-1">
          {user.fname} {user.lname ? user.lname.charAt(0).toUpperCase() + "." : ""}
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
          {socialLinks.slice(0, 4).map((link) => {
            const platform = getSocialPlatformMeta(link.platform);

            return (
              <a
                key={`${link.platform}-${link.url}`}
                href={normalizeSocialHref(link.url)}
                target="_blank"
                rel="noreferrer"
                aria-label={platform.label}
                title={platform.label}
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center border border-white/10 transition-colors hover:border-user-accent hover:text-user-accent"
              >
                <SocialPlatformIcon platform={link.platform} className="h-3.5 w-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
    
    <ViewProfileModal user={user} open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
