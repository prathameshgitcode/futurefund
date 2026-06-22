"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LevelCards } from "@/components/knowledge/LevelCards";
import { LatestInsights } from "@/components/knowledge/LatestInsights";
import { SuccessPath } from "@/components/knowledge/SuccessPath";
import { NewsletterBanner } from "@/components/knowledge/NewsletterBanner";
import { SearchResults } from "@/components/knowledge/SearchResults";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge";

export default function KnowledgePage() {
  const { dict } = useTranslation();
  const t = dict.knowledge;
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return KNOWLEDGE_ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q),
    );
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container-page pt-12 pb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            {t.titleMain}
            <span className="text-green-600">{t.titleAccent}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-ink-muted max-w-lg mx-auto mb-7"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="relative max-w-md mx-auto"
          >
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="focus-ring w-full rounded-full border border-border bg-surface pl-11 pr-4 py-3 text-sm placeholder:text-ink-soft cursor-text"
            />
          </motion.div>
        </section>

        <section className="container-page pb-10">
          <LevelCards />
        </section>

        {isSearching ? (
          <SearchResults results={results} />
        ) : (
          <>
            <LatestInsights />
            <SuccessPath />
            <NewsletterBanner />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
