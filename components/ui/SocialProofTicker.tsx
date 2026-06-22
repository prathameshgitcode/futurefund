"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp } from "lucide-react";

const PROOF_ITEMS = [
  {
    name: "Priya M.",
    city: "Mumbai",
    action: "started a ₹5,000/mo SIP",
    time: "2 min ago",
  },
  {
    name: "Rahul K.",
    city: "Bengaluru",
    action: "completed the risk quiz",
    time: "4 min ago",
  },
  {
    name: "Sneha T.",
    city: "Pune",
    action: "booked a free consultation",
    time: "7 min ago",
  },
  {
    name: "Amit S.",
    city: "Delhi",
    action: "started a ₹10,000/mo SIP",
    time: "9 min ago",
  },
  {
    name: "Deepa R.",
    city: "Chennai",
    action: "reviewed their portfolio",
    time: "12 min ago",
  },
  {
    name: "Kiran P.",
    city: "Hyderabad",
    action: "started a ₹3,000/mo SIP",
    time: "14 min ago",
  },
  {
    name: "Aisha N.",
    city: "Ahmedabad",
    action: "calculated retirement corpus",
    time: "16 min ago",
  },
];

export function SocialProofTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % PROOF_ITEMS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  const item = PROOF_ITEMS[index];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -60, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          key={index}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden sm:flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-lg max-w-[300px]"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
            <TrendingUp size={15} className="text-green-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink truncate">
              {item.name} · {item.city}
            </p>
            <p className="text-[10px] text-ink-muted leading-snug">
              {item.action}
            </p>
            <p className="text-[10px] text-ink-soft">{item.time}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
