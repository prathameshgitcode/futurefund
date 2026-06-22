"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Home as HomeIcon, Share2, Download, TrendingUp } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Slider } from "@/components/ui/Slider";
import { Button, LinkButton } from "@/components/ui/Button";
import {
  calculateRequiredSip,
  calculateRetirementCorpus,
  formatINR,
  formatINRShort,
} from "@/lib/utils/calculators";
import { tpl } from "@/lib/utils/cn";
import { RetirementChart } from "@/components/calculators/RetirementChart";
import { AllocationRing } from "@/components/calculators/AllocationRing";
import { CuratedFunds } from "@/components/calculators/CuratedFunds";

const INFLATION_PERCENT = 6;
const ACCUMULATION_RETURN_PERCENT = 12;
const POST_RETIREMENT_RETURN_PERCENT = 7;

const CALCULATOR_FOOTER_COLUMNS = [
  {
    title: "Calculators",
    links: [
      { label: "Retirement Planner", href: "/calculators/retirement-planner" },
      { label: "Goal Planner", href: "/calculators/goal-planner" },
      { label: "Tax Saver", href: "/calculators/tax-saver" },
      { label: "Child Education", href: "/calculators/child-education" },
    ],
  },
  {
    title: "Knowledge",
    links: [
      { label: "Mutual Fund Basics", href: "/knowledge/mutual-funds-101" },
      { label: "Market Insights", href: "/knowledge/2024-market-outlook" },
      { label: "Risk Management", href: "/knowledge/managing-volatility" },
      { label: "Glossary", href: "/knowledge" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "SEBI Disclaimers", href: "/sebi-disclaimer" },
      { label: "Investor Charter", href: "/investor-charter" },
    ],
  },
];

