export interface FinancialGoal {
  id: string;
  name: string;
  percent: number;
  currentLabel: string;
  targetLabel: string;
  yearsLeft: number;
}

export const DASHBOARD_GOALS: FinancialGoal[] = [
  {
    id: "dream-home",
    name: "Dream Home",
    percent: 65,
    currentLabel: "₹32L",
    targetLabel: "₹50L",
    yearsLeft: 3,
  },
  {
    id: "retirement",
    name: "Retirement Fund",
    percent: 12,
    currentLabel: "₹1.2Cr",
    targetLabel: "₹10Cr",
    yearsLeft: 22,
  },
];

export interface UpcomingSip {
  id: string;
  fundName: string;
  date: string;
  amount: number;
}

export const UPCOMING_SIPS: UpcomingSip[] = [
  {
    id: "sip-1",
    fundName: "Nippon India Growth",
    date: "12 Oct",
    amount: 15000,
  },
  { id: "sip-2", fundName: "Axis Small Cap", date: "15 Oct", amount: 10000 },
];

export interface FundRow {
  id: string;
  name: string;
  invested: number;
  currentValue: number;
  returnsPercent: number;
  trend: number[];
  units: number;
  nav: number;
  xirr: number;
}

export const FUND_PERFORMANCE: FundRow[] = [
  {
    id: "f1",
    name: "Nippon India Large Cap Fund",
    invested: 400000,
    currentValue: 512000,
    returnsPercent: 28.0,
    trend: [10, 14, 12, 18, 22, 28],
    units: 4821.34,
    nav: 106.19,
    xirr: 16.8,
  },
  {
    id: "f2",
    name: "Axis Small Cap Fund",
    invested: 320000,
    currentValue: 480000,
    returnsPercent: 50.0,
    trend: [8, 6, 16, 24, 38, 50],
    units: 5102.77,
    nav: 94.07,
    xirr: 24.3,
  },
  {
    id: "f3",
    name: "HDFC Mid-Cap Opportunities",
    invested: 300000,
    currentValue: 458000,
    returnsPercent: 52.7,
    trend: [12, 10, 20, 30, 40, 53],
    units: 2987.51,
    nav: 153.3,
    xirr: 26.1,
  },
];

const MONTHS_1Y = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const WEALTH_GROWTH_DATA: Record<
  "1Y" | "3Y" | "MAX",
  { label: string; value: number }[]
> = {
  "1Y": MONTHS_1Y.map((m, i) => ({
    label: m,
    value: Math.round(820000 + i * 55000 + Math.sin(i) * 20000),
  })),
  "3Y": Array.from({ length: 12 }, (_, i) => ({
    label: `Q${(i % 4) + 1} '${22 + Math.floor(i / 4)}`,
    value: Math.round(420000 + i * 85000 + Math.cos(i) * 30000),
  })),
  MAX: Array.from({ length: 8 }, (_, i) => ({
    label: `${2018 + i}`,
    value: Math.round(150000 + i * 175000 + Math.sin(i) * 40000),
  })),
};
