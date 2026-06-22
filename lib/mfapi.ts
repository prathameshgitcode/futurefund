export interface MFScheme {
  schemeCode: number;
  schemeName: string;
}

export interface MFMeta {
  fund_house: string;
  scheme_type: string;
  scheme_category: string;
  scheme_code: number;
  scheme_name: string;
}

export interface MFNavEntry {
  date: string;
  nav: string;
}

export interface MFSchemeDetail {
  meta: MFMeta;
  data: MFNavEntry[];
}

export interface ReturnMetrics {
  currentNav: number;
  currentDate: string;
  return1M: number | null;
  return3M: number | null;
  return6M: number | null;
  return1Y: number | null;
  return3Y: number | null;
  return5Y: number | null;
  return10Y: number | null;
  returnMax: number | null;
  maxDataYears: number;
  high52W: number | null;
  low52W: number | null;
  volatility30D: number | null;
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "large-cap": [
    "Large Cap",
    "Largecap",
    "Bluechip",
    "Blue Chip",
    "Top 100",
    "Top100",
  ],
  "mid-cap": ["Mid Cap", "Midcap", "Mid-Cap"],
  "small-cap": ["Small Cap", "Smallcap", "Small-Cap"],
  "flexi-cap": ["Flexi Cap", "Flexicap", "Multi Cap", "Multicap"],
  hybrid: [
    "Balanced Advantage",
    "Aggressive Hybrid",
    "Conservative Hybrid",
    "Multi Asset Allocation",
    "Equity & Debt",
    "Equity and Debt",
  ],
  debt: [
    "Liquid Fund",
    "Overnight Fund",
    "Short Duration",
    "Ultra Short Duration",
    "Low Duration",
    "Medium Duration",
    "Long Duration",
    "Dynamic Bond",
    "Corporate Bond",
    "Credit Risk Fund",
    "Banking and PSU",
    "Gilt Fund",
    "Money Market",
  ],
};

export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  "large-cap": "Large Cap Funds",
  "mid-cap": "Mid Cap Funds",
  "small-cap": "Small Cap Funds",
  "flexi-cap": "Flexi Cap & Multi Cap Funds",
  hybrid: "Hybrid Funds",
  debt: "Debt Funds",
};

const KNOWN_FUND_HOUSES = [
  "HDFC",
  "SBI",
  "ICICI Prudential",
  "Axis",
  "Kotak",
  "Aditya Birla Sun Life",
  "Nippon India",
  "Mirae Asset",
  "UTI",
  "Franklin Templeton",
  "Tata",
  "DSP",
  "PGIM India",
  "Edelweiss",
  "Motilal Oswal",
  "Parag Parikh",
  "Canara Robeco",
  "Invesco India",
  "Sundaram",
  "IDFC",
  "Bandhan",
  "Quant",
  "Navi",
  "WhiteOak Capital",
  "360 ONE",
  "JM Financial",
];

export function extractFundHouse(schemeName: string): string {
  for (const house of KNOWN_FUND_HOUSES) {
    if (schemeName.toLowerCase().startsWith(house.toLowerCase())) {
      return house;
    }
  }
  return schemeName.split(" ").slice(0, 2).join(" ");
}

export async function getAllSchemes(): Promise<MFScheme[]> {
  const res = await fetch("https://api.mfapi.in/mf");
  if (!res.ok) throw new Error("Failed to fetch fund list");
  return res.json();
}

export function filterSchemesByCategory(
  schemes: MFScheme[],
  categoryId: string,
): MFScheme[] {
  const keywords = CATEGORY_KEYWORDS[categoryId] ?? [];
  if (keywords.length === 0) return [];
  return schemes.filter((scheme) =>
    keywords.some((kw) =>
      scheme.schemeName.toLowerCase().includes(kw.toLowerCase()),
    ),
  );
}

