import {
  calculateSipFutureValue,
  calculateLumpsumFutureValue,
  calculateStepUpSipFutureValue,
  calculateSwpProjection,
  calculateCompoundInterest,
  calculateInflatedCost,
  calculateElssTaxSaving,
  calculateRequiredSip,
  formatINR,
  formatINRShort,
} from "@/lib/utils/calculators";

export interface CalculatorInputConfig {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  format: "currency" | "percent" | "years";
}

export interface CalculatorStat {
  label: string;
  value: string;
  tone?: "default" | "green" | "amber" | "navy";
}

export interface CalculatorChartPoint {
  label: string;
  a: number;
  b?: number;
}

export interface CalculatorComputeResult {
  primaryLabel: string;
  primaryValue: string;
  primaryNote?: string;
  stats: CalculatorStat[];
  chart?: {
    aLabel: string;
    bLabel?: string;
    points: CalculatorChartPoint[];
  };
}

export interface CalculatorConfig {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  inputs: CalculatorInputConfig[];
  compute: (values: Record<string, number>) => CalculatorComputeResult;
}

function buildGrowthChart(
  monthly: number,
  rate: number,
  years: number,
  computeFn: (
    m: number,
    r: number,
    y: number,
  ) => { futureValue: number; investedAmount: number },
): CalculatorChartPoint[] {
  const points = Math.min(7, years);
  return Array.from({ length: points }, (_, i) => {
    const y = Math.round(((i + 1) / points) * years);
    const { futureValue, investedAmount } = computeFn(monthly, rate, y);
    return {
      label: `Yr ${y}`,
      a: investedAmount,
      b: futureValue - investedAmount,
    };
  });
}

