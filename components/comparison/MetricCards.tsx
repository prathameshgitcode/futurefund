"use client";

import { TrendingUp, Landmark, Coins, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function MetricCards() {
  const { dict } = useTranslation();
  const t = dict.comparison;

  const metrics = [
    {
      icon: TrendingUp,
      label: t.sipAvg,
      value: "~12-15%",
      note: t.historical10y,
      tone: "green" as const,
    },
    {
      icon: Landmark,
      label: t.fdInterest,
      value: "~6.5-7.5%",
      note: t.guaranteed,
      tone: "neutral" as const,
    },
    {
      icon: Coins,
      label: t.goldCagr,
      value: "~9-11%",
      note: t.safeHaven,
      tone: "amber" as const,
    },
    {
      icon: ShieldCheck,
      label: t.ppfReturns,
      value: "7.1%",
      note: t.taxFree,
      tone: "blue" as const,
    },
  ];

  const toneClasses = {
    green: "border-green-600/40 text-green-600",
    amber: "border-amber-400/40 text-amber-600",
    blue: "border-blue-400/40 text-blue-600",
    neutral: "border-border text-ink",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className={`rounded-2xl border bg-surface p-5 ${toneClasses[m.tone]}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-ink-muted">
                {m.label}
              </span>
              <Icon size={15} />
            </div>
            <div className="text-xl font-bold mb-1 text-ink">{m.value}</div>
            <div className="text-[10px] uppercase tracking-wide opacity-80">
              {m.note}
            </div>
          </div>
        );
      })}
    </div>
  );
}
