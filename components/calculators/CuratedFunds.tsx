"use client";

import { Landmark, BarChart3, Globe2, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils/calculators";

const FUNDS = [
  {
    icon: Landmark,
    name: "Bluechip Alpha Growth",
    desc: "Focuses on Top 50 stable companies with consistent dividend payouts.",
    returns: "+18.4% (5Y)",
    minInvestment: 5000,
  },
  {
    icon: BarChart3,
    name: "Emerging Leaders 250",
    desc: "High-growth mid-cap companies poised for next-decade leadership.",
    returns: "+21.2% (5Y)",
    minInvestment: 2500,
  },
  {
    icon: Globe2,
    name: "Global Frontier Tech",
    desc: "Diversify your portfolio with US and EU market exposure.",
    returns: "+14.7% (5Y)",
    minInvestment: 10000,
  },
];

export function CuratedFunds({
  title,
  minInvestmentLabel,
}: {
  title: string;
  minInvestmentLabel: string;
}) {
  return (
    <section className="container-page py-12">
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {FUNDS.map((fund) => {
          const Icon = fund.icon;
          return (
            <div
              key={fund.name}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2">
                  <Icon size={17} className="text-ink" />
                </div>
                <span className="text-xs font-semibold text-green-600">
                  {fund.returns}
                </span>
              </div>
              <h3 className="font-semibold mb-1.5">{fund.name}</h3>
              <p className="text-xs text-ink-muted leading-relaxed mb-6">
                {fund.desc}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-ink-soft mb-0.5">
                    {minInvestmentLabel}
                  </div>
                  <div className="text-sm font-semibold">
                    {formatINR(fund.minInvestment)}
                  </div>
                </div>
                <ArrowRight size={16} className="text-ink-muted" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
