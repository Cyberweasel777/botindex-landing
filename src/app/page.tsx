import { Inter } from "next/font/google";
import GALink from "./ga-link";

const inter = Inter({ subsets: ["latin"] });

const API_BASE = "https://api.botindex.dev/api/botindex";

const intelligenceFeatures = [
  {
    icon: "🧠",
    name: "Sentiment Shift Detection",
    description:
      "84.6% accuracy. Detects when market fear is about to flip — hours before price reacts. Our highest-performing signal type.",
  },
  {
    icon: "🐋",
    name: "Whale Divergence",
    description:
      "Tracks when smart money diverges from price action. When whales load while retail panics, we flag it.",
  },
  {
    icon: "⚡",
    name: "Risk Cascade Alerts",
    description:
      "100% accuracy. Detects when multiple risk factors converge — systemic exposure that leads to sharp moves.",
  },
  {
    icon: "🔴",
    name: "Dump Warnings",
    description:
      "100% accuracy. Flags the setup before the red candle — when conditions align for a sharp selloff.",
  },
  {
    icon: "📉",
    name: "Momentum Tracking",
    description:
      "Proprietary momentum scoring that detects acceleration and decay in price trends before they become obvious.",
  },
  {
    icon: "📡",
    name: "Ecosystem Momentum",
    description:
      "Tracks GitHub commit velocity, npm download trends, and developer activity across crypto projects. Dev activity leads price by days — we see it first.",
  },
  {
    icon: "🎯",
    name: "Verifiable Track Record",
    description:
      "Every signal timestamped and logged before the move. Every outcome scored publicly. No hindsight, no cherry-picking.",
  },
];

const pricingPlans = [
  {
    name: "Explorer",
    price: "$0",
    cadence: "",
    description: "Raw market data. See what we track.",
    features: [
      "3 requests/day",
      "Raw data endpoints only",
      "Truncated results",
      "No intelligence layer",
    ],
    cta: "Start Free",
    href: `${API_BASE}/keys/register?plan=free`,
    featured: false,
  },
  {
    name: "Pro Intelligence",
    price: "$9.99",
    cadence: "/mo",
    description: "Full intelligence layer. See what others miss.",
    features: [
      "500 requests/day",
      "All signal types with full detail",
      "Ecosystem momentum (GitHub + npm intelligence)",
      "Risk cascade + dump warning alerts",
      "Whale divergence tracking",
      "Sentiment shift detection",
      "Full data — no truncation",
    ],
    cta: "Get Pro",
    href: `${API_BASE}/keys/register?plan=pro`,
    featured: true,
  },
  {
    name: "Sentinel",
    price: "$49.99",
    cadence: "/mo",
    description: "Full intelligence pipeline. Delivered to you.",
    features: [
      "Unlimited requests",
      "Everything in Pro",
      "Real-time Telegram alerts",
      "Query surge intelligence",
      "Whale divergence alerts",
      "Full synthesized briefs every 15 min",
      "Priority signal delivery",
    ],
    cta: "Get Sentinel",
    href: `${API_BASE}/keys/register?plan=sentinel`,
    featured: false,
    badge: "Intelligence",
  },
];

