"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import type { KnowledgeArticle } from "@/types";
import { ArticleThumb } from "@/components/ui/ArticleThumb";

export function RelatedArticles({
  articles,
}: {
  articles: KnowledgeArticle[];
}) {
  const { dict } = useTranslation();
  const t = dict.knowledge;

  if (articles.length === 0) return null;

  return (
    <section className="container-page py-16 border-t border-border">
      <h2 className="text-xl font-bold mb-7">{t.relatedArticles}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/knowledge/${article.id}`}
            className="group block"
          >
            <ArticleThumb
              id={article.id}
              className="aspect-16/10 rounded-2xl overflow-hidden mb-4"
            />
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
