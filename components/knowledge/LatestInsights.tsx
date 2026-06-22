"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Scale, BadgeCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge";
import { Button } from "@/components/ui/Button";

export function LatestInsights() {
  const { dict } = useTranslation();
  const t = dict.knowledge;

  const featured = KNOWLEDGE_ARTICLES.find(
    (a) => a.id === "2024-market-outlook",
  )!;
  const mistakes = KNOWLEDGE_ARTICLES.find(
    (a) => a.id === "5-mistakes-sip-investors",
  )!;

  return (
    <section className="container-page py-16">
      <h2 className="text-2xl font-bold mb-8">{t.latestInsights}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href={`/knowledge/${featured.id}`}
            className="group relative block h-full min-h-[280px] rounded-(--radius-card) overflow-hidden p-7 flex flex-col justify-end text-white"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, #134e3a 0%, #0c2b22 55%, #0a1f1a 100%)",
            }}
          >
            <span className="absolute top-6 left-6 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide">
              {t.marketInsightsTag}
            </span>
            <TrendingUp
              size={120}
              className="absolute -right-6 top-1/2 -translate-y-1/2 text-white/10"
              strokeWidth={1}
            />
            <h3 className="relative text-lg font-bold leading-snug mb-2 group-hover:text-mint-400 transition-colors">
              {featured.title}
            </h3>
            <p className="relative text-xs text-white/60 leading-relaxed">
              {featured.excerpt}
            </p>
          </Link>
        </motion.div>

        <div className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="relative rounded-(--radius-card) border border-border bg-surface p-6 flex-1"
          >
            <div className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white">
              <Scale size={15} />
            </div>
            <Link href={`/knowledge/${mistakes.id}`} className="block pr-12">
              <h3 className="font-semibold mb-2 hover:text-green-600 transition-colors">
                {mistakes.title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-4">
                {mistakes.excerpt}
              </p>
            </Link>
            <div className="flex items-center gap-3 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5">
                <span className="h-5 w-5 rounded-full bg-surface-2" />
                {t.byExpertPanel}
              </span>
              <span>{mistakes.readTime}</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="rounded-2xl bg-surface-2 p-5 flex flex-col"
            >
              <Scale size={18} className="text-ink-muted mb-3" />
              <h4 className="text-sm font-semibold mb-1 leading-snug">
                {t.assetAllocationTitle}
              </h4>
              <p className="text-xs text-ink-muted mb-4 flex-1">
                {t.assetAllocationDesc}
              </p>
              <Link
                href="/knowledge/asset-allocation-strategies"
                className="text-xs font-semibold text-ink hover:text-green-600 transition-colors"
              >
                {t.readGuide} ↗
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.14 }}
              className="rounded-2xl bg-ink p-5 flex flex-col text-white"
            >
              <BadgeCheck size={18} className="text-mint-400 mb-3" />
              <h4 className="text-sm font-semibold mb-1">
                {t.sipCertifyTitle}
              </h4>
              <p className="text-xs text-white/55 mb-4 flex-1">
                {t.sipCertifyDesc}
              </p>
              <Button variant="mint" size="sm" className="w-fit">
                {t.takeQuiz}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
