import { Inter } from "next/font/google";
import GALink from "./ga-link";

const inter = Inter({ subsets: ["latin"] });

const API_BASE = "https://api.botindex.dev/api/botindex";

const dataSources = [
  {
    icon: "📦",
    name: "Package Downloads",
    count: "72",
    description:
      "npm, PyPI, and crates.io. When developers start downloading a project's tools faster than last week, money follows.",
  },
  {
    icon: "⚡",
    name: "GitHub Commits",
    count: "32",
    description:
      "Repos across BTC, ETH, SOL, and 20+ other assets. Commit velocity spikes mean something is shipping — before the market notices.",
  },
  {
    icon: "🔀",
    name: "Fork & Star Velocity",
    count: "32",
    description:
      "When devs start forking a protocol's code, adoption is coming. Stars track attention. Forks track intent.",
  },
];

const sampleSignal = {
  asset: "SOL",
  direction: "Bullish",
  strength: 75,
  confidence: "High",
  sources: 4,
  signals: 8,
  details: [
    "solana-sdk crate downloads ↑ 18% week-over-week",
    "@solana/web3.js npm installs ↑ 12%",
    "solana-labs/solana: 47 commits this week (above baseline)",
    "anchor-lang crate downloads ↑ 9%",
  ],
};

const proofPoints = [
  { value: "59.5%", label: "Verified accuracy" },
  { value: "104", label: "Data sources tracked" },
  { value: "1,000+", label: "Signals scored" },
  { value: "1hr", label: "Resolution window" },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    cadence: "",
    description: "See which assets are moving. No details.",
    features: [
      "Aggregate signals (direction only)",
      "Public track record",
      "10 API calls/day",
    ],
    cta: "Start Free",
    href: `${API_BASE}/keys/register?plan=free`,
    featured: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    cadence: "/mo",
    description: "Full data access. Build your own analysis.",
    features: [
      "500 requests/day",
      "Raw ecosystem data (all 104 sources)",
      "Download trends, commit velocity, fork rates",
      "Full JSON — no truncation",
    ],
    cta: "Get Pro",
    href: `${API_BASE}/keys/register?plan=pro`,
    featured: false,
  },
  {
    name: "Sentinel",
    price: "$49.99",
    cadence: "/mo",
    description: "The signals that tell you what to watch.",
    features: [
      "Everything in Pro",
      "Individual signal breakdown per package & repo",
      "Which specific sources are driving each signal",
      "Growth percentages, commit counts, strength scores",
      "Full narrative: why the signal fired",
      "Unlimited API access",
      "7-day free trial",
    ],
    cta: "Start Free Trial",
    href: `${API_BASE}/keys/register?plan=sentinel`,
    featured: true,
    badge: "7-day trial",
  },
];

