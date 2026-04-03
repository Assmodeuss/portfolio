import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratyush — Portfolio",
  description:
    "A design student at Shiv Nadar University, obsessed with the convergence of typography, motion, and digital craftsmanship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@300;400;600&family=Space+Grotesk:wght@300;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background font-body selection:bg-primary/30 selection:text-primary no-scrollbar antialiased">
        {children}
      </body>
    </html>
  );
}
