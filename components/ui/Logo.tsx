"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface LogoProps {
  /** "full" = icon + wordmark; "icon" = icon only */
  variant?: "full" | "icon";
  className?: string;
  href?: string;
}

/**
 * FutureFund.in logo.
 *
 * The mark: a stylised upward bar chart where the final bar shoots into
 * an arrowhead — symbolising wealth growth. The bars draw in on first
 * render via SVG pathLength animation, then the arrow pulses subtly.
 *
 * Colour system:
 *   • Bars       → green-600  (#16a34a)
 *   • Arrow tip  → green-400  (#4ade80)  — slightly lighter for contrast
 *   • Text       → inherits (works on light & dark backgrounds)
 */
export function Logo({
  variant = "full",
  className = "",
  href = "/",
}: LogoProps) {
  const mark = (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* ── Bar 1 (shortest, leftmost) ── */}
      <motion.rect
        x="2"
        y="22"
        width="6"
        height="10"
        rx="1.5"
        fill="#16a34a"
        initial={{ scaleY: 0, originY: 1 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "5px 32px" }}
      />
      {/* ── Bar 2 ── */}
      <motion.rect
        x="10"
        y="16"
        width="6"
        height="16"
        rx="1.5"
        fill="#16a34a"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "13px 32px" }}
      />
      {/* ── Bar 3 ── */}
      <motion.rect
        x="18"
        y="10"
        width="6"
        height="22"
        rx="1.5"
        fill="#16a34a"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "21px 32px" }}
      />

      {/* ── Rising arrow on top of bar 3 ── */}
      {/* Arrow shaft: diagonal line going up-right */}
      <motion.line
        x1="22"
        y1="10"
        x2="32"
        y2="2"
        stroke="#4ade80"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Arrow head */}
      <motion.path
        d="M32 2 L26 2 M32 2 L32 8"
        stroke="#4ade80"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Subtle pulse dot on arrowhead tip */}
      <motion.circle
        cx="32"
        cy="2"
        r="2.5"
        fill="#4ade80"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }}
        transition={{ duration: 0.5, delay: 0.95 }}
      />
    </svg>
  );

  const wordmark = (
    <span className="flex flex-col leading-none">
      <motion.span
        className="text-[17px] font-black tracking-tight text-ink"
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        Future
        <motion.span
          className="text-green-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          Fund
        </motion.span>
      </motion.span>
      <motion.span
        className="text-[9px] font-semibold tracking-widest text-ink-soft uppercase"
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.55 }}
      >
        .in
      </motion.span>
    </span>
  );

  const inner = (
    <motion.span
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      whileHover="hover"
    >
      {/* Icon wrapper — lifts slightly on hover */}
      <motion.span
        variants={{ hover: { y: -2, rotate: 2 } }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {mark}
      </motion.span>
      {variant === "full" && wordmark}
    </motion.span>
  );

  return (
    <Link href={href} aria-label="FutureFund.in — Home">
      {inner}
    </Link>
  );
}
