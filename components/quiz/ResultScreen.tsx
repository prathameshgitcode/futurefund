"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useQuizStore, scoreRiskProfile } from "@/store/quizStore";
import { LinkButton, Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils/calculators";

export function ResultScreen({ onRetake }: { onRetake: () => void }) {
  const { dict } = useTranslation();
  const t = dict.quiz.result;
  const { risk, goals, personal } = useQuizStore();
  const result = scoreRiskProfile(risk);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-(--radius-card) border border-border bg-surface overflow-hidden"
    >
      <div className="p-8 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 mb-5">
          <CheckCircle2 size={24} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-sm text-ink-muted mb-8">
          {personal.fullName ? `${personal.fullName}, ` : ""}here&apos;s your
          personalized plan based on your answers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div className="rounded-2xl bg-navy p-6 text-white">
            <div className="text-xs uppercase tracking-wide text-white/50 mb-2">
              {t.riskScore}
            </div>
            <div className="text-3xl font-bold mb-1">
              {result.riskScore}/100
            </div>
            <div className="text-sm text-mint-400 font-medium">
              {t.riskCategory}: {result.riskCategory}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface-2 p-6">
            <div className="text-xs uppercase tracking-wide text-ink-soft mb-2">
              {t.recommendedSplit}
            </div>
            <div className="flex items-end gap-1 h-8 rounded-lg overflow-hidden mb-2">
              <div
                className="h-full bg-green-600 flex items-center justify-center text-[10px] font-semibold text-white"
                style={{
                  width: `${result.recommendedEquityDebtSplit.equity}%`,
                }}
              >
                {result.recommendedEquityDebtSplit.equity}%
              </div>
              <div
                className="h-full bg-ink-soft flex items-center justify-center text-[10px] font-semibold text-white"
                style={{ width: `${result.recommendedEquityDebtSplit.debt}%` }}
              >
                {result.recommendedEquityDebtSplit.debt}%
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-600" /> Equity
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ink-soft" /> Debt
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 mb-6">
          <div className="text-xs uppercase tracking-wide text-ink-soft mb-2">
            {t.suggestedSip}
          </div>
          <div className="text-2xl font-bold text-green-600">
            {formatINR(goals.monthlySipBudget)}{" "}
            <span className="text-sm text-ink-muted font-normal">/month</span>
          </div>
        </div>

        <div className="mb-2">
          <div className="text-xs uppercase tracking-wide text-ink-soft mb-3">
            {t.recommendedFunds}
          </div>
          <div className="flex flex-wrap gap-2">
            {result.recommendedFundTypes.map((fund) => (
              <span
                key={fund}
                className="rounded-full bg-green-50 text-green-700 text-xs font-medium px-3.5 py-1.5"
              >
                {fund}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-2 px-8 sm:px-10 py-6">
        <Button variant="ghost" onClick={onRetake} type="button">
          <RotateCcw size={15} />
          {t.retake}
        </Button>
        <LinkButton href="/contact" variant="secondary" size="lg">
          {t.bookConsultation}
        </LinkButton>
      </div>
    </motion.div>
  );
}