export async function getSchemeDetail(
  schemeCode: number,
): Promise<MFSchemeDetail> {
  // Route through our API proxy for server-side caching + timeout handling
  const base =
    typeof window !== "undefined"
      ? ""
      : (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000");
  const res = await fetch(`${base}/api/mf/${schemeCode}`);
  if (!res.ok) throw new Error(`Failed to fetch scheme ${schemeCode}`);
  return res.json();
}

function parseNavDate(ddmmyyyy: string): Date {
  const parts = ddmmyyyy.split("-");
  if (parts.length !== 3) return new Date(NaN);
  const [d, m, y] = parts;
  return new Date(`${y}-${m}-${d}`);
}

function yearsBetween(from: Date, to: Date): number {
  return (to.getTime() - from.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
}

function cagrPercent(
  currentNav: number,
  pastNav: number,
  years: number,
): number | null {
  if (!pastNav || pastNav <= 0 || years <= 0) return null;
  return (Math.pow(currentNav / pastNav, 1 / years) - 1) * 100;
}

export function calculateReturns(data: MFNavEntry[]): ReturnMetrics {
  const empty: ReturnMetrics = {
    currentNav: 0,
    currentDate: "",
    return1M: null,
    return3M: null,
    return6M: null,
    return1Y: null,
    return3Y: null,
    return5Y: null,
    return10Y: null,
    returnMax: null,
    maxDataYears: 0,
    high52W: null,
    low52W: null,
    volatility30D: null,
  };

  if (!data || data.length === 0) return empty;

  const currentNav = parseFloat(data[0].nav);
  if (isNaN(currentNav)) return empty;

  const currentDate = data[0].date;
  const currentDateObj = parseNavDate(currentDate);

  const simpleReturn = (idx: number): number | null => {
    if (idx >= data.length) return null;
    const past = parseFloat(data[idx].nav);
    if (isNaN(past) || past === 0) return null;
    return ((currentNav - past) / past) * 100;
  };

  // Find entry closest to but older than N years ago for CAGR
  const getAtYears = (
    years: number,
  ): { nav: number; actualYears: number } | null => {
    const cutoffMs =
      currentDateObj.getTime() - years * 365.25 * 24 * 60 * 60 * 1000;
    for (const entry of data) {
      const entryDate = parseNavDate(entry.date);
      if (entryDate.getTime() <= cutoffMs) {
        const nav = parseFloat(entry.nav);
        if (!isNaN(nav) && nav > 0) {
          return { nav, actualYears: yearsBetween(entryDate, currentDateObj) };
        }
      }
    }
    return null;
  };

  const at3Y = getAtYears(3);
  const at5Y = getAtYears(5);
  const at10Y = getAtYears(10);

  // MAX: oldest data point
  const lastEntry = data[data.length - 1];
  const lastNav = parseFloat(lastEntry.nav);
  const lastDate = parseNavDate(lastEntry.date);
  const maxYears = yearsBetween(lastDate, currentDateObj);

  // 52W high/low from last ~252 trading days
  const last252 = data.slice(0, Math.min(252, data.length));
  const navValues = last252
    .map((d) => parseFloat(d.nav))
    .filter((n) => !isNaN(n));
  const high52W = navValues.length > 0 ? Math.max(...navValues) : null;
  const low52W = navValues.length > 0 ? Math.min(...navValues) : null;

  // 30-day annualized volatility
  let volatility30D: number | null = null;
  const last30 = data.slice(0, Math.min(31, data.length));
  if (last30.length > 2) {
    const dailyReturns: number[] = [];
    for (let i = 0; i < last30.length - 1; i++) {
      const today = parseFloat(last30[i].nav);
      const yesterday = parseFloat(last30[i + 1].nav);
      if (!isNaN(today) && !isNaN(yesterday) && yesterday > 0) {
        dailyReturns.push((today - yesterday) / yesterday);
      }
    }
    if (dailyReturns.length > 1) {
      const mean =
        dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length;
      const variance =
        dailyReturns.reduce((a, b) => a + (b - mean) ** 2, 0) /
        (dailyReturns.length - 1);
      volatility30D = Math.sqrt(variance) * Math.sqrt(252) * 100;
    }
  }

  return {
    currentNav,
    currentDate,
    return1M: simpleReturn(22),
    return3M: simpleReturn(65),
    return6M: simpleReturn(130),
    return1Y: simpleReturn(252),
    return3Y: at3Y ? cagrPercent(currentNav, at3Y.nav, at3Y.actualYears) : null,
    return5Y: at5Y ? cagrPercent(currentNav, at5Y.nav, at5Y.actualYears) : null,
    return10Y: at10Y
      ? cagrPercent(currentNav, at10Y.nav, at10Y.actualYears)
      : null,
    returnMax:
      !isNaN(lastNav) && lastNav > 0 && maxYears > 0.5
        ? cagrPercent(currentNav, lastNav, maxYears)
        : null,
    maxDataYears: maxYears,
    high52W,
    low52W,
    volatility30D,
  };
}

export function formatNav(nav: number): string {
  return nav.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}
