"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Image from "next/image";
import { PauseCircle, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { whatsappLink } from "@/constants/site";
import {
  calculateSipPauseCost,
  calculateSipFutureValue,
  formatINR,
  formatINRShort,
} from "@/lib/utils/calculators";

export default function SipPauseSimulatorPage() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);
  const [pauseMonths, setPauseMonths] = useState(6);
  const { dict } = useTranslation();
  const t = dict.sipPauseSimulator;

  const result = useMemo(
    () =>
      calculateSipPauseCost({
        monthlyInvestment: monthly,
        annualReturnPercent: rate,
        totalYears: years,
        pauseMonths,
        pauseStartMonth: 1,
      }),
    [monthly, years, rate, pauseMonths],
  );

  const chartData = useMemo(() => {
    const points = Math.min(8, years);
    return Array.from({ length: points }, (_, i) => {
      const y = Math.round(((i + 1) / points) * years);
      const full = calculateSipFutureValue(monthly, rate, y).futureValue;
      const paused = calculateSipPauseCost({
        monthlyInvestment: monthly,
        annualReturnPercent: rate,
        totalYears: y,
        pauseMonths: Math.min(pauseMonths, y * 12),
        pauseStartMonth: 1,
      }).pausedValue;
      return { label: `Yr ${y}`, full, paused };
    });
  }, [monthly, years, rate, pauseMonths]);

  const lostMultiple =
    result.contributionsSkipped > 0
      ? (result.corpusLost / result.contributionsSkipped).toFixed(1)
      : "0";

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg">
        <div className="container-page max-w-4xl py-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
              <PauseCircle size={14} /> {t.pageTitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-2">
              {t.heroTitle}
            </h1>
            <p className="text-sm text-ink-muted max-w-xl leading-relaxed">
              {t.heroSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Controls */}
            <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-5">
              <RangeSlider
                label={t.labelMonthly}
                value={monthly}
                display={formatINR(monthly)}
                min={500}
                max={100000}
                step={500}
                onChange={setMonthly}
              />
              <RangeSlider
                label={t.labelYears}
                value={years}
                display={`${years} years`}
                min={3}
                max={30}
                step={1}
                onChange={setYears}
              />
              <RangeSlider
                label={t.labelReturn}
                value={rate}
                display={`${rate}% p.a.`}
                min={6}
                max={20}
                step={0.5}
                onChange={setRate}
              />
              <RangeSlider
                label={t.labelPauseMonths}
                value={pauseMonths}
                display={`${pauseMonths} months`}
                min={1}
                max={36}
                step={1}
                onChange={setPauseMonths}
                accent="bg-amber-500"
              />
            </div>

            {/* Headline result */}
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-linear-to-br from-amber-500 to-red-500 p-6 text-white">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/70 mb-1">
                  <AlertTriangle size={13} /> {t.corpusLostLabel}
                </div>
                <div className="text-3xl font-bold mb-1">
                  {formatINRShort(result.corpusLost)}
                </div>
                <div className="text-xs text-white/80">
                  {t.corpusLostBy.replace("{months}", String(pauseMonths))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="text-[9px] uppercase tracking-wide text-ink-soft mb-1">
                    {t.skippedLabel}
                  </div>
                  <div className="text-sm font-bold text-ink">
                    {formatINRShort(result.contributionsSkipped)}
                  </div>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="text-[9px] uppercase tracking-wide text-amber-700/70 mb-1">
                    {t.costMultipleLabel}
                  </div>
                  <div className="text-sm font-bold text-amber-700">
                    {lostMultiple}
                    {t.costMultipleSuffix}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-surface-2 px-4 py-3 flex items-start gap-2.5">
                <Sparkles
                  size={14}
                  className="text-green-600 shrink-0 mt-0.5"
                />
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  {t.summaryText
                    .replace(
                      "{skipped}",
                      formatINRShort(result.contributionsSkipped),
                    )
                    .replace("{lost}", formatINRShort(result.corpusLost))}
                </p>
              </div>
            </div>
          </div>

          {/* Comparison chart */}
          <div className="rounded-2xl border border-border bg-surface p-6 mt-6">
            <h3 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
              <TrendingUp size={15} className="text-green-600" />
              {t.chartTitle}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="gFull" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gPaused" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11, fill: "var(--color-ink-muted)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => formatINRShort(v)}
                    tick={{ fontSize: 11, fill: "var(--color-ink-muted)" }}
                    axisLine={false}
                    tickLine={false}
                    width={64}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      formatINR(Number(value)),
                      name === "full" ? t.chartUninterrupted : t.chartPaused,
                    ]}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="full"
                    stroke="#16a34a"
                    strokeWidth={2.5}
                    fill="url(#gFull)"
                    name="full"
                  />
                  <Area
                    type="monotone"
                    dataKey="paused"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    fill="url(#gPaused)"
                    name="paused"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-5 mt-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-green-600" />{" "}
                {t.chartUninterrupted}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />{" "}
                {t.chartPaused.replace("{months}", String(pauseMonths))}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-ink p-7 text-center text-white mt-6">
            <h3 className="text-lg font-bold mb-1.5">{t.ctaTitle}</h3>
            <p className="text-sm text-white/60 max-w-md mx-auto mb-5">
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-white hover:bg-green-600 transition-colors cursor-pointer"
              >
                {t.talkAdvisor}
              </Link>
              <a
                href={whatsappLink(
                  "Hi, I'm thinking of pausing my SIP. Can we discuss alternatives?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Image
                  src="/images/whatsapp.png"
                  alt=""
                  width={14}
                  height={14}
                  className="object-contain brightness-0 invert"
                />{" "}
                {t.askWa}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
