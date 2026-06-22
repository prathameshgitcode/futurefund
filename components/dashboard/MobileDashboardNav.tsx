"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Calculator,
  HelpCircle,
  FolderOpen,
  BookOpen,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils/cn";

export function MobileDashboardNav() {
  const { dict } = useTranslation();
  const t = dict.dashboard;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: t.navHome, href: "/dashboard", icon: Home },
    { label: t.navCalculators, href: "/calculators", icon: Calculator },
    { label: t.navQuiz, href: "/quiz", icon: HelpCircle },
    { label: t.navPortfolio, href: "/portfolio-review", icon: FolderOpen },
    { label: t.navKnowledge, href: "/knowledge", icon: BookOpen },
  ];

  return (
    <div className="lg:hidden border-b border-border bg-surface-2">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="text-base font-bold text-ink">FutureFund.in</div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
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
      )}
    </div>
  );
}
