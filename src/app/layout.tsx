/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter, Space_Mono } from "next/font/google";

import SessionWrapper from "@/components/SessionWrapper";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

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
      <body
        className={`${inter.variable} ${spaceMono.variable} font-body selection:bg-accent selection:text-white`}
      >
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
