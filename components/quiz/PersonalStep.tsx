"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useQuizStore } from "@/store/quizStore";
import { personalSchema } from "@/lib/validation/quizSchemas";
import { TextField } from "@/components/ui/TextField";
import { SelectField } from "@/components/ui/SelectField";
import { QuizCard } from "./QuizCard";

export function PersonalStep({ onNext }: { onNext: () => void }) {
  const { dict } = useTranslation();
  const t = dict.quiz.personal;
  const { personal, updatePersonal } = useQuizStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleNext() {
    const result = personalSchema.safeParse(personal);
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
    <QuizCard title={t.title} subtitle={t.subtitle} onNext={handleNext}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <TextField
          label={t.fullName}
          placeholder={t.fullNamePlaceholder}
          value={personal.fullName}
          onChange={(e) => updatePersonal({ fullName: e.target.value })}
          error={errors.fullName}
        />
        <TextField
          label={t.phone}
          placeholder={t.phonePlaceholder}
          value={personal.phone}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
          error={errors.phone}
        />
      </div>
      <div className="mb-6">
        <TextField
          label={t.email}
          type="email"
          placeholder={t.emailPlaceholder}
          value={personal.email}
          onChange={(e) => updatePersonal({ email: e.target.value })}
          error={errors.email}
        />
      </div>
      <SelectField
        label={t.kycStatus}
        value={personal.kycStatus}
        onChange={(e) =>
          updatePersonal({
            kycStatus: e.target.value as typeof personal.kycStatus,
          })
        }
        options={[
          { value: "verified", label: t.kycVerified },
          { value: "pending", label: t.kycPending },
          { value: "not_started", label: t.kycNotStarted },
        ]}
      />
    </QuizCard>
  );
}
