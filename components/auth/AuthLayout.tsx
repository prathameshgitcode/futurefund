import Link from "next/link";
import type { ReactNode } from "react";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <div className="container-page py-6">
        <Link href="/" className="text-lg font-bold text-ink">
          FutureFund.in
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <div className="rounded-(--radius-card) border border-border bg-surface p-8 sm:p-10">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-sm text-ink-muted mb-7">{subtitle}</p>
            {children}
          </div>
          {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
