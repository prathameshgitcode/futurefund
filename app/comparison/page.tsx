"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { ComparisonSidebar } from "@/components/comparison/ComparisonSidebar";
import { MobileDashboardNav } from "@/components/dashboard/MobileDashboardNav";
import { MetricCards } from "@/components/comparison/MetricCards";
import { ComparisonMatrix } from "@/components/comparison/ComparisonMatrix";
import { GrowthVisualization } from "@/components/comparison/GrowthVisualization";
import { WhichOneForYou } from "@/components/comparison/WhichOneForYou";
import { LinkButton } from "@/components/ui/Button";

export default function ComparisonPage() {
  const { dict } = useTranslation();
  const t = dict.comparison;

  return (
    <div className="flex min-h-screen bg-bg">
      <ComparisonSidebar />

      <div className="flex-1 min-w-0">
        <MobileDashboardNav />

        <div className="p-5 lg:p-8 flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {t.title1} <span className="text-green-600">{t.title2}</span>
            </h1>
            <p className="text-sm text-ink-muted max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <MetricCards />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <ComparisonMatrix />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <GrowthVisualization />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <WhichOneForYou />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-(--radius-card) bg-ink px-6 py-12 sm:px-12 text-center text-white"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {t.foundStrategyTitle}
            </h2>
            <p className="text-sm text-white/65 max-w-md mx-auto mb-6 leading-relaxed">
              {t.foundStrategyDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <LinkButton href="/quiz" variant="mint" size="lg">
                {t.startSipNow}
              </LinkButton>
              <LinkButton
                href="/contact"
                variant="outline"
                size="lg"
                className="!border-white/30 !text-white hover:!bg-white/10"
              >
                {t.talkToExpert}
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
