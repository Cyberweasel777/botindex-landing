import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    cadence: "/mo",
    limit: "100 req/day",
    description: "For building and testing your first agents",
    button:
      "https://api.botindex.dev/api/botindex/keys/register?plan=free",
    featured: false,
  },
  {
    name: "Basic",
    price: "$9",
    cadence: "/mo",
    limit: "500 req/day",
    description: "For shipping production agents",
    button:
      "https://api.botindex.dev/api/botindex/keys/register?plan=basic",
    featured: true,
  },
  {
    name: "Pro",
    price: "$29",
    cadence: "/mo",
    limit: "Unlimited",
    description: "For teams with high-throughput automation",
    button: "https://api.botindex.dev/api/botindex/keys/register?plan=pro",
    featured: false,
  },
];

const toolCategories = [
  {
    name: "Sports",
    tools: [
      { name: "live-odds", tag: "FREE" },
      { name: "player-props", tag: "$0.01/call" },
      { name: "ev-calculator", tag: "FREE" },
      { name: "injury-report", tag: "$0.01/call" },
      { name: "line-movement", tag: "$0.01/call" },
      { name: "roster-changes", tag: "FREE" },
      { name: "schedule", tag: "FREE" },
    ],
  },
  {
    name: "Crypto",
    tools: [
      { name: "token-scan", tag: "$0.02/call" },
      { name: "whale-watch", tag: "$0.02/call" },
      { name: "funding-rates", tag: "FREE" },
      { name: "dex-volume", tag: "$0.02/call" },
      { name: "holder-analysis", tag: "$0.02/call" },
      { name: "intel", tag: "$0.05/call ★" },
    ],
  },
  {
    name: "Hyperliquid",
    tools: [
      { name: "funding-arb", tag: "$0.03/call" },
      { name: "open-interest", tag: "FREE" },
      { name: "liquidation-map", tag: "$0.03/call" },
      { name: "position-tracker", tag: "$0.03/call" },
      { name: "vault-stats", tag: "FREE" },
      { name: "hip6-feed-history", tag: "FREE" },
      { name: "hip6-alert-scores", tag: "FREE" },
      { name: "hip6-launch-candidates", tag: "$0.01/call" },
      { name: "intel", tag: "$0.05/call ★" },
    ],
  },
  {
    name: "Commerce",
    tools: [
      { name: "product-trends", tag: "FREE" },
      { name: "deal-scanner", tag: "$0.01/call" },
      { name: "price-tracker", tag: "$0.01/call" },
    ],
  },
  {
    name: "Solana",
    tools: [
      { name: "mint-monitor", tag: "$0.02/call" },
      { name: "whale-tracker", tag: "$0.02/call" },
    ],
  },
  {
    name: "Doppler",
    tools: [
      { name: "launches", tag: "$0.01/call" },
      { name: "score", tag: "$0.02/call" },
      { name: "trending", tag: "$0.01/call" },
      { name: "intel", tag: "$0.05/call ★" },
    ],
  },
  {
    name: "Zora",
    tools: [
      { name: "trending-coins", tag: "FREE" },
      { name: "attention-momentum", tag: "$0.02/call" },
      { name: "creator-scores", tag: "$0.02/call" },
      { name: "intel", tag: "$0.05/call ★" },
    ],
  },
  {
    name: "Pump.fun",
    tools: [
      { name: "graduating", tag: "$0.01/call" },
      { name: "graduated", tag: "$0.02/call" },
      { name: "rug-score", tag: "$0.02/call" },
    ],
  },
  {
    name: "Trust Services",
    tools: [
      { name: "aar-sign", tag: "$0.001/call" },
      { name: "scc-anchor", tag: "$0.01/call" },
      { name: "verify", tag: "FREE" },
    ],
  },
];

const links = [
  {
    title: "AAR Trust Layer",
    href: "https://aar.botindex.dev",
    description: "Open standard for verifiable AI agent actions. Ed25519-signed receipts.",
  },
  {
    title: "Trust Verification Portal",
    href: "https://api.botindex.dev/api/botindex/trust/verify",
    description: "Verify any AAR receipt or SCC chain. Paste a receipt, get proof.",
  },
  {
    title: "npm",
    href: "https://www.npmjs.com/package/botindex-mcp-server",
    description: "Install package and view versions.",
  },
  {
    title: "GitHub",
    href: "https://github.com/Cyberweasel777/botindex-mcp",
    description: "Source code, issues, and examples.",
  },
  {
    title: "Smithery",
    href: "https://smithery.ai/server/cyberweasel777/botindex-mcp-server",
    description: "Server profile and registry listing.",
  },
  {
    title: "Anthropic Registry",
    href: "https://github.com/anthropics/anthropic-cookbook/tree/main/misc/mcp_registry",
    description: "Official MCP registry reference.",
  },
];

const mcpConfig = `{
  "mcpServers": {
    "botindex": {
      "command": "npx",
      "args": ["-y", "botindex-mcp"],
      "env": {
        "BOTINDEX_API_KEY": "your_api_key"
      }
    }
  }
}`;

const curlExample = `curl -X GET \\
  "https://api.botindex.dev/api/botindex/keys/register?plan=basic"`;

