import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Starfield from "@/components/Starfield";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars Motivator",
  description: "Star Wars Motivator App",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SessionProvider>
            <Starfield />
            <div className="app-shell">
              <ConditionalHeader />
              <Navbar />
              <main className="flex-grow w-full">{children}</main>
              <Footer />       
            </div>
          </SessionProvider>
      </body>
    </html>
  );
}
