import type { InvestmentGoal } from "@/types";

export const INVESTMENT_GOALS: InvestmentGoal[] = [
  {
    id: "retirement",
    icon: "Sunrise",
    title: "Retirement",
    description: "Build a corpus to keep your post-work years stress-free.",
    href: "/calculators/retirement-planner",
  },
  {
    id: "child_education",
    icon: "GraduationCap",
    title: "Child Education",
    description: "Secure their future with inflation-beating returns.",
    href: "/calculators/child-education",
  },
  {
    id: "marriage",
    icon: "Heart",
    title: "Marriage",
    description: "Plan for a grand celebration without debt.",
    href: "/calculators/marriage-planner",
  },
  {
    id: "dream_home",
    icon: "Home",
    title: "Dream House",
    description: "Save for your down payment systematically.",
    href: "/calculators/dream-home",
  },
];
