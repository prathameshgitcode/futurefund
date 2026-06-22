"use client";

import { Download } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";

const ROWS = [
  {
    featureKey: "featureExpectedReturn",
    values: [
      { text: "12% - 15% (High)", tone: "green" },
      { text: "6% - 7.5% (Low)", tone: "neutral" },
      { text: "8% - 10% (Moderate)", tone: "amber" },
      { text: "7.1% (Fixed)", tone: "blue" },
    ],
  },
  {
    featureKey: "featureRiskLevel",
    values: [
      { text: "Market Linked", tone: "red" },
      { text: "Very Low", tone: "greenPill" },
      { text: "Moderate", tone: "neutralPill" },
      { text: "Zero Risk", tone: "greenPill" },
    ],
  },
  {
    featureKey: "featureLiquidity",
    values: [
      { text: "High (T+2 Days)", tone: "neutral" },
      { text: "Moderate (Penalty applies)", tone: "neutral" },
      { text: "High (Physical/Digital)", tone: "neutral" },
      { text: "Low (15 yr Lock-in)", tone: "neutral" },
    ],
  },
  {
    featureKey: "featureTaxBenefit",
    values: [
      { text: "LTCG (12.5% > 1.25L)", tone: "neutral" },
      { text: "Taxable as per Slab", tone: "neutral" },
      { text: "LTCG Taxable", tone: "neutral" },
      { text: "Exempt (EEE Status)", tone: "green" },
    ],
  },
  {
    featureKey: "featureBestFor",
    values: [
      { text: "Wealth Creation (5yr+)", tone: "neutral" },
      { text: "Emergency Fund", tone: "neutral" },
      { text: "Portfolio Hedging", tone: "neutral" },
      { text: "Retirement Planning", tone: "neutral" },
    ],
  },
];

const COLUMNS = [
  "Mutual Fund SIP",
  "Fixed Deposit (FD)",
  "Gold (Physical/SGB)",
  "PPF",
];

function ValueCell({ value }: { value: { text: string; tone: string } }) {
  if (value.tone === "greenPill") {
    return (
      <span className="inline-block rounded-full bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1">
        {value.text}
      </span>
    );
  }
  if (value.tone === "neutralPill") {
    return (
      <span className="inline-block rounded-full bg-surface-2 text-ink-muted text-xs font-medium px-2.5 py-1">
        {value.text}
      </span>
    );
  }
  const colorClass =
    value.tone === "green"
      ? "text-green-600 font-semibold"
      : value.tone === "amber"
        ? "text-amber-600 font-semibold"
        : value.tone === "blue"
          ? "text-blue-600 font-semibold"
          : value.tone === "red"
            ? "text-red-500 font-medium"
            : "text-ink-muted";
  return <span className={colorClass}>{value.text}</span>;
}

export function ComparisonMatrix() {
  const { dict } = useTranslation();
  const t = dict.comparison;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-1">{t.matrixTitle}</h2>
          <p className="text-sm text-ink-muted">{t.matrixSubtitle}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="whitespace-nowrap shrink-0"
        >
          <Download size={13} />
          {t.exportPdf}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wide text-ink-soft border-b border-border">
              <th className="py-3 pr-4 font-medium">Features</th>
              {COLUMNS.map((col, i) => (
                <th
                  key={col}
                  className={
                    i === 0
                      ? "py-3 px-4 font-semibold text-green-600"
                      : "py-3 px-4 font-medium"
                  }
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr
                key={row.featureKey}
                className="border-b border-border last:border-0"
              >
                <td className="py-4 pr-4 font-medium text-ink">
                  {t[row.featureKey as keyof typeof t]}
                </td>
                {row.values.map((value, i) => (
                  <td key={i} className="py-4 px-4">
                    <ValueCell value={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
