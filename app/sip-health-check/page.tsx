"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Heart,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { whatsappLink } from "@/constants/site";
import { saveLead } from "@/lib/leads/leadStore";
import {
  HEALTH_QUESTIONS,
  scoreToResult,
  type HealthResult,
} from "@/lib/sipHealthCheck";

type Phase = "intro" | "quiz" | "gate" | "result";

export default function SipHealthCheckPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { dict } = useTranslation();
  const t = dict.sipHealthCheck;

  const total = HEALTH_QUESTIONS.length;
  const progress =
    phase === "quiz"
      ? Math.round((current / total) * 100)
      : phase === "intro"
        ? 0
        : 100;

  const rawPoints = answers.reduce((a, b) => a + b, 0);
  const result: HealthResult = scoreToResult(rawPoints);

  const choose = (points: number, tip?: string) => {
    const nextAnswers = [...answers];
    nextAnswers[current] = points;
    setAnswers(nextAnswers);
    const nextTips = [...tips];
    nextTips[current] = tip ?? "";
    setTips(nextTips);

    if (current < total - 1) {
      setTimeout(() => setCurrent((c) => c + 1), 220);
    } else {
      setTimeout(() => setPhase("gate"), 220);
    }
  };

  const submitGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    saveLead({
      source: "sip_health_check",
      name,
      email,
      phone,
      details: { healthScore: result.score, grade: result.grade },
    });
    setPhase("result");
  };

  const restart = () => {
    setPhase("intro");
    setCurrent(0);
    setAnswers([]);
    setTips([]);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg">
        <div className="container-page max-w-2xl py-10">
          {/* Progress bar */}
          {phase !== "intro" && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-ink-muted mb-2">
                <span className="font-semibold flex items-center gap-1.5">
                  <Activity size={13} className="text-green-600" /> SIP Health
                  Check
                </span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-green-500 to-green-600"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", damping: 20 }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ── INTRO ── */}
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="text-center py-8"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-600 mx-auto mb-6">
                  <Activity size={30} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-3">
                  {t.heroTitle}
                </h1>
                <p className="text-sm text-ink-muted max-w-md mx-auto mb-2 leading-relaxed">
                  {t.heroSubtitle}
                </p>
                <p className="text-xs text-ink-soft mb-8">{t.badge}</p>
                <button
                  onClick={() => setPhase("quiz")}
                  className="inline-flex items-center gap-2 rounded-full bg-green-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-green-700 transition-colors cursor-pointer"
                >
                  {t.startCta} <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* ── QUIZ ── */}
            {phase === "quiz" && (
              <motion.div
                key={`q-${current}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-4">
                  {HEALTH_QUESTIONS[current].emoji}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                  {t.questionOf
                    .replace("{current}", String(current + 1))
                    .replace("{total}", String(total))}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6 leading-snug">
                  {HEALTH_QUESTIONS[current].question}
                </h2>
                <div className="flex flex-col gap-3">
                  {HEALTH_QUESTIONS[current].options.map((opt) => {
                    const selected =
                      answers[current] === opt.points &&
                      tips[current] === (opt.tip ?? "");
                    return (
                      <motion.button
                        key={opt.label}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => choose(opt.points, opt.tip)}
                        className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all cursor-pointer ${
                          selected
                            ? "border-green-600 bg-green-50 text-green-800"
                            : "border-border bg-surface text-ink hover:border-ink hover:bg-surface-2"
                        }`}
                      >
                        {opt.label}
                        <ArrowRight size={15} className="opacity-40 shrink-0" />
                      </motion.button>
                    );
                  })}
                </div>
                {current > 0 && (
                  <button
                    onClick={() => setCurrent((c) => c - 1)}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={13} /> {t.prev}
                  </button>
                )}
              </motion.div>
            )}

            {/* ── LEAD GATE ── */}
            {phase === "gate" && (
              <motion.div
                key="gate"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl border border-border bg-surface p-7 sm:p-9"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 mx-auto mb-5">
                  <Sparkles size={26} />
                </div>
                <h2 className="text-xl font-bold text-center text-ink mb-2">
                  {t.gateTitle}
                </h2>
                <p className="text-sm text-ink-muted text-center max-w-sm mx-auto mb-7">
                  {t.gateSubtitle}
                </p>
                <form
                  onSubmit={submitGate}
                  className="flex flex-col gap-3 max-w-sm mx-auto"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white hover:bg-green-700 transition-colors cursor-pointer"
                  >
                    {t.revealCta}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhase("result")}
                    className="text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  >
                    {t.skip}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── RESULT ── */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Score dial */}
                <div className="rounded-3xl border border-border bg-surface p-7 text-center mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-4">
                    {t.resultTitle}
                  </p>
                  <ScoreRing score={result.score} colorClass={result.color} />
                  <h2 className={`text-2xl font-bold mt-4 ${result.color}`}>
                    {result.grade}
                  </h2>
                  <p className="text-sm text-ink-muted max-w-md mx-auto mt-2 leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                {/* Action plan */}
                <div className="rounded-3xl border border-border bg-surface p-7 mb-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-ink mb-4">
                    <Lightbulb size={16} className="text-amber-500" />
                    {t.actionPlanTitle}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {tips.filter(Boolean).map((tip, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 rounded-2xl bg-surface-2 p-4"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-green-600 shrink-0 mt-0.5"
                        />
                        <p className="text-sm text-ink-muted leading-relaxed">
                          {tip}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="rounded-3xl bg-ink p-7 text-center text-white">
                  <Heart size={22} className="mx-auto mb-3 text-green-400" />
                  <h3 className="text-lg font-bold mb-1.5">{t.helpTitle}</h3>
                  <p className="text-sm text-white/60 max-w-sm mx-auto mb-5">
                    {t.helpSubtitle}
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link
                      href="/contact"
                      className="rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-white hover:bg-green-600 transition-colors cursor-pointer"
                    >
                      {t.bookReview}
                    </Link>
                    <a
                      href={whatsappLink(
                        `Hi! My SIP Health Score is ${result.score}/100 (${result.grade}). I'd like help improving it.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Image
                        src="/images/whatsapp.png"
                        alt=""
                        width={14}
                        height={14}
                        className="object-contain brightness-0 invert inline mr-1.5"
                      />
                      {t.discussWa}
                    </a>
                  </div>
                  <button
                    onClick={restart}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} /> {t.retake}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ScoreRing({
  score,
  colorClass,
}: {
  score: number;
  colorClass: string;
}) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const stroke = colorClass.includes("green")
    ? "#16a34a"
    : colorClass.includes("amber")
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="130" height="130" className="-rotate-90">
        <circle
          cx="65"
          cy="65"
          r={radius}
          stroke="var(--color-surface-2)"
          strokeWidth="11"
          fill="none"
        />
        <motion.circle
          cx="65"
          cy="65"
          r={radius}
          stroke={stroke}
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-3xl font-black text-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-ink-soft">out of 100</span>
      </div>
    </div>
  );
}
