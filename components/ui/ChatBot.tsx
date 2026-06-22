"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Send,
  ChevronDown,
  Bot,
  Sparkles,
  TrendingUp,
  Calculator,
  ShieldCheck,
  HelpCircle,
  Phone,
} from "lucide-react";
import { whatsappLink, SITE } from "@/constants/site";
import { saveLead } from "@/lib/leads/leadStore";

// ── Types ─────────────────────────────────────────────────────────────────────

type MessageRole = "bot" | "user";

interface Message {
  id: string;
  role: MessageRole;
  text: string;
  options?: QuickOption[];
  link?: { label: string; href: string };
}

interface QuickOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

// ── Knowledge base ────────────────────────────────────────────────────────────
// Maps user intents → bot responses + follow-up options.

const KB: Record<
  string,
  {
    text: string;
    options?: QuickOption[];
    link?: { label: string; href: string };
  }
> = {
  sip_basics: {
    text: "A SIP (Systematic Investment Plan) lets you invest a fixed amount every month in a mutual fund — as little as ₹500. You benefit from rupee-cost averaging and compounding over time. The earlier you start, the bigger the impact!",
    options: [
      { label: "How much should I invest?", value: "sip_amount" },
      { label: "Calculate my returns", value: "calculator" },
      { label: "Start a SIP today", value: "start_sip" },
    ],
  },
  sip_amount: {
    text: "As a rule of thumb: invest at least 20% of your take-home salary. Start where you're comfortable — even ₹1,000/month compounds to ₹23 lakh over 15 years at 12% CAGR. You can always increase your SIP annually.",
    options: [
      { label: "Use the SIP calculator", value: "calculator" },
      { label: "Talk to an advisor", value: "advisor" },
    ],
    link: { label: "Open SIP Calculator →", href: "/calculators/sip" },
  },
  calculator: {
    text: "Our free calculators show you exactly how your money grows — SIP, lump sum, retirement, tax-saving ELSS, and more. No sign-up needed!",
    options: [
      { label: "SIP Calculator", value: "goto_sip_calc" },
      { label: "Retirement Planner", value: "goto_retire" },
      { label: "SIP Pause Simulator", value: "goto_pause" },
    ],
    link: { label: "See all calculators →", href: "/calculators" },
  },
  goto_sip_calc: {
    text: "Opening the SIP Calculator for you!",
    link: { label: "SIP Calculator →", href: "/calculators/sip" },
    options: [{ label: "Talk to advisor", value: "advisor" }],
  },
  goto_retire: {
    text: "Our Retirement Planner factors in inflation and shows you exactly how much to invest today.",
    link: {
      label: "Retirement Planner →",
      href: "/calculators/retirement-planner",
    },
    options: [{ label: "Talk to advisor", value: "advisor" }],
  },
  goto_pause: {
    text: "Thinking of pausing your SIP? See the real cost before you do — it's often 3–5× more than the skipped amount.",
    link: { label: "Pause Simulator →", href: "/sip-pause-simulator" },
    options: [{ label: "Talk to advisor", value: "advisor" }],
  },
  start_sip: {
    text: "Starting a SIP takes under 3 minutes! You'll need your PAN, Aadhaar-linked mobile, and a bank account. Our advisor will guide you through every step — for free.",
    options: [
      { label: "Start the process now", value: "goto_start" },
      { label: "Talk to an advisor first", value: "advisor" },
    ],
    link: { label: "Start My SIP →", href: "/start-sip" },
  },
  goto_start: {
    text: "Great! Our onboarding takes about 3 minutes.",
    link: { label: "Begin Onboarding →", href: "/start-sip" },
    options: [],
  },
  kyc: {
    text: "KYC (Know Your Customer) is a one-time SEBI requirement. You'll need:\n• PAN card\n• Aadhaar-linked mobile number\n• Bank account for mandate\n\nOnce done, it's valid for all mutual fund investments forever.",
    options: [
      { label: "Is my money safe?", value: "safety" },
      { label: "Help me start", value: "advisor" },
    ],
  },
  safety: {
    text: "Your money goes directly from your bank to the AMC (fund house) — we never touch it. It's held by SEBI-regulated custodians and recorded by CAMS/KFintech. Even if a distributor closes down, your investments are completely safe.",
    options: [
      { label: "Learn more", value: "goto_safety" },
      { label: "Talk to advisor", value: "advisor" },
    ],
    link: {
      label: "How Your Money is Safe →",
      href: "/how-your-money-is-safe",
    },
  },
  goto_safety: {
    text: "We have a full explainer on the regulatory safeguards.",
    link: { label: "Read the Guide →", href: "/how-your-money-is-safe" },
    options: [{ label: "Talk to advisor", value: "advisor" }],
  },
  best_fund: {
    text: "The 'best fund' depends on your goal, risk appetite, and investment horizon. Generally:\n• Long-term wealth → Large/Flexi-cap equity funds\n• Tax saving → ELSS funds\n• Stability → Hybrid or debt funds\n\nTake our 2-minute quiz to get a personalised recommendation!",
    options: [
      { label: "Take the quiz", value: "goto_quiz" },
      { label: "Browse all funds", value: "goto_funds" },
      { label: "Talk to advisor", value: "advisor" },
    ],
  },
  goto_quiz: {
    text: "The quiz takes 2 minutes and gives you a personalised fund recommendation.",
    link: { label: "Take Investment Quiz →", href: "/quiz" },
    options: [],
  },
  goto_funds: {
    text: "Browse all SEBI-registered mutual funds, sorted by category and returns.",
    link: { label: "Explore Funds →", href: "/funds" },
    options: [{ label: "Compare funds", value: "goto_compare" }],
  },
  goto_compare: {
    text: "Compare up to 3 funds side by side — returns, NAV, and more.",
    link: { label: "Fund Comparison →", href: "/fund-comparison" },
    options: [],
  },
  tax: {
    text: "ELSS (Equity Linked Savings Scheme) mutual funds give you a tax deduction of up to ₹1.5 lakh per year under Section 80C, potentially saving ₹46,800 in tax at the 30% slab. They have a 3-year lock-in — the shortest among 80C instruments.",
    options: [
      { label: "Calculate my tax saving", value: "goto_elss" },
      { label: "Talk to advisor", value: "advisor" },
    ],
    link: { label: "ELSS Calculator →", href: "/calculators/elss-tax-saving" },
  },
  goto_elss: {
    text: "Our ELSS calculator shows you exactly how much tax you save.",
    link: { label: "ELSS Calculator →", href: "/calculators/elss-tax-saving" },
    options: [],
  },
  advisor: {
    text: `Our advisor ${SITE.advisor} (${SITE.advisorTitle}) offers free 30-minute consultations. No commitment, no sales pitch — just clear guidance.`,
    options: [
      { label: "WhatsApp now", value: "whatsapp" },
      { label: "Call now", value: "call" },
      { label: "Book a meeting", value: "goto_contact" },
    ],
  },
  whatsapp: {
    text: "Opening WhatsApp for you! Tell our advisor your goal and they'll set you up.",
    link: {
      label: "Chat on WhatsApp →",
      href: whatsappLink(
        "Hi, I'd like a free SIP consultation from FutureFund.in",
      ),
    },
    options: [],
  },
  call: {
    text: `Call us at ${SITE.phone}. We're available Mon–Fri, 9 AM–6 PM.`,
    link: { label: `Call ${SITE.phone}`, href: `tel:${SITE.phoneRaw}` },
    options: [{ label: "Book online instead", value: "goto_contact" }],
  },
  goto_contact: {
    text: "You can book a meeting or send us a message anytime.",
    link: { label: "Contact Us →", href: "/contact" },
    options: [],
  },
  health_check: {
    text: "The SIP Health Check scores your SIP strategy across 5 dimensions — consistency, step-up, diversification, market behaviour, and goal-linking. Takes under 60 seconds!",
    options: [{ label: "Take the health check", value: "goto_health" }],
    link: { label: "SIP Health Check →", href: "/sip-health-check" },
  },
  goto_health: {
    text: "Let's check how healthy your SIP really is!",
    link: { label: "Start Health Check →", href: "/sip-health-check" },
    options: [],
  },
};

