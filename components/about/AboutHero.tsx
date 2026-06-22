"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { AdvisorPortrait } from "./AdvisorPortrait";

export function AboutHero() {
  const { dict } = useTranslation();
  const t = dict.about;

  return (
    <section className="container-page pt-12 pb-16 md:pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge tone="green" className="mb-5">
            ✓ {t.badge}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-5 text-ink">
            {t.title1}
            <br />
            <span className="text-green-600">{t.title2}</span>
          </h1>
          <p className="text-base text-ink-muted max-w-md mb-7 leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <LinkButton href="/contact" variant="secondary" size="lg">
              {t.bookConsultation}
            </LinkButton>
            <LinkButton href="/about#philosophy" variant="outline" size="lg">
              {t.viewPhilosophy}
            </LinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden aspect-[4/3.6]">
            <AdvisorPortrait />
          </div>
          <div className="absolute left-5 bottom-5 rounded-2xl bg-surface px-4 py-3 shadow-lg">
            <div className="text-sm font-bold text-ink">
              {t.experienceBadge}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-ink-soft">
              {t.experienceLabel}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
