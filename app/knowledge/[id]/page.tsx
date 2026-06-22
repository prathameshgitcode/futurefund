import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleThumb } from "@/components/ui/ArticleThumb";
import { ArticleActions } from "@/components/knowledge/ArticleActions";
import { ReadingProgress } from "@/components/knowledge/ReadingProgress";
import { RelatedArticles } from "@/components/knowledge/RelatedArticles";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge";

export function generateStaticParams() {
  return KNOWLEDGE_ARTICLES.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = KNOWLEDGE_ARTICLES.find((a) => a.id === id);
  if (!article) return { title: "Article Not Found — FutureFund.in" };
  return {
    title: `${article.title} — FutureFund.in Knowledge Center`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = KNOWLEDGE_ARTICLES.find((a) => a.id === id);
  if (!article) notFound();

  const related = KNOWLEDGE_ARTICLES.filter(
    (a) => a.id !== article.id && a.category === article.category,
  ).slice(0, 3);
  const fallbackRelated =
    related.length > 0
      ? related
      : KNOWLEDGE_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const paragraphs = (article.content ?? article.excerpt).split("\n\n");

  return (
    <>
      <ReadingProgress />
      <Header />
      <main className="flex-1">
        <article className="container-page max-w-2xl py-12">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink mb-7 transition-colors"
          >
            <ArrowLeft size={13} />
            Back to Knowledge Center
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-green-600">
              {article.category}
            </span>
            <span className="text-[10px] text-ink-soft">• {article.level}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-7 pb-7 border-b border-border">
            <div className="flex items-center gap-2.5 text-xs text-ink-muted">
              <span className="h-7 w-7 rounded-full bg-surface-2" />
              <span className="font-medium text-ink">{article.author}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <ArticleActions articleId={article.id} />
          </div>

          <ArticleThumb
            id={article.id}
            className="aspect-16/9 rounded-2xl overflow-hidden mb-8"
          />

          <div className="prose-sip flex flex-col gap-5">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink/90">
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-8 pt-7 border-t border-border">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-2 text-xs text-ink-muted px-3 py-1.5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        <RelatedArticles articles={fallbackRelated} />
      </main>
      <Footer />
    </>
  );
}
