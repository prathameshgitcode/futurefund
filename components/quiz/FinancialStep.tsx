"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useQuizStore } from "@/store/quizStore";
import { financialSchema } from "@/lib/validation/quizSchemas";
import { TextField } from "@/components/ui/TextField";
import { SelectField } from "@/components/ui/SelectField";
import { QuizCard } from "./QuizCard";

export function FinancialStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { dict } = useTranslation();
  const t = dict.quiz.financial;
  const { financial, updateFinancial } = useQuizStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleNext() {
    const result = financialSchema.safeParse(financial);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onNext();
  }

  return (
    <QuizCard
      title={t.title}
      subtitle={t.subtitle}
      onNext={handleNext}
      onBack={onBack}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <TextField
          label={t.monthlyIncome}
          type="number"
          min={0}
          value={financial.monthlyIncome}
          onChange={(e) =>
            updateFinancial({ monthlyIncome: Number(e.target.value) })
          }
          error={errors.monthlyIncome}
        />
        <TextField
          label={t.monthlyExpenses}
          type="number"
          min={0}
          value={financial.monthlyExpenses}
          onChange={(e) =>
            updateFinancial({ monthlyExpenses: Number(e.target.value) })
          }
          error={errors.monthlyExpenses}
        />
      </div>
      <div className="mb-6">
        <TextField
          label={t.existingInvestments}
          type="number"
          min={0}
          value={financial.existingInvestments}
          onChange={(e) =>
            updateFinancial({ existingInvestments: Number(e.target.value) })
          }
          error={errors.existingInvestments}
        />
      </div>
      <SelectField
        label={t.employmentType}
        value={financial.employmentType}
        onChange={(e) =>
          updateFinancial({
            employmentType: e.target.value as typeof financial.employmentType,
          })
        }
        options={[
          { value: "salaried", label: t.salaried },
          { value: "self_employed", label: t.selfEmployed },
          { value: "business_owner", label: t.businessOwner },
          { value: "retired", label: t.retired },
        ]}
      />
    </QuizCard>
  );
}
