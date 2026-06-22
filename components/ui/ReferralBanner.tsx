"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "sg_referral_dismissed";

export function ReferralBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "1");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="bg-linear-to-r from-[#0f172a] via-[#1a3a1a] to-[#0f172a] py-2.5 px-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Gift size={14} className="text-green-400 shrink-0" />
                <p className="text-xs text-white/80 truncate">
                  <span className="text-green-400 font-semibold">
                    🎁 Refer a friend
                  </span>
                  {" — "}
                  both of you get{" "}
                  <strong className="text-white">₹500 advisory credit</strong>
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="text-[11px] font-semibold text-green-400 hover:text-green-300 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Refer Now →
                </Link>
                <button
                  onClick={dismiss}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Dismiss"
                >
                  <X size={10} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
