"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";

interface QuizCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export function QuizCard({
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextLabel,
  nextDisabled,
}: QuizCardProps) {
  const { dict } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-(--radius-card) border border-border bg-surface overflow-hidden"
    >
      <div className="p-8 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-ink-muted mb-8">{subtitle}</p>
        {children}
      </div>

      <div className="flex items-center justify-between bg-surface-2 px-8 sm:px-10 py-6">
        {onBack ? (
          <Button variant="ghost" onClick={onBack} type="button">
            <ArrowLeft size={16} />
            {dict.common.back}
          </Button>
        ) : (
          <span />
        )}
        <Button
          variant="primary"
          onClick={onNext}
          type="button"
          disabled={nextDisabled}
        >
          {nextLabel ?? dict.common.next}
          <ArrowRight size={16} />
        </Button>
      </div>
    </motion.div>
  );
}
