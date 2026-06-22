"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SITE, whatsappLink } from "@/constants/site";

export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-surface border border-border rounded-2xl shadow-xl p-5 w-64"
              >
                <p className="text-sm font-semibold text-ink mb-1">
                  Talk to an Expert
                </p>
                <p className="text-xs text-ink-muted mb-4 leading-relaxed">
                  Get a free SIP consultation in under 10 minutes.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={whatsappLink("Hi, I'd like a free SIP consultation")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1fba59] transition-colors cursor-pointer"
                  >
                    <Image
                      src="/images/whatsapp.png"
                      alt="WhatsApp"
                      width={16}
                      height={16}
                      className="object-contain brightness-0 invert"
                    />
                    WhatsApp Us
                  </a>
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                  >
                    <Phone size={15} />
                    Call Now
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close chat" : "Chat with us"}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            {!open && (
              <>
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold ring-2 ring-white">
                  1
                </span>
              </>
            )}
            <AnimatePresence mode="wait">
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Image
                    src="/images/whatsapp.png"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="object-contain brightness-0 invert"
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
