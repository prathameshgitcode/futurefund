"use client";

import { useMemo, useState, useEffect } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Slider } from "@/components/ui/Slider";
import { formatINR, formatINRShort } from "@/lib/utils/calculators";
import { getCalculatorConfig } from "@/lib/calculatorEngine";
import { cn } from "@/lib/utils/cn";
import { EmailCaptureModal } from "@/components/ui/EmailCaptureModal";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Lock } from "lucide-react";

const STORAGE_KEY = "sg_calc_email_captured";

function formatInputValue(
  value: number,
  format: "currency" | "percent" | "years",
): string {
  if (format === "currency") return formatINR(value);
  if (format === "percent") return `${value}%`;
  return `${value} ${value === 1 ? "Year" : "Years"}`;
}

const STAT_TONE_CLASSES: Record<string, string> = {
  default: "text-ink",
  green: "text-green-600",
  amber: "text-amber-600",
  navy: "text-navy",
};

export function CalculatorRunner({ slug }: { slug: string }) {
  const config = getCalculatorConfig(slug);

  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    if (config) {
      for (const input of config.inputs)
        initial[input.key] = input.defaultValue;
    }
    return initial;
  });

  const [showModal, setShowModal] = useState(false);
  const [resultUnlocked, setResultUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
      setResultUnlocked(true);
    }
  }, []);

  const result = useMemo(() => config?.compute(values), [config, values]);

  const handleUnlock = () => setShowModal(true);

  const handleCapture = (email: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, email);
    }
    setResultUnlocked(true);
    setShowModal(false);
  };

  const handleSkip = () => {
    setResultUnlocked(true);
    setShowModal(false);
  };

  if (!config || !result) return null;

  const resultSummary = result.primaryValue
    ? `Your estimated result: ${result.primaryValue}`
    : undefined;

  return (
    <>
      <EmailCaptureModal
        open={showModal}
        onClose={handleSkip}
        onCapture={handleCapture}
        resultSummary={resultSummary}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Inputs */}
        <div className="rounded-(--radius-card) border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-sm font-semibold mb-6">Adjust Your Inputs</h2>
          <div className="flex flex-col gap-6">
            {config.inputs.map((input) => (
              <Slider
                key={input.key}
                label={input.label}
                value={values[input.key]}
                displayValue={formatInputValue(values[input.key], input.format)}
                min={input.min}
                max={input.max}
                step={input.step}
                onChange={(v) =>
                  setValues((prev) => ({ ...prev, [input.key]: v }))
                }
              />
            ))}
          </div>

          {!resultUnlocked && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleUnlock}
              className="mt-7 w-full rounded-xl bg-ink py-3.5 text-sm font-bold text-white hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles size={15} />
              Get My Free Analysis →
            </motion.button>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-5">
          <AnimatePresence mode="wait">
            {resultUnlocked ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex flex-col gap-5"
              >
                <div className="rounded-(--radius-card) bg-green-50 p-6 sm:p-8">
                  <div className="text-[10px] uppercase tracking-wide text-green-700/70 mb-2">
                    {result.primaryLabel}
                  </div>
                  <div className="text-3xl font-bold text-green-700 mb-2">
                    {result.primaryValue}
                  </div>
                  {result.primaryNote && (
                    <p className="text-xs text-green-700/70 leading-relaxed">
                      {result.primaryNote}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {result.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-border bg-surface p-5"
                    >
                      <div className="text-[10px] uppercase tracking-wide text-ink-soft mb-1.5">
                        {stat.label}
                      </div>
                      <div
                        className={cn(
                          "text-lg font-bold",
                          STAT_TONE_CLASSES[stat.tone ?? "default"],
                        )}
                      >
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {result.chart && (
                  <div className="rounded-(--radius-card) border border-border bg-surface p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold">
                        Growth Over Time
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-ink-muted">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-green-600" />
                          {result.chart.aLabel}
                        </span>
                        {result.chart.bLabel && (
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-green-50 border border-green-600" />
                            {result.chart.bLabel}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={result.chart.points}
                          margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
                        >
                          <XAxis
                            dataKey="label"
                            tick={{
                              fontSize: 11,
                              fill: "var(--color-ink-soft)",
                            }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <Tooltip
                            formatter={(value) =>
                              formatINRShort(Number(value ?? 0))
                            }
                            contentStyle={{
                              borderRadius: 12,
                              border: "1px solid var(--color-border)",
                              fontSize: 12,
                            }}
                          />
                          <Bar
                            dataKey="a"
                            stackId="s"
                            fill="var(--color-green-600)"
                            radius={[0, 0, 4, 4]}
                          />
                          {result.chart.bLabel && (
                            <Bar
                              dataKey="b"
                              stackId="s"
                              fill="var(--color-green-50)"
                              radius={[4, 4, 0, 0]}
                            />
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="mt-3 text-[10px] text-ink-soft leading-relaxed text-center">
                      💡 The{" "}
                      <span className="font-semibold text-green-600">
                        green bars
                      </span>{" "}
                      show your estimated returns — powered by compounding
                      interest over time.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Locked preview */
              <motion.div
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-5"
              >
                <div
                  className="relative rounded-(--radius-card) bg-green-50 p-6 sm:p-8 overflow-hidden cursor-pointer group"
                  onClick={handleUnlock}
                >
                  <div className="absolute inset-0 backdrop-blur-sm bg-white/40 flex flex-col items-center justify-center gap-3 z-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
                      <Lock size={16} />
                    </div>
                    <p className="text-sm font-semibold text-ink text-center px-4">
                      Enter your email to unlock your personalised results
                    </p>
                    <button className="rounded-xl bg-green-600 px-5 py-2.5 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer">
                      Unlock Free Analysis →
                    </button>
                  </div>
                  {/* Blurred placeholder content */}
                  <div className="blur-sm select-none">
                    <div className="text-[10px] uppercase tracking-wide text-green-700/70 mb-2">
                      Future Value
                    </div>
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      ₹XX.X Lakh
                    </div>
                    <p className="text-xs text-green-700/70">
                      Your money growing every month
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 blur-sm pointer-events-none select-none">
                  {["Amount Invested", "Estimated Returns"].map((l) => (
                    <div
                      key={l}
                      className="rounded-2xl border border-border bg-surface p-5"
                    >
                      <div className="text-[10px] uppercase tracking-wide text-ink-soft mb-1.5">
                        {l}
                      </div>
                      <div className="text-lg font-bold text-ink">₹XX L</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
