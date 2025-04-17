import type { Metadata } from "next";
import { Toaster } from "sonner";
import Providers from "../components/providers";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linktra - AI-Powered Link Management",
  description:
    "Transform your digital presence with smart links that adapt, predict, and evolve with your audience using our AI-powered link management platform.",
  keywords: [
    "link management",
    "AI analytics",
    "smart links",
    "audience insights",
    "digital presence",
  ],
  authors: [{ name: "Linktra Team" }],
  creator: "Linktra",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className="isolate">
          {children}
          <Toaster />
          <Analytics />
        </body>
      </html>
    </Providers>
  );
}
