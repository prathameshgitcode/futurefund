"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";
import { DASHBOARD_GOALS } from "@/data/dashboardMock";

export function FinancialGoals() {
  const { dict } = useTranslation();
  const t = dict.dashboard;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-sm font-semibold mb-5">{t.financialGoals}</h2>
      <div className="flex flex-col gap-5 mb-5">
        {DASHBOARD_GOALS.map((goal) => (
          <div key={goal.id}>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">{goal.name}</span>
              <span className="font-semibold text-green-600">
                {goal.percent}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-surface-2 overflow-hidden mb-1.5">
              <motion.div
                className="h-full rounded-full bg-green-600"
                initial={{ width: 0 }}
                whileInView={{ width: `${goal.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-ink-soft">
              <span>
                {goal.currentLabel} of {goal.targetLabel}
              </span>
              <span>
                {goal.yearsLeft} {t.yearsLeft}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full justify-center">
        {t.manageGoals}
      </Button>
    </div>
  );
}
