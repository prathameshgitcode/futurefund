/**
 * Persisted fund watchlist (localStorage). Lets investors save funds to
 * revisit/compare later — and gives the distributor a signal of interest.
 */

export interface WatchlistItem {
  schemeCode: number;
  schemeName: string;
  category: string; // url slug, e.g. "large-cap"
  addedAt: string;
}

const STORAGE_KEY = "sg_watchlist_v1";
const EVENT = "sg:watchlist-changed";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getWatchlist(): WatchlistItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WatchlistItem[]) : [];
  } catch {
    return [];
  }
}

function persist(items: WatchlistItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function isInWatchlist(schemeCode: number): boolean {
  return getWatchlist().some((i) => i.schemeCode === schemeCode);
}

/** Returns the new state (true = now in watchlist). */
export function toggleWatchlist(item: Omit<WatchlistItem, "addedAt">): boolean {
  const items = getWatchlist();
  const exists = items.some((i) => i.schemeCode === item.schemeCode);
  if (exists) {
    persist(items.filter((i) => i.schemeCode !== item.schemeCode));
    return false;
  }
  persist([{ ...item, addedAt: new Date().toISOString() }, ...items]);
  return true;
}

export function removeFromWatchlist(schemeCode: number) {
  persist(getWatchlist().filter((i) => i.schemeCode !== schemeCode));
}

export const WATCHLIST_EVENT = EVENT;
