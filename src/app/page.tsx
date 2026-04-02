import MemberCard from "@/components/MemberCard";
import Navbar from "@/components/Navbar";
import ThemeCustomizer from "@/components/ThemeCustomizer";
import { members } from "@/data/members";

export default function Home() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-neon-cyan/10 blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative mx-auto max-w-screen-xl px-6 pt-32 pb-24">
        <section className="relative mb-32 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="font-label text-[10px] tracking-[0.2em] text-white/80">
              TUGAS KELOMPOK 2 | PKPL 2025/2026
            </span>
          </div>

          <h1 className="mb-8 text-6xl leading-tight font-black tracking-tighter md:text-8xl">
            Welcome to <br />
            <span className="bg-gradient-to-r from-white via-accent to-neon-cyan bg-clip-text text-transparent">
              Deadliners.
            </span>
          </h1>

          <p className="text-on-surface-variant mb-12 max-w-2xl text-lg leading-relaxed font-light">
            A technical collective environment secured by OAuth 2.0. Bridging
            the architectural gap with high-fidelity system execution.
          </p>

          <div className="glass-card group flex w-full max-w-xl items-center gap-3 rounded-none border-white/10 p-4 text-left">
            <span className="font-label text-accent">system@deadliners:~$</span>
            <div className="flex items-center">
              <span className="text-white">
                authenticate --provider google
              </span>
              <span className="ml-1 h-4 w-2 animate-pulse bg-neon-cyan" />
            </div>
          </div>
        </section>

        <section
          id="members"
          className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </section>
      </main>

      <div className="pointer-events-none fixed top-24 left-6 hidden xl:block">
        <div className="glass-card space-y-1 border-accent/20 bg-black/40 px-4 py-2 text-[9px] font-label">
          <div className="flex gap-4">
            <span className="text-zinc-500">CPU</span>
            <span className="text-white">12.4%</span>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-500">MEM</span>
            <span className="text-white">1.2GB</span>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-500">LOG</span>
            <span className="text-neon-emerald">CONNECTED</span>
          </div>
        </div>
      </div>

      <ThemeCustomizer />

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
    </>
  );
}
