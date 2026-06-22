import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function StatusPage({
  icon: Icon,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-ink-muted mb-6">
        <Icon size={26} />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h1>
      <p className="text-sm text-ink-muted max-w-md mb-8 leading-relaxed">
        {subtitle}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {primaryAction && (
          <Link
            href={primaryAction.href}
            className="inline-flex items-center justify-center rounded-full bg-ink text-white px-6 py-3 text-sm font-medium hover:bg-black transition-colors"
          >
            {primaryAction.label}
          </Link>
        )}
        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium hover:bg-surface-2 transition-colors"
          >
            {secondaryAction.label}
          </Link>
        )}
      </div>
    </div>
  );
}
