/**
 * Scoring engine for the SIP Health Check.
 * Five quick questions → a 0-100 health score, a grade, and tailored tips.
 */

export interface HealthQuestion {
  id: string;
  question: string;
  emoji: string;
  options: { label: string; points: number; tip?: string }[];
}

export const HEALTH_QUESTIONS: HealthQuestion[] = [
  {
    id: "running",
    emoji: "🏃",
    question: "How long have you been running your SIP?",
    options: [
      {
        label: "Haven't started yet",
        points: 0,
        tip: "Starting early is the single biggest advantage. Even ₹500/month compounds dramatically over time.",
      },
      {
        label: "Less than 1 year",
        points: 10,
        tip: "Great start! The first year is about building the habit. Stay consistent.",
      },
      {
        label: "1–3 years",
        points: 18,
        tip: "You're past the hardest part. Now focus on increasing your SIP yearly.",
      },
      {
        label: "3+ years",
        points: 25,
        tip: "Excellent discipline — you've ridden at least one market cycle.",
      },
    ],
  },
  {
    id: "stepup",
    emoji: "📈",
    question: "Do you increase your SIP amount every year?",
    options: [
      {
        label: "No, it's the same as day one",
        points: 0,
        tip: "A 10% step-up each year can nearly double your final corpus. Easy win.",
      },
      {
        label: "Sometimes, when I remember",
        points: 10,
        tip: "Automate an annual step-up so it happens without effort.",
      },
      {
        label: "Yes, every year",
        points: 20,
        tip: "This is what separates good investors from great ones.",
      },
    ],
  },
  {
    id: "diversify",
    emoji: "🧺",
    question: "How many funds is your money spread across?",
    options: [
      {
        label: "Just 1 fund",
        points: 6,
        tip: "Consider 2–4 funds across categories to reduce single-fund risk.",
      },
      {
        label: "2–4 funds",
        points: 20,
        tip: "Ideal — diversified without being over-complicated.",
      },
      {
        label: "5 or more funds",
        points: 12,
        tip: "You may be over-diversified. Too many funds dilute returns and add admin.",
      },
      {
        label: "Not sure",
        points: 4,
        tip: "Let's review your portfolio together to map out your allocation.",
      },
    ],
  },
  {
    id: "reaction",
    emoji: "📉",
    question: "What do you do when the market falls sharply?",
    options: [
      {
        label: "Stop or pause my SIP",
        points: 0,
        tip: "Pausing in a dip means missing units at the cheapest prices — the opposite of what you want.",
      },
      {
        label: "Do nothing, let it run",
        points: 18,
        tip: "Perfect. Discipline through dips is where real wealth is made.",
      },
      {
        label: "Invest extra when it's down",
        points: 25,
        tip: "Advanced move — buying more when others panic accelerates compounding.",
      },
    ],
  },
  {
    id: "goal",
    emoji: "🎯",
    question: "Is your SIP linked to a specific goal?",
    options: [
      {
        label: "No specific goal",
        points: 4,
        tip: "Goal-linked SIPs are far more motivating — and you'll know exactly how much you need.",
      },
      {
        label: "A rough idea",
        points: 8,
        tip: "Let's put a number and a date on it so we can size your SIP correctly.",
      },
      {
        label: "Yes — clear goal & target",
        points: 10,
        tip: "You're investing with purpose. That's the strongest predictor of success.",
      },
    ],
  },
];

export const MAX_SCORE = HEALTH_QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
  0,
);

export interface HealthResult {
  score: number; // 0-100 normalised
  grade: "Excellent" | "Healthy" | "Needs Attention" | "At Risk";
  color: string; // tailwind text color class
  summary: string;
}

export function scoreToResult(rawPoints: number): HealthResult {
  const score = Math.round((rawPoints / MAX_SCORE) * 100);
  if (score >= 80)
    return {
      score,
      grade: "Excellent",
      color: "text-green-600",
      summary:
        "Your SIP is in top shape. You're doing what most investors only wish they did.",
    };
  if (score >= 60)
    return {
      score,
      grade: "Healthy",
      color: "text-green-600",
      summary:
        "Solid foundation. A few small tweaks could meaningfully boost your long-term corpus.",
    };
  if (score >= 35)
    return {
      score,
      grade: "Needs Attention",
      color: "text-amber-500",
      summary:
        "You're invested, but leaving growth on the table. Let's fix the gaps below.",
    };
  return {
    score,
    grade: "At Risk",
    color: "text-red-500",
    summary:
      "Your SIP strategy has serious gaps. The good news: every one of them is easy to fix.",
  };
}
