"use client";

import { motion } from "framer-motion";
import { Rocket, Eye } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function CoreFoundations() {
  const { dict } = useTranslation();
  const t = dict.about;

  const pillars = [
    { title: t.pillar1Title, desc: t.pillar1Desc },
    { title: t.pillar2Title, desc: t.pillar2Desc },
    { title: t.pillar3Title, desc: t.pillar3Desc },
  ];

  return (
    <section id="philosophy" className="container-page py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold inline-block relative pb-3">
          {t.coreFoundations}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-10 bg-green-600" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2 rounded-(--radius-card) bg-navy p-7 text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 mb-5 text-mint-400">
            <Rocket size={17} />
          </div>
          <h3 className="text-lg font-semibold mb-2">{t.missionTitle}</h3>
          <p className="text-sm text-white/65 leading-relaxed">
            {t.missionDesc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="rounded-(--radius-card) bg-surface-2 p-7 flex flex-col"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white mb-5 text-ink">
            <Eye size={17} />
          </div>
          <h3 className="text-lg font-semibold mb-2">{t.visionTitle}</h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-5 flex-1">
            {t.visionDesc}
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-ink">
            <span className="h-px w-4 bg-ink" />
            {t.integrityFirst}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
