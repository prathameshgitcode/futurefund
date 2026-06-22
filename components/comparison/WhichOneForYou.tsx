"use client";

import {
  TrendingUp,
  Landmark,
  Coins,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

const PROFILES = [
  {
    icon: TrendingUp,
    name: "SIP",
    tone: "green",
    pros: ["Beats inflation easily", "Rupee cost averaging"],
    cons: ["High volatility", "Requires patience"],
  },
  {
    icon: Landmark,
    name: "FD",
    tone: "blue",
    pros: ["Guaranteed corpus", "Highly liquid (overdraft)"],
    cons: ["Post-tax returns low", "May not beat inflation"],
  },
  {
    icon: Coins,
    name: "Gold",
    tone: "amber",
    pros: ["Hedge against crisis", "Emotional security"],
    cons: ["No periodic income", "Storage/Making costs"],
  },
  {
    icon: ShieldCheck,
    name: "PPF",
    tone: "navy",
    pros: ["Safest Govt. backed", "Triple Tax Benefit"],
    cons: ["15 year lock-in", "₹1.5 Lakh yearly cap"],
  },
];

const TONE_BG: Record<string, string> = {
  green: "bg-green-50 text-green-600",
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  navy: "bg-surface-2 text-navy",
};

export function WhichOneForYou() {
  const { dict } = useTranslation();
  const t = dict.comparison;

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-7">{t.whichOneTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {PROFILES.map((profile) => {
          const Icon = profile.icon;
          return (
            <div
              key={profile.name}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full mb-4 ${TONE_BG[profile.tone]}`}
              >
                <Icon size={17} />
              </div>
              <h3 className="font-semibold mb-3">{profile.name}</h3>

              <div className="mb-3">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-green-600 mb-1.5">
                  <Check size={11} /> {t.pros}
                </div>
                <ul className="flex flex-col gap-1">
                  {profile.pros.map((pro) => (
                    <li key={pro} className="text-xs text-ink-muted">
                      • {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-red-500 mb-1.5">
                  <X size={11} /> {t.cons}
                </div>
                <ul className="flex flex-col gap-1">
                  {profile.cons.map((con) => (
                    <li key={con} className="text-xs text-ink-muted">
                      • {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
