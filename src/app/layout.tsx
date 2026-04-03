/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";

import SessionWrapper from "@/components/SessionWrapper";
import ThemeProvider from "@/components/ThemeProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Deadliners | PKPL 2025/2026",
  description:
    "A technical collective environment secured by OAuth 2.0. Tugas Kelompok 2 - PKPL 2025/2026.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="font-body selection:bg-accent selection:text-white">
        <SessionWrapper>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
