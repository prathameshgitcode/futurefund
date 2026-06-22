"use client";

import Link from "next/link";
import { LayoutGrid, BarChart3, TrendingUp } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { formatINR } from "@/lib/utils/calculators";
import { FUND_PERFORMANCE } from "@/data/dashboardMock";
import { Sparkline } from "./Sparkline";

const ICONS = [LayoutGrid, TrendingUp, BarChart3];

export function FundPerformanceTable() {
  const { dict } = useTranslation();
  const t = dict.dashboard;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold">{t.fundPerformance}</h2>
        <Link
          href="/funds"
          className="text-xs font-medium text-ink-muted hover:text-green-600 transition-colors"
        >
          {t.viewAllFunds}
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wide text-ink-soft border-b border-border">
              <th className="py-3 font-medium">{t.fundName}</th>
              <th className="py-3 font-medium">Units · NAV</th>
              <th className="py-3 font-medium">{t.invested}</th>
              <th className="py-3 font-medium">{t.currentValue}</th>
              <th className="py-3 font-medium">XIRR</th>
              <th className="py-3 font-medium">{t.returns}</th>
              <th className="py-3 font-medium">{t.trend}</th>
            </tr>
          </thead>
          <tbody>
            {FUND_PERFORMANCE.map((fund, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <tr
                  key={fund.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-ink-muted">
                        <Icon size={14} />
                      </div>
                      <span className="font-medium">{fund.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-ink-muted whitespace-nowrap">
                    <div className="text-ink font-medium">
                      {fund.units.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[11px] text-ink-soft">
                      NAV ₹{fund.nav.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-4 text-ink-muted">
                    {formatINR(fund.invested)}
                  </td>
                  <td className="py-4 font-medium">
                    {formatINR(fund.currentValue)}
                  </td>
                  <td className="py-4">
                    <span className="inline-flex rounded-full bg-green-50 text-green-700 px-2 py-0.5 text-[11px] font-semibold">
                      {fund.xirr.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-green-600">
                    +{fund.returnsPercent.toFixed(1)}%
                  </td>
                  <td className="py-4">
                    <Sparkline
                      data={fund.trend}
                      color="var(--color-green-600)"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-ink-soft mt-3">
        XIRR reflects your actual annualised return accounting for the timing of
        each SIP installment.
      </p>
    </div>
  );
}
