"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  PauseCircle,
  Calculator,
  Scale,
  ArrowRight,
} from "lucide-react";

const TOOLS = [
  {
    href: "/sip-health-check",
    icon: Activity,
    title: "SIP Health Check",
    desc: "Score your SIP in 60 seconds and get a personalised action plan.",
    tag: "Free · 5 questions",
    accent: "text-green-600 bg-green-50",
  },
  {
    href: "/sip-pause-simulator",
    icon: PauseCircle,
    title: "Pause Simulator",
    desc: "See the real long-term cost of pausing your SIP before you do it.",
    tag: "Eye-opening",
    accent: "text-amber-600 bg-amber-50",
  },
  {
    href: "/calculators",
    icon: Calculator,
    title: "11 Calculators",
    desc: "SIP, lumpsum, retirement, tax-saver, goal planners and more.",
    tag: "Plan any goal",
    accent: "text-blue-600 bg-blue-50",
  },
  {
    href: "/fund-comparison",
    icon: Scale,
    title: "Compare Funds",
    desc: "Add up to 3 funds and compare their live returns side by side.",
    tag: "Decide smarter",
    accent: "text-violet-600 bg-violet-50",
  },
];

export function ToolsStrip() {
  return (
    <section className="container-page py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">
          Free tools to plan with confidence
        </h2>
        <p className="text-sm text-ink-muted max-w-md mx-auto">
          No sign-up needed — explore, calculate, and decide at your own pace.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOOLS.map((tool, i) => (
          <motion.div
            key={tool.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: i * 0.07 }}
            whileHover={{ y: -4 }}
          >
            <Link
              href={tool.href}
              className="group flex flex-col h-full rounded-2xl border border-border bg-surface p-6 hover:shadow-lg hover:border-green-600/30 transition-all"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl mb-4 ${tool.accent}`}
              >
                <tool.icon size={20} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft mb-1">
                {tool.tag}
              </span>
              <h3 className="text-sm font-bold text-ink mb-1.5">
                {tool.title}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed flex-1 mb-3">
                {tool.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 group-hover:gap-2 transition-all">
                Try it <ArrowRight size={12} />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
