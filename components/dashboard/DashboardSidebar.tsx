"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calculator,
  HelpCircle,
  FolderOpen,
  BookOpen,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export function DashboardSidebar() {
  const { dict } = useTranslation();
  const t = dict.dashboard;
  const pathname = usePathname();

  const navItems = [
    { label: t.navHome, href: "/dashboard", icon: Home },
    { label: t.navCalculators, href: "/calculators", icon: Calculator },
    { label: t.navQuiz, href: "/quiz", icon: HelpCircle },
    { label: t.navPortfolio, href: "/portfolio-review", icon: FolderOpen },
    { label: t.navKnowledge, href: "/knowledge", icon: BookOpen },
  ];

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-surface-2 p-6 min-h-screen">
      <div className="mb-10">
        <div className="text-lg font-bold text-ink">FutureFund.in</div>
        <div className="text-xs text-ink-soft">Investment Platform</div>
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
        <p className="text-sm font-semibold mb-3">{t.readyToGrow}</p>
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
