"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Counter } from "@/components/ui/Counter";

export function Credentials() {
  const { dict } = useTranslation();
  const t = dict.about;

  return (
    <section className="container-page py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-3">{t.credentialsTitle}</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-7 max-w-sm">
            {t.credentialsDesc}
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                <ShieldCheck size={17} />
              </div>
              <div>
                <div className="text-sm font-semibold">{t.amfiRegistered}</div>
                <p className="text-xs text-ink-muted leading-relaxed mt-0.5">
                  {t.amfiDesc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                <Award size={17} />
              </div>
              <div>
                <div className="text-sm font-semibold">{t.nismCertified}</div>
                <p className="text-xs text-ink-muted leading-relaxed mt-0.5">
                  {t.nismDesc}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <StatTile value={500} suffix="+" label={t.statClients} />
          <StatTile value={98} suffix="%" label={t.statRetention} />
          <StatTile
            value={100}
            prefix="₹"
            suffix="Cr+"
            label={t.statAum}
            dark
          />
          <StatTile value={12} suffix="+" label={t.statAwards} />
        </div>
      </div>
    </section>
  );
}

function StatTile({
  value,
  prefix,
  suffix,
  label,
  dark,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={
        dark
          ? "rounded-2xl bg-navy text-white p-6 flex flex-col gap-1.5"
          : "rounded-2xl bg-surface border border-border p-6 flex flex-col gap-1.5"
      }
    >
      <div
        className={`text-2xl font-bold ${
          dark ? "text-mint-400" : "text-green-600"
        }`}
      >
        <Counter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div
        className={`text-[10px] uppercase tracking-wide ${
          dark ? "text-white/55" : "text-ink-soft"
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}
