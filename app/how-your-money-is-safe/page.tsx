"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Landmark,
  Building2,
  FileLock2,
  Eye,
  ArrowDown,
  CheckCircle2,
  UserCheck,
  Wallet,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LinkButton } from "@/components/ui/Button";
import { AmfiBadge } from "@/components/ui/AmfiBadge";
import { useTranslation } from "@/lib/i18n/I18nProvider";

const FLOW_ICONS = [Wallet, Building2, FileLock2, Landmark];
const FLOW_ACCENTS = [
  "bg-green-600",
  "bg-blue-600",
  "bg-violet-600",
  "bg-amber-500",
];
const ASSURANCE_ICONS = [UserCheck, Eye, ShieldCheck];

export default function MoneySafetyPage() {
  const { dict } = useTranslation();
  const t = dict.moneyIsSafe;

  const FLOW = [
    {
      icon: FLOW_ICONS[0],
      title: t.step1Title,
      desc: t.step1Desc,
      accent: FLOW_ACCENTS[0],
    },
    {
      icon: FLOW_ICONS[1],
      title: t.step2Title,
      desc: t.step2Desc,
      accent: FLOW_ACCENTS[1],
    },
    {
      icon: FLOW_ICONS[2],
      title: t.step3Title,
      desc: t.step3Desc,
      accent: FLOW_ACCENTS[2],
    },
    {
      icon: FLOW_ICONS[3],
      title: t.step4Title,
      desc: t.step4Desc,
      accent: FLOW_ACCENTS[3],
    },
  ];

  const ASSURANCES = [
    { icon: ASSURANCE_ICONS[0], title: t.trust1Title, desc: t.trust1Desc },
    { icon: ASSURANCE_ICONS[1], title: t.trust2Title, desc: t.trust2Desc },
    { icon: ASSURANCE_ICONS[2], title: t.trust3Title, desc: t.trust3Desc },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="container-page pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-600 mb-6">
                <ShieldCheck size={32} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-4 leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-base text-ink-muted max-w-xl leading-relaxed">
                {t.heroSubtitle}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative rounded-3xl overflow-hidden aspect-4/3 hidden md:block"
            >
              <Image
                src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=700&h=525&fit=crop&q=80"
                alt="Secure investment vault representing mutual fund safety"
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
                  <ShieldCheck size={20} className="text-green-600 shrink-0" />
                  <span className="text-sm font-semibold text-ink">
                    SEBI Regulated · 100% Safe
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Flow diagram */}
        <section className="container-page pb-12 max-w-2xl">
          <div className="flex flex-col items-center">
            {FLOW.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="w-full"
              >
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${step.accent} text-white`}
                  >
                    <step.icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-ink-soft">
                        {t.stepPrefix} {i + 1}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-ink">{step.title}</h3>
                    <p className="text-xs text-ink-muted leading-relaxed mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
                {i < FLOW.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown size={18} className="text-ink-soft" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-5 flex items-center gap-3"
          >
            <CheckCircle2 size={22} className="text-green-600 shrink-0" />
            <p className="text-sm text-green-800 leading-relaxed">
              {t.noticeText}
            </p>
          </motion.div>
        </section>

        {/* Assurances */}
        <section className="container-page pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ASSURANCES.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 mb-4">
                  <a.icon size={19} />
                </div>
                <h3 className="text-sm font-bold text-ink mb-2">{a.title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Verify + CTA */}
        <section className="container-page pb-16 max-w-2xl">
          <AmfiBadge variant="card" className="mb-6" />
          <div className="rounded-2xl bg-ink p-8 text-center text-white">
            <h2 className="text-xl font-bold mb-2">{t.ctaTitle}</h2>
            <p className="text-sm text-white/60 max-w-md mx-auto mb-6">
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <LinkButton href="/contact" variant="mint" size="lg">
                {t.bookCall}
              </LinkButton>
              <LinkButton
                href="/sebi-disclaimer"
                variant="outline"
                size="lg"
                className="border-white/25! text-white! hover:bg-white/10!"
              >
                {t.sebiDisclosures}
              </LinkButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
