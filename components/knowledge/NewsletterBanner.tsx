"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";

export function NewsletterBanner() {
  const { dict } = useTranslation();
  const t = dict.knowledge;
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="container-page py-10 pb-16">
      <div className="rounded-(--radius-card) bg-ink px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1.5">
            {t.weeklyLetterTitle}
          </h2>
          <p className="text-sm text-white/60 max-w-sm">{t.weeklyLetterDesc}</p>
        </div>

        {submitted ? (
          <p className="text-sm text-mint-400 font-medium whitespace-nowrap">
            ✓ Subscribed — check your inbox!
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex w-full sm:w-auto items-center gap-2"
          >
            <input
              type="email"
              required
              placeholder={t.emailPlaceholder}
              className="focus-ring flex-1 sm:w-64 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40"
            />
            <Button
              variant="secondary"
              type="submit"
              className="whitespace-nowrap"
            >
              {t.subscribe}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
