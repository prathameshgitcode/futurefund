"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, X, Sparkles } from "lucide-react";

const DISMISS_KEY = "sg_market_reassure_dismissed";
const TRIGGER_THRESHOLD = -2; // show when Nifty is down 2% or more

interface QuoteLike {
  regularMarketChangePercent?: number;
}

/**
 * When the market falls sharply, anxious investors panic-stop their SIPs.
 * This banner reframes a dip as an opportunity — buying more units cheaper —
 * which is exactly what keeps SIPs running and clients invested.
 */
export function MarketReassuranceBanner() {
  const [niftyPct, setNiftyPct] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Dismissed for the day?
    const dismissedOn = sessionStorage.getItem(DISMISS_KEY);
    if (dismissedOn === new Date().toDateString()) return;

    let cancelled = false;
    fetch("/api/market-data")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const nifty: QuoteLike | null = data?.nifty ?? null;
        const pct = nifty?.regularMarketChangePercent;
        if (typeof pct === "number" && pct <= TRIGGER_THRESHOLD) {
          setNiftyPct(pct);
          setVisible(true);
        }
      })
      .catch(() => {
        /* market data unavailable — stay silent */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, new Date().toDateString());
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          className="relative z-30 bg-linear-to-r from-amber-50 via-green-50 to-amber-50 border-b border-amber-200"
        >
          <div className="container-page py-2.5 flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <TrendingDown size={16} />
            </div>
            <p className="flex-1 text-xs sm:text-sm text-ink leading-snug">
              <strong>Markets are down {niftyPct?.toFixed(2)}% today</strong> —
              and that&apos;s good news for your SIP.{" "}
              <span className="text-ink-muted">
                Your monthly amount now buys{" "}
                <strong className="text-green-700">
                  more units at lower prices
                </strong>
                . Staying invested through dips is how long-term wealth is
                built.
              </span>
            </p>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-green-700 whitespace-nowrap">
              <Sparkles size={12} /> Keep your SIP running
            </span>
            <button
              onClick={dismiss}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
