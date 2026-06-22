"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Trash2, TrendingUp, ArrowRight, Scale } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LinkButton } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import {
  getWatchlist,
  removeFromWatchlist,
  WATCHLIST_EVENT,
  type WatchlistItem,
} from "@/lib/watchlist/watchlistStore";
import { extractFundHouse } from "@/lib/mfapi";

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const { dict } = useTranslation();
  const t = dict.watchlist;

  useEffect(() => {
    const sync = () => setItems(getWatchlist());
    sync();
    window.addEventListener(WATCHLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WATCHLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container-page pt-10 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">
              <Bookmark size={14} /> {t.pageTitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-2">
              {t.heroTitle}
            </h1>
            <p className="text-sm text-ink-muted max-w-xl">{t.heroSubtitle}</p>
          </motion.div>
        </section>

        <section className="container-page pb-16">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface py-20 flex flex-col items-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-ink-soft">
                <Bookmark size={26} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink mb-1">
                  {t.emptyTitle}
                </p>
                <p className="text-xs text-ink-muted max-w-xs">
                  {t.emptySubtitle}
                </p>
              </div>
              <LinkButton href="/funds" variant="secondary" size="md">
                {t.exploreCta} <ArrowRight size={14} />
              </LinkButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.schemeCode}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="inline-flex text-[10px] font-semibold uppercase tracking-wider text-ink-soft bg-surface-2 px-2.5 py-1 rounded-full">
                          {extractFundHouse(item.schemeName)}
                        </span>
                        <button
                          onClick={() => removeFromWatchlist(item.schemeCode)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-ink-muted hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
                          aria-label="Remove"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <h3 className="text-sm font-semibold text-ink leading-snug mb-3 line-clamp-3">
                        {item.schemeName}
                      </h3>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Link
                        href={`/funds/${item.category}/${item.schemeCode}`}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface-2 py-2.5 text-xs font-semibold text-ink hover:bg-ink hover:text-white transition-all cursor-pointer"
                      >
                        <TrendingUp size={11} /> {t.viewFund}
                      </Link>
                      <Link
                        href="/quiz"
                        className="flex items-center justify-center gap-1 rounded-xl bg-ink text-white py-2.5 px-3.5 text-xs font-semibold hover:bg-green-600 transition-all cursor-pointer"
                      >
                        {t.startSip} <ArrowRight size={10} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {items.length >= 2 && (
            <div className="mt-8 flex justify-center">
              <LinkButton href="/fund-comparison" variant="outline" size="md">
                <Scale size={15} /> {t.compareCta}
              </LinkButton>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