export default function Home() {
  return (
    <div
      className={`${inter.className} min-h-screen bg-[#0a0a0a] text-zinc-100`}
    >
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-[#0a0a0a]/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="text-lg font-semibold tracking-tight">
            BotIndex<span className="text-cyan-400">.</span>
          </a>
          <div className="flex items-center gap-4 text-sm text-zinc-300 sm:gap-6">
            <a href="#how-it-works" className="transition hover:text-white">
              How It Works
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#track-record" className="transition hover:text-white">
              Track Record
            </a>
            <GALink
              href={`${API_BASE}/keys/register?plan=sentinel`}
              className="rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 text-cyan-300 transition hover:bg-cyan-400/20"
              event="cta_nav"
              label="nav_start"
            >
              Start Free Trial
            </GALink>
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            Developer data → Price signals
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-white">
              Know what developers are building
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
              before the market prices it in.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-zinc-300">
            BotIndex tracks 104 developer data sources — GitHub commits, npm
            downloads, Rust crate adoption — across 25+ crypto assets. When
            developer activity spikes, price follows. We see the spike first.
          </p>
          <p className="mt-3 max-w-2xl text-base text-zinc-500">
            59.5% verified accuracy. Every prediction timestamped, scored, and
            published. No charts. No sentiment. No guessing. Just developer
            momentum data that leads price by days.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <GALink
              href={`${API_BASE}/keys/register?plan=sentinel`}
              className="rounded-xl bg-white px-6 py-3 text-base font-semibold text-black transition hover:bg-zinc-200"
              event="cta_hero_sentinel"
              label="hero_start_sentinel"
            >
              Start 7-Day Free Trial
            </GALink>
            <GALink
              href="/sentinel/track-record"
              className="rounded-xl border border-zinc-600 bg-zinc-900 px-6 py-3 text-base font-medium text-zinc-100 transition hover:bg-zinc-800"
              event="cta_hero_track_record"
              label="hero_track_record"
            >
              See the Track Record →
            </GALink>
          </div>

          {/* Proof points */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {proofPoints.map((p) => (
              <div
                key={p.label}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center"
              >
                <p className="text-3xl font-bold text-white">{p.value}</p>
                <p className="mt-1 text-xs text-zinc-500">{p.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The insight */}
        <section className="py-12">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8">
            <h2 className="text-2xl font-semibold text-cyan-300">
              Developer activity leads price by days — sometimes weeks.
            </h2>
            <p className="mt-3 max-w-3xl text-zinc-400">
              When Solana&apos;s npm package downloads spike 18% in a week,
              it means developers are building on it right now. When a
              protocol&apos;s GitHub commits dry up, the team has stopped
              shipping. These are leading indicators that charts can&apos;t
              show you. By the time it hits the price chart, the move already
              started.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-24 py-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="mt-3 text-zinc-400">
            We track what developers are actually doing — not what traders are saying.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
                1. Track
              </p>
              <h3 className="mt-3 text-lg font-semibold">
                104 developer sources
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                Every hour, we pull commit counts, package download numbers,
                fork rates, and star velocity from GitHub, npm, PyPI, and
                crates.io for 25+ crypto assets.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
                2. Compare
              </p>
              <h3 className="mt-3 text-lg font-semibold">
                Week-over-week changes
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                We compare this week&apos;s activity to last week&apos;s. A
                spike in @solana/web3.js downloads means developers are
                building Solana apps right now. That&apos;s a leading signal.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
                3. Signal
              </p>
              <h3 className="mt-3 text-lg font-semibold">
                Bullish, bearish, or neutral
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                When multiple sources for the same asset all point the same
                direction, we generate a signal. More sources agreeing = higher
                confidence. Then we check if price followed — publicly.
              </p>
            </div>
          </div>
        </section>

        {/* Data sources */}
        <section className="py-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            What we track
          </h2>
          <p className="mt-3 text-zinc-400">
            Three data platforms. Zero price data. That&apos;s the edge.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {dataSources.map((s) => (
              <article
                key={s.name}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-3xl">{s.icon}</p>
                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                    {s.count} sources
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{s.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Sample signal */}
        <section className="py-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            What a signal looks like
          </h2>
          <p className="mt-3 text-zinc-400">
            This is a real example of what Sentinel subscribers see.
          </p>
          <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-zinc-900/80 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-2xl font-bold">{sampleSignal.asset}</span>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-300">
                {sampleSignal.direction}
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                Strength: {sampleSignal.strength}/100
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                Confidence: {sampleSignal.confidence}
              </span>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                {sampleSignal.sources} sources, {sampleSignal.signals} signals
              </span>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                Why this signal fired:
              </p>
              {sampleSignal.details.map((d) => (
                <div
                  key={d}
                  className="flex items-start gap-2 text-sm text-zinc-300"
                >
                  <span className="mt-0.5 text-cyan-400">→</span>
                  {d}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-zinc-700 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">
                <span className="font-medium text-zinc-200">
                  What this means:
                </span>{" "}
                Solana developer tools are seeing accelerating adoption across
                4 independent platforms. When this many developers are building
                at once, network usage and token demand typically follow within
                days.
              </p>
            </div>
            <p className="mt-4 text-xs text-zinc-600">
              Free users see: &quot;SOL: Bullish.&quot; Sentinel users see everything above.
            </p>
          </div>
        </section>

        {/* Why this edge works */}
        <section className="py-12">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
            <h2 className="text-2xl font-semibold text-emerald-300">
              Why developer data is an edge
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-white">It&apos;s not priced in</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  No crypto screener tracks npm downloads. No trading terminal
                  shows crate adoption rates. This data isn&apos;t in anyone&apos;s
                  model — which means the market hasn&apos;t priced it in yet.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">It can&apos;t be faked</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  You can fake Twitter hype. You can manipulate trading
                  volume. You can&apos;t fake 47 GitHub commits in a week or
                  100,000 real npm installs. Developer activity is the
                  hardest signal to manipulate.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">It leads price</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Developers build before users arrive. Users arrive before
                  speculators pile in. By tracking the first link in the
                  chain, you see the move days before it shows up on a chart.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">It&apos;s verifiable</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Every signal is timestamped. Every resolution is scored
                  publicly. 59.5% accuracy across 1,000+ predictions — checked
                  hourly, published openly. No other crypto signal provider
                  does this.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Track record */}
        <section id="track-record" className="scroll-mt-24 py-12">
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-8 text-center">
            <h2 className="text-3xl font-semibold">
              59.5% accuracy. Verified.
            </h2>
            <p className="mt-3 mx-auto max-w-2xl text-zinc-400">
              Every prediction is logged before the price moves. Every outcome
              is scored automatically. We publish our wins and our losses.
              No other crypto signal product gives you a live, auditable
              track record.
            </p>
            <GALink
              href="/sentinel/track-record"
              className="mt-6 inline-flex rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-6 py-3 text-base font-semibold text-emerald-300 transition hover:bg-emerald-500/30"
              event="cta_track_record"
              label="track_record_section"
            >
              View Live Track Record →
            </GALink>
            <p className="mt-4 text-xs text-zinc-600">
              Live since March 2026. Accuracy recalculated hourly.
            </p>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-12">
          <h2 className="text-3xl font-semibold tracking-tight">
            Who this is for
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="text-lg font-semibold">Crypto traders</h3>
              <p className="mt-2 text-sm text-zinc-400">
                You want an edge that isn&apos;t on TradingView. Developer
                momentum tells you which assets have real building activity
                behind them — not just hype.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="text-lg font-semibold">Fund managers</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Alternative data for crypto allocation. Developer ecosystem
                health is a fundamental signal that complements on-chain
                analytics and market data.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="text-lg font-semibold">AI agents & bots</h3>
              <p className="mt-2 text-sm text-zinc-400">
                REST API with JSON responses. Feed developer momentum
                signals directly into your trading bot or AI agent. MCP
                compatible.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-24 py-12">
          <h2 className="text-3xl font-semibold tracking-tight">Pricing</h2>
          <p className="mt-3 text-zinc-400">
            Free shows you direction. Sentinel shows you why.
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
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-3xl font-semibold">
                  {plan.price}
                  <span className="text-base font-medium text-zinc-400">
                    {plan.cadence}
                  </span>
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  {plan.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-zinc-300"
                    >
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
                  event={`cta_pricing_${plan.name.toLowerCase()}`}
                  label={`pricing_${plan.name.toLowerCase()}`}
                >
                  {plan.cta}
                </GALink>
              </article>
            ))}
          </div>
        </section>

        {/* Elevator pitch / CTA */}
        <section className="py-16">
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Developers build before traders buy.
              <br />
              <span className="text-cyan-300">We track the builders.</span>
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-zinc-400">
              104 data sources. 25+ assets. Verified accuracy.
              Start your free trial and see which assets have real developer
              momentum behind them — before the market catches on.
            </p>
            <GALink
              href={`${API_BASE}/keys/register?plan=sentinel`}
              className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 text-lg font-semibold text-black transition hover:bg-zinc-200"
              event="cta_bottom"
              label="bottom_cta"
            >
              Start 7-Day Free Trial — $49.99/mo after
            </GALink>
          </div>
        </section>

        {/* For developers */}
        <section className="py-12">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-400">
            For developers
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                Get ecosystem signals
              </h3>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-200 sm:text-sm">
                <code>{`curl -H "X-API-Key: YOUR_KEY" \\
  ${API_BASE}/sentinel/ecosystem-signals`}</code>
              </pre>
            </article>
            <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
              <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                Get raw ecosystem data
              </h3>
              <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-200 sm:text-sm">
                <code>{`curl -H "X-API-Key: YOUR_KEY" \\
  ${API_BASE}/sentinel/ecosystem`}</code>
              </pre>
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800/80 py-8">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 text-sm text-zinc-500 sm:px-6 lg:px-8">
          <p>BotIndex 2026</p>
          <div className="flex gap-6">
            <a
              href="/sentinel/track-record"
              className="transition hover:text-zinc-300"
            >
              Track Record
            </a>
            <a
              href="https://github.com/Cyberweasel777/King-Backend"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-zinc-300"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
