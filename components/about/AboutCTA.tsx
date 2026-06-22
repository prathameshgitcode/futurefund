"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LinkButton } from "@/components/ui/Button";

export function AboutCTA() {
  const { dict } = useTranslation();
  const t = dict.about;

  return (
    <section className="container-page py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-(--radius-card) bg-green-600 px-6 py-14 sm:px-12 text-center text-white"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.ctaTitle}</h2>
        <p className="text-sm text-white/80 max-w-md mx-auto mb-7 leading-relaxed">
          {t.ctaDesc}
        </p>
        <LinkButton
          href="/contact"
          variant="primary"
          size="lg"
          className="!bg-white !text-green-700 hover:!bg-white/90"
        >
          {t.ctaButton}
        </LinkButton>
        <p className="text-xs text-white/60 mt-5">{t.ctaFootnote}</p>
      </motion.div>
    </section>
  );
}
