"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Library } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge";
import { ArticleThumb } from "@/components/ui/ArticleThumb";

export function KnowledgeCenterSection() {
  const { dict } = useTranslation();
  const articles = KNOWLEDGE_ARTICLES.slice(0, 3);

  return (
    <section className="container-page py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">{dict.home.knowledgeCenterTitle}</h2>
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-green-600 transition-colors"
        >
          {dict.home.goToLibrary} <Library size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            <Link href={`/knowledge/${article.id}`} className="group block">
              <ArticleThumb
                id={article.id}
                className="aspect-16/10 rounded-2xl overflow-hidden mb-4"
              />
              <h3 className="font-semibold text-sm mb-1.5 group-hover:text-green-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-ink-muted mb-3 leading-relaxed">
                {article.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink">
                {dict.common.readMore} <ArrowRight size={12} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
