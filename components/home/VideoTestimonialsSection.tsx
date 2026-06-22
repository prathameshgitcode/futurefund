"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Quote, BadgeCheck } from "lucide-react";

interface VideoTestimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  poster: string;
  /** A real video URL can be dropped in later; empty shows a friendly placeholder. */
  videoUrl?: string;
  blurb: string;
  duration: string;
}

const VIDEOS: VideoTestimonial[] = [
  {
    id: "v1",
    name: "Vikram Desai",
    role: "IT Professional",
    city: "Hyderabad",
    poster:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=520&fit=crop&crop=face&q=80",
    blurb:
      "Started with ₹3,000/month. 4 years later my portfolio crossed ₹6 lakhs.",
    duration: "0:42",
  },
  {
    id: "v2",
    name: "Meera Iyer",
    role: "Doctor",
    city: "Chennai",
    poster:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=520&fit=crop&crop=face&q=80",
    blurb:
      "They built a goal plan for my daughter's education. I finally feel in control.",
    duration: "0:55",
  },
  {
    id: "v3",
    name: "Sandeep Kulkarni",
    role: "Small Business Owner",
    city: "Nagpur",
    poster:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=520&fit=crop&crop=face&q=80",
    blurb:
      "I was scared of the market. The team held my hand through every dip.",
    duration: "1:08",
  },
  {
    id: "v4",
    name: "Anjali Sharma",
    role: "Marketing Manager",
    city: "Delhi",
    poster:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=520&fit=crop&crop=face&q=80",
    blurb:
      "Tax-saving ELSS advice saved me ₹46,000 last year. Worth every minute.",
    duration: "0:48",
  },
];

export function VideoTestimonialsSection() {
  const [active, setActive] = useState<VideoTestimonial | null>(null);

  return (
    <section className="container-page py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">
          <Play size={13} /> Real Stories
        </div>
        <h2 className="text-2xl font-bold mb-2">Hear it from our investors</h2>
        <p className="text-sm text-ink-muted max-w-md mx-auto">
          Short, unscripted stories from people building wealth with us — in
          their own words.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VIDEOS.map((v, i) => (
          <motion.button
            key={v.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            onClick={() => setActive(v)}
            className="group relative aspect-3/4 rounded-2xl overflow-hidden text-left cursor-pointer"
          >
            <Image
              src={v.poster}
              alt={v.name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.12 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
              >
                <Play
                  size={20}
                  className="text-green-600 fill-green-600 ml-0.5"
                />
              </motion.div>
            </div>

            {/* Duration badge */}
            <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
              {v.duration}
            </span>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-3.5">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm font-bold text-white">{v.name}</span>
                <BadgeCheck size={13} className="text-green-400" />
              </div>
              <p className="text-[11px] text-white/70 leading-tight">
                {v.role} · {v.city}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            style={{
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(6px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActive(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-black"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={16} className="text-white" />
              </button>

              {active.videoUrl ? (
                <video
                  src={active.videoUrl}
                  controls
                  autoPlay
                  className="w-full aspect-9/16 object-cover"
                />
              ) : (
                <div className="relative aspect-9/16">
                  <Image
                    src={active.poster}
                    alt={active.name}
                    fill
                    sizes="384px"
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/20 flex flex-col items-center justify-center p-6 text-center">
                    <Quote size={28} className="text-green-400 mb-4" />
                    <p className="text-lg font-semibold text-white leading-relaxed mb-5">
                      &ldquo;{active.blurb}&rdquo;
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white">
                        {active.name}
                      </span>
                      <BadgeCheck size={14} className="text-green-400" />
                    </div>
                    <span className="text-xs text-white/60">
                      {active.role} · {active.city}
                    </span>
                    <p className="mt-6 text-[11px] text-white/40">
                      🎥 Video coming soon — verified client story
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
