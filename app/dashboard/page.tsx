"use client";

import { Plus } from "lucide-react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MobileDashboardNav } from "@/components/dashboard/MobileDashboardNav";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { StatCards } from "@/components/dashboard/StatCards";
import { FinancialGoals } from "@/components/dashboard/FinancialGoals";
import { WealthGrowthChart } from "@/components/dashboard/WealthGrowthChart";
import { UpcomingSips } from "@/components/dashboard/UpcomingSips";
import { QuickLinks } from "@/components/dashboard/QuickLinks";
import { FundPerformanceTable } from "@/components/dashboard/FundPerformanceTable";
import { MilestoneCelebration } from "@/components/dashboard/MilestoneCelebration";
import { MonthlyDigest } from "@/components/dashboard/MonthlyDigest";

export default function DashboardPage() {
  const { dict } = useTranslation();
  const t = dict.dashboard;
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-bg">
      <DashboardSidebar />

      <div className="flex-1 min-w-0">
        <MobileDashboardNav />

        <div className="p-5 lg:p-8">
          <DashboardTopbar />

          <div className="mb-7">
            <h2 className="text-2xl font-bold mb-1.5">
              {t.welcomeBack}, Rohan
            </h2>
            <p className="text-sm text-ink-muted">
              {t.portfolioUp}{" "}
              <span className="font-semibold text-green-600">+12.4%</span>{" "}
              {t.sinceLastMonth}
            </p>
          </div>

          <MilestoneCelebration />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <div className="lg:col-span-2 flex flex-col gap-5">
              <StatCards />
              <WealthGrowthChart />
            </div>
            <div className="flex flex-col gap-5">
              <FinancialGoals />
              <MonthlyDigest />
              <UpcomingSips />
              <QuickLinks />
            </div>
          </div>

          <FundPerformanceTable />
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push("/quiz")}
        className="focus-ring fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-lg hover:bg-black transition-colors cursor-pointer"
        aria-label="Start new SIP"
        title="Start a new SIP"
      >
        <Plus size={20} />
      </button>
    </div>
  );
}
