"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import type { User } from "@/types/user";

export default function Navbar({
  currentUser,
  onEditProfile,
  isEditDisabled,
}: {
  currentUser: User | null;
  onEditProfile: () => void;
  isEditDisabled: boolean;
}) {
  const { data: session } = useSession();
  const displayName =
    currentUser && (currentUser.fname || currentUser.lname)
      ? `${currentUser.fname} ${currentUser.lname}`.trim()
      : session?.user?.name || "Profile";
  const avatarSrc = currentUser?.img_url || session?.user?.image;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-headline text-xl font-bold tracking-tighter text-white uppercase">
              Deadliners
            </span>
          </div>
          <span className="font-label rounded-full border border-accent/30 bg-accent/5 px-2 py-0.5 text-[10px] font-bold tracking-widest text-accent">
            TK2
          </span>
        </div>

        <div className="flex items-center gap-6">
          {!session ? (
            <button
              onClick={() => signIn("google")}
              className="hidden items-center gap-2 rounded-full bg-accent px-6 py-2 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent/90 active:scale-95 md:flex"
            >
              <span className="material-symbols-outlined text-sm">login</span>
              Sign in with Google
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onEditProfile}
                disabled={isEditDisabled}
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-left transition-colors hover:border-accent/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-zinc-900">
                  {avatarSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarSrc}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-white/40">
                      account_circle
                    </span>
                  )}
                </div>
                <div className="hidden min-w-0 md:block">
                  <span className="font-label block truncate text-sm font-bold text-white/80">
                    {displayName}
                  </span>
                  <span className="font-label block text-[10px] tracking-[0.2em] text-accent uppercase">
                    {isEditDisabled ? "Syncing profile" : "Edit profile"}
                  </span>
                </div>
              </button>
              <button
                onClick={() => signOut()}
                className="hidden items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 shadow-lg transition-all duration-300 hover:bg-red-500/20 active:scale-95 md:flex"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
