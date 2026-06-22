export type Locale = "en" | "hi" | "mr";

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface InvestmentGoal {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  excerpt: string;
  category:
    | "Basics"
    | "Strategy"
    | "Market Insights"
    | "Advanced"
    | "Intermediate";
  level: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  content?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
  photo?: string;
  city?: string;
  verified?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FundHouse {
  name: string;
}

/* ---------------- Investment Quiz ---------------- */

export type KycStatus = "verified" | "pending" | "not_started";

export interface QuizPersonalDetails {
  fullName: string;
  phone: string;
  email: string;
  kycStatus: KycStatus;
}

export type EmploymentType =
  | "salaried"
  | "self_employed"
  | "business_owner"
  | "retired";

export interface QuizFinancialDetails {
  monthlyIncome: number;
  monthlyExpenses: number;
  existingInvestments: number;
  employmentType: EmploymentType;
}

export type RiskAnswer = "a" | "b" | "c" | "d";

export interface QuizRiskProfile {
  marketDropReaction: RiskAnswer | null;
  investmentHorizon: RiskAnswer | null;
  experienceLevel: RiskAnswer | null;
  incomeStability: RiskAnswer | null;
}

export type GoalId =
  | "retirement"
  | "child_education"
  | "marriage"
  | "dream_home"
  | "wealth_creation"
  | "tax_saving";

export interface QuizGoals {
  selectedGoals: GoalId[];
  targetAmount: number;
  timeHorizonYears: number;
  monthlySipBudget: number;
}

export interface QuizState {
  step: number;
  personal: QuizPersonalDetails;
  financial: QuizFinancialDetails;
  risk: QuizRiskProfile;
  goals: QuizGoals;
  completed: boolean;
}

export interface QuizResult {
  riskScore: number;
  riskCategory:
    | "Conservative"
    | "Moderate"
    | "Balanced"
    | "Aggressive"
    | "Very Aggressive";
  recommendedEquityDebtSplit: { equity: number; debt: number };
  suggestedMonthlySip: number;
  recommendedFundTypes: string[];
}