// ── Intent detection ──────────────────────────────────────────────────────────

function detectIntent(input: string): string {
  const t = input.toLowerCase();
  if (
    /\bsip\b.*\bwhat\b|\bwhat\b.*\bsip\b|how.*sip.*work|explain.*sip|sip basics/.test(
      t,
    )
  )
    return "sip_basics";
  if (/how much.*invest|amount.*invest|minimum|₹|rupee/.test(t))
    return "sip_amount";
  if (/calculat|return|corpus|how much.*grow|project/.test(t))
    return "calculator";
  if (/start.*sip|begin.*invest|open.*sip|first.*sip/.test(t))
    return "start_sip";
  if (/kyc|pan|aadhaar|document|verify/.test(t)) return "kyc";
  if (/safe|secure|sebi|amfi|trust|regulated|money.*safe/.test(t))
    return "safety";
  if (/best fund|which fund|recommend|good fund|top fund/.test(t))
    return "best_fund";
  if (/tax|80c|elss|save.*tax|tax.*save|deduction/.test(t)) return "tax";
  if (/advisor|expert|help|consult|speak|talk|call|whatsapp|contact/.test(t))
    return "advisor";
  if (/health|score|check.*sip|sip.*check/.test(t)) return "health_check";
  if (/pause|stop.*sip|skip/.test(t)) return "goto_pause";
  if (/retire|retirement/.test(t)) return "goto_retire";
  if (/fund.*compare|compare.*fund/.test(t)) return "goto_compare";
  if (/fund.*list|mutual fund|browse.*fund/.test(t)) return "goto_funds";
  return "advisor";
}

