"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LinkButton } from "@/components/ui/Button";
import { WatchlistButton } from "@/components/funds/WatchlistButton";
import {
  getAllSchemes,
  filterSchemesByCategory,
  extractFundHouse,
  CATEGORY_DISPLAY_NAMES,
  type MFScheme,
} from "@/lib/mfapi";

const PAGE_SIZE = 18;

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "large-cap":
    "Funds investing in India's top 100 companies. Stable, well-established, lower risk.",
  "mid-cap":
    "Funds investing in 101–250 ranked companies. Higher growth potential with moderate risk.",
  "small-cap":
    "Funds investing in companies ranked 251+. Highest growth potential, higher risk.",
  "flexi-cap":
    "Funds with flexible allocation across large, mid, and small caps based on market conditions.",
  hybrid:
    "Funds that blend equity and debt for balanced growth with stability.",
  debt: "Funds investing in bonds and fixed-income instruments. Lower risk, steady returns.",
};

export default function FundCategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const [allSchemes, setAllSchemes] = useState<MFScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getAllSchemes()
      .then((schemes) => {
        const filtered = filterSchemesByCategory(schemes, category);
        setAllSchemes(filtered);
      })
      .catch(() =>
        setError("Unable to load funds. Please check your connection."),
      )
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = useMemo(() => {
    if (!search.trim()) return allSchemes;
    const q = search.toLowerCase();
    return allSchemes.filter((s) => s.schemeName.toLowerCase().includes(q));
  }, [allSchemes, search]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;
  const categoryName = CATEGORY_DISPLAY_NAMES[category] ?? "Funds";

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="container-page pt-10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-2 text-xs text-ink-muted mb-3">
              <Link
                href="/funds"
                className="hover:text-ink transition-colors cursor-pointer"
              >
                All Funds
              </Link>
              <span>›</span>
              <span>{categoryName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-ink">
              {categoryName}
            </h1>
            <p className="text-sm text-ink-muted max-w-xl leading-relaxed mb-4">
              {CATEGORY_DESCRIPTIONS[category] ??
                "Browse funds in this category."}
            </p>
            {!loading && (
              <p className="text-xs text-ink-soft">
                {filtered.length} funds found · Data from{" "}
                <span className="font-medium">mfapi.in</span> (AMFI)
              </p>
            )}
          </motion.div>
        </section>

        {/* Search */}
        <section className="container-page pb-6">
          <div className="relative max-w-md">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={`Search ${categoryName}…`}
              className="w-full rounded-xl border border-border bg-surface pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
            />
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <section className="container-page py-20 flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
              className="w-10 h-10 border-[3px] border-green-600 border-t-transparent rounded-full"
            />
            <p className="text-sm text-ink-muted">Fetching live fund data…</p>
          </section>
        )}

        {/* Error */}
        {error && !loading && (
          <section className="container-page py-20 flex flex-col items-center gap-3 text-red-500">
            <AlertCircle size={28} />
            <p className="text-sm">{error}</p>
          </section>
        )}

        {/* Fund Grid */}
        {!loading && !error && (
          <section className="container-page pb-8">
            {visible.length === 0 ? (
              <div className="py-20 text-center text-sm text-ink-muted">
                No funds match &quot;{search}&quot; — try a different search.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {visible.map((scheme, i) => (
                    <motion.div
                      key={scheme.schemeCode}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: (i % PAGE_SIZE) * 0.02,
                      }}
                      whileHover={{
                        y: -3,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      }}
                    >
                      <div className="group flex flex-col justify-between h-full rounded-2xl border border-border bg-surface p-5 hover:border-green-600/30 transition-all">
                        {/* Fund house tag */}
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft bg-surface-2 px-2.5 py-1 rounded-full">
                              {extractFundHouse(scheme.schemeName)}
                            </span>
                            <WatchlistButton
                              item={{
                                schemeCode: scheme.schemeCode,
                                schemeName: scheme.schemeName,
                                category,
                              }}
                            />
                          </div>
                          <h3 className="text-sm font-semibold text-ink leading-snug mb-3 line-clamp-3">
                            {scheme.schemeName}
                          </h3>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-2">
                          <Link
                            href={`/funds/${category}/${scheme.schemeCode}`}
                            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface-2 py-2.5 text-xs font-semibold text-ink hover:bg-ink hover:text-white hover:border-ink transition-all cursor-pointer group/btn"
                          >
                            <TrendingUp
                              size={11}
                              className="group-hover/btn:text-green-400"
                            />
                            View Fund
                          </Link>
                          <Link
                            href="/quiz"
                            className="flex items-center justify-center gap-1 rounded-xl bg-ink text-white py-2.5 px-3.5 text-xs font-semibold hover:bg-green-600 transition-all cursor-pointer"
                          >
                            Start SIP <ArrowRight size={10} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                >
                  <ChevronDown size={15} />
                  Load more ({filtered.length - visible.length} remaining)
                </button>
              </div>
            )}
          </section>
        )}

        {/* CTA Banner */}
        <section className="container-page pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-ink px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-white"
          >
            <div>
              <h2 className="text-lg font-bold mb-1.5">
                Not sure which fund to pick?
              </h2>
              <p className="text-sm text-white/60 max-w-sm">
                Take our 3-minute quiz and get a personalised fund
                recommendation — free.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <LinkButton href="/quiz" variant="mint" size="lg">
                Take the Quiz →
              </LinkButton>
              <LinkButton
                href="/contact"
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Talk to an Expert
              </LinkButton>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
