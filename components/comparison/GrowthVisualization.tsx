"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import {
  calculateSipFutureValue,
  formatINRShort,
} from "@/lib/utils/calculators";
import { tpl } from "@/lib/utils/cn";

const MONTHLY_AMOUNT = 10000;
const YEARS = 10;

const ASSETS = [
  { label: "SIP @ 15%", rate: 15, color: "var(--color-green-600)" },
  { label: "Gold @ 10%", rate: 10, color: "#d97706" },
  { label: "PPF @ 7.1%", rate: 7.1, color: "var(--color-navy)" },
  { label: "FD @ 6.5%", rate: 6.5, color: "var(--color-ink-soft)" },
];

export function GrowthVisualization() {
  const { dict } = useTranslation();
  const t = dict.comparison;

  const results = ASSETS.map((asset) => ({
    ...asset,
    ...calculateSipFutureValue(MONTHLY_AMOUNT, asset.rate, YEARS),
  }));

  const maxValue = Math.max(...results.map((r) => r.futureValue));
  const sip = results[0];
  const fd = results[3];
  const multiplier = (sip.futureValue / fd.futureValue).toFixed(1);

  return (
    <div className="rounded-(--radius-card) bg-surface-2 p-8 sm:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-xl font-bold mb-3 leading-snug">
            {t.visualizingTitle}
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            {t.visualizingDesc}
          </p>
        </div>

        <div>
          <div className="flex flex-col gap-4 mb-5">
            {results.map((r) => (
              <div key={r.label}>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span>{r.label}</span>
                  <span>{formatINRShort(r.futureValue)}</span>
                </div>
                <div className="h-2.5 rounded-full bg-surface overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: r.color }}
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(r.futureValue / maxValue) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-surface p-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-green-600">
              {tpl(t.growthMultiplier, { multiplier })}
            </span>
            <span className="text-xs text-ink-soft">
              {t.growthMultiplierDesc}
            </span>
          </div>

          <p className="text-[10px] text-ink-soft mt-3 leading-relaxed">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
