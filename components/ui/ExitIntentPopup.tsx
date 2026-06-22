"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, CalendarCheck, Gift } from "lucide-react";

const STORAGE_KEY = "sg_exit_intent_shown";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (triggered || dismissed) return;
      if (e.clientY < 8) {
        triggered = true;
        setVisible(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    };

    const handleBlur = () => {
      if (triggered || dismissed) return;
      triggered = true;
      setVisible(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("blur", handleBlur);
    }, 6000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", handleBlur);
    };
  }, [dismissed]);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 280 }}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Dark top section */}
            <div className="bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f2a1a] px-7 pt-8 pb-12 text-center relative overflow-hidden">
              {/* Decorative rings */}
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full border border-green-500/20" />
              <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full border border-green-500/10" />

              <button
                onClick={dismiss}
                className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={13} className="text-white" />
              </button>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20 mx-auto mb-4">
                <Gift size={26} className="text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2 leading-snug">
                Wait! Don&apos;t leave empty-handed
              </h2>
              <p className="text-sm text-white/60 leading-relaxed">
                Book a{" "}
                <strong className="text-white">
                  FREE 30-minute consultation
                </strong>{" "}
                with our SIP expert before you go
              </p>
            </div>

            {/* White bottom */}
            <div className="relative -mt-5 bg-white rounded-t-[24px] px-7 pb-7 pt-6 flex flex-col gap-3">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <CalendarCheck
                  size={16}
                  className="text-green-500 shrink-0 mt-0.5"
                />
                <span>
                  Get a personalised SIP plan built around your goals — no
                  commitments, no pressure
                </span>
              </div>

              <Link
                href="/contact"
                onClick={dismiss}
                className="block w-full text-center rounded-xl bg-[#0f172a] py-3.5 text-sm font-bold text-white hover:bg-black transition-colors cursor-pointer"
              >
                Book My Free Session →
              </Link>
              <button
                onClick={dismiss}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-center"
              >
                No thanks, I&apos;ll figure it out myself
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
