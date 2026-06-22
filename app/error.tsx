"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 mb-6">
        <AlertTriangle size={26} />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">
        Something went wrong
      </h1>
      <p className="text-sm text-ink-muted max-w-md mb-8 leading-relaxed">
        We hit an unexpected error loading this page. This has been logged —
        please try again, or head back to the homepage.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={unstable_retry}
          className="inline-flex items-center justify-center rounded-full bg-ink text-white px-6 py-3 text-sm font-medium hover:bg-black transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium hover:bg-surface-2 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
