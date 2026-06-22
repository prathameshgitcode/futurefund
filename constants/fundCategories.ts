export type RiskLevel =
  | "Low"
  | "Low to Moderate"
  | "Moderate"
  | "Moderate to High"
  | "Moderately High"
  | "Very High";

export interface FundCategory {
  id: string;
  name: string;
  icon: "building" | "trendingUp" | "rocket" | "shuffle" | "scale" | "landmark";
  riskLevel: RiskLevel;
  returnsPotential: string;
  description: string;
  whoShouldInvest: string;
  ctaLabel: string;
  highlight?: boolean;
  trend: "up" | "zigzag" | "volatile" | "flat";
}

export const FUND_CATEGORIES: FundCategory[] = [
  {
    id: "large-cap",
    name: "Large Cap",
    icon: "building",
    riskLevel: "Moderate",
    returnsPotential: "12-15% p.a.",
    description:
      "Invest in India's top 100 established companies for steady, reliable long-term returns.",
    whoShouldInvest:
      "Investors seeking wealth preservation with moderate growth over 5+ years.",
    ctaLabel: "View Funds",
    trend: "up",
  },
  {
    id: "mid-cap",
    name: "Mid Cap",
    icon: "trendingUp",
    riskLevel: "Moderately High",
    returnsPotential: "15-18% p.a.",
    description:
      "Focus on emerging leaders with high growth potential but higher market volatility.",
    whoShouldInvest:
      "Growth-oriented investors comfortable with temporary market fluctuations.",
    ctaLabel: "View Funds",
    trend: "zigzag",
  },
  {
    id: "small-cap",
    name: "Small Cap",
    icon: "rocket",
    riskLevel: "Very High",
    returnsPotential: "18%+ p.a.",
    description:
      "Aggressive growth strategy investing in small companies poised for exponential rise.",
    whoShouldInvest:
      "High-risk takers with a 7-10 year horizon seeking maximum wealth creation.",
    ctaLabel: "Start High Growth SIP",
    highlight: true,
    trend: "volatile",
  },
  {
    id: "flexi-cap",
    name: "Flexi Cap",
    icon: "shuffle",
    riskLevel: "Moderate to High",
    returnsPotential: "14-16% p.a.",
    description:
      "Dynamic funds that move between Large, Mid, and Small caps based on market outlook.",
    whoShouldInvest:
      "Investors who want a single fund solution managed by expert tactical allocation.",
    ctaLabel: "Explore Options",
    trend: "up",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    icon: "scale",
    riskLevel: "Low to Moderate",
    returnsPotential: "10-13% p.a.",
    description:
      "Balanced mix of Equity and Debt to minimize risk while capturing equity growth.",
    whoShouldInvest:
      "Conservative investors looking for better returns than FD with managed risk.",
    ctaLabel: "Explore Options",
    trend: "flat",
  },
  {
    id: "debt",
    name: "Debt",
    icon: "landmark",
    riskLevel: "Low",
    returnsPotential: "6-8% p.a.",
    description:
      "Fixed-income securities like bonds and treasury bills for capital protection.",
    whoShouldInvest:
      "Investors with short-term goals (1-3 years) prioritizing safety over growth.",
    ctaLabel: "Explore Options",
    trend: "flat",
  },
];
