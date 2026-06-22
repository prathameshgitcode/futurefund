"use client";

import { ShieldCheck, Lock, Headphones } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";

export function TrustBadges() {
  const { dict } = useTranslation();
  const t = dict.contact;

  const badges = [
    { icon: ShieldCheck, title: t.sebiRegistered, desc: t.sebiRegisteredDesc },
    { icon: Lock, title: t.securePlatforms, desc: t.securePlatformsDesc },
    {
      icon: Headphones,
      title: t.dedicatedAdvisors,
      desc: t.dedicatedAdvisorsDesc,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center py-16 border-t border-border">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div key={badge.title} className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 mb-4">
              <Icon size={20} />
            </div>
            <h3 className="font-semibold mb-1.5">{badge.title}</h3>
            <p className="text-xs text-ink-muted max-w-[220px] leading-relaxed">
              {badge.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
