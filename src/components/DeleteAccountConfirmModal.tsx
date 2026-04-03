"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import useUsers from "@/hooks/useUsers";

export default function DeleteAccountConfirmModal({
  open,
  onClose,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  userId: string;
}) {
  const { deleteUser } = useUsers();
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const confirmDelete = async () => {
    setSaving(true);
    try {
      await deleteUser(userId);
      await signOut({ callbackUrl: "/" });
    } catch (err) {
      console.error(err);
      setSaving(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-card flex w-full max-w-sm flex-col gap-4 rounded-none border border-red-500/20 bg-zinc-950 p-6 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
            <span className="material-symbols-outlined text-red-500">warning</span>
          </div>
          <div>
            <span className="font-label mb-1 block text-[10px] text-zinc-500">
              DANGER_ZONE
            </span>
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">
              Delete Account
            </h4>
          </div>
        </div>

        <p className="text-sm font-medium text-white/70">
          This will permanently destroy your user data. You cannot undo this action. Proceed?
        </p>

        <div className="mt-2 text-[10px] grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            disabled={saving}
            className="font-label w-full border border-white/10 py-3 font-bold tracking-widest text-white transition-colors hover:bg-white/5 active:scale-95 disabled:opacity-50"
          >
            CANCEL
          </button>
          <button
            onClick={confirmDelete}
            disabled={saving}
            className="font-label w-full flex items-center justify-center gap-2 bg-red-500 py-3 font-bold tracking-widest text-white transition-colors hover:bg-red-600 active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <span className="material-symbols-outlined animate-spin text-[14px]">progress_activity</span>
            ) : "TERMINATE"}
          </button>
        </div>
      </div>
    </div>
  );
}
