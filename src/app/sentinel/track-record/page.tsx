"use client";

import { useEffect, useState } from "react";

const API_URL = "https://api.botindex.dev/api/botindex/sentinel/track-record";

interface TrackRecord {
  totalPredictions: number;
  resolved: number;
  correct: number;
  incorrect: number;
  pending: number;
  accuracy: number | null;
  byAsset: Record<string, { total: number; correct: number; accuracy: number }>;
  byType: Record<string, { total: number; correct: number; accuracy: number }>;
  recentPredictions: Array<{
    asset: string;
    signal_type: string;
    direction: string;
    strength: number;
    narrative: string;
    entry_price_usd: number | null;
    timestamp: string;
    resolved: boolean;
  }>;
  recentResolutions: Array<{
    asset: string;
    direction_predicted: string;
    entry_price: number | null;
    price_at_24h: number | null;
    pct_change_24h: number | null;
    correct_24h: boolean | null;
    timestamp: string;
  }>;
}

const TYPE_LABELS: Record<string, string> = {
  sentiment_shift: "Sentiment Shift",
  risk_cascade: "Risk Cascade",
  dump_warning: "Dump Warning",
  whale_divergence: "Whale Divergence",
  pump_signal: "Pump Signal",
  momentum_decay: "Momentum Decay",
  momentum_surge: "Momentum Surge",
};

const TYPE_EMOJI: Record<string, string> = {
  sentiment_shift: "🧠",
  risk_cascade: "⚡",
  dump_warning: "🔴",
  whale_divergence: "🐋",
  pump_signal: "🚀",
  momentum_decay: "📉",
  momentum_surge: "📈",
};

