"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validation/authSchemas";

const EMPTY: LoginFormValues = { email: "", password: "" };

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormValues>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues)
        fieldErrors[issue.path[0] as string] = issue.message;
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      try {
        window.localStorage.setItem(
          "futurefund.in_session",
          JSON.stringify({ email: form.email }),
        );
      } catch {
        // ignore
      }
      router.push("/dashboard");
    }, 800);
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to view your dashboard, SIPs, and portfolio."
      footer={
        <span className="text-ink-muted">
          New to FutureFund.in?{" "}
          <Link
            href="/register"
            className="font-medium text-ink hover:text-green-600"
          >
            Create an account
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TextField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          error={errors.email}
        />
        <div>
          <TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            error={errors.password}
          />
          <Link
            href="/forgot-password"
            className="inline-block mt-2 text-xs font-medium text-ink-muted hover:text-green-600"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          variant="primary"
          type="submit"
          className="w-full justify-center mt-1"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Log In"}
          {!submitting && <LogIn size={15} />}
        </Button>
      </form>
    </AuthLayout>
  );
}
