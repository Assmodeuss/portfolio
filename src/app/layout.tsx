import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratyush — Design Portfolio",
  description:
    "Design student at Shiv Nadar University. Typography, motion, and digital craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
