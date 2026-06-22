"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee } from "lucide-react";
import {
  calculateSipFutureValue,
  formatINRShort,
  formatINR,
} from "@/lib/utils/calculators";

interface SipEmbedCalculatorProps {
  fundName: string;
  historical1Y: number | null;
}

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs text-ink-muted">{label}</label>
        <span className="text-sm font-bold text-ink">{display}</span>
      </div>
      <div className="relative h-2 rounded-full bg-surface-2">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-green-600"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border-2 border-green-600 shadow-sm pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

export function SipEmbedCalculator({ historical1Y }: SipEmbedCalculatorProps) {
  const defaultRate =
    historical1Y !== null && historical1Y > 0 && historical1Y < 50
      ? Math.round(historical1Y * 10) / 10
      : 12;

  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(defaultRate);

  const result = useMemo(
    () => calculateSipFutureValue(monthly, rate, years),
    [monthly, years, rate],
  );

  const gainPct =
    result.investedAmount > 0
      ? ((result.estimatedGain / result.investedAmount) * 100).toFixed(0)
      : "0";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="container-page pb-8"
    >
      <div className="rounded-(--radius-card) border border-border bg-surface p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50">
            <IndianRupee size={16} className="text-green-600" />
          </div>
          <div>
            <h2 className="font-semibold text-ink text-sm leading-tight">
              SIP Return Calculator
            </h2>
            <p className="text-[11px] text-ink-muted leading-tight">
              What could your monthly SIP become in this fund?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sliders */}
          <div className="flex flex-col gap-5">
            <Slider
              label="Monthly Investment"
              value={monthly}
              display={formatINR(monthly)}
              min={500}
              max={100000}
              step={500}
              onChange={setMonthly}
            />
            <Slider
              label="Investment Duration"
              value={years}
              display={`${years} ${years === 1 ? "Year" : "Years"}`}
              min={1}
              max={30}
              step={1}
              onChange={setYears}
            />
            <Slider
              label={`Expected Return${historical1Y !== null ? " (based on 1Y actual)" : ""}`}
              value={rate}
              display={`${rate}% p.a.`}
              min={4}
              max={30}
              step={0.5}
              onChange={setRate}
            />
            {historical1Y !== null && (
              <p className="text-[10px] text-ink-soft leading-relaxed -mt-2">
                📊 1-year actual return of this fund was{" "}
                <span
                  className={
                    historical1Y >= 0
                      ? "text-green-600 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {historical1Y >= 0 ? "+" : ""}
                  {historical1Y.toFixed(2)}%
                </span>
                . Past performance is not a guarantee of future returns.
              </p>
            )}
          </div>

          {/* Result */}
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl bg-linear-to-br from-green-600 to-[#15803d] p-5 text-white">
              <div className="text-[10px] uppercase tracking-widest text-white/60 mb-1">
                Estimated future value
              </div>
              <div className="text-3xl font-bold mb-1">
                {formatINRShort(result.futureValue)}
              </div>
              <div className="text-[11px] text-white/70">
                in {years} {years === 1 ? "year" : "years"} · {rate}% p.a.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-surface-2 p-4">
                <div className="text-[9px] uppercase tracking-wide text-ink-soft mb-1">
                  Amount invested
                </div>
                <div className="text-sm font-bold text-ink">
                  {formatINRShort(result.investedAmount)}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-green-50 p-4">
                <div className="text-[9px] uppercase tracking-wide text-green-700/60 mb-1">
                  Estimated gains
                </div>
                <div className="text-sm font-bold text-green-700">
                  +{formatINRShort(result.estimatedGain)}
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-surface-2 px-4 py-3 flex items-center gap-2.5">
              <TrendingUp size={14} className="text-green-600 shrink-0" />
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Your money could grow by{" "}
                <strong className="text-green-600">{gainPct}%</strong> —
                that&apos;s the power of SIP compounding!
              </p>
            </div>

            <p className="text-[9px] text-ink-soft leading-relaxed text-center px-2">
              These are projections only. Mutual fund investments are subject to
              market risks. Past returns do not guarantee future performance.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
