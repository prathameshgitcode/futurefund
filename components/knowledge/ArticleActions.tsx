"use client";

import { useEffect, useState } from "react";
import { Bookmark, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const BOOKMARK_KEY = "sipguru_bookmarks";

function readBookmarks(): string[] {
  try {
    const raw = window.localStorage.getItem(BOOKMARK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function ArticleActions({ articleId }: { articleId: string }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setBookmarked(readBookmarks().includes(articleId));
  }, [articleId]);

  function toggleBookmark() {
    const current = readBookmarks();
    const next = current.includes(articleId)
      ? current.filter((id) => id !== articleId)
      : [...current, articleId];
    try {
      window.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    setBookmarked(!bookmarked);
  }

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url, title: document.title });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // user cancelled share sheet — ignore
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggleBookmark}
        aria-pressed={bookmarked}
        className={cn(
          "focus-ring flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors",
          bookmarked
            ? "border-green-600 bg-green-50 text-green-700"
            : "border-border bg-surface text-ink-muted hover:bg-surface-2",
        )}
      >
        <Bookmark size={13} fill={bookmarked ? "currentColor" : "none"} />
        {bookmarked ? "Saved" : "Save"}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="focus-ring flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-ink-muted hover:bg-surface-2 transition-colors"
      >
        {copied ? (
          <Check size={13} className="text-green-600" />
        ) : (
          <Share2 size={13} />
        )}
        {copied ? "Link copied" : "Share"}
      </button>
    </div>
  );
}
