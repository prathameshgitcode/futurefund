"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Check, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { AmfiBadge } from "@/components/ui/AmfiBadge";
import { SITE } from "@/constants/site";
import { saveLead } from "@/lib/leads/leadStore";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  columns?: FooterColumn[];
  showNewsletter?: boolean;
  showDisclaimer?: boolean;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "SIP Calculator", href: "/calculators/sip" },
      { label: "Mutual Fund Screener", href: "/funds" },
      { label: "Compare Funds", href: "/fund-comparison" },
      { label: "My Watchlist", href: "/watchlist" },
      { label: "Direct MF Platform", href: "/dashboard" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "SIP Health Check", href: "/sip-health-check" },
      { label: "Pause Simulator", href: "/sip-pause-simulator" },
      { label: "Start a SIP", href: "/start-sip" },
      { label: "How Your Money is Safe", href: "/how-your-money-is-safe" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "SEBI Disclaimers", href: "/sebi-disclaimer" },
      { label: "Investor Charter", href: "/investor-charter" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const linkHoverVariants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { duration: 0.18 } },
};

export function Footer({
  columns = DEFAULT_COLUMNS,
  showNewsletter = true,
  showDisclaimer = true,
}: FooterProps) {
  const { dict } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    saveLead({ source: "newsletter", email: newsletterEmail });
    setSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <footer className="border-t border-border bg-surface-2 overflow-hidden">
      {/* Animated top wave divider */}
      <div className="relative h-16 overflow-hidden -mb-1">
        <motion.svg
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.path
            d="M0 32C240 0 480 64 720 32C960 0 1200 64 1440 32V64H0V32Z"
            fill="currentColor"
            className="text-surface-2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      <div className="container-page py-10 sm:py-14">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12"
        >
          {/* Brand column */}
          <motion.div
            variants={itemVariants}
            className="sm:col-span-2 md:col-span-4"
          >
            <div className="mb-3">
              <Logo />
            </div>
            <p className="text-sm leading-relaxed text-ink-muted max-w-xs">
              {dict.footer.tagline}
            </p>

            {/* Animated social icons */}
            <div className="flex items-center gap-3 mt-5">
              {[
                {
                  href: SITE.social.whatsapp,
                  label: "WhatsApp",
                  img: "/images/whatsapp.png",
                },
                {
                  href: SITE.social.instagram,
                  label: "Instagram",
                  img: "/images/instagram.png",
                },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-full border border-border p-2.5 bg-surface hover:bg-ink hover:border-ink transition-colors"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Image
                    src={social.img}
                    alt={social.label}
                    width={15}
                    height={15}
                    className="object-contain"
                  />
                </motion.a>
              ))}
              <motion.a
                href={`mailto:${SITE.email}`}
                aria-label="Email"
                className="rounded-full border border-border p-2.5 bg-surface hover:bg-ink hover:border-ink hover:text-white transition-colors"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.15, rotate: -8 }}
                whileTap={{ scale: 0.92 }}
              >
                <Mail size={15} />
              </motion.a>
            </div>

            {/* Animated stat pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {[
                { label: "50k+ Clients" },
                { label: "₹2000 Cr+ AUM" },
                { label: "15+ Years" },
              ].map((pill, i) => (
                <motion.span
                  key={pill.label}
                  className="inline-flex items-center rounded-full bg-green-50 border border-green-100 px-3 py-1 text-[11px] font-semibold text-green-700"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  {pill.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          {columns.map((col) => (
            <motion.div
              key={col.title}
              variants={itemVariants}
              className="md:col-span-2"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-4">
                {col.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <motion.div
                      variants={linkHoverVariants}
                      initial="initial"
                      whileHover="hover"
                      className="inline-flex items-center gap-1"
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-ink-muted hover:text-green-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                      <motion.span
                        className="text-green-600 opacity-0"
                        variants={{
                          initial: { opacity: 0 },
                          hover: { opacity: 1 },
                        }}
                      >
                        <ArrowUpRight size={11} />
                      </motion.span>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          {showNewsletter && (
            <motion.div
              variants={itemVariants}
              className="sm:col-span-2 md:col-span-4"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-4">
                {dict.footer.stayUpdated}
              </div>
              <p className="text-sm text-ink-muted mb-3 leading-relaxed">
                {dict.footer.newsletterCta}
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                  >
                    <Check size={15} />
                  </motion.span>
                  You&apos;re subscribed! Check your inbox.
                </motion.div>
              ) : (
                <form
                  className="flex items-center gap-2"
                  onSubmit={handleNewsletter}
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={dict.footer.emailPlaceholder}
                    className="focus-ring flex-1 min-w-0 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm placeholder:text-ink-soft"
                  />
                  <motion.button
                    type="submit"
                    className="focus-ring rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white hover:bg-green-600 transition-colors cursor-pointer shrink-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    →
                  </motion.button>
                </form>
              )}

              <div className="mt-4">
                <AmfiBadge variant="compact" />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Disclaimer */}
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 rounded-2xl border border-border bg-surface p-4"
          >
            <p className="text-[11px] leading-relaxed text-ink-soft">
              {dict.footer.disclaimer}
            </p>
          </motion.div>
        )}

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-soft"
        >
          <span>{dict.footer.copyright}</span>
          <motion.div
            className="flex items-center gap-1.5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span>All systems operational</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
