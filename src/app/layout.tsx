import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, Shantell_Sans } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  // Next has no metrics for this family to build an adjusted fallback from.
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  axes: ["BNCE", "INFM"],
});

export const metadata: Metadata = {
  title: {
    default: "Rick & Morty Explorer",
    template: "%s | Rick & Morty Explorer",
  },
  description:
    "Browse, search and filter every character from Rick and Morty, powered by the Rick and Morty GraphQL API.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${atkinson.variable} ${shantell.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip">
        <div aria-hidden className="space-backdrop" />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
