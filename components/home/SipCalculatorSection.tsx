"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Slider } from "@/components/ui/Slider";
import { LinkButton } from "@/components/ui/Button";
import { calculateSipFutureValue, formatINR } from "@/lib/utils/calculators";

export function SipCalculatorSection() {
  const { dict } = useTranslation();
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);

  const result = useMemo(
    () => calculateSipFutureValue(monthly, returnRate, years),
    [monthly, years, returnRate],
  );

  return (
    <section className="container-page py-16">
      <h2 className="text-2xl font-bold mb-6">{dict.home.calculatorTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
        <div className="md:col-span-3 rounded-(--radius-card) bg-surface border border-border p-7 flex flex-col gap-7 justify-center">
          <Slider
            label={dict.home.monthlyInvestment}
            value={monthly}
            displayValue={formatINR(monthly)}
            min={500}
            max={100000}
            step={500}
            onChange={setMonthly}
          />
          <Slider
            label={dict.home.timePeriod}
            value={years}
            displayValue={`${years} ${dict.common.years}`}
            min={1}
            max={35}
            step={1}
            onChange={setYears}
          />
          <Slider
            label={dict.home.expectedReturn}
            value={returnRate}
            displayValue={`${returnRate}%`}
            min={1}
            max={20}
            step={0.5}
            onChange={setReturnRate}
          />
        </div>

        <div className="md:col-span-2 rounded-(--radius-card) bg-navy p-7 flex flex-col justify-between text-white">
          <div>
            <div className="text-xs uppercase tracking-wide text-white/50 mb-2">
              {dict.home.estimatedWealth}
            </div>
            <motion.div
              key={result.futureValue}
              initial={{ opacity: 0.4, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-3xl font-bold mb-6"
            >
              {formatINR(result.futureValue)}
            </motion.div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-white/50 text-xs mb-1">
                  {dict.home.investedAmount}
                </div>
                <div className="font-semibold">
                  {formatINR(result.investedAmount)}
                </div>
              </div>
              <div>
                <div className="text-white/50 text-xs mb-1">
                  {dict.home.estimatedGain}
                </div>
                <div className="font-semibold text-mint-400">
                  {formatINR(result.estimatedGain)}
                </div>
              </div>
            </div>

            {/* Invested vs gains proportion bar */}
            <div className="mt-5">
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-white/30"
                  animate={{
                    width: `${(result.investedAmount / result.futureValue) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="h-full bg-mint-400"
                  animate={{
                    width: `${(result.estimatedGain / result.futureValue) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px] text-white/50">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-white/30" /> You
                  invest
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-mint-400" /> Market
                  grows it
                </span>
              </div>
            </div>
          </div>
          <LinkButton
            href="/quiz"
            variant="primary"
            className="mt-7 w-full bg-ink justify-between px-5"
          >
            {dict.home.investInFunds}
            <ArrowRight size={16} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
