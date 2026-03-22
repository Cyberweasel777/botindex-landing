"use client";

import { useEffect, useState, useCallback } from "react";

const API_BASE = "https://api.botindex.dev/api/botindex";

/* ─── Types ─── */
interface SignalAggregate {
  asset: string;
  direction: string;
  strength: number;
  confidence: string;
  signalCount: number;
  bullishCount: number;
  bearishCount: number;
  neutralCount: number;
  narrative: string;
  signals?: Array<{
    source_type?: string;
    sourceType?: string;
    source_name?: string;
    sourceName?: string;
    direction: string;
    growth_pct?: number;
    growthPct?: number;
    current_value?: number;
    previous_value?: number;
    asset?: string;
    [key: string]: any;
  }>;
}

interface Resolution {
  asset: string;
  direction_predicted: string;
  entry_price: number | null;
  price_at_24h: number | null;
  pct_change_24h: number | null;
  correct_24h: boolean | null;
  timestamp: string;
}

interface TrackRecord {
  totalPredictions: number;
  resolved: number;
  correct: number;
  accuracy: number | null;
  recentResolutions: Resolution[];
}

interface SessionInfo {
  email: string;
  plan: string;
  expiresAt: string;
}

/* ─── Helpers ─── */
function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatPrice(p: number | null): string {
  if (p === null) return "—";
  if (p >= 1000) return `$${p.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (p >= 1) return `$${p.toFixed(2)}`;
  return `$${p.toFixed(6)}`;
}

/* ─── Login Form ─── */
function LoginForm({ onLogin }: { onLogin: (session: string, info: SessionInfo) => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendLink(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSent(true);
      } else {
        setError(data.message || "Failed to send login link.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mb-4 text-5xl">📬</div>
        <h2 className="text-2xl font-bold mb-3">Check your email</h2>
        <p className="text-zinc-400 mb-2">
          We sent a login link to <span className="text-white font-medium">{email}</span>
        </p>
        <p className="text-zinc-500 text-sm">
          The link expires in 15 minutes. Check your spam folder if you don&apos;t see it.
        </p>
        <button
          onClick={() => { setSent(false); setEmail(""); }}
          className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 transition"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-3">Sentinel Dashboard</h2>
      <p className="text-zinc-400 mb-8">
        Enter the email you used to register. We&apos;ll send you a login link — no password needed.
      </p>
      <form onSubmit={handleSendLink} className="max-w-sm mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 w-full rounded-lg bg-white px-4 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Login Link"}
        </button>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </form>
      <p className="mt-6 text-xs text-zinc-600">
        Don&apos;t have an account?{" "}
        <a href={`${API_BASE}/keys/register?plan=sentinel`} className="text-cyan-400 hover:text-cyan-300">
          Start your 7-day free trial →
        </a>
      </p>
    </div>
  );
}

/* ─── Signal Card ─── */
function SignalCard({ signal, isPaid }: { signal: SignalAggregate; isPaid: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const dirColor =
    signal.direction === "bullish" ? "text-emerald-400" :
    signal.direction === "bearish" ? "text-red-400" : "text-yellow-400";
  const dirBg =
    signal.direction === "bullish" ? "bg-emerald-400/10" :
    signal.direction === "bearish" ? "bg-red-400/10" : "bg-yellow-400/10";

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold">{signal.asset}</span>
          <span className={`rounded-full ${dirBg} px-3 py-1 text-xs font-semibold ${dirColor}`}>
            {signal.direction.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">
            {signal.strength}/100
          </span>
          <span className="text-xs text-zinc-600">
            {signal.confidence} conf.
          </span>
        </div>
      </div>

      {isPaid && signal.signals && Array.isArray(signal.signals) && signal.signals.length > 0 ? (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 transition"
          >
            {expanded ? "Hide details ▴" : `${signal.signals.length} signals — show details ▾`}
          </button>
          {expanded && (
            <div className="mt-3 space-y-2 border-t border-zinc-800 pt-3">
              {signal.signals.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={
                      s.direction === "bullish" ? "text-emerald-400" :
                      s.direction === "bearish" ? "text-red-400" : "text-yellow-400"
                    }>
                      {s.direction === "bullish" ? "↑" : s.direction === "bearish" ? "↓" : "→"}
                    </span>
                    <span className="text-zinc-300">{s.source_name || s.sourceName || "unknown"}</span>
                    <span className="text-xs text-zinc-600">({s.source_type || s.sourceType || ""})</span>
                  </div>
                  {s.growth_pct != null ? (
                    <span className={`text-xs font-mono ${s.growth_pct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {s.growth_pct >= 0 ? "+" : ""}{Number(s.growth_pct).toFixed(1)}%
                    </span>
                  ) : s.growthPct != null ? (
                    <span className={`text-xs font-mono ${s.growthPct >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {s.growthPct >= 0 ? "+" : ""}{Number(s.growthPct).toFixed(1)}%
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </>
      ) : isPaid ? (
        <p className="mt-2 text-sm text-zinc-500">{signal.narrative}</p>
      ) : (
        <p className="mt-2 text-sm text-zinc-600 italic">
          Signal details available with Sentinel plan
        </p>
      )}

      <div className="mt-3 flex gap-3 text-xs text-zinc-600">
        <span>{signal.signalCount} signals</span>
        <span>·</span>
        <span>{signal.bullishCount}↑ {signal.bearishCount}↓ {signal.neutralCount}→</span>
      </div>
    </div>
  );
}

/* ─── Dashboard ─── */
function Dashboard({ session, user, onLogout }: { session: string; user: SessionInfo; onLogout: () => void }) {
  const [signals, setSignals] = useState<SignalAggregate[]>([]);
  const [trackRecord, setTrackRecord] = useState<TrackRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const isPaid = user.plan === "sentinel" || user.plan === "enterprise";

  const fetchData = useCallback(async () => {
    try {
      // Fetch signals — use session token as bearer for the ecosystem-signals endpoint
      const signalsUrl = isPaid
        ? `${API_BASE}/sentinel/ecosystem-signals`
        : `${API_BASE}/sentinel/ecosystem-signals`;

      const [sigRes, trRes] = await Promise.all([
        fetch(signalsUrl, {
          headers: { Authorization: `Bearer ${session}` },
        }),
        fetch(`${API_BASE}/sentinel/track-record`),
      ]);

      if (sigRes.status === 401) {
        onLogout();
        return;
      }

      const sigData = await sigRes.json();
      const trData = await trRes.json();

      // Merge individual signals into aggregates by asset
      const aggregates: SignalAggregate[] = (sigData.aggregates || []).map((agg: SignalAggregate) => {
        // If aggregates already have signals array, use them
        if (agg.signals && Array.isArray(agg.signals) && agg.signals.length > 0) return agg;
        // Otherwise check if there's a top-level individual array and merge
        if (sigData.individual && Array.isArray(sigData.individual)) {
          const assetSignals = sigData.individual.filter((s: any) => s.asset === agg.asset);
          return { ...agg, signals: assetSignals };
        }
        return agg;
      });
      setSignals(aggregates);
      setTrackRecord(trData);
      setLastRefresh(new Date());
      setError("");
    } catch (err) {
      setError("Failed to load signals. Retrying...");
    } finally {
      setLoading(false);
    }
  }, [session, isPaid, onLogout]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="animate-pulse text-zinc-500">Loading signals...</p>
      </div>
    );
  }

  const sortedSignals = [...signals].sort((a, b) => b.strength - a.strength);
  const bullish = sortedSignals.filter((s) => s.direction === "bullish");
  const bearish = sortedSignals.filter((s) => s.direction === "bearish");
  const neutral = sortedSignals.filter((s) => s.direction === "neutral");

  return (
    <div>
      {/* Header bar */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sentinel Dashboard</h1>
          <p className="text-sm text-zinc-500">
            {user.email} · <span className="capitalize">{user.plan}</span> plan · Refreshes every 60s
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-600">
            Last update: {lastRefresh.toLocaleTimeString()}
          </span>
          <button
            onClick={onLogout}
            className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Overview stats */}
      {trackRecord && (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
            <p className="text-2xl font-bold">{sortedSignals.length}</p>
            <p className="text-xs text-zinc-500">Assets tracked</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{bullish.length}</p>
            <p className="text-xs text-zinc-500">Bullish</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{bearish.length}</p>
            <p className="text-xs text-zinc-500">Bearish</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-center">
            <p className="text-2xl font-bold">
              {trackRecord.accuracy !== null ? `${trackRecord.accuracy.toFixed(1)}%` : "—"}
            </p>
            <p className="text-xs text-zinc-500">Accuracy ({trackRecord.resolved} resolved)</p>
          </div>
        </div>
      )}

      {/* Active signals */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">
          Live Signals
          <span className="ml-2 text-sm font-normal text-zinc-500">
            ({sortedSignals.length} assets)
          </span>
        </h2>
        {sortedSignals.length === 0 ? (
          <p className="text-zinc-500">No signals right now. Signals refresh hourly.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {sortedSignals.map((s) => (
              <SignalCard key={s.asset} signal={s} isPaid={isPaid} />
            ))}
          </div>
        )}
      </section>

      {/* Recent resolutions */}
      {trackRecord && trackRecord.recentResolutions.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Recent Resolutions</h2>
          <div className="space-y-2">
            {[...trackRecord.recentResolutions]
              .reverse()
              .slice(0, isPaid ? 20 : 5)
              .map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/60 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {r.correct_24h === true ? "✅" : r.correct_24h === false ? "❌" : "⏳"}
                    </span>
                    <div>
                      <span className="font-semibold">{r.asset} </span>
                      <span className={
                        r.direction_predicted === "bullish" ? "text-emerald-400" :
                        r.direction_predicted === "bearish" ? "text-red-400" : "text-yellow-400"
                      }>
                        {r.direction_predicted.toUpperCase()}
                      </span>
                      {isPaid && r.entry_price !== null && (
                        <span className="ml-2 text-xs text-zinc-500">
                          Entry: {formatPrice(r.entry_price)}
                          {r.price_at_24h !== null && ` → ${formatPrice(r.price_at_24h)}`}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {r.pct_change_24h !== null && (
                      <span className={r.pct_change_24h >= 0 ? "text-emerald-400" : "text-red-400"}>
                        {r.pct_change_24h >= 0 ? "+" : ""}{r.pct_change_24h.toFixed(2)}%
                      </span>
                    )}
                    <span className="text-xs text-zinc-600">{timeAgo(r.timestamp)}</span>
                  </div>
                </div>
              ))}
          </div>
          {!isPaid && (
            <p className="mt-3 text-sm text-zinc-600">
              Showing 5 of {trackRecord.recentResolutions.length}. Full history with Sentinel.
            </p>
          )}
        </section>
      )}

      {/* Upgrade CTA for non-sentinel */}
      {!isPaid && (
        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Unlock Full Signal Intelligence</h3>
          <p className="text-zinc-400 mb-4 text-sm">
            See which specific packages, repos, and crates are driving each signal.
            Get entry prices, growth percentages, and full resolution history.
          </p>
          <a
            href={`${API_BASE}/keys/register?plan=sentinel`}
            className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Upgrade to Sentinel — 7 Day Free Trial
          </a>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function DashboardPage() {
  const [session, setSession] = useState<string | null>(null);
  const [user, setUser] = useState<SessionInfo | null>(null);
  const [verifying, setVerifying] = useState(true);

  // On mount: check for token in URL (magic link callback) or localStorage
  useEffect(() => {
    async function init() {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");

      if (urlToken) {
        // Exchange magic link token for session
        try {
          const res = await fetch(`${API_BASE}/auth/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: urlToken }),
          });
          const data = await res.json();

          if (res.ok && data.ok) {
            localStorage.setItem("botindex_session", data.session);
            localStorage.setItem("botindex_user", JSON.stringify({
              email: data.email,
              plan: data.plan,
              expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            }));
            setSession(data.session);
            setUser({ email: data.email, plan: data.plan, expiresAt: "" });

            // Clean URL
            window.history.replaceState({}, "", "/sentinel/dashboard");
          }
        } catch {
          // Token invalid — fall through to login
        }
        setVerifying(false);
        return;
      }

      // Check localStorage for existing session
      const savedSession = localStorage.getItem("botindex_session");
      if (savedSession) {
        try {
          const res = await fetch(`${API_BASE}/auth/session`, {
            headers: { Authorization: `Bearer ${savedSession}` },
          });
          const data = await res.json();

          if (res.ok && data.ok) {
            setSession(savedSession);
            setUser({ email: data.email, plan: data.plan, expiresAt: data.expiresAt });
            setVerifying(false);
            return;
          }
        } catch {
          // Session invalid
        }
        // Clear stale session
        localStorage.removeItem("botindex_session");
        localStorage.removeItem("botindex_user");
      }

      setVerifying(false);
    }

    init();
  }, []);

  function handleLogout() {
    localStorage.removeItem("botindex_session");
    localStorage.removeItem("botindex_user");
    setSession(null);
    setUser(null);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      {/* Nav */}
      <header className="border-b border-zinc-800/80 bg-[#0a0a0a]/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-lg font-semibold tracking-tight">
            BotIndex<span className="text-cyan-400">.</span>
          </a>
          <div className="flex items-center gap-4 text-sm text-zinc-300 sm:gap-6">
            <a href="/sentinel/track-record" className="transition hover:text-white">
              Track Record
            </a>
            <a href="/#pricing" className="transition hover:text-white">
              Pricing
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {verifying ? (
          <div className="flex items-center justify-center py-20">
            <p className="animate-pulse text-zinc-500">Checking session...</p>
          </div>
        ) : session && user ? (
          <Dashboard session={session} user={user} onLogout={handleLogout} />
        ) : (
          <div className="mx-auto max-w-md py-20">
            <LoginForm
              onLogin={(s, info) => {
                setSession(s);
                setUser(info);
              }}
            />
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-800/80 py-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 text-sm text-zinc-500 sm:px-6">
          <p>BotIndex 2026</p>
          <a href="/" className="transition hover:text-zinc-300">Home</a>
        </div>
      </footer>
    </div>
  );
}
