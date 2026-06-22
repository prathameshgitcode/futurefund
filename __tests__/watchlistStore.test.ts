import {
  getWatchlist,
  toggleWatchlist,
  isInWatchlist,
  removeFromWatchlist,
} from "@/lib/watchlist/watchlistStore";

beforeEach(() => {
  localStorage.clear();
});

const FUND = {
  schemeCode: 100219,
  schemeName: "Axis Bluechip Fund",
  category: "large-cap",
};

describe("toggleWatchlist", () => {
  it("adds item and returns true on first toggle", () => {
    expect(toggleWatchlist(FUND)).toBe(true);
    expect(getWatchlist()).toHaveLength(1);
  });

  it("removes item and returns false on second toggle", () => {
    toggleWatchlist(FUND);
    expect(toggleWatchlist(FUND)).toBe(false);
    expect(getWatchlist()).toHaveLength(0);
  });

  it("added item has addedAt timestamp", () => {
    toggleWatchlist(FUND);
    const item = getWatchlist()[0];
    expect(item.addedAt).toBeTruthy();
    expect(new Date(item.addedAt).getFullYear()).toBeGreaterThan(2020);
  });
});

describe("isInWatchlist", () => {
  it("returns false when empty", () => {
    expect(isInWatchlist(100219)).toBe(false);
  });

  it("returns true after adding", () => {
    toggleWatchlist(FUND);
    expect(isInWatchlist(100219)).toBe(true);
  });

  it("returns false for a different scheme code", () => {
    toggleWatchlist(FUND);
    expect(isInWatchlist(999999)).toBe(false);
  });
});

describe("removeFromWatchlist", () => {
  it("removes a specific item", () => {
    toggleWatchlist(FUND);
    toggleWatchlist({
      schemeCode: 200000,
      schemeName: "Another Fund",
      category: "mid-cap",
    });
    removeFromWatchlist(100219);
    const list = getWatchlist();
    expect(list).toHaveLength(1);
    expect(list[0].schemeCode).toBe(200000);
  });
});
