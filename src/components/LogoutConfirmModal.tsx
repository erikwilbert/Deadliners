"use client";

import { signOut } from "next-auth/react";

export default function LogoutConfirmModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card flex w-full max-w-sm flex-col gap-4 rounded-none border border-red-500/20 bg-zinc-950 p-6 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
            <span className="material-symbols-outlined text-red-500">warning</span>
          </div>
          <div>
            <span className="font-label mb-1 block text-[10px] text-zinc-500">
              SYSTEM_AUTH
            </span>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Confirm Logout
            </h4>
          </div>
        </div>

        <p className="text-sm font-medium text-white/70">
          Are you sure you want to terminate your current session?
        </p>

        <div className="mt-2 text-[10px] grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="font-label w-full border border-white/10 py-3 font-bold tracking-widest text-white transition-colors hover:bg-white/5 active:scale-95"
          >
            CANCEL
          </button>
          <button
            onClick={() => signOut()}
            className="font-label w-full bg-red-500 py-3 font-bold tracking-widest text-white transition-colors hover:bg-red-600 active:scale-95"
          >
            TERMINATE
          </button>
        </div>
      </div>
    </div>
  );
}
