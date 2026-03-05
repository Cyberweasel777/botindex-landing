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
      <body className="antialiased">{children}</body>
    </html>
  );
}
