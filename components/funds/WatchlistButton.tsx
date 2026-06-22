"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import {
  isInWatchlist,
  toggleWatchlist,
  WATCHLIST_EVENT,
  type WatchlistItem,
} from "@/lib/watchlist/watchlistStore";

interface WatchlistButtonProps {
  item: Omit<WatchlistItem, "addedAt">;
  /** "icon" for compact card use, "full" for the detail page. */
  variant?: "icon" | "full";
  className?: string;
}

export function WatchlistButton({
  item,
  variant = "icon",
  className = "",
}: WatchlistButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(isInWatchlist(item.schemeCode));
    sync();
    window.addEventListener(WATCHLIST_EVENT, sync);
    return () => window.removeEventListener(WATCHLIST_EVENT, sync);
  }, [item.schemeCode]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleWatchlist(item));
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
          saved
            ? "border-green-600 bg-green-50 text-green-700"
            : "border-border bg-surface text-ink hover:bg-surface-2"
        } ${className}`}
      >
        {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
        {saved ? "Saved to Watchlist" : "Add to Watchlist"}
      </button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={handleClick}
      aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors cursor-pointer ${
        saved
          ? "border-green-600 bg-green-50 text-green-600"
          : "border-border bg-surface text-ink-muted hover:text-ink hover:border-ink"
      } ${className}`}
    >
      {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
    </motion.button>
  );
}
