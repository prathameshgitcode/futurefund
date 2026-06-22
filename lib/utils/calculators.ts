/**
 * Future value of a monthly SIP using the standard compounding-monthly formula:
 * FV = P × [ ( (1+r)^n - 1 ) / r ] × (1+r)
 * where r = monthly rate, n = number of months
 */
export function calculateSipFutureValue(
  monthlyInvestment: number,
  annualReturnPercent: number,
  years: number,
): { futureValue: number; investedAmount: number; estimatedGain: number } {
  const months = years * 12;
  const monthlyRate = annualReturnPercent / 100 / 12;
  const investedAmount = monthlyInvestment * months;

  if (monthlyRate === 0) {
    return { futureValue: investedAmount, investedAmount, estimatedGain: 0 };
  }

  const futureValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);

  return {
    futureValue: Math.round(futureValue),
    investedAmount: Math.round(investedAmount),
    estimatedGain: Math.round(futureValue - investedAmount),
  };
}

export function calculateLumpsumFutureValue(
  principal: number,
  annualReturnPercent: number,
  years: number,
): { futureValue: number; investedAmount: number; estimatedGain: number } {
  const futureValue =
    principal * Math.pow(1 + annualReturnPercent / 100, years);
  return {
    futureValue: Math.round(futureValue),
    investedAmount: Math.round(principal),
    estimatedGain: Math.round(futureValue - principal),
  };
}

/** Format a number as Indian Rupee currency with lakh/crore grouping, e.g. ₹23,23,391 */
export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Format large numbers into Cr / L shorthand, e.g. ₹12.4 Cr or ₹34,500 */
export function formatINRShort(value: number): string {
  if (value >= 1_00_00_000) {
    return `₹${(value / 1_00_00_000).toFixed(1)} Cr`;
  }
  if (value >= 1_00_000) {
    return `₹${(value / 1_00_000).toFixed(1)} L`;
  }
  return formatINR(value);
}

/**
 * Required monthly SIP to reach a target corpus, given expected annual return and years.
 * Derived by solving the SIP future value formula for P.
 */
export function calculateRequiredSip(
  targetCorpus: number,
  annualReturnPercent: number,
  years: number,
): number {
  const months = years * 12;
  const monthlyRate = annualReturnPercent / 100 / 12;
  if (monthlyRate === 0) return Math.round(targetCorpus / months);
  const factor =
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  return Math.round(targetCorpus / factor);
}

/**
 * Future value of a SIP that increases by a fixed percentage every 12 months
 * (a "step-up" SIP). Simulated month by month since there's no closed form
 * once the contribution itself changes annually.
 */
export function calculateStepUpSipFutureValue(
  initialMonthlyInvestment: number,
  annualReturnPercent: number,
  years: number,
  annualStepUpPercent: number,
): { futureValue: number; investedAmount: number; estimatedGain: number } {
  const monthlyRate = annualReturnPercent / 100 / 12;
  const months = years * 12;
  let balance = 0;
  let invested = 0;
  let currentMonthly = initialMonthlyInvestment;

  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + monthlyRate) + currentMonthly;
    invested += currentMonthly;
    if (m % 12 === 0) {
      currentMonthly *= 1 + annualStepUpPercent / 100;
    }
  }

  return {
    futureValue: Math.round(balance),
    investedAmount: Math.round(invested),
    estimatedGain: Math.round(balance - invested),
  };
}

/**
 * Models a Systematic Withdrawal Plan: a lump sum corpus earning a steady
 * annual return, with a fixed monthly amount withdrawn. Returns the balance
 * after the requested period and how many months the corpus actually lasts
 * (capped at the requested period if it runs out early).
 */
export function calculateSwpProjection(
  initialCorpus: number,
  monthlyWithdrawal: number,
  annualReturnPercent: number,
  years: number,
): {
  remainingBalance: number;
  totalWithdrawn: number;
  monthsLasted: number;
  depletesEarly: boolean;
} {
  const monthlyRate = annualReturnPercent / 100 / 12;
  const totalMonths = years * 12;
  let balance = initialCorpus;
  let totalWithdrawn = 0;
  let monthsLasted = totalMonths;
  let depletesEarly = false;

  for (let m = 1; m <= totalMonths; m++) {
    balance = balance * (1 + monthlyRate) - monthlyWithdrawal;
    totalWithdrawn += monthlyWithdrawal;
    if (balance <= 0) {
      balance = 0;
      monthsLasted = m;
      depletesEarly = true;
      break;
    }
  }

  return {
    remainingBalance: Math.round(balance),
    totalWithdrawn: Math.round(totalWithdrawn),
    monthsLasted,
    depletesEarly,
  };
}

