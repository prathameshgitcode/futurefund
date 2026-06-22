"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { INVESTMENT_GOALS } from "@/constants/goals";

const GOAL_IMAGES: Record<string, string> = {
  retirement:
    "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=240&fit=crop&q=80",
  child_education:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=240&fit=crop&q=80",
  marriage:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=240&fit=crop&q=80",
  dream_home:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=240&fit=crop&q=80",
  wealth_creation:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop&q=80",
  tax_saving:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop&q=80",
};

export function InvestmentGoalsSection() {
  const { dict } = useTranslation();

  return (
    <section className="container-page py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-1.5">{dict.home.goalsTitle}</h2>
          <p className="text-ink-muted text-sm">{dict.home.goalsSubtitle}</p>
        </div>
        <Link
          href="/calculators"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-green-600 transition-colors whitespace-nowrap"
        >
          {dict.home.viewAllGoals} <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {INVESTMENT_GOALS.map((goal, i) => {
          const imgSrc = GOAL_IMAGES[goal.id];
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-border bg-surface overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              {imgSrc && (
                <div className="relative h-36 w-full overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={goal.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold mb-1.5">{goal.title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed mb-5 flex-1">
                  {goal.description}
                </p>
                <Link
                  href={goal.href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 group-hover:gap-2 transition-all"
                >
                  {dict.common.planNow} <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
