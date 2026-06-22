"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { FundCategoryCard } from "@/components/funds/FundCategoryCard";
import { FUND_CATEGORIES } from "@/constants/fundCategories";

export default function FundsPage() {
  const { dict } = useTranslation();
  const t = dict.funds;

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container-page pt-12 pb-10">
          <Badge tone="green" className="mb-5">
            ✓ {t.badge}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4 max-w-xl">
            {t.title1} <span className="text-green-600">{t.title2}</span>
          </h1>
          <p className="text-sm text-ink-muted max-w-lg leading-relaxed">
            {t.subtitle}
          </p>
        </section>

        <section className="container-page pb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FUND_CATEGORIES.map((category, i) => (
              <FundCategoryCard
                key={category.id}
                category={category}
                index={i}
              />
            ))}
          </div>
        </section>

        <section className="container-page pb-16">
          <div className="rounded-(--radius-card) bg-ink px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1.5">
                {t.notSureTitle}
              </h2>
              <p className="text-sm text-white/60 max-w-sm">{t.notSureDesc}</p>
            </div>
            <LinkButton
              href="/quiz"
              variant="mint"
              size="lg"
              className="whitespace-nowrap"
            >
              {t.takeInvestmentQuiz}
            </LinkButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
