import { NextResponse } from "next/server";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

interface ChartMeta {
  symbol: string;
  shortName?: string;
  longName?: string;
  regularMarketPrice: number;
  chartPreviousClose?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  currency?: string;
}

async function fetchQuote(symbol: string): Promise<ChartMeta | null> {
  try {
    const encoded = encodeURIComponent(symbol);
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encoded}?interval=1d&range=5d`;
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const meta: ChartMeta = data?.chart?.result?.[0]?.meta;
    if (!meta) return null;
    return meta;
  } catch {
    return null;
  }
}

function toQuote(meta: ChartMeta | null) {
  if (!meta) return null;
  const prev = meta.chartPreviousClose ?? meta.regularMarketPrice;
  const change = meta.regularMarketPrice - prev;
  const changePct = prev !== 0 ? (change / prev) * 100 : 0;
  return {
    symbol: meta.symbol,
    shortName: meta.shortName ?? meta.longName ?? meta.symbol,
    regularMarketPrice: meta.regularMarketPrice,
    regularMarketChange: change,
    regularMarketChangePercent: changePct,
  };
}

export async function GET() {
  try {
    const [nsei, bsesn, gold, usdinr] = await Promise.all([
      fetchQuote("^NSEI"),
      fetchQuote("^BSESN"),
      fetchQuote("GC=F"),
      fetchQuote("USDINR=X"),
    ]);

    return NextResponse.json(
      {
        nifty: toQuote(nsei),
        sensex: toQuote(bsesn),
        gold: toQuote(gold),
        usdinr: toQuote(usdinr),
        fetchedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 },
    );
  }
}