/** Compound interest with a configurable compounding frequency per year (1=annual, 4=quarterly, 12=monthly). */
export function calculateCompoundInterest(
  principal: number,
  annualRatePercent: number,
  years: number,
  compoundingPerYear: number = 1,
): { futureValue: number; investedAmount: number; estimatedGain: number } {
  const futureValue =
    principal *
    Math.pow(
      1 + annualRatePercent / 100 / compoundingPerYear,
      compoundingPerYear * years,
    );
  return {
    futureValue: Math.round(futureValue),
    investedAmount: Math.round(principal),
    estimatedGain: Math.round(futureValue - principal),
  };
}

/**
 * Models the long-term cost of pausing a SIP for a number of months.
 * Compares an uninterrupted SIP against one that contributes nothing during
 * the pause window (but the already-invested balance keeps compounding).
 * The "cost" is the gap in final corpus — usually far larger than the few
 * months of skipped contributions, because those early rupees lose the most
 * compounding time.
 */
export function calculateSipPauseCost(params: {
  monthlyInvestment: number;
  annualReturnPercent: number;
  totalYears: number;
  pauseMonths: number;
  pauseStartMonth?: number; // 1-indexed month when the pause begins
}): {
  uninterruptedValue: number;
  pausedValue: number;
  corpusLost: number;
  contributionsSkipped: number;
} {
  const { monthlyInvestment, annualReturnPercent, totalYears, pauseMonths } =
    params;
  const monthlyRate = annualReturnPercent / 100 / 12;
  const totalMonths = Math.round(totalYears * 12);
  const pauseStart = params.pauseStartMonth ?? 1;
  const pauseEnd = pauseStart + pauseMonths - 1;

  const simulate = (contributeDuringPause: boolean) => {
    let balance = 0;
    for (let m = 1; m <= totalMonths; m++) {
      balance = balance * (1 + monthlyRate);
      const inPause = m >= pauseStart && m <= pauseEnd;
      if (!inPause || contributeDuringPause) balance += monthlyInvestment;
    }
    return Math.round(balance);
  };

  const uninterruptedValue = simulate(true);
  const pausedValue = simulate(false);
  return {
    uninterruptedValue,
    pausedValue,
    corpusLost: uninterruptedValue - pausedValue,
    contributionsSkipped: monthlyInvestment * pauseMonths,
  };
}

/** Future cost of a present-day expense after a number of years of inflation. */
export function calculateInflatedCost(
  presentCost: number,
  inflationPercent: number,
  years: number,
): number {
  return Math.round(presentCost * Math.pow(1 + inflationPercent / 100, years));
}

/**
 * Simplified ELSS tax-saving estimate: tax saved this year at the given slab rate
 * (capped at the Section 80C limit), plus the projected value of that investment
 * after the 3-year ELSS lock-in if it continues compounding at the expected return.
 */
export function calculateElssTaxSaving(
  annualInvestment: number,
  slabRatePercent: number,
  expectedReturnPercent: number,
): { taxSaved: number; lockInValue: number; section80cLimit: number } {
  const SECTION_80C_LIMIT = 150000;
  const eligibleInvestment = Math.min(annualInvestment, SECTION_80C_LIMIT);
  const taxSaved = Math.round(eligibleInvestment * (slabRatePercent / 100));
  const lockInValue = Math.round(
    annualInvestment * Math.pow(1 + expectedReturnPercent / 100, 3),
  );
  return { taxSaved, lockInValue, section80cLimit: SECTION_80C_LIMIT };
}

/**
 * Required retirement corpus using a real-return (inflation-adjusted) annuity model.
 * Estimates the lump sum needed at retirement to sustain inflation-adjusted monthly expenses
 * for `yearsInRetirement`, assuming the corpus continues to earn `postRetirementReturn`.
 */
export function calculateRetirementCorpus(params: {
  currentAge: number;
  retirementAge: number;
  monthlyExpensesToday: number;
  inflationPercent: number;
  postRetirementReturnPercent: number;
  yearsInRetirement?: number;
}): number {
  const {
    currentAge,
    retirementAge,
    monthlyExpensesToday,
    inflationPercent,
    postRetirementReturnPercent,
    yearsInRetirement = 25,
  } = params;

  const yearsToRetirement = Math.max(retirementAge - currentAge, 1);
  const monthlyExpenseAtRetirement =
    monthlyExpensesToday *
    Math.pow(1 + inflationPercent / 100, yearsToRetirement);
  const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12;

  const realReturn =
    (1 + postRetirementReturnPercent / 100) / (1 + inflationPercent / 100) - 1;

  if (realReturn <= 0) {
    return Math.round(annualExpenseAtRetirement * yearsInRetirement);
  }

  const corpus =
    (annualExpenseAtRetirement *
      (1 - Math.pow(1 + realReturn, -yearsInRetirement))) /
    realReturn;

  return Math.round(corpus);
}
