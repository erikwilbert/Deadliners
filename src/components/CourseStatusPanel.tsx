"use client";

import { useEffect, useState } from "react";

const COURSE_URL = "https://scele.cs.ui.ac.id/course/view.php?id=4140";
const OPENED_LABEL = "Fri, 13 Mar 2026 | 00:00 WIB";
const DUE_LABEL = "Fri, 03 Apr 2026 | 23:59 WIB";

type ConnectionState = "checking" | "connected" | "disconnected";

function formatJakartaTime(value: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(value);

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${get("weekday")}, ${get("day")} ${get("month")} | ${get("hour")}:${get("minute")}:${get("second")} WIB`;
}

export default function CourseStatusPanel() {
  const [now, setNow] = useState<string | null>(null);
  const [status, setStatus] = useState<ConnectionState>("checking");

  useEffect(() => {
    let disposed = false;

    const updateClock = () => {
      setNow(formatJakartaTime(new Date()));
    };

    const checkCourseConnection = async () => {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        if (!disposed) {
          setStatus("disconnected");
        }
        return;
      }

      if (!disposed) {
        setStatus("checking");
      }

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 4000);

      try {
        await fetch(COURSE_URL, {
          method: "GET",
          mode: "no-cors",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!disposed) {
          setStatus("connected");
        }
      } catch {
        if (!disposed) {
          setStatus("disconnected");
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    const handleOnline = () => {
      void checkCourseConnection();
    };

    const handleOffline = () => {
      setStatus("disconnected");
    };

    updateClock();
    void checkCourseConnection();

    const clockInterval = window.setInterval(updateClock, 1000);
    const statusInterval = window.setInterval(() => {
      void checkCourseConnection();
    }, 30000);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      disposed = true;
      window.clearInterval(clockInterval);
      window.clearInterval(statusInterval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const statusClass =
    status === "connected"
      ? "text-neon-emerald"
      : status === "disconnected"
        ? "text-red-400"
        : "text-amber-300";

  const statusLabel =
    status === "connected"
      ? "CONNECTED"
      : status === "disconnected"
        ? "DISCONNECTED"
        : "CHECKING";

  return (
    <div className="fixed top-24 left-6 hidden xl:block">
      <a
        href={COURSE_URL}
        target="_blank"
        rel="noreferrer"
        className="glass-card block w-80 border-accent/20 bg-black/40 px-4 py-4 transition-colors hover:border-accent/35"
      >
        <div className="font-label mb-4 flex items-center justify-between text-[9px] tracking-[0.3em] text-accent uppercase">
          <span>PKPL Mission Feed</span>
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </div>

        <div className="space-y-2 font-label text-[11px]">
          <div className="grid grid-cols-[56px_1fr] gap-3">
            <span className="text-zinc-500">TASK</span>
            <span className="text-white">Tugas Kelompok 2</span>
          </div>
          <div className="grid grid-cols-[56px_1fr] gap-3">
            <span className="text-zinc-500">OPEN</span>
            <span className="text-white">{OPENED_LABEL}</span>
          </div>
          <div className="grid grid-cols-[56px_1fr] gap-3">
            <span className="text-zinc-500">DUE</span>
            <span className="text-white">{DUE_LABEL}</span>
          </div>
          <div className="grid grid-cols-[56px_1fr] gap-3">
            <span className="text-zinc-500">TIME</span>
            <span className="text-white">{now ?? "Syncing WIB clock..."}</span>
          </div>
          <div className="grid grid-cols-[56px_1fr] gap-3">
            <span className="text-zinc-500">LOG</span>
            <span className={statusClass}>{statusLabel}</span>
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-3">
          <span className="font-label text-[9px] tracking-[0.25em] text-zinc-500 uppercase">
            Click to open PKPL course
          </span>
        </div>
      </a>
    </div>
  );
}