// ── Greeting flow ─────────────────────────────────────────────────────────────

const GREETING: Message = {
  id: "greet",
  role: "bot",
  text: `Hi! I'm the FutureFund.in assistant 👋\n\nI can help you with SIP basics, fund recommendations, tax saving, and more. What would you like to know?`,
  options: [
    {
      label: "What is SIP?",
      value: "sip_basics",
      icon: <TrendingUp size={13} />,
    },
    {
      label: "Best fund for me?",
      value: "best_fund",
      icon: <Sparkles size={13} />,
    },
    {
      label: "Calculate my returns",
      value: "calculator",
      icon: <Calculator size={13} />,
    },
    {
      label: "Is my money safe?",
      value: "safety",
      icon: <ShieldCheck size={13} />,
    },
    {
      label: "Save tax with ELSS",
      value: "tax",
      icon: <HelpCircle size={13} />,
    },
    {
      label: "Talk to an advisor",
      value: "advisor",
      icon: <Phone size={13} />,
    },
  ],
};

// ── Main component ────────────────────────────────────────────────────────────

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [showLeadPrompt, setShowLeadPrompt] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const pushBotMessage = useCallback(
    (key: string) => {
      const kb = KB[key];
      if (!kb) return;
      setTyping(true);
      setTimeout(
        () => {
          setTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              role: "bot",
              text: kb.text,
              options: kb.options,
              link: kb.link,
            },
          ]);
          // After 3 messages without lead capture, prompt for email
          setMessages((prev) => {
            const botCount = prev.filter((m) => m.role === "bot").length;
            if (botCount >= 3 && !leadCaptured) {
              setTimeout(() => setShowLeadPrompt(true), 800);
            }
            return prev;
          });
        },
        700 + Math.random() * 400,
      );
    },
    [leadCaptured],
  );

  const handleOption = (value: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        text: value.replace(/_/g, " "),
      },
    ]);
    pushBotMessage(value);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text: trimmed },
    ]);
    const intent = detectIntent(trimmed);
    pushBotMessage(intent);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;
    saveLead({
      source: "exit_intent",
      email: leadEmail,
      details: { channel: "chatbot" },
    });
    setLeadCaptured(true);
    setShowLeadPrompt(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `bot-lead-${Date.now()}`,
        role: "bot",
        text: "Thanks! We'll send you our free SIP starter guide. Is there anything else I can help you with?",
        options: [
          { label: "Talk to advisor", value: "advisor" },
          { label: "Start a SIP", value: "start_sip" },
        ],
      },
    ]);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-4 sm:left-6 z-50 flex flex-col items-start gap-3"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Chat panel */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="chat-panel"
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 16 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                style={{
                  width: "min(360px, calc(100vw - 32px))",
                  height: "min(560px, calc(100dvh - 140px))",
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3.5 bg-ink text-white shrink-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 shrink-0">
                    <Bot size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold leading-tight">
                      FutureFund Assistant
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Online · Typically replies instantly
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    aria-label="Close chat"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3 scroll-smooth">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex flex-col gap-2 max-w-[86%] ${msg.role === "user" ? "items-end" : "items-start"}`}
                        >
                          {msg.role === "bot" && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 shrink-0">
                              <Bot size={13} />
                            </div>
                          )}
                          <div
                            className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                              msg.role === "user"
                                ? "bg-ink text-white rounded-br-sm"
                                : "bg-surface-2 text-ink rounded-bl-sm"
                            }`}
                          >
                            {msg.text}
                          </div>
                          {msg.link && (
                            <Link
                              href={msg.link.href}
                              target={
                                msg.link.href.startsWith("http")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                msg.link.href.startsWith("http")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                            >
                              {msg.link.label}
                            </Link>
                          )}
                          {msg.options && msg.options.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-0.5">
                              {msg.options.map((opt) => (
                                <motion.button
                                  key={opt.value}
                                  onClick={() => handleOption(opt.value)}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[12px] font-medium text-ink hover:border-green-500 hover:text-green-600 transition-colors cursor-pointer"
                                >
                                  {opt.icon}
                                  {opt.label}
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {typing && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-3">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-ink-muted"
                              animate={{ y: [0, -4, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Lead prompt */}
                    {showLeadPrompt && !leadCaptured && (
                      <motion.div
                        key="lead-prompt"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-green-200 bg-green-50 p-3.5 mx-1"
                      >
                        <p className="text-xs font-semibold text-green-800 mb-1.5">
                          Get our free SIP Starter Guide
                        </p>
                        <form
                          onSubmit={handleLeadSubmit}
                          className="flex gap-2"
                        >
                          <input
                            type="email"
                            required
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="flex-1 min-w-0 rounded-lg border border-green-200 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <button
                            type="submit"
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700 transition-colors cursor-pointer shrink-0"
                          >
                            Get it
                          </button>
                        </form>
                        <button
                          onClick={() => setShowLeadPrompt(false)}
                          className="text-[10px] text-green-700/60 mt-1.5 hover:text-green-700 cursor-pointer"
                        >
                          No thanks
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div ref={bottomRef} />
                </div>

                {/* WhatsApp escalation strip */}
                <div className="px-3 py-2 bg-surface-2 border-t border-border shrink-0">
                  <a
                    href={whatsappLink(
                      "Hi, I'd like a free SIP consultation from FutureFund.in",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2 text-xs font-semibold text-white hover:bg-[#1fba59] transition-colors cursor-pointer"
                  >
                    <Image
                      src="/images/whatsapp.png"
                      alt=""
                      width={13}
                      height={13}
                      className="object-contain brightness-0 invert"
                    />
                    Chat with our advisor on WhatsApp
                  </a>
                </div>

                {/* Input */}
                <div className="flex items-center gap-2 px-3 py-3 border-t border-border bg-surface shrink-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me anything about SIPs…"
                    className="flex-1 min-w-0 rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-ink-soft"
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white hover:bg-green-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send"
                  >
                    <Send size={15} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB */}
          <motion.button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close chat" : "Open chat assistant"}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-lg hover:shadow-xl hover:bg-green-600 transition-all cursor-pointer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
          >
            {!open && (
              <>
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold ring-2 ring-white">
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
                  <ChevronDown size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="bot"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Bot size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
