"use client";

import { FileText, Download, Landmark, LifeBuoy } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function QuickLinks() {
  const { dict } = useTranslation();
  const t = dict.dashboard;

  const links = [
    { icon: FileText, label: t.casStatement },
    { icon: Download, label: t.taxReports },
    { icon: Landmark, label: t.bankDetails },
    { icon: LifeBuoy, label: t.getHelp },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold mb-4">{t.quickLinks}</h2>
      <div className="grid grid-cols-2 gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.label}
              type="button"
              className="focus-ring flex flex-col items-center gap-2 rounded-xl border border-border bg-surface p-4 hover:bg-surface-2 transition-colors"
            >
              <Icon size={17} className="text-ink-muted" />
              <span className="text-xs font-medium text-center">
                {link.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
