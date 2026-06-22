"use client";

import { Bell, UserRound } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function DashboardTopbar() {
  const { dict } = useTranslation();
  const t = dict.dashboard;

  return (
    <div className="hidden lg:flex items-center justify-between mb-8">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex items-center gap-5">
        <Link
          href="/dashboard#portfolio"
          className="text-sm font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
        >
          {t.statements}
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
        >
          {t.support}
        </Link>
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface cursor-pointer hover:bg-surface-2 transition-colors"
          aria-label="Notifications"
          onClick={() =>
            alert(
              "You have 1 new notification: Your SIP of ₹5,000 was processed successfully.",
            )
          }
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-ink-muted">
          <UserRound size={16} />
        </div>
      </div>
    </div>
  );
}
