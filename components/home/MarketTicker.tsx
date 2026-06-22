"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";

interface Quote {
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
}

interface MarketData {
  sensex: Quote | null;
  nifty: Quote | null;
  gold: Quote | null;
  usdinr: Quote | null;
  fetchedAt?: string;
  error?: string;
}

const FALLBACK: MarketData = {
  sensex: {
    regularMarketPrice: 72450.58,
    regularMarketChange: 312.4,
    regularMarketChangePercent: 0.43,
  },
  nifty: {
    regularMarketPrice: 21980.5,
    regularMarketChange: 98.2,
    regularMarketChangePercent: 0.45,
  },
  gold: {
    regularMarketPrice: 2018.3,
    regularMarketChange: -5.6,
    regularMarketChangePercent: -0.28,
  },
  usdinr: {
    regularMarketPrice: 83.18,
    regularMarketChange: 0.03,
    regularMarketChangePercent: 0.04,
  },
};

function TickerItem({
  label,
  quote,
  format,
}: {
  label: string;
  quote: Quote | null;
  format: (v: number) => string;
}) {
  if (!quote) return null;
  const up = quote.regularMarketChange >= 0;
  const Icon =
    Math.abs(quote.regularMarketChange) < 0.01
      ? Minus
      : up
        ? TrendingUp
        : TrendingDown;

  return (
    <span className="inline-flex items-center gap-2 px-4 border-r border-white/10 last:border-0 whitespace-nowrap">
      <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-[11px] font-bold text-white">
        {format(quote.regularMarketPrice)}
      </span>
      <span
        className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
          up ? "text-green-400" : "text-red-400"
        }`}
      >
        <Icon size={9} />
        {up ? "+" : ""}
        {quote.regularMarketChangePercent.toFixed(2)}%
      </span>
    </span>
  );
}

export function MarketTicker() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/market-data");
      if (!res.ok) throw new Error("API failed");
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch {
      setData(FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const d = data ?? FALLBACK;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0c1222] border-b border-white/5 py-1.5 overflow-hidden"
    >
      <div className="flex items-center gap-0">
        {/* Live badge */}
        <div className="shrink-0 flex items-center gap-1.5 pl-3 pr-4 border-r border-white/10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">
            Live
          </span>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 px-4">
            <RefreshCw size={10} className="text-white/30 animate-spin" />
            <span className="text-[10px] text-white/30">
              Fetching market data…
            </span>
          </div>
        ) : (
          <div className="flex overflow-x-auto scrollbar-none">
            <TickerItem
              label="SENSEX"
              quote={d.sensex}
              format={(v) =>
                v.toLocaleString("en-IN", { maximumFractionDigits: 0 })
              }
            />
            <TickerItem
              label="NIFTY 50"
              quote={d.nifty}
              format={(v) =>
                v.toLocaleString("en-IN", { maximumFractionDigits: 0 })
              }
            />
            <TickerItem
              label="GOLD (oz)"
              quote={d.gold}
              format={(v) => `$${v.toFixed(0)}`}
            />
            <TickerItem
              label="USD/INR"
              quote={d.usdinr}
              format={(v) => `₹${v.toFixed(2)}`}
            />
          </div>
        )}

        <div className="shrink-0 ml-auto px-3 text-[9px] text-white/20 hidden sm:block">
          {data?.fetchedAt
            ? new Date(data.fetchedAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </div>
      </div>
    </motion.div>
  );
}
