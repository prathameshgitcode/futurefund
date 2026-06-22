"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function QuizHeader() {
  const { dict } = useTranslation();
  return (
    <header className="border-b border-border">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-ink">
          FutureFund.in
        </Link>
        <Link
          href="/"
          className="focus-ring flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
        >
          <X size={16} />
          {dict.quiz.exitQuiz}
        </Link>
      </div>
    </header>
  );
}
