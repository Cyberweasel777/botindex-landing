import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BaseRadar — Crypto Ecosystem Velocity Intelligence",
  description:
    "Track which chains and tokens are gaining momentum before the market prices it in. Free velocity scoring across Solana, Base, and Ethereum, updated every 5 minutes.",
  openGraph: {
    title: "BaseRadar — Crypto Ecosystem Velocity Intelligence",
    description:
      "Track which chains and tokens are gaining momentum before the market prices it in. Free velocity scoring across Solana, Base, and Ethereum, updated every 5 minutes.",
    url: "https://baseradar.app",
    siteName: "BaseRadar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BaseRadar — Crypto Ecosystem Velocity Intelligence",
    description:
      "Track which chains and tokens are gaining momentum before the market prices it in. Free velocity scoring across Solana, Base, and Ethereum, updated every 5 minutes.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BaseRadar",
    url: "https://baseradar.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://baseradar.app/rankings?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BaseRadar",
    url: "https://baseradar.app",
    description:
      "BaseRadar is a free crypto ecosystem velocity tracker monitoring token momentum across Solana, Base, and Ethereum.",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I spot which crypto ecosystems are growing before price moves?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BaseRadar tracks real-time token velocity across Solana, Base, and Ethereum to rank ecosystems showing SURGE or RISING momentum before price reacts.",
        },
      },
      {
        "@type": "Question",
        name: "What do SURGE, RISING, STABLE, and FADING signals mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BaseRadar classifies momentum tiers as SURGE (score 70+), RISING (50-70), STABLE (30-50), and FADING (<30).",
        },
      },
      {
        "@type": "Question",
        name: "Is BaseRadar free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "BaseRadar is free and public with no account required. BotIndex Pro adds convergence signals, prediction track records, unlimited alerts, and API access for $9.99/mo.",
        },
      },
    ],
  },
];

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
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
        <Script
          id="chatwizard-widget"
          src="https://share.aielitesolutions.com/widget.js/?appId=c7c25b37-b183-41d8-b22b-b8075df49493"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
