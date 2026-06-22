"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortfolioStepper } from "@/components/portfolio/PortfolioStepper";
import { ConnectStep } from "@/components/portfolio/ConnectStep";
import { UploadStep } from "@/components/portfolio/UploadStep";
import { ReviewResults } from "@/components/portfolio/ReviewResults";

const PORTFOLIO_FOOTER_COLUMNS = [
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "SEBI Disclaimers", href: "/sebi-disclaimer" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "Investor Charter", href: "/investor-charter" },
      { label: "Grievance Redressal", href: "/contact" },
    ],
  },
];

export default function PortfolioReviewPage() {
  const { dict } = useTranslation();
  const t = dict.portfolio;
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container-page py-10">
          <PortfolioStepper
            currentStep={step}
            labels={[t.stepConnect, t.stepUpload, t.stepReview]}
          />

          {step === 1 && <ConnectStep onNext={() => setStep(2)} />}
          {step === 2 && <UploadStep onAnalyzed={() => setStep(3)} />}
          {step === 3 && <ReviewResults onStartOver={() => setStep(2)} />}
        </div>
      </main>
      <Footer columns={PORTFOLIO_FOOTER_COLUMNS} showNewsletter={false} />
    </>
  );
}