export default function RetirementPlannerPage() {
  const { dict } = useTranslation();
  const t = dict.retirement;

  const [currentAge, setCurrentAge] = useState(28);
  const [retirementAge, setRetirementAge] = useState(55);
  const [targetMonthlyPension, setTargetMonthlyPension] = useState(150000);

  const yearsToRetirement = Math.max(retirementAge - currentAge, 1);

  const { targetCorpus, requiredSip } = useMemo(() => {
    const corpus = calculateRetirementCorpus({
      currentAge,
      retirementAge,
      monthlyExpensesToday: targetMonthlyPension,
      inflationPercent: INFLATION_PERCENT,
      postRetirementReturnPercent: POST_RETIREMENT_RETURN_PERCENT,
    });
    const sip = calculateRequiredSip(
      corpus,
      ACCUMULATION_RETURN_PERCENT,
      yearsToRetirement,
    );
    return { targetCorpus: corpus, requiredSip: sip };
  }, [currentAge, retirementAge, targetMonthlyPension, yearsToRetirement]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container-page pt-8 pb-2">
          <nav className="flex items-center gap-1.5 text-xs text-ink-muted mb-5">
            <HomeIcon size={12} />
            <Link href="/calculators" className="hover:text-ink">
              {t.breadcrumbCalculators}
            </Link>
            <span>/</span>
            <span className="font-medium text-ink">{t.breadcrumbCurrent}</span>
          </nav>

          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t.title}</h1>
              <p className="text-sm text-ink-muted max-w-xl leading-relaxed">
                {t.subtitle}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label="Share"
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface hover:bg-surface-2 transition-colors"
              >
                <Share2 size={15} />
              </button>
              <button
                type="button"
                aria-label="Download"
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface hover:bg-surface-2 transition-colors"
              >
                <Download size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="container-page grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-5">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="rounded-(--radius-card) border border-border bg-surface p-6">
              <h2 className="text-sm font-semibold mb-6">
                ⚙ {t.strategyTitle}
              </h2>
              <div className="flex flex-col gap-6">
                <Slider
                  label={t.currentAge}
                  value={currentAge}
                  displayValue={`${currentAge} yrs`}
                  min={18}
                  max={60}
                  step={1}
                  onChange={(v) =>
                    setCurrentAge(Math.min(v, retirementAge - 1))
                  }
                />
                <Slider
                  label={t.retirementAge}
                  value={retirementAge}
                  displayValue={`${retirementAge} yrs`}
                  min={45}
                  max={70}
                  step={1}
                  onChange={(v) =>
                    setRetirementAge(Math.max(v, currentAge + 1))
                  }
                />
                <Slider
                  label={t.targetMonthlyPension}
                  value={targetMonthlyPension}
                  displayValue={formatINR(targetMonthlyPension)}
                  min={20000}
                  max={500000}
                  step={5000}
                  onChange={setTargetMonthlyPension}
                />
                <div className="flex items-center justify-between text-sm pt-2">
                  <span className="text-ink-muted">{t.estimatedInflation}</span>
                  <span className="font-medium">
                    {INFLATION_PERCENT}% {t.fixedSuffix}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-muted">{t.expectedReturns}</span>
                  <span className="font-medium">
                    {ACCUMULATION_RETURN_PERCENT}% {t.annualSuffix}
                  </span>
                </div>
                <Button variant="secondary" className="w-full justify-center">
                  {t.recalculate}
                </Button>
              </div>
            </div>

            <div className="rounded-(--radius-card) bg-ink p-6 text-white">
              <div className="text-[10px] uppercase tracking-wide text-white/50 mb-3">
                {t.expertRecommendation}
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-mint-400">
                  <TrendingUp size={15} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1.5">
                    {t.aggressiveGrowthTitle}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {tpl(t.aggressiveGrowthDesc, { years: yearsToRetirement })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-(--radius-card) bg-green-50 p-6">
                <div className="text-[10px] uppercase tracking-wide text-green-700/70 mb-2">
                  {t.requiredSipAmount}
                </div>
                <div className="text-2xl font-bold text-green-700 mb-2">
                  {formatINR(requiredSip)}{" "}
                  <span className="text-sm font-normal text-green-700/70">
                    /mo
                  </span>
                </div>
                <div className="text-xs text-green-700/70">
                  ⚡ {tpl(t.beatsPeers, { percent: 92 })}
                </div>
              </div>
              <div className="rounded-(--radius-card) bg-[#f6f0e4] p-6">
                <div className="text-[10px] uppercase tracking-wide text-[#8a6d3b] mb-2">
                  {tpl(t.targetCorpus, { age: retirementAge })}
                </div>
                <div className="text-2xl font-bold text-[#5c4424] mb-2">
                  {formatINRShort(targetCorpus)}
                </div>
                <div className="text-xs text-[#8a6d3b]">
                  ⊙{" "}
                  {tpl(t.adjustedInflation, {
                    year: new Date().getFullYear() + yearsToRetirement,
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-(--radius-card) border border-border bg-surface p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold">{t.timelineTitle}</h2>
                <div className="flex items-center gap-4 text-xs text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-600" />{" "}
                    {t.invested}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-50 border border-green-600" />{" "}
                    {t.gains}
                  </span>
                </div>
              </div>
              <RetirementChart
                monthlySip={requiredSip}
                annualReturnPercent={ACCUMULATION_RETURN_PERCENT}
                currentAge={currentAge}
                retirementAge={retirementAge}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-(--radius-card) border border-border bg-surface p-5 flex items-center gap-4">
                <AllocationRing percent={45} color="var(--color-green-600)" />
                <div>
                  <h3 className="text-sm font-semibold">{t.largeCapLabel}</h3>
                  <p className="text-xs text-ink-muted mb-1">
                    {t.largeCapDesc}
                  </p>
                  <span className="text-xs font-semibold text-green-600">
                    45% {t.allocation}
                  </span>
                </div>
              </div>
              <div className="rounded-(--radius-card) border border-border bg-surface p-5 flex items-center gap-4">
                <AllocationRing percent={35} color="var(--color-mint-500)" />
                <div>
                  <h3 className="text-sm font-semibold">
                    {t.midSmallCapLabel}
                  </h3>
                  <p className="text-xs text-ink-muted mb-1">
                    {t.midSmallCapDesc}
                  </p>
                  <span className="text-xs font-semibold text-mint-500">
                    35% {t.allocation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CuratedFunds
          title={t.curatedFundsTitle}
          minInvestmentLabel={t.minInvestment}
        />

        <section className="container-page py-10">
          <div
            className="rounded-(--radius-card) px-6 py-14 sm:px-12 text-white relative overflow-hidden"
            style={{
              background:
                "linear-gradient(120deg, #0c2b22 0%, #134e3a 45%, #1a5c45 100%)",
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 max-w-md">
              {t.ctaTitle}
            </h2>
            <p className="text-sm text-white/70 max-w-md mb-7 leading-relaxed">
              {t.ctaDesc}
            </p>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/contact" variant="mint" size="lg">
                {t.ctaButton}
              </LinkButton>
              <LinkButton
                href="/calculators"
                variant="outline"
                size="lg"
                className="!border-white/30 !text-white hover:!bg-white/10"
              >
                {t.ctaSecondary}
              </LinkButton>
            </div>
          </div>
        </section>
      </main>
      <Footer
        columns={CALCULATOR_FOOTER_COLUMNS}
        showNewsletter={false}
        showDisclaimer={false}
      />
      <div className="container-page pb-6 -mt-2 flex justify-end">
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
          {t.systemsOperational}
        </span>
      </div>
    </>
  );
}
