"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useTranslation, LOCALE_LABELS } from "@/lib/i18n/I18nProvider";
import type { Locale } from "@/types";

export function LanguageSwitcher() {
  const { locale, setLocale, dict } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="focus-ring flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors cursor-pointer"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">{dict.nav.language}</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-border bg-surface py-1.5 shadow-lg z-50"
        >
          {(Object.keys(LOCALE_LABELS) as Locale[]).map((code) => (
            <button
              key={code}
              role="option"
              aria-selected={locale === code}
              onClick={() => {
                setLocale(code);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-3.5 py-2 text-sm hover:bg-surface-2 transition-colors cursor-pointer"
            >
              <span>{LOCALE_LABELS[code].native}</span>
              {locale === code && (
                <Check size={14} className="text-green-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
