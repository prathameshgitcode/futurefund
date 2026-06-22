"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validation/authSchemas";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [form, setForm] = useState<ForgotPasswordFormValues>({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = forgotPasswordSchema.safeParse(form);
    if (!result.success) {
      setErrors({ email: result.error.issues[0].message });
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle="">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 mb-4">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-sm text-ink-muted mb-6">
            If an account exists for{" "}
            <strong className="text-ink">{form.email}</strong>, we&apos;ve sent
            a link to reset your password.
          </p>
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`)
            }
          >
            Enter code instead
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a link to reset it."
      footer={
        <Link
          href="/login"
          className="font-medium text-ink-muted hover:text-ink"
        >
          Back to log in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => setForm({ email: e.target.value })}
          error={errors.email}
        />
        <Button
          variant="primary"
          type="submit"
          className="w-full justify-center"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send Reset Link"}
          {!submitting && <Mail size={15} />}
        </Button>
      </form>
    </AuthLayout>
  );
}
