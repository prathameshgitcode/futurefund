import { z } from "zod";

export const personalSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address"),
  kycStatus: z.enum(["verified", "pending", "not_started"]),
});

export type PersonalFormValues = z.infer<typeof personalSchema>;

export const financialSchema = z.object({
  monthlyIncome: z.coerce.number().min(1000, "Enter your monthly income"),
  monthlyExpenses: z.coerce.number().min(0, "Enter your monthly expenses"),
  existingInvestments: z.coerce.number().min(0, "Enter a value, or 0 if none"),
  employmentType: z.enum([
    "salaried",
    "self_employed",
    "business_owner",
    "retired",
  ]),
});

export type FinancialFormValues = z.infer<typeof financialSchema>;

export const riskSchema = z.object({
  marketDropReaction: z.enum(["a", "b", "c", "d"]),
  investmentHorizon: z.enum(["a", "b", "c", "d"]),
  experienceLevel: z.enum(["a", "b", "c", "d"]),
  incomeStability: z.enum(["a", "b", "c", "d"]),
});

export type RiskFormValues = z.infer<typeof riskSchema>;

export const goalsSchema = z.object({
  selectedGoals: z.array(z.string()).min(1, "Select at least one goal"),
  targetAmount: z.coerce.number().min(10000, "Enter a target amount"),
  timeHorizonYears: z.coerce.number().min(1).max(40),
  monthlySipBudget: z.coerce.number().min(500, "Minimum SIP is ₹500"),
});

export type GoalsFormValues = z.infer<typeof goalsSchema>;
