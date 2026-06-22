import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  GoalId,
  QuizFinancialDetails,
  QuizGoals,
  QuizPersonalDetails,
  QuizResult,
  QuizRiskProfile,
  RiskAnswer,
} from "@/types";

interface QuizStore {
  step: number;
  personal: QuizPersonalDetails;
  financial: QuizFinancialDetails;
  risk: QuizRiskProfile;
  goals: QuizGoals;
  completed: boolean;

  setStep: (step: number) => void;
  updatePersonal: (data: Partial<QuizPersonalDetails>) => void;
  updateFinancial: (data: Partial<QuizFinancialDetails>) => void;
  updateRisk: (data: Partial<QuizRiskProfile>) => void;
  updateGoals: (data: Partial<QuizGoals>) => void;
  toggleGoal: (goal: GoalId) => void;
  complete: () => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  personal: {
    fullName: "",
    phone: "",
    email: "",
    kycStatus: "verified" as const,
  },
  financial: {
    monthlyIncome: 75000,
    monthlyExpenses: 35000,
    existingInvestments: 200000,
    employmentType: "salaried" as const,
  },
  risk: {
    marketDropReaction: null,
    investmentHorizon: null,
    experienceLevel: null,
    incomeStability: null,
  },
  goals: {
    selectedGoals: [],
    targetAmount: 5000000,
    timeHorizonYears: 10,
    monthlySipBudget: 10000,
  },
  completed: false,
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      updatePersonal: (data) =>
        set((s) => ({ personal: { ...s.personal, ...data } })),
      updateFinancial: (data) =>
        set((s) => ({ financial: { ...s.financial, ...data } })),
      updateRisk: (data) => set((s) => ({ risk: { ...s.risk, ...data } })),
      updateGoals: (data) => set((s) => ({ goals: { ...s.goals, ...data } })),
      toggleGoal: (goal) =>
        set((s) => {
          const has = s.goals.selectedGoals.includes(goal);
          return {
            goals: {
              ...s.goals,
              selectedGoals: has
                ? s.goals.selectedGoals.filter((g) => g !== goal)
                : [...s.goals.selectedGoals, goal],
            },
          };
        }),
      complete: () => set({ completed: true }),
      reset: () => set({ ...initialState }),
    }),
    { name: "sipguru_quiz_progress" },
  ),
);

const RISK_ANSWER_SCORE: Record<RiskAnswer, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

export function scoreRiskProfile(risk: QuizRiskProfile): QuizResult {
  const answers = [
    risk.marketDropReaction,
    risk.investmentHorizon,
    risk.experienceLevel,
    risk.incomeStability,
  ];

  const answered = answers.filter((a): a is RiskAnswer => a !== null);
  const totalScore = answered.reduce((sum, a) => sum + RISK_ANSWER_SCORE[a], 0);
  // Score range: 4 (min, all 'a') to 16 (max, all 'd')
  const normalizedScore = Math.round((totalScore / 16) * 100);

  let riskCategory: QuizResult["riskCategory"];
  let equity: number;
  let debt: number;
  let fundTypes: string[];

  if (normalizedScore <= 35) {
    riskCategory = "Conservative";
    equity = 25;
    debt = 75;
    fundTypes = ["Debt Funds", "Hybrid Conservative Funds", "Liquid Funds"];
  } else if (normalizedScore <= 55) {
    riskCategory = "Moderate";
    equity = 45;
    debt = 55;
    fundTypes = ["Hybrid Funds", "Large Cap Funds", "Debt Funds"];
  } else if (normalizedScore <= 70) {
    riskCategory = "Balanced";
    equity = 65;
    debt = 35;
    fundTypes = ["Large Cap Funds", "Flexi Cap Funds", "Hybrid Funds"];
  } else if (normalizedScore <= 85) {
    riskCategory = "Aggressive";
    equity = 80;
    debt = 20;
    fundTypes = ["Flexi Cap Funds", "Mid Cap Funds", "ELSS Funds"];
  } else {
    riskCategory = "Very Aggressive";
    equity = 90;
    debt = 10;
    fundTypes = ["Small Cap Funds", "Mid Cap Funds", "Sectoral/Thematic Funds"];
  }

  return {
    riskScore: normalizedScore,
    riskCategory,
    recommendedEquityDebtSplit: { equity, debt },
    suggestedMonthlySip: 0, // filled in by caller using goals data
    recommendedFundTypes: fundTypes,
  };
}
