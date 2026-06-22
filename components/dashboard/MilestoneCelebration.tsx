"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PartyPopper, X } from "lucide-react";
import { whatsappLink } from "@/constants/site";

/**
 * Celebratory milestone banner shown on the dashboard. In a real build this
 * would fire when a portfolio crosses a round figure (₹1L, ₹5L, ₹10L…). Here
 * it demonstrates the moment with a confetti-style entrance, once per session.
 */

const SESSION_KEY = "sg_milestone_shown";

interface MilestoneCelebrationProps {
  milestoneLabel?: string; // e.g. "₹14.5 Lakhs"
  message?: string;
}

export function MilestoneCelebration({
  milestoneLabel = "₹14.5 Lakhs",
  message = "Your portfolio just crossed a new milestone. Consistency is paying off!",
}: MilestoneCelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          className="relative overflow-hidden rounded-2xl bg-linear-to-r from-green-600 to-emerald-500 p-5 text-white mb-5"
        >
          {/* Confetti dots */}
          {[...Array(14)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 80, opacity: [0, 1, 0] }}
              transition={{
                duration: 1.6,
                delay: i * 0.08,
                repeat: Infinity,
                repeatDelay: 1.4,
              }}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                left: `${(i / 14) * 100}%`,
                background: ["#fff", "#bbf7d0", "#fde68a"][i % 3],
              }}
            />
          ))}

          <div className="relative flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <PartyPopper size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold">
                🎉 You crossed {milestoneLabel}!
              </h3>
              <p className="text-xs text-white/85 mt-0.5 leading-relaxed">
                {message}
              </p>
              <a
                href={whatsappLink(
                  `I just crossed ${milestoneLabel} in my SIP portfolio with FutureFund.in! 🎉`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 rounded-full bg-white/20 px-3.5 py-1.5 text-xs font-semibold hover:bg-white/30 transition-colors cursor-pointer"
              >
                <Image
                  src="/images/whatsapp.png"
                  alt=""
                  width={12}
                  height={12}
                  className="object-contain brightness-0 invert"
                />{" "}
                Share the milestone
              </a>
            </div>
            <button
              onClick={dismiss}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
