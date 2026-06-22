import {
  calculateSipFutureValue,
  calculateLumpsumFutureValue,
  calculateRequiredSip,
  calculateStepUpSipFutureValue,
  calculateSwpProjection,
  calculateSipPauseCost,
  calculateCompoundInterest,
  calculateInflatedCost,
  calculateElssTaxSaving,
  calculateRetirementCorpus,
  formatINR,
  formatINRShort,
} from "@/lib/utils/calculators";

describe("calculateSipFutureValue", () => {
  it("returns investedAmount for 0% return", () => {
    const result = calculateSipFutureValue(1000, 0, 5);
    expect(result.futureValue).toBe(result.investedAmount);
    expect(result.estimatedGain).toBe(0);
    expect(result.investedAmount).toBe(60000);
  });

  it("computes future value at 12% for 10 years", () => {
    const result = calculateSipFutureValue(5000, 12, 10);
    expect(result.futureValue).toBeGreaterThan(result.investedAmount);
    expect(result.investedAmount).toBe(600000);
    expect(result.estimatedGain).toBe(
      result.futureValue - result.investedAmount,
    );
  });

  it("future value grows with longer duration", () => {
    const ten = calculateSipFutureValue(5000, 12, 10);
    const twenty = calculateSipFutureValue(5000, 12, 20);
    expect(twenty.futureValue).toBeGreaterThan(ten.futureValue);
  });

  it("future value grows with higher return rate", () => {
    const low = calculateSipFutureValue(5000, 8, 10);
    const high = calculateSipFutureValue(5000, 15, 10);
    expect(high.futureValue).toBeGreaterThan(low.futureValue);
  });

  it("returns rounded integers", () => {
    const result = calculateSipFutureValue(3333, 11.5, 7);
    expect(Number.isInteger(result.futureValue)).toBe(true);
    expect(Number.isInteger(result.investedAmount)).toBe(true);
    expect(Number.isInteger(result.estimatedGain)).toBe(true);
  });
});

describe("calculateLumpsumFutureValue", () => {
  it("doubles a 1L lump sum at 72/years rule roughly", () => {
    const result = calculateLumpsumFutureValue(100000, 12, 6);
    expect(result.futureValue).toBeGreaterThan(150000);
  });

  it("investedAmount equals principal", () => {
    const result = calculateLumpsumFutureValue(50000, 10, 5);
    expect(result.investedAmount).toBe(50000);
  });
});

describe("calculateRequiredSip", () => {
  it("returns a positive SIP amount for any target", () => {
    const sip = calculateRequiredSip(1000000, 12, 10);
    expect(sip).toBeGreaterThan(0);
  });

  it("SIP computes back to roughly the target when invested", () => {
    const target = 2000000;
    const sip = calculateRequiredSip(target, 12, 10);
    const result = calculateSipFutureValue(sip, 12, 10);
    expect(result.futureValue).toBeCloseTo(target, -4);
  });

  it("handles 0% return (simple division)", () => {
    const sip = calculateRequiredSip(120000, 0, 10);
    expect(sip).toBe(1000);
  });
});

describe("calculateStepUpSipFutureValue", () => {
  it("step-up SIP beats non-step-up SIP", () => {
    const plain = calculateSipFutureValue(5000, 12, 15);
    const stepUp = calculateStepUpSipFutureValue(5000, 12, 15, 10);
    expect(stepUp.futureValue).toBeGreaterThan(plain.futureValue);
  });

  it("0% step-up is close to plain SIP (within 5%)", () => {
    const plain = calculateSipFutureValue(5000, 12, 15);
    const noStep = calculateStepUpSipFutureValue(5000, 12, 15, 0);
    const diff = Math.abs(noStep.futureValue - plain.futureValue);
    expect(diff / plain.futureValue).toBeLessThan(0.05);
  });
});

describe("calculateSwpProjection", () => {
  it("large enough corpus does not deplete", () => {
    const result = calculateSwpProjection(10000000, 10000, 8, 20);
    expect(result.depletesEarly).toBe(false);
    expect(result.remainingBalance).toBeGreaterThan(0);
  });

  it("tiny corpus with large withdrawal depletes early", () => {
    const result = calculateSwpProjection(100000, 50000, 6, 10);
    expect(result.depletesEarly).toBe(true);
  });

  it("total withdrawn never exceeds months * withdrawal when depletes", () => {
    const withdrawal = 30000;
    const result = calculateSwpProjection(50000, withdrawal, 6, 5);
    expect(result.totalWithdrawn).toBeLessThanOrEqual(
      withdrawal * result.monthsLasted,
    );
  });
});

