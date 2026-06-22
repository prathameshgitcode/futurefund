"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bookmark } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AmfiBadge } from "@/components/ui/AmfiBadge";
import { getWatchlist, WATCHLIST_EVENT } from "@/lib/watchlist/watchlistStore";
import { cn } from "@/lib/utils/cn";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const { dict } = useTranslation();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [watchCount, setWatchCount] = useState(0);

  useEffect(() => {
    const sync = () => setWatchCount(getWatchlist().length);
    sync();
    window.addEventListener(WATCHLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WATCHLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const navItems = [
    { label: dict.nav.calculators, href: "/calculators" },
    { label: dict.nav.knowledge, href: "/knowledge" },
    { label: dict.nav.aboutUs, href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium pb-1 transition-colors",
                  active
                    ? "text-ink border-b-2 border-ink"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <span className="hidden lg:inline-flex">
            <AmfiBadge variant="compact" />
          </span>
          <Link
            href="/watchlist"
            aria-label="Watchlist"
            className="relative text-ink-muted hover:text-ink transition-colors"
          >
            <Bookmark size={18} />
            {watchCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-green-600 px-1 text-[9px] font-bold text-white">
                {watchCount}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/quiz"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600 transition-colors focus-ring"
          >
            {dict.nav.getStarted}
          </Link>
        </div>

        <button
          className="md:hidden focus-ring cursor-pointer"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-bg px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <Link
              href="/quiz"
              onClick={() => setMobileOpen(false)}
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white"
            >
              {dict.nav.getStarted}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
