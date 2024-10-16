import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Providers from "@/components/Provider";
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from "@vercel/speed-insights/next"  // Vercel speed insights
import ThemeProvider from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenieAI",
  description: "AI Tools SaaS Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ClerkProvider>
          <Providers>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
            {children}
            </ThemeProvider>
            <SpeedInsights />
            <Toaster />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}