"use client";

import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import {
  calculateSipFutureValue,
  formatINRShort,
} from "@/lib/utils/calculators";

interface RetirementChartProps {
  monthlySip: number;
  annualReturnPercent: number;
  currentAge: number;
  retirementAge: number;
}

export function RetirementChart({
  monthlySip,
  annualReturnPercent,
  currentAge,
  retirementAge,
}: RetirementChartProps) {
  const totalYears = Math.max(retirementAge - currentAge, 1);
  const pointCount = Math.min(7, totalYears);
  const data = Array.from({ length: pointCount }, (_, i) => {
    const yearsElapsed = Math.round(((i + 1) / pointCount) * totalYears);
    const { investedAmount, estimatedGain } = calculateSipFutureValue(
      monthlySip,
      annualReturnPercent,
      yearsElapsed,
    );
    return {
      age: currentAge + yearsElapsed,
      invested: investedAmount,
      gains: estimatedGain,
    };
  });

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
          barGap={4}
        >
          <XAxis
            dataKey="age"
            tickFormatter={(value) => `Age ${value}`}
            tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => formatINRShort(Number(value ?? 0))}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="invested"
            stackId="a"
            fill="var(--color-green-600)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="gains"
            stackId="a"
            fill="var(--color-green-50)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
