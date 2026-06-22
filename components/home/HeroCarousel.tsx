"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 0,
    tag: "Power of SIP",
    headline: "₹5,000/month",
    becomes: "→  ₹1.02 Crore",
    detail: "in 20 years at 12% p.a. — the magic of compounding",
    cta: { label: "Start Your SIP Today", href: "/quiz" },
    accentColor: "#22c55e",
    bgFrom: "#0f172a",
    bgTo: "#1a2e1a",
    visual: <SipGrowthVisual />,
  },
  {
    id: 1,
    tag: "Beat Inflation",
    headline: "SIP: 14.2% avg returns",
    becomes: "vs Bank FD: 6.8%",
    detail: "Equity mutual funds have historically beaten inflation by 2–3x",
    cta: { label: "Compare Investments", href: "/comparison" },
    accentColor: "#f59e0b",
    bgFrom: "#1a1205",
    bgTo: "#2a1f05",
    visual: <ComparisonVisual />,
  },
  {
    id: 2,
    tag: "Child's Education",
    headline: "₹50 Lakh corpus",
    becomes: "in just 15 years",
    detail: "invest ₹10,500/month today — secure their tomorrow",
    cta: { label: "Plan for Education", href: "/calculators/child-education" },
    accentColor: "#a78bfa",
    bgFrom: "#0c0a1e",
    bgTo: "#1a1040",
    visual: <EducationVisual />,
  },
  {
    id: 3,
    tag: "Save Tax + Grow Wealth",
    headline: "ELSS Dual Benefit",
    becomes: "Save ₹46,800 in tax",
    detail: "under Section 80C — with the lowest 3-year lock-in",
    cta: { label: "Calculate Tax Savings", href: "/calculators/tax-saver" },
    accentColor: "#10b981",
    bgFrom: "#011c12",
    bgTo: "#052c1c",
    visual: <ElssVisual />,
  },
  {
    id: 4,
    tag: "Trusted Advisor",
    headline: "500+ Happy Clients",
    becomes: "₹2,000 Crore+ managed",
    detail: "15 years · SEBI registered · 4.9/5 client rating",
    cta: { label: "Book Free Consultation", href: "/contact" },
    accentColor: "#f472b6",
    bgFrom: "#1a0533",
    bgTo: "#2a0845",
    visual: <TrustVisual />,
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
};

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = SLIDES[current];

  return (
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: `linear-gradient(135deg, ${slide.bgFrom}, ${slide.bgTo})`,
      }}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8"
        >
          {/* Tag */}
          <div className="flex items-center justify-between">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{
                background: `${slide.accentColor}22`,
                color: slide.accentColor,
              }}
            >
              {slide.tag}
            </motion.span>
            <span className="text-[10px] text-white/30">
              {current + 1} / {SLIDES.length}
            </span>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex-1 flex items-center justify-center py-4"
          >
            {slide.visual}
          </motion.div>

          {/* Text */}
          <div className="space-y-1.5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl font-bold text-white leading-tight"
            >
              {slide.headline}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.27 }}
              className="text-base sm:text-lg font-semibold"
              style={{ color: slide.accentColor }}
            >
              {slide.becomes}
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34 }}
              className="text-xs text-white/55 leading-relaxed max-w-full sm:max-w-[220px]"
            >
              {slide.detail}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <Link
                href={slide.cta.href}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:opacity-90 hover:scale-105 active:scale-95 cursor-pointer"
                style={{ background: slide.accentColor, color: "#000" }}
              >
                {slide.cta.label} →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full cursor-pointer"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background:
                i === current ? slide.accentColor : "rgba(255,255,255,0.3)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={14} className="text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={14} className="text-white" />
      </button>

      {/* Progress bar */}
      {!paused && (
        <motion.div
          key={`bar-${current}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
          style={{ background: slide.accentColor }}
        />
      )}
    </div>
  );
}

/* ── Slide Visuals ── */

function SipGrowthVisual() {
  const bars = [20, 32, 48, 58, 72, 88, 102];
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={i * 27 + 4}
          y={120 - h}
          width={20}
          height={h}
          rx={4}
          fill={
            i === bars.length - 1
              ? "#22c55e"
              : `rgba(34,197,94,${0.3 + i * 0.1})`
          }
          initial={{ height: 0, y: 120 }}
          animate={{ height: h, y: 120 - h }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
        />
      ))}
      <motion.text
        x={156}
        y={115 - 102}
        fill="#22c55e"
        fontSize="9"
        fontWeight="700"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        ₹1.02Cr
      </motion.text>
      <motion.text
        x={4}
        y={118}
        fill="rgba(255,255,255,0.4)"
        fontSize="7"
        textAnchor="start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Year 1
      </motion.text>
      <motion.text
        x={155}
        y={118}
        fill="rgba(255,255,255,0.4)"
        fontSize="7"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Year 20
      </motion.text>
    </svg>
  );
}

function ComparisonVisual() {
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
      {/* SIP bar */}
      <motion.rect
        x={30}
        y={120 - 95}
        width={60}
        height={95}
        rx={6}
        fill="#f59e0b"
        initial={{ height: 0, y: 120 }}
        animate={{ height: 95, y: 120 - 95 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      {/* FD bar */}
      <motion.rect
        x={115}
        y={120 - 44}
        width={60}
        height={44}
        rx={6}
        fill="rgba(245,158,11,0.3)"
        initial={{ height: 0, y: 120 }}
        animate={{ height: 44, y: 120 - 44 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      />
      {/* Labels */}
      <text
        x={60}
        y={118}
        fill="rgba(255,255,255,0.6)"
        fontSize="8"
        textAnchor="middle"
      >
        Mutual Fund
      </text>
      <text
        x={145}
        y={118}
        fill="rgba(255,255,255,0.6)"
        fontSize="8"
        textAnchor="middle"
      >
        Bank FD
      </text>
      <motion.text
        x={60}
        y={120 - 98}
        fill="#f59e0b"
        fontSize="10"
        fontWeight="700"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        14.2%
      </motion.text>
      <motion.text
        x={145}
        y={120 - 47}
        fill="rgba(245,158,11,0.7)"
        fontSize="10"
        fontWeight="700"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        6.8%
      </motion.text>
    </svg>
  );
}

function EducationVisual() {
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
      {/* Graduation cap */}
      <motion.polygon
        points="100,30 140,50 100,70 60,50"
        fill="rgba(167,139,250,0.8)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "100px 50px" }}
      />
      <motion.rect
        x={94}
        y={50}
        width={12}
        height={30}
        rx={3}
        fill="rgba(167,139,250,0.6)"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.4 }}
        style={{ transformOrigin: "100px 50px" }}
      />
      {/* Amount */}
      <motion.text
        x={100}
        y={100}
        fill="#a78bfa"
        fontSize="14"
        fontWeight="800"
        textAnchor="middle"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        ₹50 Lakh
      </motion.text>
      <motion.text
        x={100}
        y={113}
        fill="rgba(255,255,255,0.4)"
        fontSize="8"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        secured in 15 years
      </motion.text>
      {/* Stars */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={60 + i * 40}
          cy={22}
          r={3}
          fill="rgba(167,139,250,0.5)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}

function ElssVisual() {
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
      {/* Shield */}
      <motion.path
        d="M100,10 L140,30 L140,70 Q140,95 100,110 Q60,95 60,70 L60,30 Z"
        fill="rgba(16,185,129,0.15)"
        stroke="#10b981"
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* ₹ symbol */}
      <motion.text
        x={100}
        y={68}
        fill="#10b981"
        fontSize="28"
        fontWeight="900"
        textAnchor="middle"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ transformOrigin: "100px 68px" }}
      >
        ₹
      </motion.text>
      {/* Tax saved label */}
      <motion.text
        x={100}
        y={118}
        fill="rgba(255,255,255,0.5)"
        fontSize="8"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Save ₹46,800 in taxes this year
      </motion.text>
      {/* Sparkles */}
      {[
        [30, 25],
        [170, 25],
        [155, 75],
        [45, 75],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={3}
          fill="#10b981"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            delay: 0.8 + i * 0.15,
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </svg>
  );
}

function TrustVisual() {
  return (
    <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
      {/* Medal circle */}
      <motion.circle
        cx={100}
        cy={55}
        r={36}
        fill="rgba(244,114,182,0.1)"
        stroke="#f472b6"
        strokeWidth={2}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      />
      {/* Star */}
      <motion.text
        x={100}
        y={63}
        fill="#f472b6"
        fontSize="26"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        ⭐
      </motion.text>
      {/* Stats */}
      <motion.text
        x={100}
        y={103}
        fill="#f472b6"
        fontSize="10"
        fontWeight="700"
        textAnchor="middle"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        500+ Clients · 15+ Years
      </motion.text>
      <motion.text
        x={100}
        y={116}
        fill="rgba(255,255,255,0.4)"
        fontSize="8"
        textAnchor="middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        SEBI Registered · 4.9/5 Rating
      </motion.text>
      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.circle
          key={i}
          cx={100 + 46 * Math.cos((deg * Math.PI) / 180)}
          cy={55 + 46 * Math.sin((deg * Math.PI) / 180)}
          r={3}
          fill="rgba(244,114,182,0.5)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 + i * 0.07 }}
        />
      ))}
    </svg>
  );
}
