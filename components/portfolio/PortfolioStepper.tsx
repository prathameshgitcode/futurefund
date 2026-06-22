"use client";

import { Check, FileText, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PortfolioStepperProps {
  currentStep: 1 | 2 | 3;
  labels: [string, string, string];
}

export function PortfolioStepper({
  currentStep,
  labels,
}: PortfolioStepperProps) {
  const steps = [
    { number: 1, label: labels[0], icon: Check },
    { number: 2, label: labels[1], icon: FileText },
    { number: 3, label: labels[2], icon: BarChart3 },
  ];

  return (
    <div className="flex items-center justify-center mb-10 max-w-md mx-auto">
      {steps.map((step, i) => {
        const isComplete = step.number < currentStep;
        const isActive = step.number === currentStep;
        const Icon = step.icon;
        return (
          <div
            key={step.number}
            className="flex items-center flex-1 last:flex-none"
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  isComplete || isActive
                    ? "bg-ink text-white"
                    : "bg-surface-2 text-ink-soft",
                )}
              >
                <Icon size={17} />
              </div>
              <span
                className={cn(
                  "text-xs font-medium whitespace-nowrap",
                  isActive ? "text-ink" : "text-ink-soft",
                )}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 mx-2 -mt-5",
                  isComplete ? "bg-green-600" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
