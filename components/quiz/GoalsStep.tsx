"use client";

import { useState } from "react";
import {
  Sunrise,
  GraduationCap,
  Heart,
  Home,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useQuizStore } from "@/store/quizStore";
import type { GoalId } from "@/types";
import { cn } from "@/lib/utils/cn";
import { TextField } from "@/components/ui/TextField";
import { QuizCard } from "./QuizCard";

const GOAL_OPTIONS: { id: GoalId; label: string; icon: typeof Sunrise }[] = [
  { id: "retirement", label: "Retirement", icon: Sunrise },
  { id: "child_education", label: "Child Education", icon: GraduationCap },
  { id: "marriage", label: "Marriage", icon: Heart },
  { id: "dream_home", label: "Dream Home", icon: Home },
  { id: "wealth_creation", label: "Wealth Creation", icon: TrendingUp },
  { id: "tax_saving", label: "Tax Saving", icon: Landmark },
];

export function GoalsStep({
  onFinish,
  onBack,
}: {
  onFinish: () => void;
  onBack: () => void;
}) {
  const { dict } = useTranslation();
  const t = dict.quiz.goals;
  const { goals, toggleGoal, updateGoals } = useQuizStore();
  const [error, setError] = useState<string | null>(null);

  function handleFinish() {
    if (goals.selectedGoals.length === 0) {
      setError("Select at least one goal to continue.");
      return;
    }
    setError(null);
    onFinish();
  }

  return (
    <QuizCard
      title={t.title}
      subtitle={t.subtitle}
      onNext={handleFinish}
      onBack={onBack}
      nextLabel={t.finish}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {GOAL_OPTIONS.map((goal) => {
          const Icon = goal.icon;
          const selected = goals.selectedGoals.includes(goal.id);
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => toggleGoal(goal.id)}
              className={cn(
                "focus-ring flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-colors",
                selected
                  ? "border-green-600 bg-green-50"
                  : "border-border bg-surface hover:bg-surface-2",
              )}
            >
              <Icon
                size={20}
                className={selected ? "text-green-600" : "text-ink-muted"}
              />
              <span className="text-xs font-medium">{goal.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <TextField
          label={t.targetAmount}
          type="number"
          min={0}
          value={goals.targetAmount}
          onChange={(e) =>
            updateGoals({ targetAmount: Number(e.target.value) })
          }
        />
        <TextField
          label={t.timeHorizon}
          type="number"
          min={1}
          max={40}
          value={goals.timeHorizonYears}
          onChange={(e) =>
            updateGoals({ timeHorizonYears: Number(e.target.value) })
          }
        />
        <TextField
          label={t.monthlySipBudget}
          type="number"
          min={500}
          value={goals.monthlySipBudget}
          onChange={(e) =>
            updateGoals({ monthlySipBudget: Number(e.target.value) })
          }
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-4">{error}</p>}
    </QuizCard>
  );
}
