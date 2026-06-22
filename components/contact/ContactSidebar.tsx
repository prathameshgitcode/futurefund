"use client";

import Image from "next/image";
import { Phone, MapPin, Mail, Clock, Star } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";
import { MapPlaceholder } from "./MapPlaceholder";
import { SITE, whatsappLink } from "@/constants/site";

export function ContactSidebar() {
  const { dict } = useTranslation();
  const t = dict.contact;

  return (
    <div className="flex flex-col gap-5">
      {/* Advisor card */}
      <div className="rounded-(--radius-card) border border-border bg-surface overflow-hidden">
        <div className="relative h-44 w-full">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=220&fit=crop&crop=face&q=80"
            alt="Your Financial Advisor"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-white font-bold text-sm">Arjun Mehra, CFP</div>
            <div className="text-white/70 text-xs">
              AMFI Registered · 15+ yrs experience
            </div>
          </div>
        </div>
        <div className="p-4 flex items-center gap-3">
          <div className="flex gap-0.5 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="text-xs text-ink-muted">
            4.9 · 500+ happy investors
          </span>
        </div>
      </div>

      <div className="rounded-(--radius-card) bg-mint-400 p-6">
        <h3 className="text-lg font-bold text-navy mb-1.5">
          {t.immediateSupport}
        </h3>
        <p className="text-sm text-navy/70 mb-5">{t.immediateSupportDesc}</p>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${SITE.phoneRaw}`}>
            <Button
              variant="primary"
              size="sm"
              className="!bg-navy !text-white hover:!bg-black"
            >
              <Phone size={14} />
              {t.callSupport}
            </Button>
          </a>
          <a
            href={whatsappLink("Hi, I need help with my SIP investments")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="sm"
              className="!bg-navy !text-white hover:!bg-black"
            >
              <Image
                src="/images/whatsapp.png"
                alt="WhatsApp"
                width={14}
                height={14}
                className="object-contain brightness-0 invert"
              />
              {t.whatsapp}
            </Button>
          </a>
        </div>
      </div>

      <div className="rounded-(--radius-card) border border-border bg-surface p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink">
            <MapPin size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{t.officeTitle}</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              {t.officeAddress}
            </p>
          </div>
        </div>

        <MapPlaceholder />

        <div className="flex flex-col gap-2.5 mt-4 text-xs text-ink-muted">
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-2 hover:text-ink transition-colors"
          >
            <Mail size={13} />
            {SITE.email}
          </a>
          <div className="flex items-center gap-2">
            <Clock size={13} />
            {t.officeHours}
          </div>
        </div>
      </div>
    </div>
  );
}
