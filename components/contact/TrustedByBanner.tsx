"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/I18nProvider";

const FUND_HOUSE_NAMES = [
  "SBI Mutual Fund",
  "HDFC Mutual Fund",
  "ICICI Prudential",
  "Axis Mutual Fund",
];

export function TrustedByBanner() {
  const { dict } = useTranslation();

  return (
    <section className="container-page pb-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-xs uppercase tracking-wide text-ink-soft mb-6"
      >
        {dict.contact.trustedBy}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 opacity-50"
      >
        {FUND_HOUSE_NAMES.map((name) => (
          <span
            key={name}
            className="text-xs font-semibold tracking-wide text-ink-soft"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
