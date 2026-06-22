"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { LinkButton } from "@/components/ui/Button";

export function PathToWealthSection() {
  const { dict } = useTranslation();

  const steps = [
    {
      number: 1,
      title: "Goal Identification",
      desc: "Use our smart tool to figure out exactly how much you need to save for your specific life goals.",
    },
    {
      number: 2,
      title: "Portfolio Mapping",
      desc: "We select a balanced mix of equity and debt funds matched to your risk profile and timeline.",
    },
    {
      number: 3,
      title: "Auto-Invest & Track",
      desc: "Setup your mandate and watch your wealth grow with monthly tracking and rebalancing advice.",
    },
  ];

  return (
    <section className="container-page py-4">
      <div className="rounded-(--radius-card) bg-navy px-6 py-12 sm:px-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-10">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-10">{dict.home.pathTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex items-start gap-4 text-left"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint-400 text-navy font-semibold text-sm">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center lg:text-left">
              <LinkButton href="/quiz" variant="mint" size="lg">
                {dict.home.pathStartNow}
              </LinkButton>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden aspect-4/3 hidden lg:block"
          >
            <Image
              src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=700&h=525&fit=crop&q=80"
              alt="A person planning their financial path to wealth"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3">
                <div className="text-xs text-white/70 mb-0.5">
                  Average time to first SIP
                </div>
                <div className="text-xl font-bold text-white">
                  Under 3 minutes
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
