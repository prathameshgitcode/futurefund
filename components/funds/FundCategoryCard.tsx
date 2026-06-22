"use client";

import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Rocket,
  Shuffle,
  Scale,
  Landmark,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { TrendSparkline } from "./TrendSparkline";
import type { FundCategory } from "@/constants/fundCategories";

const ICONS = {
  building: Building2,
  trendingUp: TrendingUp,
  rocket: Rocket,
  shuffle: Shuffle,
  scale: Scale,
  landmark: Landmark,
} as const;

const RISK_COLORS: Record<string, string> = {
  Low: "var(--color-green-600)",
  "Low to Moderate": "var(--color-green-600)",
  Moderate: "var(--color-ink)",
  "Moderate to High": "var(--color-ink)",
  "Moderately High": "#b45309",
  "Very High": "#dc2626",
};

export function FundCategoryCard({
  category,
  index,
}: {
  category: FundCategory;
  index: number;
}) {
  const { dict } = useTranslation();
  const t = dict.funds;
  const Icon = ICONS[category.icon];
  const trendColor =
    category.trend === "volatile" ? "#dc2626" : "var(--color-green-600)";
  const riskColor = RISK_COLORS[category.riskLevel] ?? "var(--color-ink)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.35, delay: (index % 3) * 0.07 }}
      className={cn(
        "rounded-(--radius-card) border bg-surface p-6 flex flex-col",
        category.highlight ? "border-green-600" : "border-border",
      )}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2">
          <Icon size={20} className="text-ink" />
        </div>
        <TrendSparkline trend={category.trend} color={trendColor} />
      </div>

      <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
      <p className="text-xs text-ink-muted leading-relaxed mb-5">
        {category.description}
      </p>

      <div className="flex items-center justify-between text-xs mb-2.5">
        <span className="text-ink-soft">{t.riskLevel}</span>
        <span className="font-semibold" style={{ color: riskColor }}>
          {category.riskLevel}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs mb-5">
        <span className="text-ink-soft">{t.returnsPotential}</span>
        <span className="font-semibold text-green-600">
          {category.returnsPotential}
        </span>
      </div>

      <div className="rounded-xl bg-surface-2 p-4 mb-6 flex-1">
        <div className="text-[10px] uppercase tracking-wide text-ink-soft mb-1.5">
          {t.whoShouldInvest}
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          {category.whoShouldInvest}
        </p>
      </div>

      <LinkButton
        href={`/funds/${category.id}`}
        variant={category.highlight ? "primary" : "outline"}
        className="w-full justify-center"
      >
        {category.ctaLabel}
      </LinkButton>
    </motion.div>
  );
}
