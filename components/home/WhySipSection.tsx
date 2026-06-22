"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, ArrowLeftRight, ShieldCheck, Clock } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Power of Compounding",
    desc: "₹5,000/month at 12% grows to ₹1.76 Cr in 30 years. Your money earns returns on top of returns — time is your biggest asset.",
    stat: "3.5×",
    statLabel: "more than FD over 15 yrs",
    color: "bg-green-50",
    iconBg: "bg-green-600",
  },
  {
    icon: ArrowLeftRight,
    title: "Rupee Cost Averaging",
    desc: "Buy more units when markets fall, fewer when they rise. This automatic strategy lowers your average cost over time.",
    stat: "↓18%",
    statLabel: "avg cost vs lump sum",
    color: "bg-blue-50",
    iconBg: "bg-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Zero Market Timing Stress",
    desc: "No need to predict market highs or lows. SIP invests the same amount every month — disciplined, automatic, stress-free.",
    stat: "100%",
    statLabel: "automated discipline",
    color: "bg-violet-50",
    iconBg: "bg-violet-600",
  },
  {
    icon: Clock,
    title: "Start Small, Dream Big",
    desc: "Begin with as little as ₹500/month. Increase your SIP as your income grows. Small steps compound into life-changing wealth.",
    stat: "₹500",
    statLabel: "minimum to start",
    color: "bg-amber-50",
    iconBg: "bg-amber-500",
  },
];

export function WhySipSection() {
  const { dict } = useTranslation();

  return (
    <section className="container-page py-16">
      {/* Section header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-3 block">
            Why SIP Works
          </span>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            {dict.home.whySipTitle}
          </h2>
          <p className="text-ink-muted leading-relaxed mb-6">
            {dict.home.whySipSubtitle}
          </p>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-100">
            <div className="h-10 w-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-ink">
                ₹5K/month → ₹1.76 Crore
              </div>
              <div className="text-xs text-ink-muted">
                in 30 years at 12% CAGR
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-lg"
        >
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&h=525&fit=crop&q=80"
            alt="Investment growth chart showing SIP returns over time"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <div className="rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-3 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-ink-muted">
                    10-Year SIP Growth
                  </div>
                  <div className="text-lg font-bold text-green-600">+312%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-ink-muted">vs Fixed Deposit</div>
                  <div className="text-lg font-bold text-ink">+89%</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4 benefit cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className={`rounded-2xl ${b.color} p-6 flex flex-col`}
          >
            <div
              className={`h-10 w-10 rounded-xl ${b.iconBg} flex items-center justify-center mb-4`}
            >
              <b.icon size={18} className="text-white" />
            </div>
            <h3 className="text-sm font-bold text-ink mb-2">{b.title}</h3>
            <p className="text-xs text-ink-muted leading-relaxed flex-1 mb-4">
              {b.desc}
            </p>
            <div className="pt-3 border-t border-black/5">
              <div className="text-xl font-black text-ink">{b.stat}</div>
              <div className="text-[10px] text-ink-muted">{b.statLabel}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