const proofPoints = [
  { value: "19K+", label: "API requests tracked daily" },
  { value: "16", label: "Assets under divergence monitoring" },
  { value: "8", label: "Ecosystem momentum scores" },
  { value: "15min", label: "Signal refresh cycle" },
];

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
            <a href="#intelligence" className="transition hover:text-white">
              Intelligence
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#track-record" className="transition hover:text-white">
              Transparency
            </a>
            <a
              href={`${API_BASE}/keys/register?plan=pro`}
              className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-cyan-300 transition hover:bg-cyan-400/20"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            Crypto Market Intelligence
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
              All the intelligence.
            </span>
            <br />
            <span className="text-white">None of the noise.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-zinc-300">
            BotIndex reads whale positions, developer activity, funding rates,
            and 19K+ daily demand signals — so you don't have to. One
            synthesized brief instead of 50 tabs.
          </p>
          <p className="mt-3 max-w-2xl text-base text-zinc-500">
            Stop scrolling CoinGecko, DexScreener, and Crypto Twitter for
            hours. Get a 15-minute intelligence brief that covers what moved,
            why it moved, and what to watch next.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <GALink
              href={`${API_BASE}/keys/register?plan=pro`}
              className="rounded-xl bg-white px-6 py-3 text-base font-semibold text-black transition hover:bg-zinc-200"
              event="cta_hero_pro"
              label="hero_start_pro"
            >
              Start with Pro — $9.99/mo
            </GALink>
            <GALink
              href="https://t.me/BotIndexHacks_Bot"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-600 bg-zinc-900 px-6 py-3 text-base font-medium text-zinc-100 transition hover:bg-zinc-800"
              event="cta_hero_telegram"
              label="hero_telegram_bot"
            >
              Get Alerts on Telegram →
            </GALink>
          </div>

          {/* Proof points */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {proofPoints.map((p) => (
              <div key={p.label} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
                <p className="text-3xl font-bold text-white">{p.value}</p>
                <p className="mt-1 text-xs text-zinc-500">{p.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The problem */}
        <section className="py-12">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
            <h2 className="text-2xl font-semibold text-amber-300">
              You're spending 2 hours a day on data you could read in 2 minutes.
            </h2>
            <p className="mt-3 max-w-3xl text-zinc-400">
              Multiple data sources. Multiple dashboards. Multiple tabs.
              You're checking all of them, every day, piecing together the same picture BotIndex
              builds automatically every 15 minutes — with a verified track record.
            </p>
          </div>
        </section>

        {/* Intelligence features */}
        <section id="intelligence" className="scroll-mt-24 py-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            Intelligence Layer
          </h2>
          <p className="mt-3 text-zinc-400">
            Six proprietary signals. One convergence engine. Zero public data resale.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {intelligenceFeatures.map((f) => (
              <article
                key={f.name}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
              >
                <p className="text-3xl">{f.icon}</p>
                <h3 className="mt-3 text-lg font-semibold">{f.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{f.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            How it works
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
                1. Ingest
              </p>
              <p className="mt-3 text-sm text-zinc-400">
                We continuously ingest whale positions, funding rates, developer
                commits, package downloads, on-chain flows, and 19K+ daily API
                demand signals.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
                2. Synthesize
              </p>
              <p className="mt-3 text-sm text-zinc-400">
                AI synthesizes cross-source convergence patterns. When
                multiple independent signals align on the same asset —
                that's actionable intelligence.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
                3. Deliver
              </p>
              <p className="mt-3 text-sm text-zinc-400">
                Intelligence delivered via API or straight to your Telegram.
                No dashboards to check. No tabs to monitor. It comes to you.
              </p>
            </div>
          </div>
        </section>

        {/* Track record teaser */}
        <section id="track-record" className="scroll-mt-24 py-12">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
            <h2 className="text-3xl font-semibold text-emerald-300">
              Transparent by Default
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-zinc-400">
              Every signal is logged with a timestamp and entry price. We publish
              what we said and when we said it. Resolutions checked at 24h, 72h,
              and 7 days. No cherrypicking. No hindsight.
            </p>
            <GALink
              href={"/sentinel/track-record"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-6 py-3 text-base font-semibold text-emerald-300 transition hover:bg-emerald-500/30"
              event="cta_track_record"
              label="track_record_section"
            >
              View Live Track Record →
            </GALink>
            <p className="mt-4 text-xs text-zinc-600">
              Data collection started March 2026. Accuracy improves with time.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-24 py-12">
          <h2 className="text-3xl font-semibold tracking-tight">Pricing</h2>
          <p className="mt-3 text-zinc-400">
            Raw data is free (limited). The intelligence layer saves you hours.
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
                  {plan.badge && (
                    <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-300">
                      {plan.badge}
                    </span>
                  )}
                  {plan.featured && (
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-medium text-cyan-300">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-4 text-3xl font-semibold">
                  {plan.price}
                  <span className="text-base font-medium text-zinc-400">
                    {plan.cadence}
                  </span>
                </p>
                <p className="mt-2 text-sm text-zinc-400">{plan.description}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <GALink
                  className={`mt-6 inline-flex w-full justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    plan.featured
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "border border-zinc-600 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                  }`}
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  event={`cta_pricing_${plan.name.toLowerCase().replace(/\s+/g, "_")}`}
                  label={`pricing_${plan.name.toLowerCase()}`}
                >
                  {plan.cta}
                </GALink>
              </article>
            ))}
          </div>
        </section>

        {/* API quick start */}
        <section className="py-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            For developers
          </h2>
          <p className="mt-3 text-zinc-400">
            REST API. JSON responses. Works with any language. MCP-compatible for AI agents.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
                Get Intelligence
              </h3>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-200 sm:text-sm">
                <code>{`curl -H "X-API-Key: your_key" \\
  "${API_BASE}/synthesis/smart-money-flow"`}</code>
              </pre>
            </article>
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-400">
                Get Signals (Sentinel)
              </h3>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-200 sm:text-sm">
                <code>{`curl -H "X-API-Key: your_sentinel_key" \\
  "${API_BASE}/sentinel/signals"`}</code>
              </pre>
            </article>
          </div>
        </section>

        {/* Links */}
        <section className="py-12">
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href="https://github.com/Cyberweasel777/King-Backend"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-600"
            >
              <h3 className="font-semibold">GitHub</h3>
              <p className="mt-1 text-sm text-zinc-400">Open source. Verify the engine.</p>
            </a>
            <a
              href={"/sentinel/track-record"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-600"
            >
              <h3 className="font-semibold">Track Record</h3>
              <p className="mt-1 text-sm text-zinc-400">Live prediction accuracy. Updated daily.</p>
            </a>
            <a
              href="https://aar.botindex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-600"
            >
              <h3 className="font-semibold">AAR Trust Layer</h3>
              <p className="mt-1 text-sm text-zinc-400">Cryptographic receipts for every response.</p>
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800/80 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-sm text-zinc-400 sm:px-6 lg:px-8">
          <p>
            BotIndex — All the intelligence. None of the noise.
          </p>
          <p>BotIndex 2026</p>
        </div>
      </footer>
    </div>
  );
}
