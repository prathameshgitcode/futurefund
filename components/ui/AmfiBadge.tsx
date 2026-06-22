"use client";

import { ShieldCheck, ExternalLink } from "lucide-react";
import { SITE } from "@/constants/site";

interface AmfiBadgeProps {
  /** "compact" for inline strips, "card" for a standalone trust block. */
  variant?: "compact" | "card";
  className?: string;
}

/**
 * AMFI / SEBI registration trust badge with a clickable verification link.
 * Distributors are registered with AMFI (ARN); the link lets clients verify.
 */
export function AmfiBadge({
  variant = "compact",
  className = "",
}: AmfiBadgeProps) {
  if (variant === "compact") {
    return (
      <a
        href={SITE.amfiVerifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[11px] font-semibold text-green-700 hover:bg-green-100 transition-colors cursor-pointer ${className}`}
      >
        <ShieldCheck size={13} />
        AMFI Registered · {SITE.arnNumber}
        <ExternalLink size={10} className="opacity-60" />
      </a>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-green-200 bg-green-50 p-5 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
          <ShieldCheck size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-green-900">
            AMFI Registered Distributor
          </h3>
          <p className="text-xs text-green-700/80 mt-0.5 leading-relaxed">
            {SITE.name} operates under <strong>{SITE.arnNumber}</strong> (EUIN{" "}
            {SITE.euin}). Verify our registration directly on the official AMFI
            portal.
          </p>
          <a
            href={SITE.amfiVerifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-semibold text-green-700 hover:text-green-800 transition-colors cursor-pointer"
          >
            Verify on AMFI <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
