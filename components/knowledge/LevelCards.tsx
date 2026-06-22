"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

const LEVELS = [
  {
    icon: GraduationCap,
    tone: "neutral" as const,
    titleKey: "levelBeginnerTitle",
    descKey: "levelBeginnerDesc",
    links: [
      { id: "sip-basics-101", label: "SIP Basics 101" },
      { id: "power-of-compounding", label: "Power of Compounding" },
    ],
  },
  {
    icon: TrendingUp,
    tone: "green" as const,
    titleKey: "levelIntermediateTitle",
    descKey: "levelIntermediateDesc",
    links: [
      {
        id: "asset-allocation-strategies",
        label: "Asset Allocation Strategies",
      },
      { id: "rupee-cost-averaging", label: "Rupee Cost Averaging" },
    ],
  },
  {
    icon: BarChart3,
    tone: "neutral" as const,
    titleKey: "levelAdvancedTitle",
    descKey: "levelAdvancedDesc",
    links: [
      { id: "advanced-market-insights", label: "Advanced Market Insights" },
      { id: "tax-harvesting-in-sips", label: "Tax Harvesting in SIPs" },
    ],
  },
];

export function LevelCards() {
  const { dict } = useTranslation();
  const t = dict.knowledge;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {LEVELS.map((level, i) => {
        const Icon = level.icon;
        return (
          <motion.div
            key={level.titleKey}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className={
              level.tone === "green"
                ? "rounded-2xl border border-green-600/30 bg-green-50 p-6"
                : "rounded-2xl border border-border bg-surface p-6"
            }
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface border border-border mb-4 text-green-600">
              <Icon size={17} />
            </div>
            <h3
              className={
                level.tone === "green"
                  ? "font-semibold mb-2 text-green-700"
                  : "font-semibold mb-2"
              }
            >
              {t[level.titleKey as keyof typeof t]}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed mb-5">
              {t[level.descKey as keyof typeof t]}
            </p>
            <div className="flex flex-col gap-2">
              {level.links.map((link) => (
                <Link
                  key={link.id}
                  href={`/knowledge/${link.id}`}
                  className="flex items-center justify-between text-xs font-medium text-ink hover:text-green-600 transition-colors group"
                >
                  {link.label}
                  <ArrowRight
                    size={13}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
