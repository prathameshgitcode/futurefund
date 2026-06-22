"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useQuizStore } from "@/store/quizStore";
import type { RiskAnswer } from "@/types";
import { cn } from "@/lib/utils/cn";
import { QuizCard } from "./QuizCard";

const QUESTION_KEYS = [
  {
    field: "marketDropReaction",
    q: "q1",
    emoji: "📉",
    options: ["q1a", "q1b", "q1c", "q1d"],
  },
  {
    field: "investmentHorizon",
    q: "q2",
    emoji: "⏳",
    options: ["q2a", "q2b", "q2c", "q2d"],
  },
  {
    field: "experienceLevel",
    q: "q3",
    emoji: "🎓",
    options: ["q3a", "q3b", "q3c", "q3d"],
  },
  {
    field: "incomeStability",
    q: "q4",
    emoji: "💼",
    options: ["q4a", "q4b", "q4c", "q4d"],
  },
] as const;

const ANSWER_LETTERS: RiskAnswer[] = ["a", "b", "c", "d"];
const OPTION_EMOJIS = ["😰", "😟", "🙂", "😎"];

export function RiskStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { dict } = useTranslation();
  const t = dict.quiz.risk;
  const { risk, updateRisk } = useQuizStore();
  const [error, setError] = useState<string | null>(null);

  const answeredCount = QUESTION_KEYS.filter(
    ({ field }) => risk[field] !== null,
  ).length;

  function handleNext() {
    const allAnswered = QUESTION_KEYS.every(
      ({ field }) => risk[field] !== null,
    );
    if (!allAnswered) {
      setError("Please answer all questions before continuing.");
      return;
    }
    setError(null);
    onNext();
  }

  return (
    <QuizCard
      title={t.title}
      subtitle={t.subtitle}
      onNext={handleNext}
      onBack={onBack}
    >
      {/* Mini progress within the risk step */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-surface-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-green-600"
            animate={{
              width: `${(answeredCount / QUESTION_KEYS.length) * 100}%`,
            }}
            transition={{ type: "spring", damping: 20 }}
          />
        </div>
        <span className="text-xs font-semibold text-ink-muted whitespace-nowrap">
          {answeredCount}/{QUESTION_KEYS.length} answered
        </span>
      </div>

      <div className="flex flex-col gap-8">
        {QUESTION_KEYS.map(({ field, q, emoji, options }) => (
          <div key={field}>
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="text-lg">{emoji}</span>
              {t[q as keyof typeof t]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {options.map((optKey, idx) => {
                const letter = ANSWER_LETTERS[idx];
                const selected = risk[field] === letter;
                return (
                  <motion.button
                    key={optKey}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      updateRisk({ [field]: letter } as Partial<typeof risk>)
                    }
                    className={cn(
                      "focus-ring flex items-center gap-2.5 text-left rounded-xl border px-4 py-3 text-sm transition-all cursor-pointer",
                      selected
                        ? "border-green-600 bg-green-50 font-medium text-green-900"
                        : "border-border bg-surface hover:border-ink hover:bg-surface-2",
                    )}
                  >
                    <span className="text-base shrink-0">
                      {OPTION_EMOJIS[idx]}
                    </span>
                    <span className="flex-1">
                      {t[optKey as keyof typeof t]}
                    </span>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white shrink-0"
                      >
                        <Check size={12} />
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </QuizCard>
  );
}
