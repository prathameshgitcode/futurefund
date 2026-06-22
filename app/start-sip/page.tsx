"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Rocket,
  User,
  IndianRupee,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  PartyPopper,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { whatsappLink } from "@/constants/site";
import { saveLead } from "@/lib/leads/leadStore";
import {
  calculateSipFutureValue,
  formatINR,
  formatINRShort,
} from "@/lib/utils/calculators";

export default function StartSipPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(15);
  const { dict } = useTranslation();
  const t = dict.startSip;

  const STEPS = [t.stepYou, t.stepAmount, t.stepKyc, t.stepDone];

  const projection = calculateSipFutureValue(monthly, 12, years);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    saveLead({
      source: "onboarding",
      name,
      email,
      phone,
      details: {
        monthlySip: monthly,
        years,
        projectedValue: projection.futureValue,
      },
    });
    next();
  };

  const canProceedStep0 = name.trim() && /\S+@\S+\.\S+/.test(email);

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg">
        <div className="container-page max-w-xl py-10">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((label, i) => (
              <div
                key={label}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      i < step
                        ? "bg-green-600 text-white"
                        : i === step
                          ? "bg-ink text-white"
                          : "bg-surface-2 text-ink-soft"
                    }`}
                  >
                    {i < step ? <CheckCircle2 size={15} /> : i + 1}
                  </div>
                  <span
                    className={`text-[10px] font-medium ${i === step ? "text-ink" : "text-ink-soft"}`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 rounded ${i < step ? "bg-green-600" : "bg-surface-2"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-border bg-surface p-7 sm:p-9">
            <AnimatePresence mode="wait">
              {/* Step 0 — You */}
              {step === 0 && (
                <motion.div
                  key="s0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 mb-5">
                    <Rocket size={22} />
                  </div>
                  <h1 className="text-xl font-bold text-ink mb-1.5">
                    {t.heroTitle}
                  </h1>
                  <p className="text-sm text-ink-muted mb-6">{t.step1Title}</p>
                  <div className="flex flex-col gap-3">
                    <Field
                      icon={User}
                      placeholder={t.namePlaceholder}
                      value={name}
                      onChange={setName}
                    />
                    <Field
                      placeholder={t.emailPlaceholder}
                      type="email"
                      value={email}
                      onChange={setEmail}
                    />
                    <Field
                      placeholder={t.phonePlaceholder}
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                    />
                  </div>
                  <button
                    onClick={next}
                    disabled={!canProceedStep0}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-sm font-bold text-white hover:bg-black transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t.continueCta} <ArrowRight size={15} />
                  </button>
                </motion.div>
              )}

              {/* Step 1 — Amount */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 mb-5">
                    <IndianRupee size={22} />
                  </div>
                  <h2 className="text-xl font-bold text-ink mb-1.5">
                    {t.step2Title}
                  </h2>
                  <p className="text-sm text-ink-muted mb-6">
                    {t.step2Subtitle}
                  </p>

                  <div className="flex flex-col gap-5">
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
                      label={t.labelDuration}
                      value={years}
                      display={`${years} years`}
                      min={1}
                      max={30}
                      step={1}
                      onChange={setYears}
                    />
                  </div>

                  <div className="mt-6 rounded-2xl bg-linear-to-br from-green-600 to-emerald-500 p-5 text-white">
                    <div className="text-[10px] uppercase tracking-widest text-white/70 mb-1">
                      {t.projectedLabel}
                    </div>
                    <div className="text-3xl font-bold">
                      {formatINRShort(projection.futureValue)}
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      You invest {formatINRShort(projection.investedAmount)} ·
                      gain {formatINRShort(projection.estimatedGain)}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={back}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-3.5 text-sm font-semibold text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={15} />
                    </button>
                    <button
                      onClick={next}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-sm font-bold text-white hover:bg-black transition-colors cursor-pointer"
                    >
                      {t.continueCta} <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 — KYC */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 mb-5">
                    <FileCheck2 size={22} />
                  </div>
                  <h2 className="text-xl font-bold text-ink mb-1.5">
                    {t.step3Title}
                  </h2>
                  <p className="text-sm text-ink-muted mb-6">
                    {t.step3Subtitle}
                  </p>

                  <div className="flex flex-col gap-3">
                    {[
                      { label: t.kycPan, done: true },
                      { label: t.kycAadhaar, done: true },
                      { label: t.kycBank, done: false },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3"
                      >
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${item.done ? "bg-green-600 text-white" : "border-2 border-amber-400 text-amber-500"}`}
                        >
                          {item.done ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Clock size={12} />
                          )}
                        </div>
                        <span className="text-sm text-ink flex-1">
                          {item.label}
                        </span>
                        <span
                          className={`text-[11px] font-semibold ${item.done ? "text-green-600" : "text-amber-500"}`}
                        >
                          {item.done ? t.kycReady : t.kycHelp}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-xs text-green-700">
                    <ShieldCheck size={15} className="shrink-0" />
                    {t.kycDisclaimer}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={back}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-3.5 text-sm font-semibold text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={15} />
                    </button>
                    <button
                      onClick={finish}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white hover:bg-green-700 transition-colors cursor-pointer"
                    >
                      {t.finishCta} <ArrowRight size={15} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 — Done */}
              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-600 mx-auto mb-5"
                  >
                    <PartyPopper size={30} />
                  </motion.div>
                  <h2 className="text-xl font-bold text-ink mb-2">
                    {t.doneTitle.replace(
                      "{name}",
                      name.split(" ")[0] || "investor",
                    )}
                  </h2>
                  <p className="text-sm text-ink-muted max-w-sm mx-auto mb-6">
                    {t.doneSubtitle.replace("{amount}", formatINR(monthly))}
                  </p>
                  <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <a
                      href={whatsappLink(
                        `Hi! I just completed onboarding for a ${formatINR(monthly)}/month SIP. Please help me activate it.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white hover:bg-green-700 transition-colors cursor-pointer"
                    >
                      <Image
                        src="/images/whatsapp.png"
                        alt=""
                        width={15}
                        height={15}
                        className="object-contain brightness-0 invert inline mr-1.5"
                      />
                      {t.activateWa}
                    </a>
                    <Link
                      href="/dashboard"
                      className="rounded-xl border border-border py-3.5 text-sm font-bold text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                    >
                      {t.previewDashboard}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  icon?: typeof User;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft"
        />
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-border bg-surface-2 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 ${Icon ? "pl-10 pr-4" : "px-4"}`}
      />
    </div>
  );
}
