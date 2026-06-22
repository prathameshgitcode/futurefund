"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { TESTIMONIALS } from "@/constants/testimonials";

export function TestimonialsSection() {
  const { dict } = useTranslation();

  return (
    <section className="container-page py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">
          {dict.home.testimonialsTitle}
        </h2>
        <p className="text-sm text-ink-muted">
          Trusted by 500+ investors across India · 4.9/5 average rating
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: i * 0.09 }}
            whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(0,0,0,0.07)" }}
            className="rounded-2xl border border-border bg-surface p-6 flex flex-col"
          >
            {/* Stars */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={13}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="text-2xl font-serif text-green-600 leading-none">
                &rdquo;
              </span>
            </div>

            <p className="text-sm text-ink-muted leading-relaxed mb-5 flex-1">
              {t.quote}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              {t.photo ? (
                <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-700 shrink-0">
                  {t.initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-ink truncate">
                    {t.name}
                  </span>
                  {t.verified && (
                    <CheckCircle2
                      size={13}
                      className="text-green-500 shrink-0"
                    />
                  )}
                </div>
                <div className="text-xs text-ink-soft">
                  {t.role}
                  {t.city ? ` · ${t.city}` : ""}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
