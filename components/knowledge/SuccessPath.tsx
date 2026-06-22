"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

export function SuccessPath() {
  const { dict } = useTranslation();
  const t = dict.knowledge;

  const steps = [
    { titleKey: "step1Title", descKey: "step1Desc" },
    { titleKey: "step2Title", descKey: "step2Desc" },
    { titleKey: "step3Title", descKey: "step3Desc" },
    { titleKey: "step4Title", descKey: "step4Desc" },
  ] as const;

  return (
    <section className="container-page py-10">
      <div className="rounded-(--radius-card) bg-surface-2 p-8 sm:p-12">
        <h2 className="text-2xl font-bold mb-2">{t.successPathTitle}</h2>
        <p className="text-sm text-ink-muted max-w-md mb-10">
          {t.successPathSubtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const isActive = i === 1;
            const isComplete = i === 0;
            return (
              <motion.div
                key={step.titleKey}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="text-center sm:text-left"
              >
                <div
                  className={cn(
                    "mx-auto sm:mx-0 mb-4 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                    isComplete && "bg-green-600 text-white",
                    isActive && "bg-ink text-white",
                    !isComplete &&
                      !isActive &&
                      "bg-surface border border-border text-ink-soft",
                  )}
                >
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-1.5">{t[step.titleKey]}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t[step.descKey]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
