"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface QuizStepperProps {
  currentStep: number;
  steps: { number: number; label: string }[];
}

export function QuizStepper({ currentStep, steps }: QuizStepperProps) {
  const pct = Math.round(((currentStep - 1) / steps.length) * 100);
  return (
    <div className="mb-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-center">
        {steps.map((step, i) => {
          const isComplete = step.number < currentStep;
          const isActive = step.number === currentStep;
          return (
            <div
              key={step.number}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  initial={false}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", damping: 14 }}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    isComplete
                      ? "bg-green-600 text-white"
                      : isActive
                        ? "bg-ink text-white ring-4 ring-ink/10"
                        : "bg-surface-2 text-ink-soft",
                  )}
                >
                  {isComplete ? <Check size={16} /> : step.number}
                </motion.div>
                <span
                  className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    isActive
                      ? "text-ink"
                      : isComplete
                        ? "text-green-600"
                        : "text-ink-soft",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="h-1 flex-1 mx-2 -mt-5 rounded-full bg-surface-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-green-600"
                    initial={false}
                    animate={{
                      width: step.number < currentStep ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-center text-[11px] text-ink-soft mt-4">
        {pct === 0
          ? "Let's begin — takes about 3 minutes"
          : `${pct}% complete — you're doing great!`}
      </p>
    </div>
  );
}