export const CALCULATOR_REGISTRY: CalculatorConfig[] = [
  {
    slug: "sip",
    name: "SIP Calculator",
    title: "SIP Wealth Calculator",
    subtitle:
      "Project the future value of your monthly SIP across any time horizon.",
    inputs: [
      {
        key: "monthly",
        label: "Monthly Investment",
        min: 500,
        max: 200000,
        step: 500,
        defaultValue: 10000,
        format: "currency",
      },
      {
        key: "years",
        label: "Time Period",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 10,
        format: "years",
      },
      {
        key: "rate",
        label: "Expected Return",
        min: 1,
        max: 20,
        step: 0.5,
        defaultValue: 12,
        format: "percent",
      },
    ],
    compute: (v) => {
      const r = calculateSipFutureValue(v.monthly, v.rate, v.years);
      return {
        primaryLabel: "Estimated Wealth",
        primaryValue: formatINR(r.futureValue),
        stats: [
          { label: "Invested Amount", value: formatINR(r.investedAmount) },
          {
            label: "Estimated Gain",
            value: formatINR(r.estimatedGain),
            tone: "green",
          },
        ],
        chart: {
          aLabel: "Invested",
          bLabel: "Gains",
          points: buildGrowthChart(
            v.monthly,
            v.rate,
            v.years,
            calculateSipFutureValue,
          ),
        },
      };
    },
  },
  {
    slug: "lumpsum",
    name: "Lumpsum Calculator",
    title: "Lumpsum Growth Calculator",
    subtitle:
      "See how a one-time investment grows over time with the power of compounding.",
    inputs: [
      {
        key: "principal",
        label: "Investment Amount",
        min: 5000,
        max: 5000000,
        step: 5000,
        defaultValue: 100000,
        format: "currency",
      },
      {
        key: "years",
        label: "Time Period",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 10,
        format: "years",
      },
      {
        key: "rate",
        label: "Expected Return",
        min: 1,
        max: 20,
        step: 0.5,
        defaultValue: 12,
        format: "percent",
      },
    ],
    compute: (v) => {
      const r = calculateLumpsumFutureValue(v.principal, v.rate, v.years);
      return {
        primaryLabel: "Estimated Wealth",
        primaryValue: formatINR(r.futureValue),
        stats: [
          { label: "Invested Amount", value: formatINR(r.investedAmount) },
          {
            label: "Estimated Gain",
            value: formatINR(r.estimatedGain),
            tone: "green",
          },
        ],
        chart: {
          aLabel: "Invested",
          bLabel: "Gains",
          points: Array.from({ length: Math.min(7, v.years) }, (_, i) => {
            const y = Math.round(((i + 1) / Math.min(7, v.years)) * v.years);
            const point = calculateLumpsumFutureValue(v.principal, v.rate, y);
            return {
              label: `Yr ${y}`,
              a: point.investedAmount,
              b: point.futureValue - point.investedAmount,
            };
          }),
        },
      };
    },
  },
  {
    slug: "step-up-sip",
    name: "Step-up SIP Calculator",
    title: "Step-up SIP Calculator",
    subtitle:
      "Model a SIP that increases every year in line with your rising income.",
    inputs: [
      {
        key: "monthly",
        label: "Starting Monthly SIP",
        min: 500,
        max: 100000,
        step: 500,
        defaultValue: 10000,
        format: "currency",
      },
      {
        key: "years",
        label: "Time Period",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 15,
        format: "years",
      },
      {
        key: "rate",
        label: "Expected Return",
        min: 1,
        max: 20,
        step: 0.5,
        defaultValue: 12,
        format: "percent",
      },
      {
        key: "stepUp",
        label: "Annual Step-up",
        min: 0,
        max: 25,
        step: 1,
        defaultValue: 10,
        format: "percent",
      },
    ],
    compute: (v) => {
      const r = calculateStepUpSipFutureValue(
        v.monthly,
        v.rate,
        v.years,
        v.stepUp,
      );
      return {
        primaryLabel: "Estimated Wealth",
        primaryValue: formatINR(r.futureValue),
        primaryNote: `Final monthly SIP reaches ${formatINR(v.monthly * Math.pow(1 + v.stepUp / 100, Math.floor(v.years) - 1))}`,
        stats: [
          { label: "Total Invested", value: formatINR(r.investedAmount) },
          {
            label: "Estimated Gain",
            value: formatINR(r.estimatedGain),
            tone: "green",
          },
        ],
        chart: {
          aLabel: "Invested",
          bLabel: "Gains",
          points: Array.from({ length: Math.min(7, v.years) }, (_, i) => {
            const y = Math.round(((i + 1) / Math.min(7, v.years)) * v.years);
            const point = calculateStepUpSipFutureValue(
              v.monthly,
              v.rate,
              y,
              v.stepUp,
            );
            return {
              label: `Yr ${y}`,
              a: point.investedAmount,
              b: point.futureValue - point.investedAmount,
            };
          }),
        },
      };
    },
  },
  {
    slug: "swp",
    name: "SWP Calculator",
    title: "SWP Withdrawal Calculator",
    subtitle:
      "Plan steady monthly withdrawals from a lump sum without running out of money.",
    inputs: [
      {
        key: "corpus",
        label: "Initial Corpus",
        min: 100000,
        max: 20000000,
        step: 50000,
        defaultValue: 2500000,
        format: "currency",
      },
      {
        key: "withdrawal",
        label: "Monthly Withdrawal",
        min: 1000,
        max: 200000,
        step: 1000,
        defaultValue: 20000,
        format: "currency",
      },
      {
        key: "rate",
        label: "Expected Return",
        min: 1,
        max: 16,
        step: 0.5,
        defaultValue: 8,
        format: "percent",
      },
      {
        key: "years",
        label: "Withdrawal Period",
        min: 1,
        max: 35,
        step: 1,
        defaultValue: 20,
        format: "years",
      },
    ],
    compute: (v) => {
      const r = calculateSwpProjection(v.corpus, v.withdrawal, v.rate, v.years);
      return {
        primaryLabel: r.depletesEarly ? "Corpus Lasts" : "Remaining Balance",
        primaryValue: r.depletesEarly
          ? `${Math.floor(r.monthsLasted / 12)} yrs ${r.monthsLasted % 12} mo`
          : formatINR(r.remainingBalance),
        primaryNote: r.depletesEarly
          ? "Your corpus runs out before the end of this period — try a lower withdrawal or higher return."
          : undefined,
        stats: [
          { label: "Total Withdrawn", value: formatINR(r.totalWithdrawn) },
          {
            label: r.depletesEarly ? "Final Balance" : "Years Covered",
            value: r.depletesEarly ? formatINR(0) : `${v.years} yrs`,
            tone: r.depletesEarly ? "amber" : "green",
          },
        ],
      };
    },
  },
  {
    slug: "tax-saver",
    name: "Tax Saving Calculator",
    title: "ELSS Tax Saving Calculator",
    subtitle:
      "Estimate your Section 80C tax savings and the 3-year lock-in growth of an ELSS investment.",
    inputs: [
      {
        key: "investment",
        label: "Annual Investment",
        min: 5000,
        max: 150000,
        step: 5000,
        defaultValue: 150000,
        format: "currency",
      },
      {
        key: "slab",
        label: "Your Tax Slab",
        min: 5,
        max: 30,
        step: 5,
        defaultValue: 30,
        format: "percent",
      },
      {
        key: "rate",
        label: "Expected Return",
        min: 1,
        max: 18,
        step: 0.5,
        defaultValue: 12,
        format: "percent",
      },
    ],
    compute: (v) => {
      const r = calculateElssTaxSaving(v.investment, v.slab, v.rate);
      return {
        primaryLabel: "Tax Saved This Year",
        primaryValue: formatINR(r.taxSaved),
        primaryNote: `Based on ${formatINR(Math.min(v.investment, r.section80cLimit))} eligible under the ₹1.5L Section 80C limit.`,
        stats: [
          { label: "Investment Amount", value: formatINR(v.investment) },
          {
            label: "Value After 3yr Lock-in",
            value: formatINR(r.lockInValue),
            tone: "green",
          },
        ],
      };
    },
  },
  {
    slug: "inflation",
    name: "Inflation Calculator",
    title: "Inflation Impact Calculator",
    subtitle:
      "See how much a present-day expense will cost after years of inflation.",
    inputs: [
      {
        key: "cost",
        label: "Present-Day Cost",
        min: 1000,
        max: 5000000,
        step: 1000,
        defaultValue: 100000,
        format: "currency",
      },
      {
        key: "years",
        label: "Time Period",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 15,
        format: "years",
      },
      {
        key: "rate",
        label: "Inflation Rate",
        min: 1,
        max: 12,
        step: 0.5,
        defaultValue: 6,
        format: "percent",
      },
    ],
    compute: (v) => {
      const futureCost = calculateInflatedCost(v.cost, v.rate, v.years);
      return {
        primaryLabel: "Future Cost",
        primaryValue: formatINR(futureCost),
        primaryNote: `What costs ${formatINR(v.cost)} today will cost this much in ${v.years} years.`,
        stats: [
          { label: "Present-Day Cost", value: formatINR(v.cost) },
          {
            label: "Cost Increase",
            value: formatINR(futureCost - v.cost),
            tone: "amber",
          },
        ],
      };
    },
  },
  {
    slug: "compound-interest",
    name: "Compound Interest Calculator",
    title: "Compound Interest Calculator",
    subtitle: "Visualize the power of compounding on any principal over time.",
    inputs: [
      {
        key: "principal",
        label: "Principal Amount",
        min: 5000,
        max: 5000000,
        step: 5000,
        defaultValue: 100000,
        format: "currency",
      },
      {
        key: "years",
        label: "Time Period",
        min: 1,
        max: 40,
        step: 1,
        defaultValue: 10,
        format: "years",
      },
      {
        key: "rate",
        label: "Annual Interest Rate",
        min: 1,
        max: 20,
        step: 0.5,
        defaultValue: 10,
        format: "percent",
      },
    ],
    compute: (v) => {
      const r = calculateCompoundInterest(v.principal, v.rate, v.years, 12);
      return {
        primaryLabel: "Final Value",
        primaryValue: formatINR(r.futureValue),
        stats: [
          { label: "Principal", value: formatINR(r.investedAmount) },
          {
            label: "Interest Earned",
            value: formatINR(r.estimatedGain),
            tone: "green",
          },
        ],
        chart: {
          aLabel: "Principal",
          bLabel: "Interest",
          points: Array.from({ length: Math.min(7, v.years) }, (_, i) => {
            const y = Math.round(((i + 1) / Math.min(7, v.years)) * v.years);
            const point = calculateCompoundInterest(v.principal, v.rate, y, 12);
            return {
              label: `Yr ${y}`,
              a: point.investedAmount,
              b: point.futureValue - point.investedAmount,
            };
          }),
        },
      };
    },
  },
  {
    slug: "goal-planner",
    name: "Goal Planner",
    title: "Custom Goal Planner",
    subtitle:
      "Work out the monthly SIP needed to hit any financial goal, on your timeline.",
    inputs: [
      {
        key: "target",
        label: "Goal Amount",
        min: 100000,
        max: 50000000,
        step: 50000,
        defaultValue: 2000000,
        format: "currency",
      },
      {
        key: "years",
        label: "Time to Goal",
        min: 1,
        max: 35,
        step: 1,
        defaultValue: 10,
        format: "years",
      },
      {
        key: "rate",
        label: "Expected Return",
        min: 1,
        max: 18,
        step: 0.5,
        defaultValue: 12,
        format: "percent",
      },
    ],
    compute: (v) => {
      const sip = calculateRequiredSip(v.target, v.rate, v.years);
      const r = calculateSipFutureValue(sip, v.rate, v.years);
      return {
        primaryLabel: "Required Monthly SIP",
        primaryValue: `${formatINR(sip)}/mo`,
        stats: [
          { label: "Total Invested", value: formatINR(r.investedAmount) },
          {
            label: "Goal Amount",
            value: formatINRShort(v.target),
            tone: "green",
          },
        ],
      };
    },
  },
  {
    slug: "child-education",
    name: "Child Education Planner",
    title: "Child Education Planner",
    subtitle:
      "Secure your child's higher education against years of rising fees.",
    inputs: [
      {
        key: "cost",
        label: "Today's Education Cost",
        min: 100000,
        max: 10000000,
        step: 50000,
        defaultValue: 2000000,
        format: "currency",
      },
      {
        key: "years",
        label: "Years Until Admission",
        min: 1,
        max: 20,
        step: 1,
        defaultValue: 12,
        format: "years",
      },
      {
        key: "inflation",
        label: "Education Inflation",
        min: 4,
        max: 14,
        step: 0.5,
        defaultValue: 8,
        format: "percent",
      },
      {
        key: "rate",
        label: "Expected Return",
        min: 1,
        max: 18,
        step: 0.5,
        defaultValue: 12,
        format: "percent",
      },
    ],
    compute: (v) => {
      const futureCost = calculateInflatedCost(v.cost, v.inflation, v.years);
      const sip = calculateRequiredSip(futureCost, v.rate, v.years);
      return {
        primaryLabel: "Required Monthly SIP",
        primaryValue: `${formatINR(sip)}/mo`,
        primaryNote: `Estimated cost at admission: ${formatINRShort(futureCost)}`,
        stats: [
          { label: "Today's Cost", value: formatINR(v.cost) },
          {
            label: "Cost at Admission",
            value: formatINRShort(futureCost),
            tone: "amber",
          },
        ],
      };
    },
  },
  {
    slug: "marriage-planner",
    name: "Marriage Planner",
    title: "Marriage Planner",
    subtitle:
      "Plan for a grand celebration years in advance, without relying on debt.",
    inputs: [
      {
        key: "cost",
        label: "Today's Estimated Cost",
        min: 200000,
        max: 20000000,
        step: 100000,
        defaultValue: 2500000,
        format: "currency",
      },
      {
        key: "years",
        label: "Years to Plan For",
        min: 1,
        max: 25,
        step: 1,
        defaultValue: 8,
        format: "years",
      },
      {
        key: "inflation",
        label: "Cost Inflation",
        min: 4,
        max: 12,
        step: 0.5,
        defaultValue: 7,
        format: "percent",
      },
      {
        key: "rate",
        label: "Expected Return",
        min: 1,
        max: 18,
        step: 0.5,
        defaultValue: 12,
        format: "percent",
      },
    ],
    compute: (v) => {
      const futureCost = calculateInflatedCost(v.cost, v.inflation, v.years);
      const sip = calculateRequiredSip(futureCost, v.rate, v.years);
      return {
        primaryLabel: "Required Monthly SIP",
        primaryValue: `${formatINR(sip)}/mo`,
        primaryNote: `Estimated cost in ${v.years} years: ${formatINRShort(futureCost)}`,
        stats: [
          { label: "Today's Cost", value: formatINR(v.cost) },
          {
            label: "Future Cost",
            value: formatINRShort(futureCost),
            tone: "amber",
          },
        ],
      };
    },
  },
  {
    slug: "dream-home",
    name: "Dream Home Planner",
    title: "Dream Home Down Payment Planner",
    subtitle:
      "Save systematically for your down payment instead of scrambling at the last minute.",
    inputs: [
      {
        key: "downPayment",
        label: "Down Payment Needed",
        min: 200000,
        max: 30000000,
        step: 100000,
        defaultValue: 2000000,
        format: "currency",
      },
      {
        key: "years",
        label: "Years to Save",
        min: 1,
        max: 20,
        step: 1,
        defaultValue: 5,
        format: "years",
      },
      {
        key: "rate",
        label: "Expected Return",
        min: 1,
        max: 16,
        step: 0.5,
        defaultValue: 10,
        format: "percent",
      },
    ],
    compute: (v) => {
      const sip = calculateRequiredSip(v.downPayment, v.rate, v.years);
      const r = calculateSipFutureValue(sip, v.rate, v.years);
      return {
        primaryLabel: "Required Monthly SIP",
        primaryValue: `${formatINR(sip)}/mo`,
        stats: [
          { label: "Total Invested", value: formatINR(r.investedAmount) },
          {
            label: "Down Payment Target",
            value: formatINRShort(v.downPayment),
            tone: "green",
          },
        ],
      };
    },
  },
];

export function getCalculatorConfig(
  slug: string,
): CalculatorConfig | undefined {
  return CALCULATOR_REGISTRY.find((c) => c.slug === slug);
}
