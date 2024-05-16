import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import Providers from "./Providers";
import { siteConfig } from "@/siteConfig";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.appName} ❤️ - Make money from donations. Start a Page and earn money with a unique generated link.`,
    template: `${siteConfig.appName} - %s`,
  },
  description:
    "Make money from donations. Start a Page and earn money with a unique generated link.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </main>
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
