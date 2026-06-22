"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Calendar,
  Building2,
  Tag,
  Layers,
  Shield,
  Info,
  Users,
  BarChart2,
  Activity,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LinkButton } from "@/components/ui/Button";
import {
  getSchemeDetail,
  calculateReturns,
  formatNav,
  CATEGORY_DISPLAY_NAMES,
  type MFSchemeDetail,
  type ReturnMetrics,
} from "@/lib/mfapi";
import { SipEmbedCalculator } from "@/components/funds/SipEmbedCalculator";

type Range = "1M" | "3M" | "6M" | "1Y" | "3Y" | "5Y" | "MAX";
const RANGE_DAYS: Record<Range, number> = {
  "1M": 22,
  "3M": 65,
  "6M": 130,
  "1Y": 252,
  "3Y": 756,
  "5Y": 1260,
  MAX: 99999,
};

/* ─── Return pill ─── */
function ReturnPill({
  value,
  label,
  annualized,
}: {
  value: number | null;
  label: string;
  annualized?: boolean;
}) {
  if (value === null) {
    return (
      <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-surface-2 min-w-[72px]">
        <span className="text-[9px] text-ink-muted mb-1">{label}</span>
        <span className="text-sm font-semibold text-ink-muted">—</span>
      </div>
    );
  }
  const positive = value >= 0;
  return (
    <div
      className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[72px] ${positive ? "bg-green-50" : "bg-red-50"}`}
    >
      <span className="text-[9px] text-ink-muted mb-1">{label}</span>
      <span
        className={`text-sm font-bold flex items-center gap-0.5 ${positive ? "text-green-600" : "text-red-500"}`}
      >
        {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {Math.abs(value).toFixed(2)}%
      </span>
      {annualized && (
        <span className="text-[8px] text-ink-soft mt-0.5">p.a.</span>
      )}
    </div>
  );
}

/* ─── Custom NAV tooltip ─── */
interface NavTooltipProps {
  active?: boolean;
  payload?: { value: number; payload: { date: string } }[];
}
function NavTooltip({ active, payload }: NavTooltipProps) {
  if (!active || !payload?.length) return null;
  const { value } = payload[0];
  const { date } = payload[0].payload;
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-2 shadow-lg">
      <div className="text-[10px] text-ink-muted mb-0.5">{date}</div>
      <div className="text-sm font-bold text-ink">
        ₹{Number(value).toFixed(4)}
      </div>
      <div className="text-[9px] text-ink-soft">per unit (NAV)</div>
    </div>
  );
}

/* ─── Info row ─── */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="mt-0.5 text-ink-muted">{icon}</div>
      <div>
        <div className="text-xs text-ink-muted mb-0.5">{label}</div>
        <div className="text-sm font-medium text-ink">{value}</div>
      </div>
    </div>
  );
}

/* ─── Risk-o-meter ─── */
function RiskOMeter({ category }: { category: string }) {
  const cat = category.toLowerCase();
  let level = 3;
  let label = "Moderately High";
  let color = "#f59e0b";
  if (
    cat.includes("liquid") ||
    cat.includes("overnight") ||
    cat.includes("money market")
  ) {
    level = 1;
    label = "Low Risk";
    color = "#22c55e";
  } else if (
    cat.includes("debt") ||
    cat.includes("bond") ||
    cat.includes("gilt") ||
    cat.includes("short duration")
  ) {
    level = 2;
    label = "Low to Moderate";
    color = "#84cc16";
  } else if (
    cat.includes("hybrid") ||
    cat.includes("balanced") ||
    cat.includes("conservative")
  ) {
    level = 3;
    label = "Moderate";
    color = "#f59e0b";
  } else if (cat.includes("large cap") || cat.includes("bluechip")) {
    level = 3;
    label = "Moderately High";
    color = "#f59e0b";
  } else if (cat.includes("mid cap")) {
    level = 4;
    label = "High Risk";
    color = "#f97316";
  } else if (cat.includes("small cap")) {
    level = 5;
    label = "Very High Risk";
    color = "#ef4444";
  } else if (cat.includes("flexi") || cat.includes("multi cap")) {
    level = 4;
    label = "High Risk";
    color = "#f97316";
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((l) => (
          <div
            key={l}
            className="h-5 rounded-sm transition-all"
            style={{
              width: l <= level ? 16 + l * 2 : 12,
              background: l <= level ? color : "#e5e7eb",
              opacity: l <= level ? 1 : 0.4,
            }}
          />
        ))}
      </div>
      <span className="text-xs font-semibold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Portfolio allocation data by category ─── */
function getPortfolioAllocation(schemeCategory: string) {
  const cat = schemeCategory.toLowerCase();
  if (
    cat.includes("liquid") ||
    cat.includes("overnight") ||
    cat.includes("money market")
  ) {
    return {
      asset: [
        { name: "Money Market", value: 75, color: "#22c55e" },
        { name: "Short-term Debt", value: 20, color: "#4ade80" },
        { name: "Cash", value: 5, color: "#bbf7d0" },
      ],
      sectors: null,
      note: "Invests in very short-term, high-quality debt instruments. Minimal risk, easy liquidity.",
    };
  }
  if (cat.includes("debt") || cat.includes("bond") || cat.includes("gilt")) {
    return {
      asset: [
        { name: "Government Securities", value: 45, color: "#3b82f6" },
        { name: "Corporate Bonds", value: 35, color: "#60a5fa" },
        { name: "Money Market", value: 15, color: "#93c5fd" },
        { name: "Cash", value: 5, color: "#bfdbfe" },
      ],
      sectors: null,
      note: "Primarily invests in fixed-income instruments like government bonds and high-rated corporate bonds.",
    };
  }
  if (
    cat.includes("hybrid") ||
    cat.includes("balanced") ||
    cat.includes("aggressive hybrid")
  ) {
    return {
      asset: [
        { name: "Equity", value: 72, color: "#0f172a" },
        { name: "Debt", value: 23, color: "#22c55e" },
        { name: "Cash & Others", value: 5, color: "#e5e7eb" },
      ],
      sectors: [
        { name: "Financial Services", value: 28 },
        { name: "IT & Technology", value: 13 },
        { name: "Consumer Goods", value: 11 },
        { name: "Healthcare", value: 9 },
        { name: "Energy", value: 8 },
        { name: "Other Sectors", value: 31 },
      ],
      note: "Balances growth (equity) with stability (debt). Good for moderate-risk investors who want both.",
    };
  }
  if (
    cat.includes("large cap") ||
    cat.includes("bluechip") ||
    cat.includes("top 100")
  ) {
    return {
      asset: [
        { name: "Large Cap Stocks", value: 83, color: "#0f172a" },
        { name: "Mid Cap Stocks", value: 12, color: "#22c55e" },
        { name: "Cash & Others", value: 5, color: "#e5e7eb" },
      ],
      sectors: [
        { name: "Financial Services", value: 30 },
        { name: "IT & Technology", value: 15 },
        { name: "Consumer Goods", value: 12 },
        { name: "Healthcare", value: 10 },
        { name: "Energy & Power", value: 8 },
        { name: "Other Sectors", value: 25 },
      ],
      note: "Invests in India's top 100 companies by market cap. Relatively stable with strong track records.",
    };
  }
  if (cat.includes("mid cap")) {
    return {
      asset: [
        { name: "Mid Cap Stocks", value: 70, color: "#f59e0b" },
        { name: "Large Cap Stocks", value: 18, color: "#0f172a" },
        { name: "Small Cap Stocks", value: 7, color: "#ef4444" },
        { name: "Cash & Others", value: 5, color: "#e5e7eb" },
      ],
      sectors: [
        { name: "Financial Services", value: 18 },
        { name: "Chemicals", value: 14 },
        { name: "Consumer Goods", value: 13 },
        { name: "Healthcare", value: 12 },
        { name: "IT & Technology", value: 10 },
        { name: "Other Sectors", value: 33 },
      ],
      note: "Invests in mid-sized companies with high growth potential. Higher risk, higher potential returns.",
    };
  }
  if (cat.includes("small cap")) {
    return {
      asset: [
        { name: "Small Cap Stocks", value: 70, color: "#ef4444" },
        { name: "Mid Cap Stocks", value: 20, color: "#f59e0b" },
        { name: "Cash & Others", value: 10, color: "#e5e7eb" },
      ],
      sectors: [
        { name: "Chemicals", value: 18 },
        { name: "Healthcare", value: 14 },
        { name: "Consumer Goods", value: 12 },
        { name: "Engineering", value: 11 },
        { name: "IT & Technology", value: 9 },
        { name: "Other Sectors", value: 36 },
      ],
      note: "Invests in smaller companies with potential to become tomorrow's large caps. High risk, high reward.",
    };
  }
  // Flexi/Multi Cap
  return {
    asset: [
      { name: "Large Cap", value: 38, color: "#0f172a" },
      { name: "Mid Cap", value: 30, color: "#f59e0b" },
      { name: "Small Cap", value: 24, color: "#ef4444" },
      { name: "Cash & Others", value: 8, color: "#e5e7eb" },
    ],
    sectors: [
      { name: "Financial Services", value: 22 },
      { name: "IT & Technology", value: 14 },
      { name: "Consumer Goods", value: 13 },
      { name: "Healthcare", value: 11 },
      { name: "Chemicals", value: 9 },
      { name: "Other Sectors", value: 31 },
    ],
    note: "Flexible allocation across all market caps. Fund manager can move money based on market conditions.",
  };
}

/* ─── Beginner insight ─── */
function getFundInsight(meta: MFSchemeDetail["meta"], returns: ReturnMetrics) {
  const name = meta.scheme_name;
  const isGrowth = name.toLowerCase().includes("growth");
  const isDirect = name.toLowerCase().includes("direct");
  const years = Math.floor(returns.maxDataYears);

  return {
    planType: isDirect ? "Direct Plan" : "Regular Plan",
    planNote: isDirect
      ? "You invest directly with the fund house — lower cost, higher returns."
      : "Invested via a distributor — slightly higher cost.",
    optionType: isGrowth
      ? "Growth Option"
      : name.toLowerCase().includes("dividend")
        ? "Dividend Option"
        : "Growth Option",
    optionNote: isGrowth
      ? "Profits stay invested and compound over time — best for long-term wealth building."
      : "Profits are distributed as dividends periodically.",
    fundAge: years > 0 ? `${years}+ years of history` : "Newly launched",
    fundAgeNote:
      years >= 5
        ? "Well-established fund with sufficient track record to evaluate."
        : "Relatively new — limited performance history.",
  };
}

export default function FundDetailPage() {
  const params = useParams();
  const category = (params?.category as string) ?? "";
  const schemeCode = params?.schemeCode
    ? parseInt(params.schemeCode as string, 10)
    : NaN;

  const [data, setData] = useState<MFSchemeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState<Range>("1Y");

  useEffect(() => {
    if (!schemeCode || isNaN(schemeCode)) return;
    setLoading(true);
    getSchemeDetail(schemeCode)
      .then(setData)
      .catch(() => setError("Unable to load fund details. Please try again."))
      .finally(() => setLoading(false));
  }, [schemeCode]);

  const returns: ReturnMetrics | null = useMemo(() => {
    if (!data?.data) return null;
    return calculateReturns(data.data);
  }, [data]);

  const chartData = useMemo(() => {
    if (!data?.data) return [];
    const maxIdx = RANGE_DAYS[range];
    const slice = data.data
      .slice(0, Math.min(maxIdx, data.data.length))
      .reverse();
    const step = Math.max(1, Math.floor(slice.length / 80));
    return slice
      .filter((_, i) => i % step === 0)
      .map((entry) => ({
        date: entry.date,
        nav: parseFloat(entry.nav),
      }));
  }, [data, range]);

  const isPositive1Y =
    returns?.return1Y !== null && (returns?.return1Y ?? 0) >= 0;
  const allocation = data
    ? getPortfolioAllocation(data.meta.scheme_category)
    : null;
  const insight = data && returns ? getFundInsight(data.meta, returns) : null;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="container-page pt-6 pb-3">
          <Link
            href={`/funds/${category}`}
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors cursor-pointer group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            {CATEGORY_DISPLAY_NAMES[category] ?? "Funds"}
          </Link>
        </section>

        {loading && (
          <section className="container-page py-24 flex flex-col items-center justify-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
              className="w-10 h-10 border-[3px] border-green-600 border-t-transparent rounded-full"
            />
            <p className="text-sm text-ink-muted">Loading fund data…</p>
          </section>
        )}

        {error && !loading && (
          <section className="container-page py-24 flex flex-col items-center justify-center gap-3 text-red-500">
            <AlertCircle size={28} />
            <p className="text-sm">{error}</p>
            <Link
              href={`/funds/${category}`}
              className="text-sm underline text-ink cursor-pointer"
            >
              Back to funds
            </Link>
          </section>
        )}

        {!loading && !error && data && returns && (
          <>
            {/* ─── Fund Header ─── */}
            <section className="container-page pb-8 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="flex items-center gap-2 text-xs text-ink-muted mb-3 flex-wrap">
                  <Building2 size={12} />
                  <span>{data.meta.fund_house}</span>
                  <span>·</span>
                  <span className="truncate max-w-xs">
                    {data.meta.scheme_category}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mb-6 text-ink">
                  {data.meta.scheme_name}
                </h1>

                {/* NAV + Returns */}
                <div className="flex flex-wrap gap-2 items-stretch">
                  <div className="flex flex-col justify-between p-5 rounded-2xl bg-ink text-white min-w-[130px]">
                    <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">
                      Current NAV
                    </div>
                    <div className="text-2xl font-bold">
                      ₹{formatNav(returns.currentNav)}
                    </div>
                    {returns.currentDate && (
                      <div className="mt-2 text-[10px] text-white/40 flex items-center gap-1">
                        <Calendar size={9} /> {returns.currentDate}
                      </div>
                    )}
                  </div>
                  <ReturnPill value={returns.return1M} label="1 Month" />
                  <ReturnPill value={returns.return3M} label="3 Months" />
                  <ReturnPill value={returns.return6M} label="6 Months" />
                  <ReturnPill value={returns.return1Y} label="1 Year" />
                  <ReturnPill
                    value={returns.return3Y}
                    label="3 Year"
                    annualized
                  />
                  <ReturnPill
                    value={returns.return5Y}
                    label="5 Year"
                    annualized
                  />
                  <ReturnPill
                    value={returns.return10Y}
                    label="10 Year"
                    annualized
                  />
                  {returns.returnMax !== null && (
                    <ReturnPill
                      value={returns.returnMax}
                      label={`Since Inception`}
                      annualized
                    />
                  )}
                </div>
                <p className="mt-2 text-[10px] text-ink-soft">
                  ✦ 3Y, 5Y, 10Y & since inception returns are annualized (CAGR).
                  1M–1Y are absolute returns.
                </p>
              </motion.div>
            </section>

            {/* ─── NAV Chart ─── */}
            <section className="container-page pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-(--radius-card) border border-border bg-surface p-5 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-semibold text-ink">
                      NAV History Chart
                    </h2>
                    <p className="text-xs text-ink-muted mt-0.5">
                      NAV = Net Asset Value — the price of 1 unit of this fund.
                      Higher is better over time.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(
                      ["1M", "3M", "6M", "1Y", "3Y", "5Y", "MAX"] as Range[]
                    ).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRange(r)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          range === r
                            ? "bg-ink text-white shadow-sm"
                            : "bg-surface-2 text-ink-muted hover:bg-border"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 52W H/L quick stat */}
                {returns.high52W && returns.low52W && (
                  <div className="flex gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-ink-muted">52W High:</span>
                      <span className="font-semibold text-ink">
                        ₹{formatNav(returns.high52W)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      <span className="text-ink-muted">52W Low:</span>
                      <span className="font-semibold text-ink">
                        ₹{formatNav(returns.low52W)}
                      </span>
                    </div>
                  </div>
                )}

                {chartData.length === 0 ? (
                  <div className="h-64 flex items-center justify-center text-sm text-ink-muted">
                    Not enough data for this range.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart
                      data={chartData}
                      margin={{ top: 4, right: 4, bottom: 4, left: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="navFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={isPositive1Y ? "#16a34a" : "#dc2626"}
                            stopOpacity={0.25}
                          />
                          <stop
                            offset="100%"
                            stopColor={isPositive1Y ? "#16a34a" : "#dc2626"}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--color-border)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fill: "var(--color-ink-soft)" }}
                        tickLine={false}
                        axisLine={false}
                        interval="preserveStartEnd"
                        minTickGap={40}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "var(--color-ink-soft)" }}
                        tickLine={false}
                        axisLine={false}
                        domain={["auto", "auto"]}
                        tickFormatter={(v: number) => `₹${v.toFixed(0)}`}
                        width={60}
                      />
                      <Tooltip
                        content={<NavTooltip />}
                        cursor={{
                          stroke: "var(--color-border)",
                          strokeWidth: 1,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="nav"
                        stroke={
                          isPositive1Y ? "var(--color-green-600)" : "#dc2626"
                        }
                        strokeWidth={2.5}
                        fill="url(#navFill)"
                        dot={false}
                        activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
                <p className="mt-3 text-[10px] text-ink-soft text-center">
                  📈 The line shows how ₹1 invested in this fund has grown. A
                  steadily rising line = consistent performance.
                </p>
              </motion.div>
            </section>

            {/* ─── Beginner Insight + Risk ─── */}
            {insight && (
              <section className="container-page pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {/* Risk-o-meter */}
                  <div className="rounded-(--radius-card) border border-border bg-surface p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield size={15} className="text-ink-muted" />
                      <h2 className="font-semibold text-ink text-sm">
                        Risk Level
                      </h2>
                    </div>
                    <RiskOMeter category={data.meta.scheme_category} />
                    <p className="mt-3 text-[11px] text-ink-muted leading-relaxed text-center">
                      {allocation?.note}
                    </p>
                  </div>

                  {/* Fund insights */}
                  <div className="rounded-(--radius-card) border border-border bg-surface p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Info size={15} className="text-ink-muted" />
                      <h2 className="font-semibold text-ink text-sm">
                        Fund Insights
                      </h2>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-green-50 text-green-700 shrink-0 mt-0.5">
                          {insight.planType}
                        </span>
                        <p className="text-xs text-ink-muted leading-relaxed">
                          {insight.planNote}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-surface-2 text-ink-soft shrink-0 mt-0.5">
                          {insight.optionType}
                        </span>
                        <p className="text-xs text-ink-muted leading-relaxed">
                          {insight.optionNote}
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-surface-2 text-ink-soft shrink-0 mt-0.5 flex items-center gap-1">
                          <Clock size={9} /> {insight.fundAge}
                        </span>
                        <p className="text-xs text-ink-muted leading-relaxed">
                          {insight.fundAgeNote}
                        </p>
                      </div>
                      {returns.volatility30D !== null && (
                        <div className="flex items-center gap-3 text-xs text-ink-muted">
                          <Activity
                            size={12}
                            className="text-ink-soft shrink-0"
                          />
                          <span>
                            30-day volatility:{" "}
                            <strong className="text-ink">
                              {returns.volatility30D.toFixed(1)}% p.a.
                            </strong>{" "}
                            —{" "}
                            {returns.volatility30D < 8
                              ? "low fluctuation"
                              : returns.volatility30D < 15
                                ? "moderate fluctuation"
                                : "high fluctuation"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </section>
            )}

            {/* ─── Portfolio Allocation ─── */}
            {allocation && (
              <section className="container-page pb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="rounded-(--radius-card) border border-border bg-surface p-5 sm:p-6"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart2 size={15} className="text-ink-muted" />
                    <h2 className="font-semibold text-ink">
                      Typical Portfolio Allocation
                    </h2>
                  </div>
                  <p className="text-[11px] text-ink-soft mb-5">
                    Based on SEBI category mandates for this fund type. Actual
                    holdings may vary.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Pie chart */}
                    <div className="flex flex-col items-center">
                      <p className="text-xs font-semibold text-ink-muted mb-2">
                        Asset Mix
                      </p>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={allocation.asset}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {allocation.asset.map((entry, index) => (
                              <Cell key={index} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(v) => `${v}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-2">
                        {allocation.asset.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-1.5 text-[11px] text-ink-muted"
                          >
                            <div
                              className="h-2.5 w-2.5 rounded-full shrink-0"
                              style={{ background: item.color }}
                            />
                            <span>{item.name}</span>
                            <span className="font-semibold text-ink">
                              {item.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sector breakdown */}
                    {allocation.sectors && (
                      <div>
                        <p className="text-xs font-semibold text-ink-muted mb-3">
                          Top Sectors (Equity Portion)
                        </p>
                        <div className="flex flex-col gap-2.5">
                          {allocation.sectors.map((sector) => (
                            <div key={sector.name}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-ink-muted">
                                  {sector.name}
                                </span>
                                <span className="font-semibold text-ink">
                                  {sector.value}%
                                </span>
                              </div>
                              <div className="h-1.5 rounded-full bg-surface-2">
                                <motion.div
                                  className="h-full rounded-full bg-ink"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${sector.value}%` }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Beginner explanation */}
                  <div className="mt-5 flex items-start gap-3 rounded-xl bg-green-50 p-4">
                    <Users
                      size={14}
                      className="text-green-600 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-0.5">
                        Who is this fund for?
                      </p>
                      <p className="text-xs text-green-700/80 leading-relaxed">
                        {data.meta.scheme_category
                          .toLowerCase()
                          .includes("large cap")
                          ? "Ideal for first-time investors and those who prefer stability. Large cap companies are India's most trusted brands."
                          : data.meta.scheme_category
                                .toLowerCase()
                                .includes("mid cap")
                            ? "Suitable for investors with 5+ year horizon who can tolerate moderate volatility for higher growth."
                            : data.meta.scheme_category
                                  .toLowerCase()
                                  .includes("small cap")
                              ? "Best for aggressive investors with 7-10 year horizon. High volatility but potentially highest returns."
                              : data.meta.scheme_category
                                    .toLowerCase()
                                    .includes("hybrid")
                                ? "Great for investors who want growth with some stability — a balanced approach."
                                : data.meta.scheme_category
                                      .toLowerCase()
                                      .includes("liquid")
                                  ? "Perfect for parking short-term money (1-90 days). Better than savings account, very safe."
                                  : "Suitable for investors seeking exposure across multiple fund categories with flexibility."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </section>
            )}

            {/* ─── Fund Info ─── */}
            <section className="container-page pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-(--radius-card) border border-border bg-surface p-5 sm:p-6"
              >
                <h2 className="font-semibold text-ink mb-3">Fund Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <InfoRow
                    icon={<Building2 size={14} />}
                    label="Fund House"
                    value={data.meta.fund_house}
                  />
                  <InfoRow
                    icon={<Tag size={14} />}
                    label="Category"
                    value={data.meta.scheme_category}
                  />
                  <InfoRow
                    icon={<Layers size={14} />}
                    label="Type"
                    value={data.meta.scheme_type}
                  />
                  <InfoRow
                    icon={<Tag size={14} />}
                    label="Scheme Code"
                    value={String(data.meta.scheme_code)}
                  />
                  {returns.maxDataYears > 0 && (
                    <InfoRow
                      icon={<Clock size={14} />}
                      label="Data History"
                      value={`${Math.floor(returns.maxDataYears)} years`}
                    />
                  )}
                  {returns.high52W && returns.low52W && (
                    <InfoRow
                      icon={<Activity size={14} />}
                      label="52-Week Range"
                      value={`₹${formatNav(returns.low52W)} – ₹${formatNav(returns.high52W)}`}
                    />
                  )}
                </div>
              </motion.div>
            </section>

            {/* ─── SIP Calculator ─── */}
            <SipEmbedCalculator
              fundName={data.meta.scheme_name}
              historical1Y={returns.return1Y}
            />

            {/* ─── CTA ─── */}
            <section className="container-page pb-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-(--radius-card) bg-ink px-6 py-10 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-white"
              >
                <div>
                  <h2 className="text-xl font-bold mb-1.5">
                    Ready to start your SIP?
                  </h2>
                  <p className="text-sm text-white/60 max-w-sm">
                    Talk to our expert and get a personalized plan built around
                    your goals.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                  <LinkButton href="/quiz" variant="mint" size="lg">
                    Start My SIP
                  </LinkButton>
                  <LinkButton
                    href="/contact"
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Book Free Call
                  </LinkButton>
                </div>
              </motion.div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
