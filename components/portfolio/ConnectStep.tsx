"use client";

import { Mail, Upload } from "lucide-react";

export function ConnectStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="rounded-(--radius-card) border border-border bg-surface p-8 sm:p-10 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-2">Connect Your Investments</h1>
      <p className="text-sm text-ink-muted mb-8">
        Choose how you&apos;d like to share your portfolio for review. Nothing
        is shared with third parties.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onNext}
          className="focus-ring flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 hover:border-green-600 hover:bg-green-50 transition-colors"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
            <Mail size={18} />
          </div>
          <span className="text-sm font-semibold">Email my CAS link</span>
          <span className="text-xs text-ink-muted">
            We&apos;ll send a request to CAMS/Karvy on your behalf.
          </span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="focus-ring flex flex-col items-center gap-3 rounded-2xl border-2 border-ink bg-surface p-6 hover:bg-surface-2 transition-colors"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-ink">
            <Upload size={18} />
          </div>
          <span className="text-sm font-semibold">Upload manually</span>
          <span className="text-xs text-ink-muted">
            Already have your CAS PDF or screenshots ready.
          </span>
        </button>
      </div>
    </div>
  );
}
