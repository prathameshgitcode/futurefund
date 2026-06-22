"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OtpInputBoxes } from "@/components/auth/OtpInputBoxes";
import { Button } from "@/components/ui/Button";

export function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your registered email";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resent, setResent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Enter the 6-digit code sent to your email.");
      return;
    }
    setError(null);
    setSubmitting(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }

  function handleResend() {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <AuthLayout
      title="Verify your email"
      subtitle={`Enter the 6-digit code we sent to ${email}.`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <OtpInputBoxes onChange={setOtp} />
        {error && <p className="text-xs text-red-500">{error}</p>}

        <Button
          variant="primary"
          type="submit"
          className="w-full justify-center"
          disabled={submitting}
        >
          {submitting ? "Verifying..." : "Verify & Continue"}
          {!submitting && <ShieldCheck size={15} />}
        </Button>

        <button
          type="button"
          onClick={handleResend}
          disabled={resent}
          className="text-xs font-medium text-ink-muted hover:text-green-600 disabled:opacity-50 transition-colors"
        >
          {resent ? "Code resent ✓" : "Didn't get a code? Resend"}
        </button>
      </form>
    </AuthLayout>
  );
}
