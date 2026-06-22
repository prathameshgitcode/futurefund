import {
  HEALTH_QUESTIONS,
  MAX_SCORE,
  scoreToResult,
} from "@/lib/sipHealthCheck";

describe("HEALTH_QUESTIONS", () => {
  it("has exactly 5 questions", () => {
    expect(HEALTH_QUESTIONS).toHaveLength(5);
  });

  it("every question has at least 2 options", () => {
    HEALTH_QUESTIONS.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("every question has a non-empty emoji and text", () => {
    HEALTH_QUESTIONS.forEach((q) => {
      expect(q.emoji).toBeTruthy();
      expect(q.question.length).toBeGreaterThan(5);
    });
  });
});

describe("MAX_SCORE", () => {
  it("is greater than 0", () => {
    expect(MAX_SCORE).toBeGreaterThan(0);
  });

  it("equals sum of max points per question", () => {
    const manual = HEALTH_QUESTIONS.reduce(
      (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
      0,
    );
    expect(MAX_SCORE).toBe(manual);
  });
});

describe("scoreToResult", () => {
  it("returns Excellent for max score", () => {
    const result = scoreToResult(MAX_SCORE);
    expect(result.grade).toBe("Excellent");
    expect(result.score).toBe(100);
  });

  it("returns At Risk for 0 points", () => {
    const result = scoreToResult(0);
    expect(result.grade).toBe("At Risk");
    expect(result.score).toBe(0);
  });

  it("score is between 0 and 100 for any input", () => {
    [0, MAX_SCORE / 4, MAX_SCORE / 2, MAX_SCORE].forEach((raw) => {
      const result = scoreToResult(raw);
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });
  });

  it("includes a color class and non-empty summary", () => {
    const result = scoreToResult(MAX_SCORE / 2);
    expect(result.color).toMatch(/^text-/);
    expect(result.summary.length).toBeGreaterThan(10);
  });

  it("boundary: score 80 is Excellent", () => {
    const raw = Math.round((80 / 100) * MAX_SCORE);
    expect(scoreToResult(raw).grade).toBe("Excellent");
  });

  it("boundary: score just below 35 is At Risk", () => {
    const raw = Math.round((34 / 100) * MAX_SCORE);
    expect(scoreToResult(raw).grade).toBe("At Risk");
  });
});
