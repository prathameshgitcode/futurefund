"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import type { KnowledgeArticle } from "@/types";
import { ArticleThumb } from "@/components/ui/ArticleThumb";

export function SearchResults({ results }: { results: KnowledgeArticle[] }) {
  const { dict } = useTranslation();
  const t = dict.knowledge;

  if (results.length === 0) {
    return (
      <section className="container-page py-16">
        <p className="text-center text-sm text-ink-muted">{t.noResults}</p>
      </section>
    );
  }

  return (
    <section className="container-page py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((article) => (
          <Link
            key={article.id}
            href={`/knowledge/${article.id}`}
            className="group block"
          >
            <ArticleThumb
              id={article.id}
              className="aspect-16/10 rounded-2xl overflow-hidden mb-4"
            />
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-green-600">
                {article.category}
              </span>
              <span className="text-[10px] text-ink-soft">
                • {article.readTime}
              </span>
            </div>
            <h3 className="font-semibold text-sm mb-1.5 group-hover:text-green-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
