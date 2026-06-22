"use client";

import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Accordion } from "@/components/ui/Accordion";
import { HOME_FAQS } from "@/constants/faqs";

export function FAQSection() {
  const { dict } = useTranslation();

  return (
    <section className="container-page py-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        {dict.home.faqTitle}
      </h2>
      <div className="max-w-2xl mx-auto">
        <Accordion items={HOME_FAQS} />
      </div>
    </section>
  );
}
