"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function ContactHero() {
  const { dict } = useTranslation();
  const t = dict.contact;

  return (
    <section className="container-page pt-12 pb-10 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold mb-4"
      >
        {t.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm text-ink-muted max-w-lg mx-auto leading-relaxed"
      >
        {t.subtitle}
      </motion.p>
    </section>
  );
}
