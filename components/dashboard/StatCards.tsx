"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { formatINR } from "@/lib/utils/calculators";

export function StatCards() {
  const { dict } = useTranslation();
  const t = dict.dashboard;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="text-[10px] uppercase tracking-wide text-ink-soft mb-2">
          {t.totalValue}
        </div>
        <div className="text-xl font-bold mb-1.5">{formatINR(1450000)}</div>
        <div className="flex items-center gap-1 text-xs font-medium text-green-600">
          <ArrowUpRight size={12} />
          +1.2% {t.today}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="text-[10px] uppercase tracking-wide text-ink-soft mb-2">
          {t.invested}
        </div>
        <div className="text-xl font-bold mb-1.5">{formatINR(1020000)}</div>
        <div className="text-xs text-ink-soft">{t.principalAmount}</div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="text-[10px] uppercase tracking-wide text-ink-soft mb-2">
          {t.returns}
        </div>
        <div className="text-xl font-bold mb-1.5 text-green-600">
          + {formatINR(430000)}
        </div>
        <div className="text-xs text-ink-soft">42.1% {t.xirr}</div>
      </div>
    </div>
  );
}
