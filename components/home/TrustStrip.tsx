"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Star, Lock, ArrowRight } from "lucide-react";
import { Counter } from "@/components/ui/Counter";

const STATS = [
  { icon: Users, value: 500, suffix: "+", label: "Investors guided" },
  {
    icon: ShieldCheck,
    value: 250,
    prefix: "₹",
    suffix: " Cr+",
    label: "Assets advised",
  },
  { icon: Star, value: 4.9, label: "Average rating", decimals: 1 },
  { icon: Lock, value: 100, suffix: "%", label: "SEBI-regulated flow" },
];

export function TrustStrip() {
  return (
    <section className="container-page -mt-2 mb-2">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="rounded-(--radius-card) border border-border bg-surface p-6 sm:p-7"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <s.icon size={18} />
              </div>
              <div>
                <div className="text-lg font-bold text-ink leading-none">
                  <Counter
                    value={s.value}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix ?? ""}
                    decimals={s.decimals ?? 0}
                  />
                </div>
                <div className="text-[11px] text-ink-muted mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-5 border-t border-border flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-ink-muted">
            Worried about safety? See exactly where your money goes and who
            protects it.
          </p>
          <Link
            href="/how-your-money-is-safe"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:gap-2.5 transition-all"
          >
            <ShieldCheck size={14} /> How your money is safe{" "}
            <ArrowRight size={12} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
