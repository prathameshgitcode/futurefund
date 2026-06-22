"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle2, Lock } from "lucide-react";
import { saveLead } from "@/lib/leads/leadStore";

interface EmailCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (email: string) => void;
  resultSummary?: string;
}

export function EmailCaptureModal({
  open,
  onClose,
  onCapture,
  resultSummary,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    saveLead({
      source: "calculator_email",
      email,
      details: resultSummary ? { plan: resultSummary } : undefined,
    });
    setSubmitted(true);
    setTimeout(() => {
      onCapture(email);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
          >
            {/* Gradient header */}
            <div className="relative bg-linear-to-br from-[#0f172a] to-[#1a3a1a] px-7 pt-8 pb-10 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-green-400"
                    style={{
                      width: 80 + i * 50,
                      height: 80 + i * 50,
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                  />
                ))}
              </div>
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/20 mx-auto mb-4">
                  <Mail size={26} className="text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">
                  Get this plan emailed to you
                </h2>
                {resultSummary && (
                  <p className="text-sm text-white/60 mb-1">{resultSummary}</p>
                )}
                <p className="text-xs text-white/45 leading-relaxed">
                  Free · No spam · Your plan + expert insights delivered
                  instantly
                </p>
              </div>
            </div>

            {/* Bump */}
            <div className="relative -mt-5 bg-white rounded-t-[28px] px-7 pt-6 pb-7">
              <button
                onClick={onClose}
                className="absolute top-4 right-5 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={14} />
              </button>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-4 text-center"
                >
                  <CheckCircle2 size={40} className="text-green-500" />
                  <p className="font-semibold text-gray-800">
                    Plan sent! Check your inbox.
                  </p>
                  <p className="text-xs text-gray-500">
                    Revealing your full results now…
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      Your email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      autoFocus
                    />
                    {error && (
                      <p className="mt-1.5 text-xs text-red-500">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#0f172a] py-3.5 text-sm font-bold text-white hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Mail size={15} />
                    Send My Free Plan →
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer text-center"
                  >
                    Skip — just show me the results
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                    <Lock size={9} />
                    <span>Your data is secure. We never share your email.</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