function AccuracyBadge({ accuracy, samples }: { accuracy: number; samples: number }) {
  const color =
    accuracy >= 75 ? "text-green-400 border-green-400/30 bg-green-400/10" :
    accuracy >= 50 ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" :
    "text-red-400 border-red-400/30 bg-red-400/10";
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${color}`}>
      {accuracy.toFixed(1)}%{samples < 10 ? " *" : ""}
    </span>
  );
}

function formatPrice(price: number | null): string {
  if (price === null) return "N/A";
  if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  return `$${price.toFixed(6)}`;
}

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function TrackRecordPage() {
  const [data, setData] = useState<TrackRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setError(e.message));

    const interval = setInterval(() => {
      fetch(API_URL)
        .then((r) => r.json())
        .then(setData)
        .catch(() => {});
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <p className="text-red-400">Failed to load track record: {error}</p>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <p className="text-zinc-500 animate-pulse">Loading track record...</p>
    </div>
  );

  const sortedTypes = Object.entries(data.byType).sort((a, b) => b[1].total - a[1].total);
  const sortedAssets = Object.entries(data.byAsset).sort((a, b) => b[1].total - a[1].total);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <a href="/" className="text-zinc-500 text-sm hover:text-zinc-300 mb-4 inline-block">← BotIndex</a>
          <h1 className="text-4xl font-extrabold mb-2">Sentinel Track Record</h1>
          <p className="text-zinc-400 text-lg">
            Every prediction timestamped. Every outcome logged. Publicly verifiable.
          </p>
          <p className="text-zinc-600 text-sm mt-2">Auto-refreshes every 60 seconds</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Total Signals</p>
            <p className="text-3xl font-bold">{data.totalPredictions.toLocaleString()}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Resolved</p>
            <p className="text-3xl font-bold">{data.resolved}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Correct</p>
            <p className="text-3xl font-bold text-green-400">{data.correct}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Accuracy</p>
            <p className="text-3xl font-bold">
              {data.accuracy !== null ? (
                <span className={data.accuracy >= 50 ? "text-green-400" : "text-red-400"}>
                  {data.accuracy.toFixed(1)}%
                </span>
              ) : (
                <span className="text-zinc-500">—</span>
              )}
            </p>
          </div>
        </div>

        {/* Signal Type Performance */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">By Signal Type</h2>
          <div className="grid gap-3">
            {sortedTypes.map(([type, stats]) => (
              <div
                key={type}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{TYPE_EMOJI[type] || "📊"}</span>
                  <div>
                    <p className="font-semibold">{TYPE_LABELS[type] || type}</p>
                    <p className="text-zinc-500 text-sm">
                      {stats.correct}/{stats.total} correct
                    </p>
                  </div>
                </div>
                <AccuracyBadge accuracy={stats.accuracy} samples={stats.total} />
              </div>
            ))}
          </div>
          <p className="text-zinc-600 text-xs mt-3">* Less than 10 samples — interpret with caution</p>
        </div>

        {/* Asset Performance */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">By Asset</h2>
          <div className="grid gap-3">
            {sortedAssets.map(([asset, stats]) => (
              <div
                key={asset}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-lg">{asset}</p>
                  <p className="text-zinc-500 text-sm">
                    {stats.correct}/{stats.total} correct
                  </p>
                </div>
                <AccuracyBadge accuracy={stats.accuracy} samples={stats.total} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Resolutions — limited, no prices */}
        {data.recentResolutions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Resolutions</h2>
            <div className="space-y-3">
              {[...data.recentResolutions].reverse().slice(0, 3).map((r, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xl ${r.correct_24h === true ? "text-green-400" : r.correct_24h === false ? "text-red-400" : "text-zinc-500"}`}>
                      {r.correct_24h === true ? "✅" : r.correct_24h === false ? "❌" : "⏳"}
                    </span>
                    <div>
                      <p className="font-semibold">
                        {r.asset}{" "}
                        <span className={r.direction_predicted === "bullish" ? "text-green-400" : r.direction_predicted === "bearish" ? "text-red-400" : "text-yellow-400"}>
                          {r.direction_predicted.toUpperCase()}
                        </span>
                      </p>
                      <p className="text-zinc-500 text-sm">
                        {r.correct_24h === true ? "Signal confirmed" : r.correct_24h === false ? "Signal missed" : "Pending resolution"}
                        {r.pct_change_24h !== null && (
                          <span className={r.pct_change_24h >= 0 ? " text-green-400" : " text-red-400"}>
                            {" "}({r.pct_change_24h >= 0 ? "+" : ""}{r.pct_change_24h.toFixed(2)}%)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <span className="text-zinc-600 text-xs">{timeAgo(r.timestamp)}</span>
                </div>
              ))}
            </div>
            <p className="text-zinc-600 text-sm mt-4">Full resolution history available with Sentinel.</p>
          </div>
        )}

        {/* Live Signals — gated teaser */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Live Signals</h2>
          <div className="relative">
            {/* Show 2 blurred signals as teaser */}
            <div className="space-y-3">
              {[...data.recentPredictions].reverse().slice(0, 2).map((p, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{TYPE_EMOJI[p.signal_type] || "📊"}</span>
                    <span className="font-bold">{p.asset}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      p.direction === "bullish" ? "bg-green-400/10 text-green-400" :
                      p.direction === "bearish" ? "bg-red-400/10 text-red-400" :
                      "bg-yellow-400/10 text-yellow-400"
                    }`}>
                      {p.direction.toUpperCase()}
                    </span>
                    <span className="text-zinc-600 text-xs">{timeAgo(p.timestamp)}</span>
                  </div>
                  <p className="text-zinc-600 text-sm blur-sm select-none">Signal intelligence and entry price available with Sentinel subscription</p>
                </div>
              ))}
            </div>
            {/* Overlay CTA */}
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent rounded-xl">
              <div className="text-center pb-6">
                <p className="text-zinc-300 font-semibold mb-3">
                  {data.totalPredictions - data.resolved} signals pending resolution
                </p>
                <a
                  href="https://api.botindex.dev/api/botindex/keys/register?plan=sentinel"
                  className="inline-block px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 rounded-lg font-semibold transition"
                >
                  Unlock Live Signals — 7 Day Free Trial →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Get Real-Time Signals</h3>
          <p className="text-zinc-400 mb-6">
            Free delayed signals on Telegram. Real-time with Sentinel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://t.me/BotIndexSignals"
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-semibold transition"
            >
              Free Signals →
            </a>
            <a
              href="https://api.botindex.dev/api/botindex/keys/register?plan=sentinel"
              className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 rounded-lg font-semibold transition"
            >
              Sentinel — 7 Day Free Trial →
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-zinc-600 text-sm">
          <p>Data refreshes every 60 seconds. All predictions are logged before price resolution.</p>
          <p className="mt-1">
            API: <a href={API_URL} className="text-zinc-500 hover:text-zinc-300 underline">api.botindex.dev</a>
          </p>
        </div>
      </div>
    </div>
  );
}
