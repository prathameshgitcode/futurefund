"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/types";
import en, { type Dictionary } from "./dictionaries/en";
import hi from "./dictionaries/hi";
import mr from "./dictionaries/mr";

const dictionaries: Record<Locale, Dictionary> = { en, hi, mr };

export const LOCALE_STORAGE_KEY = "sipguru_locale";

export const LOCALE_LABELS: Record<Locale, { label: string; native: string }> =
  {
    en: { label: "English", native: "English" },
    hi: { label: "Hindi", native: "हिंदी" },
    mr: { label: "Marathi", native: "मराठी" },
  };

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(
        LOCALE_STORAGE_KEY,
      ) as Locale | null;
      if (stored && dictionaries[stored]) {
        setLocaleState(stored);
      }
    } catch {
      // localStorage unavailable - ignore, default to English
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  };

  const value = useMemo<I18nContextValue>(
    () => ({ locale, dict: dictionaries[locale], setLocale }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return ctx;
}
