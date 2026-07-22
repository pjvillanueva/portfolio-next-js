import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway, Syne } from "next/font/google";
import "@fontsource/bitcount-prop-double-ink/500.css";
import "@fontsource/bitcount-prop-double-ink/700.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["200", "500"],
  display: "swap",
  preload: true,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Paul James Villanueva - Full-Stack Developer Portfolio",
  description:
    "Full-Stack Software Developer with over 6 years of experience building high-quality mobile and web applications. Primary expertise in Flutter, with Node.js, Django, .NET, and Angular.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} ${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
