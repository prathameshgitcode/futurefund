"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LinkButton, Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils/calculators";

const MOCK_HOLDINGS = [
  {
    name: "HDFC Mid-Cap Opportunities",
    category: "Mid Cap",
    value: 312000,
    weight: 28,
  },
  {
    name: "Axis Bluechip Fund",
    category: "Large Cap",
    value: 245000,
    weight: 22,
  },
  {
    name: "SBI Small Cap Fund",
    category: "Small Cap",
    value: 198000,
    weight: 18,
  },
  {
    name: "ICICI Pru Large Cap Fund",
    category: "Large Cap",
    value: 187000,
    weight: 17,
  },
  { name: "Kotak Debt Hybrid", category: "Hybrid", value: 168000, weight: 15 },
];

const TOTAL_VALUE = MOCK_HOLDINGS.reduce((sum, h) => sum + h.value, 0);

const RECOMMENDATIONS = [
  "You hold two Large Cap funds (Axis Bluechip + ICICI Pru) with 84% overlapping stocks — consolidating into one frees up capital for diversification.",
  "Your portfolio is 0% allocated to Debt beyond the hybrid fund. Consider 10-15% in a short-duration debt fund as a stability cushion.",
  "Small Cap allocation (18%) is reasonable for your apparent horizon, but rebalance annually to avoid risk drift if it grows past 25%.",
];

export function ReviewResults({ onStartOver }: { onStartOver: () => void }) {
  const { dict } = useTranslation();
  const t = dict.portfolio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-(--radius-card) border border-border bg-surface overflow-hidden max-w-3xl mx-auto"
    >
      <div className="p-8 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 mb-5">
          <CheckCircle2 size={24} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t.resultTitle}</h1>
        <p className="text-sm text-ink-muted mb-8">{t.resultSubtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
          <div className="rounded-2xl bg-ink p-5 text-white">
            <div className="text-[10px] uppercase tracking-wide text-white/50 mb-1.5">
              {t.resultTotalValue}
            </div>
            <div className="text-xl font-bold">{formatINR(TOTAL_VALUE)}</div>
          </div>
          <div className="rounded-2xl border border-border bg-surface-2 p-5">
            <div className="text-[10px] uppercase tracking-wide text-ink-soft mb-1.5">
              {t.resultFundsHeld}
            </div>
            <div className="text-xl font-bold">{MOCK_HOLDINGS.length}</div>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="text-[10px] uppercase tracking-wide text-amber-700/70 mb-1.5 flex items-center gap-1">
              <AlertTriangle size={11} /> {t.resultOverlap}
            </div>
            <div className="text-xl font-bold text-amber-700">84%</div>
          </div>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden mb-7">
          {MOCK_HOLDINGS.map((holding, i) => (
            <div
              key={holding.name}
              className={
                i !== MOCK_HOLDINGS.length - 1
                  ? "flex items-center justify-between p-4 border-b border-border"
                  : "flex items-center justify-between p-4"
              }
            >
              <div>
                <div className="text-sm font-medium">{holding.name}</div>
                <div className="text-xs text-ink-soft">{holding.category}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">
                  {formatINR(holding.value)}
                </div>
                <div className="text-xs text-ink-soft">{holding.weight}%</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-2">
          <h2 className="text-sm font-semibold mb-3">
            {t.resultRecommendations}
          </h2>
          <div className="flex flex-col gap-2.5">
            {RECOMMENDATIONS.map((rec, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-xl bg-surface-2 p-3.5"
              >
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                <p className="text-xs text-ink-muted leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-2 px-8 sm:px-10 py-6">
        <Button variant="ghost" onClick={onStartOver} type="button">
          <RotateCcw size={15} />
          {t.startOver}
        </Button>
        <LinkButton href="/contact" variant="secondary" size="lg">
          {t.bookConsultation}
        </LinkButton>
      </div>
    </motion.div>
  );
}