export default function Home() {
  return (
    <div
      className={`${inter.className} min-h-screen bg-[#0a0a0a] text-zinc-100`}
    >
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#0a0a0a]/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-lg font-semibold tracking-tight">
            BotIndex
          </a>
          <div className="flex items-center gap-4 text-sm text-zinc-300 sm:gap-6">
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#tools" className="transition hover:text-white">
              Tools
            </a>
            <a href="#quick-start" className="transition hover:text-white">
              Quick Start
            </a>
            <a
              href="https://smithery.ai/server/cyberweasel777/botindex-mcp-server"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Smithery
            </a>
            <a
              href="https://api.botindex.dev/api/botindex/keys/connect"
              className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-cyan-300 transition hover:bg-cyan-400/20"
            >
              Connect Wallet
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="py-20 sm:py-28">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
              BotIndex
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-xl text-zinc-300 sm:text-2xl">
            The first verifiable agent API.
          </p>
          <p className="mt-3 max-w-2xl text-base text-zinc-400">
            Every response is cryptographically signed with an{" "}
            <a href="https://aar.botindex.dev" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
              Agent Action Receipt
            </a>
            . Your agent can prove what it did, what data it received, and that nothing was tampered with.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 max-w-2xl">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-300">Ed25519 Signed</p>
              <p className="mt-1 text-sm text-zinc-400">Every response carries a cryptographic receipt</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-cyan-300">22 Agent Tools</p>
              <p className="mt-1 text-sm text-zinc-400">Sports, crypto, Hyperliquid, commerce intelligence</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-amber-300">x402 + Stripe</p>
              <p className="mt-1 text-sm text-zinc-400">Pay per call with USDC or subscribe monthly</p>
            </div>
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-wide text-cyan-300">
            Compatible with Mastercard Verifiable Intent · Coinbase x402 · Aztec ZK
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3">
              <code className="text-sm text-zinc-100 sm:text-base">
                npx -y botindex-mcp
              </code>
            </div>
            <a
              href="https://aar.botindex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
            >
              Learn about AAR →
            </a>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 py-8 sm:py-12">
          <h2 className="text-3xl font-semibold tracking-tight">Pricing</h2>
          <p className="mt-3 max-w-3xl text-sm text-zinc-400">
            Billing rails are separate by design: <span className="text-zinc-200">Stripe plans</span> for human teams and
            <span className="text-zinc-200"> x402 pay-per-call</span> for autonomous bot-to-bot usage. If you use an API key subscription,
            you are <span className="text-zinc-200">not double charged</span> by x402 on the same request path.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-2xl border p-6 ${
                  plan.featured
                    ? "border-cyan-400 bg-zinc-900/90 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]"
                    : "border-zinc-800 bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  {plan.featured ? (
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-medium text-cyan-300">
                      Featured
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-3xl font-semibold">
                  {plan.price}
                  <span className="text-base font-medium text-zinc-400">
                    {plan.cadence}
                  </span>
                </p>
                <p className="mt-3 text-zinc-300">{plan.limit}</p>
                <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
                {plan.button ? (
                  <a
                    className="mt-6 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                    href={plan.button}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get {plan.name}
                  </a>
                ) : (
                  <a
                    className="mt-6 inline-flex rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-zinc-700"
                    href={plan.button}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Free Key
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/5 to-emerald-400/5 p-6 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">Pay with Crypto</h3>
                <p className="mt-1 max-w-lg text-sm text-zinc-400">
                  Connect your wallet for x402 pay-per-call payments. No subscription required.
                  10% cheaper than Stripe. Verifiable on-chain receipts for every call.
                </p>
              </div>
              <a
                href="https://api.botindex.dev/api/botindex/keys/connect"
                className="shrink-0 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
              >
                Connect Wallet →
              </a>
            </div>
          </div>
        </section>

        <section id="tools" className="scroll-mt-24 py-8 sm:py-12">
          <h2 className="text-3xl font-semibold tracking-tight">Tools</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {toolCategories.map((category) => (
              <article
                key={category.name}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
              >
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm"
                    >
                      <span className="text-zinc-100">{tool.name}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          tool.tag === "FREE"
                            ? "bg-emerald-400/15 text-emerald-300"
                            : "bg-amber-400/15 text-amber-300"
                        }`}
                      >
                        {tool.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="quick-start" className="scroll-mt-24 py-8 sm:py-12">
          <h2 className="text-3xl font-semibold tracking-tight">Quick Start</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
                MCP Config
              </h3>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-200 sm:text-sm">
                <code>{mcpConfig}</code>
              </pre>
            </article>
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
                Register Key
              </h3>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-200 sm:text-sm">
                <code>{curlExample}</code>
              </pre>
            </article>
          </div>
        </section>

        <section id="links" className="scroll-mt-24 py-8 sm:py-12">
          <h2 className="text-3xl font-semibold tracking-tight">Links</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-600"
              >
                <h3 className="text-lg font-semibold">{link.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{link.description}</p>
                <p className="mt-3 text-sm text-cyan-300">{link.href}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800/80 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-sm text-zinc-400 sm:px-6 lg:px-8">
          <p>Built for agents. Verified by cryptography. Every action receipted.</p>
          <p>BotIndex 2026</p>
        </div>
      </footer>
    </div>
  );
}
