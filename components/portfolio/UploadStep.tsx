"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Paperclip,
  Lock,
  FileText,
  X,
  Loader2,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const MAX_SIZE_BYTES = 20 * 1024 * 1024;

export function UploadStep({ onAnalyzed }: { onAnalyzed: () => void }) {
  const { dict } = useTranslation();
  const t = dict.portfolio;
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  function validateAndSet(candidate: File) {
    if (
      candidate.type !== "application/pdf" &&
      !candidate.name.toLowerCase().endsWith(".pdf")
    ) {
      setError(t.errorFileType);
      return;
    }
    if (candidate.size > MAX_SIZE_BYTES) {
      setError(t.errorFileSize);
      return;
    }
    setError(null);
    setFile(candidate);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) validateAndSet(dropped);
  }

  function handleBeginAnalysis() {
    if (!file) {
      setError(t.errorFileType);
      return;
    }
    setAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 18 + 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onAnalyzed, 300);
          return 100;
        }
        return next;
      });
    }, 280);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div className="lg:col-span-3 rounded-(--radius-card) border border-border bg-surface p-8 sm:p-10">
        <h1 className="text-2xl font-bold mb-2">{t.uploadTitle}</h1>
        <p className="text-sm text-ink-muted mb-7 leading-relaxed">
          {t.uploadSubtitle}
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "rounded-2xl border-2 border-dashed p-10 flex flex-col items-center text-center transition-colors mb-7",
            dragOver
              ? "border-green-600 bg-green-50"
              : "border-border bg-surface-2",
          )}
        >
          {file ? (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600 mb-4">
                <FileText size={22} />
              </div>
              <p className="text-sm font-semibold mb-1 break-all max-w-xs">
                {file.name}
              </p>
              <p className="text-xs text-ink-muted mb-4">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="focus-ring inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-red-500 transition-colors"
              >
                <X size={13} />
                {t.removeFile}
              </button>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface border border-border text-ink-muted mb-4">
                <UploadCloud size={22} />
              </div>
              <p className="text-base font-semibold mb-1.5">
                {t.dropzoneTitle}
              </p>
              <p className="text-xs text-ink-muted mb-6">
                {t.dropzoneSubtitle}
              </p>
              <Button
                variant="secondary"
                onClick={() => inputRef.current?.click()}
                type="button"
              >
                <Paperclip size={14} />
                {t.browseFiles}
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) validateAndSet(selected);
                }}
              />
            </>
          )}
        </div>

        {error && <p className="text-xs text-red-500 mb-5">{error}</p>}

        <div className="border-t border-border pt-6 mb-6">
          <label className="block text-sm font-medium mb-2.5">
            {t.statementPassword}
          </label>
          <div className="relative">
            <Lock
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="focus-ring w-full rounded-xl border border-border bg-surface pl-11 pr-4 py-3 text-sm placeholder:text-ink-soft"
            />
          </div>
          <p className="text-xs text-ink-soft mt-2 flex items-center gap-1.5">
            ⓘ {t.passwordHint}
          </p>
        </div>

        {analyzing ? (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium mb-2.5">
              <Loader2 size={15} className="animate-spin text-green-600" />
              {t.analyzing}
            </div>
            <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
              <motion.div
                className="h-full bg-green-600 rounded-full"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="w-full justify-center"
            onClick={handleBeginAnalysis}
          >
            {t.beginAnalysis}
          </Button>
        )}
      </div>

      <div className="lg:col-span-2 flex flex-col gap-5">
        <div className="rounded-(--radius-card) bg-ink p-7 text-white">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wide mb-5">
            {t.whyReviewTitle}
          </h2>
          <div className="flex flex-col gap-4">
            {[t.why1, t.why2, t.why3].map((reason, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold",
                    i === 0 && "bg-green-600 text-white",
                    i === 1 && "bg-[#8a6d3b] text-white",
                    i === 2 && "bg-mint-400 text-navy",
                  )}
                >
                  {i + 1}
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="focus-ring relative rounded-(--radius-card) overflow-hidden h-40 flex items-end p-5 text-left text-white"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, #1f2937 0%, #0b0e14 70%)",
          }}
        >
          <PlayCircle
            size={56}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/80"
            strokeWidth={1.3}
          />
          <div className="pl-16">
            <div className="text-sm font-semibold">{t.watchHow}</div>
            <div className="text-xs text-white/60">{t.watchSubtitle}</div>
          </div>
        </button>

        <div className="rounded-(--radius-card) border border-border bg-surface p-5 grid grid-cols-2 divide-x divide-border">
          <div className="text-center">
            <div className="text-xl font-bold">50k+</div>
            <div className="text-[10px] uppercase tracking-wide text-ink-soft mt-0.5">
              {t.statPortfolios}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">₹1.2Cr</div>
            <div className="text-[10px] uppercase tracking-wide text-ink-soft mt-0.5">
              {t.statAvgGoal}
            </div>
          </div>
        </div>

        <div className="rounded-(--radius-card) border border-border bg-surface p-5 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
            <ShieldCheck size={16} />
          </div>
          <div>
            <div className="text-sm font-semibold">{t.encryptionTitle}</div>
            <p className="text-xs text-ink-muted leading-relaxed mt-0.5">
              {t.encryptionDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
