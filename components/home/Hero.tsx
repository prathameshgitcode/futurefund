"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Card";
import { Counter } from "@/components/ui/Counter";
import { HeroCarousel } from "./HeroCarousel";
import { FUND_HOUSES } from "@/constants/nav";

export function Hero() {
  const { dict } = useTranslation();

  return (
    <section className="container-page pt-12 pb-16 md:pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge tone="green" className="mb-5">
            🛡 {dict.home.badge}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.08] mb-5 text-ink">
            {dict.home.heroTitleLine1}
            <br />
            {dict.home.heroTitleLine2}
            <br />
            <span className="text-green-600">{dict.home.heroTitleLine3}</span>
          </h1>
          <p className="text-base text-ink-muted max-w-md mb-7 leading-relaxed">
            {dict.home.heroSubtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <LinkButton href="/quiz" variant="primary" size="lg">
              {dict.home.startInvesting}
            </LinkButton>
            <LinkButton href="/quiz" variant="outline" size="lg">
              {dict.home.takeQuiz}
            </LinkButton>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            <Phone size={15} />
            {dict.home.bookFreeConsultation}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl overflow-hidden aspect-[4/3.2] md:aspect-square"
        >
          <HeroCarousel />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-border">
        <Stat value={15} suffix="+" label={dict.home.stats.experience} />
        <Stat value={50} suffix="k+" label={dict.home.stats.clients} />
        <Stat
          value={2}
          prefix="₹"
          suffix="k Cr"
          label={dict.home.stats.assets}
        />
        <Stat
          value={4.9}
          decimals={1}
          suffix="/5"
          label={dict.home.stats.rating}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-50">
        {FUND_HOUSES.map((fh) => (
          <span
            key={fh}
            className="text-xs font-semibold tracking-wide text-ink-soft"
          >
            {fh}
          </span>
        ))}
      </div>
    </section>
  );
}

function Stat({
  value,
  prefix,
  suffix,
  decimals,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-bold text-ink">
        <Counter
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </div>
      <div className="text-xs uppercase tracking-wide text-ink-soft mt-1">
        {label}
      </div>
    </div>
  );
}
