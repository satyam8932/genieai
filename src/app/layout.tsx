import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

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
    <>
      <ClerkProvider>
        <html lang="en">
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <body className={inter.className}>{children}</body>
        </html>
      </ClerkProvider>
    </>
  );
}
