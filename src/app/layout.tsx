import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BotIndex — Crypto Market Intelligence",
  description:
    "Predictive crypto intelligence. Whale divergence, convergence scoring, network momentum. Verifiable track record. Not data — insight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JXV4L9GJL6"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JXV4L9GJL6');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        {/* Landing page beacon — tracks pageviews via king-backend hit counter */}
        <img
          src="https://king-backend.fly.dev/api/botindex/beacon?page=botindex.dev"
          alt=""
          width={1}
          height={1}
          style={{ position: 'absolute', opacity: 0 }}
        />
      </body>
    </html>
  );
}
