"use client";

import { useState, useRef, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

import type { User } from "@/types/user";
import SettingsModal from "./SettingsModal";
import LogoutConfirmModal from "./LogoutConfirmModal";
import DeleteAccountConfirmModal from "./DeleteAccountConfirmModal";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName =
    currentUser && (currentUser.fname || currentUser.lname)
      ? `${currentUser.fname} ${currentUser.lname}`.trim()
      : session?.user?.name || "Profile";
  const avatarSrc = currentUser?.img_url || session?.user?.image;
  
  // If currentUser is truthy, we assume admin
  const isAdmin = !!currentUser;

  // Handle clicking outside to close Dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
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
              <div className="relative flex items-center justify-center" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="group flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-zinc-900 transition-all hover:border-accent/40 active:scale-95"
                >
                  {avatarSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarSrc}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-white/40 group-hover:text-white/60 transition-colors">
                      account_circle
                    </span>
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-14 w-48 rounded-md border border-white/10 bg-zinc-900 py-1 shadow-2xl">
                    <div className="border-b border-white/10 px-4 py-2">
                      <span className="block truncate text-xs font-bold text-white">
                        {displayName}
                      </span>
                      <span className="block text-[10px] text-white/50">
                        {isAdmin ? "Administrator" : "Guest User"}
                      </span>
                    </div>

                    {isAdmin ? (
                      <>
                        <button
                          type="button"
                          disabled={isEditDisabled}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            onEditProfile();
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-white/80 transition-colors hover:bg-white/5 disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          Update Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setIsSettingsOpen(true);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-white/80 transition-colors hover:bg-white/5"
                        >
                          <span className="material-symbols-outlined text-[16px]">settings</span>
                          Setting Page
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setIsDeleteOpen(true);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-bold text-red-500 transition-colors hover:bg-red-500/10"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          Delete Account
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            setIsLogoutOpen(true);
                          }}
                          className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-bold text-red-500 transition-colors hover:bg-red-500/10"
                        >
                          <span className="material-symbols-outlined text-[16px]">logout</span>
                          Sign out
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsLogoutOpen(true);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-bold text-red-500 transition-colors hover:bg-red-500/10"
                      >
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        Sign out
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <SettingsModal open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <LogoutConfirmModal open={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
      {currentUser?.id && <DeleteAccountConfirmModal open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} userId={currentUser.id} />}
    </>
  );
}
