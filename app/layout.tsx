import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "HERPERT — ERP für Konstruktion & Fertigung",
  description: "ERP-System mit integriertem PDM, SolidWorks-Anbindung, BOM, Beschaffung, Produktion und intelligentem Email-Client. Von der Konstruktion bis zur Fertigung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
