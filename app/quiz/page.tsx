"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useQuizStore } from "@/store/quizStore";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuizStepper } from "@/components/quiz/QuizStepper";
import { PersonalStep } from "@/components/quiz/PersonalStep";
import { FinancialStep } from "@/components/quiz/FinancialStep";
import { RiskStep } from "@/components/quiz/RiskStep";
import { GoalsStep } from "@/components/quiz/GoalsStep";
import { ResultScreen } from "@/components/quiz/ResultScreen";

export default function QuizPage() {
  const { dict } = useTranslation();
  const { step, setStep, completed, complete, reset } = useQuizStore();

  const steps = [
    { number: 1, label: dict.quiz.steps.personal },
    { number: 2, label: dict.quiz.steps.financial },
    { number: 3, label: dict.quiz.steps.risk },
    { number: 4, label: dict.quiz.steps.goals },
  ];

  return (
    <div className="flex-1 flex flex-col bg-bg">
      <QuizHeader />
      <main className="flex-1">
        <div className="container-page py-12 max-w-2xl">
          {!completed && <QuizStepper currentStep={step} steps={steps} />}

          {!completed && step === 1 && (
            <PersonalStep onNext={() => setStep(2)} />
          )}
          {!completed && step === 2 && (
            <FinancialStep
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {!completed && step === 3 && (
            <RiskStep onNext={() => setStep(4)} onBack={() => setStep(2)} />
          )}
          {!completed && step === 4 && (
            <GoalsStep onFinish={complete} onBack={() => setStep(3)} />
          )}
          {completed && (
            <ResultScreen
              onRetake={() => {
                reset();
              }}
            />
          )}
        </div>
      </main>

      <div className="container-page pb-10 text-center">
        <p className="text-xs text-ink-soft mb-2">
          © 2024 FutureFund.in. {dict.quiz.footerNote}
        </p>
        <div className="flex items-center justify-center gap-5 text-xs">
          <a href="/privacy-policy" className="text-ink-muted hover:text-ink">
            Privacy Policy
          </a>
          <a href="/sebi-disclaimer" className="text-ink-muted hover:text-ink">
            SEBI Disclaimers
          </a>
        </div>
      </div>
    </div>
  );
}
