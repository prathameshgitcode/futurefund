"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";
import { formatINRShort } from "@/lib/utils/calculators";
import { WEALTH_GROWTH_DATA } from "@/data/dashboardMock";

const RANGES = ["1Y", "3Y", "MAX"] as const;

export function WealthGrowthChart() {
  const { dict } = useTranslation();
  const t = dict.dashboard;
  const [range, setRange] = useState<(typeof RANGES)[number]>("1Y");

  const data = WEALTH_GROWTH_DATA[range];

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold">{t.wealthGrowth}</h2>
        <div className="flex items-center gap-1 rounded-full bg-surface-2 p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                range === r ? "bg-surface text-ink shadow-sm" : "text-ink-soft",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <p className="text-xs text-ink-soft mb-5">{t.performanceLast12}</p>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }}
              axisLine={false}
              tickLine={false}
              interval={range === "1Y" ? 1 : 0}
            />
            <Tooltip
              formatter={(value) => formatINRShort(Number(value ?? 0))}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--color-border)",
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="value"
              fill="var(--color-mint-400)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
