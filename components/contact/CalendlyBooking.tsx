"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Clock,
  Video,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { saveLead } from "@/lib/leads/leadStore";

const SLOTS = [
  {
    day: "Today",
    date: "Mon, 23 Jun",
    times: ["10:00 AM", "2:00 PM", "4:30 PM"],
  },
  {
    day: "Tomorrow",
    date: "Tue, 24 Jun",
    times: ["9:00 AM", "11:30 AM", "3:00 PM", "5:00 PM"],
  },
  {
    day: "Wednesday",
    date: "Wed, 25 Jun",
    times: ["10:00 AM", "1:00 PM", "4:00 PM"],
  },
];

export function CalendlyBooking() {
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    time: string;
  } | null>(null);
  const [booked, setBooked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"pick" | "confirm">("pick");

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    saveLead({
      source: "consultation_booking",
      name,
      email,
      phone,
      details: {
        slotDay: selectedSlot?.day ?? "",
        slotTime: selectedSlot?.time ?? "",
      },
    });
    setBooked(true);
  };

  if (booked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-(--radius-card) border border-green-200 bg-green-50 p-8 flex flex-col items-center text-center gap-4"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={28} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-green-800 mb-1">
            Consultation booked!
          </h3>
          <p className="text-sm text-green-700">
            {selectedSlot?.day} at {selectedSlot?.time} — a calendar invite has
            been sent to {email}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-green-600 bg-white rounded-xl px-4 py-2 border border-green-200">
          <Video size={13} />
          <span>Google Meet link will be in your invite</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-(--radius-card) border border-border bg-surface overflow-hidden"
    >
      {/* Header */}
      <div className="bg-linear-to-r from-[#0f172a] to-[#1a3a1a] p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
            <CalendarCheck size={20} className="text-green-400" />
          </div>
          <div>
            <h2 className="font-bold text-base">Book a Free Consultation</h2>
            <p className="text-xs text-white/60">
              30 min · No obligation · Expert SIP advice
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-white/50">
          <span className="flex items-center gap-1">
            <Clock size={10} /> 30 minutes
          </span>
          <span className="flex items-center gap-1">
            <Video size={10} /> Video call
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 size={10} /> Free
          </span>
        </div>
      </div>

      <div className="p-6">
        {step === "pick" ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft mb-4">
              Select a time slot
            </p>
            <div className="flex flex-col gap-4">
              {SLOTS.map((slot) => (
                <div key={slot.day}>
                  <p className="text-xs font-semibold text-ink-muted mb-2">
                    {slot.day} —{" "}
                    <span className="font-normal">{slot.date}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {slot.times.map((time) => {
                      const isSelected =
                        selectedSlot?.day === slot.day &&
                        selectedSlot?.time === time;
                      return (
                        <button
                          key={time}
                          onClick={() =>
                            setSelectedSlot({ day: slot.day, time })
                          }
                          className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-ink text-white border-ink"
                              : "border-border text-ink hover:border-ink hover:bg-surface-2"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {selectedSlot && (
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setStep("confirm")}
                className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-bold text-white hover:bg-black transition-colors cursor-pointer"
              >
                Confirm {selectedSlot.day} at {selectedSlot.time}
                <ChevronRight size={15} />
              </motion.button>
            )}
          </>
        ) : (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleConfirm}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-green-600 mb-1">
              <CheckCircle2 size={15} />
              {selectedSlot?.day} at {selectedSlot?.time}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-ink-soft mb-1.5">
                Your name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rohan Sharma"
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-ink-soft mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rohan@email.com"
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-ink-soft mb-1.5">
                Phone (WhatsApp)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-ink py-3 text-sm font-bold text-white hover:bg-black transition-colors cursor-pointer"
            >
              Book My Consultation →
            </button>
            <button
              type="button"
              onClick={() => setStep("pick")}
              className="text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer text-center"
            >
              ← Choose a different time
            </button>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}