describe("calculateSipPauseCost", () => {
  it("pausing costs more than just the skipped contributions", () => {
    const result = calculateSipPauseCost({
      monthlyInvestment: 10000,
      annualReturnPercent: 12,
      totalYears: 15,
      pauseMonths: 6,
    });
    expect(result.corpusLost).toBeGreaterThan(result.contributionsSkipped);
  });

  it("contributionsSkipped equals monthlyInvestment × pauseMonths", () => {
    const result = calculateSipPauseCost({
      monthlyInvestment: 5000,
      annualReturnPercent: 12,
      totalYears: 10,
      pauseMonths: 3,
    });
    expect(result.contributionsSkipped).toBe(15000);
  });

  it("0 pause months has 0 corpus lost", () => {
    const result = calculateSipPauseCost({
      monthlyInvestment: 10000,
      annualReturnPercent: 12,
      totalYears: 10,
      pauseMonths: 0,
    });
    expect(result.corpusLost).toBe(0);
  });
});

describe("calculateCompoundInterest", () => {
  it("annual compounding grows 1 lakh at 10% for 10 years", () => {
    const result = calculateCompoundInterest(100000, 10, 10, 1);
    expect(result.futureValue).toBeCloseTo(259374, -2);
  });

  it("more frequent compounding yields more", () => {
    const annual = calculateCompoundInterest(100000, 10, 10, 1);
    const monthly = calculateCompoundInterest(100000, 10, 10, 12);
    expect(monthly.futureValue).toBeGreaterThan(annual.futureValue);
  });
});

describe("calculateInflatedCost", () => {
  it("doubles cost at ~6% over 12 years", () => {
    const result = calculateInflatedCost(100000, 6, 12);
    expect(result).toBeGreaterThan(200000);
  });

  it("returns original cost when inflation is 0", () => {
    expect(calculateInflatedCost(50000, 0, 10)).toBe(50000);
  });
});

describe("calculateElssTaxSaving", () => {
  it("caps eligible investment at 1.5L Section 80C limit", () => {
    const result = calculateElssTaxSaving(200000, 30, 12);
    expect(result.section80cLimit).toBe(150000);
    expect(result.taxSaved).toBe(45000);
  });

  it("returns correct tax saved at 20% slab for 1L investment", () => {
    const result = calculateElssTaxSaving(100000, 20, 12);
    expect(result.taxSaved).toBe(20000);
  });
});

describe("calculateRetirementCorpus", () => {
  it("returns a positive number", () => {
    const corpus = calculateRetirementCorpus({
      currentAge: 30,
      retirementAge: 60,
      monthlyExpensesToday: 50000,
      inflationPercent: 6,
      postRetirementReturnPercent: 8,
    });
    expect(corpus).toBeGreaterThan(0);
  });

  it("older person with less time needs higher SIP", () => {
    const young = calculateRetirementCorpus({
      currentAge: 25,
      retirementAge: 60,
      monthlyExpensesToday: 30000,
      inflationPercent: 6,
      postRetirementReturnPercent: 8,
    });
    const old = calculateRetirementCorpus({
      currentAge: 45,
      retirementAge: 60,
      monthlyExpensesToday: 30000,
      inflationPercent: 6,
      postRetirementReturnPercent: 8,
    });
    expect(old).toBeLessThan(young);
  });
});

describe("formatINR", () => {
  it("formats with ₹ symbol", () => {
    const formatted = formatINR(10000);
    expect(formatted).toContain("₹");
  });

  it("uses Indian number grouping", () => {
    const formatted = formatINR(1000000);
    expect(formatted).toContain("10,00,000");
  });
});

describe("formatINRShort", () => {
  it("formats crore amounts", () => {
    expect(formatINRShort(15000000)).toBe("₹1.5 Cr");
  });

  it("formats lakh amounts", () => {
    expect(formatINRShort(250000)).toBe("₹2.5 L");
  });

  it("falls back to formatINR for small amounts", () => {
    const result = formatINRShort(5000);
    expect(result).toContain("₹");
  });
});
