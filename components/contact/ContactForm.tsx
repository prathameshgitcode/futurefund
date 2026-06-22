"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { TextField } from "@/components/ui/TextField";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validation/contactSchema";
import { saveLead } from "@/lib/leads/leadStore";

const EMPTY_FORM: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  inquiryType: "new_sip",
  message: "",
};

export function ContactForm() {
  const { dict } = useTranslation();
  const t = dict.contact;

  const [form, setForm] = useState<ContactFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    saveLead({
      source: "contact_form",
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      details: { inquiryType: form.inquiryType, message: form.message },
    });
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-(--radius-card) border border-border bg-surface p-8 sm:p-10 flex flex-col items-center text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 mb-4">
          <CheckCircle2 size={24} />
        </div>
        <p className="text-sm text-ink-muted max-w-sm mb-6">{t.submitted}</p>
        <Button
          variant="outline"
          onClick={() => {
            setForm(EMPTY_FORM);
            setSubmitted(false);
          }}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-(--radius-card) border border-border bg-surface p-5 sm:p-8">
      <h2 className="text-xl font-bold mb-6">{t.formTitle}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField
            label={t.fullName}
            placeholder={t.fullNamePlaceholder}
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            error={errors.fullName}
          />
          <TextField
            label={t.email}
            type="email"
            placeholder={t.emailPlaceholder}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <TextField
            label={t.phone}
            placeholder={t.phonePlaceholder}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            error={errors.phone}
          />
          <SelectField
            label={t.inquiryType}
            value={form.inquiryType}
            onChange={(e) =>
              update(
                "inquiryType",
                e.target.value as ContactFormValues["inquiryType"],
              )
            }
            options={[
              { value: "new_sip", label: t.inquiryNewSip },
              { value: "portfolio_review", label: t.inquiryPortfolioReview },
              { value: "general", label: t.inquiryGeneral },
              { value: "support", label: t.inquirySupport },
            ]}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink mb-2">
            {t.message}
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={t.messagePlaceholder}
            className="focus-ring w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm placeholder:text-ink-soft resize-none"
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>
          )}
        </div>
        <Button
          variant="primary"
          type="submit"
          className="w-fit"
          disabled={submitting}
        >
          {submitting ? t.submitting : t.submit}
          {!submitting && <Send size={14} />}
        </Button>
      </form>
    </div>
  );
}
