import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CalculatorsGrid } from "@/components/calculators/CalculatorsGrid";

export const metadata: Metadata = {
  title: "All Calculators — FutureFund.in",
  description:
    "SIP, lumpsum, retirement, goal-based, and tax-saving calculators to plan every stage of your financial journey.",
};

export default function CalculatorsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container-page pt-12 pb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            All Calculators
          </h1>
          <p className="text-sm text-ink-muted max-w-lg leading-relaxed">
            Every tool you need to plan, project, and track your financial goals
            — from a simple SIP estimate to a full retirement roadmap.
          </p>
        </section>

        <CalculatorsGrid />
      </main>
      <Footer />
    </>
  );
}
