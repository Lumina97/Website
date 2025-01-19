import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import I18nProvider from "@/components/i18n/I18nProvider";
import { LanguagePicker } from "@/components/languagePicker";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Erik Nivala",
  description: "Portfolio of Erik Nivala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <I18nProvider>
          <div className="absolute top-0 inset-0 -z-10 h-full min-w-full bg-black bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,0,255,0.15)_0,rgba(0,0,255,0)_50%,rgba(0,0,255,0)_100%)]"></div>
          {children}
          <LanguagePicker />
        </I18nProvider>
      </body>
    </html>
  );
}
