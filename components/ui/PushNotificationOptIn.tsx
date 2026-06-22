"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, TrendingUp } from "lucide-react";

const STORAGE_KEY = "sg_push_prompt_shown";

export function PushNotificationOptIn() {
  const [visible, setVisible] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") return;

    const t = setTimeout(() => setVisible(true), 20000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "dismissed");
  };

  const handleAllow = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setGranted(true);
        localStorage.setItem(STORAGE_KEY, "granted");
        setTimeout(() => setVisible(false), 2500);
      } else {
        dismiss();
      }
    } catch {
      dismiss();
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="fixed bottom-24 left-4 z-40 w-72 rounded-2xl bg-white border border-gray-100 shadow-2xl overflow-hidden"
        >
          <div className="bg-linear-to-r from-[#0f172a] to-[#1a3050] p-4 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500/20">
              <Bell size={17} className="text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white leading-snug">
                {granted ? "You're all set! 🎉" : "Get NAV alerts & insights"}
              </p>
              <p className="text-[10px] text-white/55 mt-0.5 leading-relaxed">
                {granted
                  ? "We'll notify you of important market moves"
                  : "Be first to know when your funds hit key levels"}
              </p>
            </div>
            <button
              onClick={dismiss}
              className="shrink-0 text-white/40 hover:text-white/70 transition-colors cursor-pointer mt-0.5"
            >
              <X size={13} />
            </button>
          </div>

          {!granted && (
            <div className="p-3 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <TrendingUp size={10} className="text-green-500" />
                <span>Daily NAV updates · Market alerts · SIP reminders</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAllow}
                  className="flex-1 rounded-lg bg-[#0f172a] py-2 text-xs font-bold text-white hover:bg-black transition-colors cursor-pointer"
                >
                  Allow Notifications
                </button>
                <button
                  onClick={dismiss}
                  className="flex-1 rounded-lg bg-gray-100 py-2 text-xs font-medium text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Not now
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
