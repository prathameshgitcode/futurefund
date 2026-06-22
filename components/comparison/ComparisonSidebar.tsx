"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  GitCompareArrows,
  Gauge,
  FolderOpen,
  BookText,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function ComparisonSidebar() {
  const { dict } = useTranslation();
  const t = dict.comparison;
  const pathname = usePathname();

  const navItems = [
    { label: t.navHome, href: "/dashboard", icon: Home },
    { label: t.navComparison, href: "/comparison", icon: GitCompareArrows },
    { label: t.navRiskProfiler, href: "/quiz", icon: Gauge },
    { label: t.navPortfolio, href: "/portfolio-review", icon: FolderOpen },
    { label: t.navGuides, href: "/knowledge", icon: BookText },
  ];

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-surface-2 p-6 min-h-screen">
      <div className="mb-6">
        <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-soft mb-4">
          Dashboard
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-mint-400 text-navy"
                  : "text-ink-muted hover:bg-surface",
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-ink p-5 text-white">
        <p className="text-sm font-semibold mb-1">Ready to Grow?</p>
        <p className="text-xs text-white/55 mb-4">
          Start your first SIP today with as little as ₹500.
        </p>
        <LinkButton
          href="/quiz"
          variant="mint"
          size="sm"
          className="w-full justify-center"
        >
          {t.startSipNow}
        </LinkButton>
      </div>
    </aside>
  );
}
