"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import CourseStatusPanel from "@/components/CourseStatusPanel";
import EditProfileModal from "@/components/EditProfileModal";
import MemberCard from "@/components/MemberCard";
import Navbar from "@/components/Navbar";
import useUsers from "@/hooks/useUsers";

export default function Home() {
  const { data: session } = useSession();
  const { users, loading } = useUsers();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const currentUser = session?.user?.id
    ? users.find((user) => user.id === session.user.id) || null
    : session?.user?.email
      ? users.find((user) => user.gmail === session.user.email) || null
      : null;

  const handleOpenEditModal = () => {
    if (!session) {
      return;
    }

    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-neon-cyan/10 blur-[120px]" />
      </div>

      <Navbar
        currentUser={currentUser}
        onEditProfile={handleOpenEditModal}
        isEditDisabled={!currentUser || loading}
      />

      <main className="relative mx-auto max-w-screen-xl px-6 pt-32 pb-24">
        <section className="relative mb-12 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="font-label text-[10px] tracking-[0.2em] text-white/80">
              TUGAS KELOMPOK 2 | PKPL 2025/2026
            </span>
          </div>

          <h1 className="mb-8 text-6xl leading-tight font-black tracking-tighter md:text-8xl">
            <span className="bg-gradient-to-r from-white via-accent to-neon-cyan bg-clip-text text-transparent">
              Deadliners
            </span>
          </h1>
        </section>

        <section
          id="members"
          className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {users.length === 0 && loading ? (
            <div className="glass-card col-span-full border-white/10 px-6 py-8 text-center">
              <span className="font-label text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                Syncing user directory...
              </span>
            </div>
          ) : (
            users.map((user) => <MemberCard key={user.id} user={user} />)
          )}
        </section>
      </main>

      <CourseStatusPanel />

      <footer className="w-full border-t border-white/5 bg-black py-12">
        <div className="font-label flex flex-col items-center justify-center space-y-4 text-[10px] tracking-widest uppercase">
          <div className="flex gap-8 text-zinc-600">
            <a href="#" className="transition-colors hover:text-accent">
              Documentation
            </a>
            <a href="#" className="transition-colors hover:text-neon-cyan">
              Repository
            </a>
            <a href="#" className="transition-colors hover:text-neon-emerald">
              Privacy
            </a>
          </div>
          <p className="text-zinc-500">
            &copy; 2025{" "}
            <span className="text-zinc-400">DEADLINERS COLLECTIVE</span>. PKPL
            2025/2026.
          </p>
        </div>
      </footer>

      <EditProfileModal
        open={isEditModalOpen}
        user={currentUser}
        onClose={handleCloseEditModal}
      />
    </>
  );
}
