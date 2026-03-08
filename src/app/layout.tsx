import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BotIndex",
  description: "22 AI agent tools. One MCP server.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
