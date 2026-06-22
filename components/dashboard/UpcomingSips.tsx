"use client";

import { CalendarDays, ChevronRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { formatINR } from "@/lib/utils/calculators";
import { UPCOMING_SIPS } from "@/data/dashboardMock";

export function UpcomingSips() {
  const { dict } = useTranslation();
  const t = dict.dashboard;

  return (
    <div className="rounded-2xl border-l-2 border-l-green-600 border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold mb-4">{t.upcomingSips}</h2>
      <div className="flex flex-col gap-1">
        {UPCOMING_SIPS.map((sip) => (
          <button
            key={sip.id}
            type="button"
            className="focus-ring flex items-center gap-3 rounded-xl p-2.5 -mx-2.5 hover:bg-surface-2 transition-colors text-left"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink-muted">
              <CalendarDays size={15} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{sip.fundName}</div>
              <div className="text-xs text-ink-soft">
                Date: {sip.date} • {formatINR(sip.amount)}
              </div>
            </div>
            <ChevronRight size={14} className="text-ink-soft" />
          </button>
        ))}
      </div>
    </div>
  );
}
