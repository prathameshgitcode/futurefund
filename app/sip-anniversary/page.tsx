"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Cake, TrendingUp, Sparkles, Trophy } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { whatsappLink, SITE } from "@/constants/site";
import {
  calculateSipFutureValue,
  formatINRShort,
} from "@/lib/utils/calculators";

export default function SipAnniversaryPage() {
  const [name, setName] = useState("");
  const [yearsInvesting, setYearsInvesting] = useState(2);
  const [monthly, setMonthly] = useState(5000);
  const { dict } = useTranslation();
  const t = dict.sipAnniversary;

  const built = calculateSipFutureValue(monthly, 12, yearsInvesting);
  const installments = yearsInvesting * 12;

  const shareText = `🎉 I've been investing consistently for ${yearsInvesting} ${yearsInvesting === 1 ? "year" : "years"} with ${SITE.name}! ${installments} SIP installments and counting. Building wealth, one month at a time. 💪`;

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg">
        <div className="container-page max-w-3xl py-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">
              <Cake size={14} /> {t.pageTitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-2">
              {t.heroTitle}
            </h1>
            <p className="text-sm text-ink-muted max-w-md mx-auto">
              {t.heroSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Controls */}
            <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col gap-5">
              <div>
                <label className="text-xs text-ink-muted mb-2 block">
                  {t.namePlaceholder}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.nameExample}
                  className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <RangeSlider
                label={t.labelYears}
                value={yearsInvesting}
                display={`${yearsInvesting} yr${yearsInvesting === 1 ? "" : "s"}`}
                min={1}
                max={25}
                step={1}
                onChange={setYearsInvesting}
              />
              <RangeSlider
                label={t.labelMonthly}
                value={monthly}
                display={formatINRShort(monthly)}
                min={500}
                max={100000}
                step={500}
                onChange={setMonthly}
              />

              <a
                href={whatsappLink(shareText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white hover:bg-green-700 transition-colors cursor-pointer"
              >
                <Image
                  src="/images/whatsapp.png"
                  alt="WhatsApp"
                  width={15}
                  height={15}
                  className="object-contain brightness-0 invert"
                />{" "}
                {t.shareWa}
              </a>
            </div>

            {/* Card preview */}
            <motion.div
              key={`${name}-${yearsInvesting}-${monthly}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#0f172a] via-[#14532d] to-[#0f172a] p-7 text-white aspect-square flex flex-col justify-between"
            >
              {/* decorative */}
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full border border-green-500/20" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full border border-green-500/10" />

              <div className="relative flex items-center justify-between">
                <span className="text-sm font-bold tracking-tight">
                  {SITE.name}
                </span>
                <Trophy size={20} className="text-amber-400" />
              </div>

              <div className="relative text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, delay: 0.1 }}
                  className="text-6xl font-black text-green-400 mb-1"
                >
                  {yearsInvesting}
                </motion.div>
                <div className="text-sm text-white/70 uppercase tracking-widest mb-4">
                  {yearsInvesting === 1 ? t.cardYear : t.cardYears}
                </div>
                <div className="text-lg font-bold">
                  {name ? `${name}, you're` : "You're"} {t.cardBuilding}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <Sparkles size={12} /> {installments} {t.cardInstallments}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp size={12} /> {formatINRShort(built.futureValue)}{" "}
                    {t.cardBuilt}
                  </span>
                </div>
              </div>

              <div className="relative text-center text-[10px] text-white/40">
                {t.cardFooter}
              </div>
            </motion.div>
          </div>

          <p className="text-[11px] text-ink-soft text-center mt-6 max-w-md mx-auto">
            {t.disclaimer}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
