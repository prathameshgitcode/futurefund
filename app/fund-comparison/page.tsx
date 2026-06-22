"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Search,
  Plus,
  X,
  TrendingUp,
  TrendingDown,
  Loader2,
  Award,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import {
  getAllSchemes,
  getSchemeDetail,
  calculateReturns,
  extractFundHouse,
  type MFScheme,
  type ReturnMetrics,
  type MFMeta,
} from "@/lib/mfapi";

interface ComparedFund {
  scheme: MFScheme;
  meta: MFMeta | null;
  metrics: ReturnMetrics | null;
  loading: boolean;
}

const MAX_FUNDS = 3;

export default function FundComparisonPage() {
  const [allSchemes, setAllSchemes] = useState<MFScheme[]>([]);
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<ComparedFund[]>([]);
  const [schemesLoaded, setSchemesLoaded] = useState(false);
  const { dict } = useTranslation();
  const t = dict.fundComparison;

  useEffect(() => {
    getAllSchemes()
      .then((s) => setAllSchemes(s))
      .finally(() => setSchemesLoaded(true));
  }, []);

  const results = useMemo(() => {
    if (query.trim().length < 3) return [];
    const q = query.toLowerCase();
    return allSchemes
      .filter((s) => s.schemeName.toLowerCase().includes(q))
      .filter((s) => !picked.some((p) => p.scheme.schemeCode === s.schemeCode))
      .slice(0, 8);
  }, [query, allSchemes, picked]);

  const addFund = async (scheme: MFScheme) => {
    if (picked.length >= MAX_FUNDS) return;
    setQuery("");
    const entry: ComparedFund = {
      scheme,
      meta: null,
      metrics: null,
      loading: true,
    };
    setPicked((p) => [...p, entry]);
    try {
      const detail = await getSchemeDetail(scheme.schemeCode);
      const metrics = calculateReturns(detail.data);
      setPicked((p) =>
        p.map((f) =>
          f.scheme.schemeCode === scheme.schemeCode
            ? { ...f, meta: detail.meta, metrics, loading: false }
            : f,
        ),
      );
    } catch {
      setPicked((p) =>
        p.map((f) =>
          f.scheme.schemeCode === scheme.schemeCode
            ? { ...f, loading: false }
            : f,
        ),
      );
    }
  };

  const removeFund = (code: number) =>
    setPicked((p) => p.filter((f) => f.scheme.schemeCode !== code));

  const bestFor = (key: keyof ReturnMetrics): number | null => {
    let best: { code: number; val: number } | null = null;
    picked.forEach((f) => {
      const v = f.metrics?.[key];
      if (typeof v === "number" && (!best || v > best.val))
        best = { code: f.scheme.schemeCode, val: v };
    });
    return best ? (best as { code: number }).code : null;
  };

  const ROWS: { label: string; key: keyof ReturnMetrics; pa?: boolean }[] = [
    { label: t.row1M, key: "return1M" },
    { label: t.row6M, key: "return6M" },
    { label: t.row1Y, key: "return1Y" },
    { label: t.row3Y, key: "return3Y", pa: true },
    { label: t.row5Y, key: "return5Y", pa: true },
    { label: t.rowInception, key: "returnMax", pa: true },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg">
        <div className="container-page max-w-4xl py-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">
              <Scale size={14} /> {t.pageTitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-2">
              {t.heroTitle}
            </h1>
            <p className="text-sm text-ink-muted max-w-xl">{t.heroSubtitle}</p>
          </motion.div>

          {picked.length < MAX_FUNDS && (
            <div className="relative mt-6 max-w-lg">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  schemesLoaded ? t.searchPlaceholder : t.loadingFunds
                }
                disabled={!schemesLoaded}
                className="w-full rounded-xl border border-border bg-surface pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-60"
              />
              <AnimatePresence>
                {results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-10 mt-2 w-full rounded-xl border border-border bg-surface shadow-lg overflow-hidden"
                  >
                    {results.map((s) => (
                      <button
                        key={s.schemeCode}
                        onClick={() => addFund(s)}
                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-surface-2 transition-colors cursor-pointer border-b border-border last:border-0"
                      >
                        <Plus size={14} className="text-green-600 shrink-0" />
                        <span className="line-clamp-1">{s.schemeName}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {picked.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface py-16 flex flex-col items-center gap-3 text-center">
              <Scale size={30} className="text-ink-soft" />
              <p className="text-sm font-medium text-ink">{t.emptyTitle}</p>
              <p className="text-xs text-ink-muted max-w-xs">
                {t.emptySubtitle.split("fund screener")[0]}
                <Link href="/funds" className="text-green-600 font-medium">
                  fund screener
                </Link>
                {t.emptySubtitle.split("fund screener")[1] ?? ""}
              </p>
            </div>
          ) : (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse min-w-[560px]">
                <thead>
                  <tr>
                    <th className="w-32" />
                    {picked.map((f) => (
                      <th key={f.scheme.schemeCode} className="p-3 align-top">
                        <div className="rounded-2xl border border-border bg-surface p-4 relative text-left">
                          <button
                            onClick={() => removeFund(f.scheme.schemeCode)}
                            className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-surface-2 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                            aria-label="Remove"
                          >
                            <X size={12} />
                          </button>
                          <span className="inline-flex text-[9px] font-semibold uppercase tracking-wider text-ink-soft bg-surface-2 px-2 py-0.5 rounded-full mb-2">
                            {extractFundHouse(f.scheme.schemeName)}
                          </span>
                          <p className="text-xs font-semibold text-ink leading-snug line-clamp-3">
                            {f.scheme.schemeName}
                          </p>
                          {f.loading ? (
                            <Loader2
                              size={14}
                              className="animate-spin text-green-600 mt-2"
                            />
                          ) : f.metrics ? (
                            <p className="text-[11px] text-ink-muted mt-2">
                              NAV ₹{f.metrics.currentNav.toFixed(2)}
                            </p>
                          ) : (
                            <p className="text-[11px] text-red-400 mt-2">
                              {t.dataUnavailable}
                            </p>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => {
                    const winner = bestFor(row.key);
                    return (
                      <tr key={row.key} className="border-t border-border">
                        <td className="py-3 pr-3 text-xs font-medium text-ink-muted">
                          {row.label}
                        </td>
                        {picked.map((f) => {
                          const val = f.metrics?.[row.key] as
                            | number
                            | null
                            | undefined;
                          const isWinner =
                            winner === f.scheme.schemeCode &&
                            typeof val === "number";
                          return (
                            <td
                              key={f.scheme.schemeCode}
                              className="py-3 px-3 text-center"
                            >
                              {f.loading ? (
                                <span className="text-ink-soft">…</span>
                              ) : typeof val === "number" ? (
                                <span
                                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold ${
                                    isWinner
                                      ? "bg-green-50 text-green-700"
                                      : val >= 0
                                        ? "text-green-600"
                                        : "text-red-500"
                                  }`}
                                >
                                  {isWinner && <Award size={12} />}
                                  {val >= 0 ? (
                                    <TrendingUp size={11} />
                                  ) : (
                                    <TrendingDown size={11} />
                                  )}
                                  {Math.abs(val).toFixed(1)}%
                                  {row.pa ? ` ${t.perAnnum}` : ""}
                                </span>
                              ) : (
                                <span className="text-ink-soft text-sm">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {picked.length > 0 && (
            <div className="mt-8 rounded-2xl bg-ink p-6 text-center text-white">
              <p className="text-sm font-bold text-white mb-1">{t.ctaTitle}</p>
              <p className="text-sm text-white/70 mb-4">{t.ctaSubtitle}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-white hover:bg-green-600 transition-colors cursor-pointer"
              >
                {t.ctaButton} <ArrowRight size={14} />
              </Link>
            </div>
          )}

          <p className="text-[10px] text-ink-soft mt-4">{t.disclaimer}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
