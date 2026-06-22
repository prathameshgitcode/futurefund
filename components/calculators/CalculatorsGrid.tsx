"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  PiggyBank,
  Wallet,
  Sunrise,
  Target,
  GraduationCap,
  Heart,
  Home as HomeIcon,
  Landmark,
  TrendingUp,
  Percent,
  BarChart3,
} from "lucide-react";

const CALCULATORS = [
  {
    icon: PiggyBank,
    name: "SIP Calculator",
    desc: "Project the future value of your monthly SIP.",
    href: "/calculators/sip",
  },
  {
    icon: Wallet,
    name: "Lumpsum Calculator",
    desc: "See how a one-time investment grows over time.",
    href: "/calculators/lumpsum",
  },
  {
    icon: Sunrise,
    name: "Retirement Planner",
    desc: "Build a precise roadmap to your golden years.",
    href: "/calculators/retirement-planner",
  },
  {
    icon: Target,
    name: "Goal Planner",
    desc: "Plan and track any custom financial goal.",
    href: "/calculators/goal-planner",
  },
  {
    icon: GraduationCap,
    name: "Child Education Planner",
    desc: "Secure your child's education against inflation.",
    href: "/calculators/child-education",
  },
  {
    icon: Heart,
    name: "Marriage Planner",
    desc: "Plan for a grand celebration without debt.",
    href: "/calculators/marriage-planner",
  },
  {
    icon: HomeIcon,
    name: "Dream Home Planner",
    desc: "Save systematically for your down payment.",
    href: "/calculators/dream-home",
  },
  {
    icon: Landmark,
    name: "Tax Saving Calculator",
    desc: "Optimize ELSS investments under Section 80C.",
    href: "/calculators/tax-saver",
  },
  {
    icon: Percent,
    name: "Inflation Calculator",
    desc: "See how inflation erodes purchasing power over time.",
    href: "/calculators/inflation",
  },
  {
    icon: BarChart3,
    name: "Compound Interest",
    desc: "Visualize the power of compounding on any principal.",
    href: "/calculators/compound-interest",
  },
  {
    icon: TrendingUp,
    name: "Step-up SIP",
    desc: "Model a SIP that increases with your income.",
    href: "/calculators/step-up-sip",
  },
  {
    icon: Wallet,
    name: "SWP Calculator",
    desc: "Plan steady monthly withdrawals from a lump sum.",
    href: "/calculators/swp",
  },
];

export function CalculatorsGrid() {
  return (
    <section className="container-page pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {CALCULATORS.map((calc, i) => {
          const Icon = calc.icon;
          return (
            <motion.div
              key={calc.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              transition={{ duration: 0.35, delay: (i % 3) * 0.07 }}
            >
              <Link
                href={calc.href}
                className="group block rounded-2xl border border-border bg-surface p-6 hover:border-green-600/40 transition-colors cursor-pointer h-full"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 group-hover:bg-green-50 transition-colors">
                    <Icon
                      size={18}
                      className="text-ink group-hover:text-green-600 transition-colors"
                    />
                  </div>
                </div>
                <h3 className="font-semibold mb-1.5">{calc.name}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {calc.desc}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
