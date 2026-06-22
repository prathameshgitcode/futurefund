import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Investor Charter — FutureFund.in",
  description:
    "Your rights and responsibilities as an investor, and how to raise a grievance with FutureFund.in.",
};

export default function InvestorCharterPage() {
  return (
    <LegalLayout
      title="Investor Charter"
      lastUpdated="June 1, 2024"
      intro="This Investor Charter outlines the services we provide as a Mutual Fund Distributor, your rights as an investor, and the process for raising and resolving grievances."
      sections={[
        {
          heading: "Services Provided",
          body: [
            "Assistance with mutual fund scheme selection based on your stated goals and risk profile, facilitation of investment transactions, access to consolidated account statements, and ongoing portfolio review support.",
          ],
        },
        {
          heading: "Your Rights as an Investor",
          body: [
            "You have the right to receive clear, accurate information about any scheme before investing, including its risk level, expense ratio, and exit load.",
            "You have the right to receive your account statements and transaction confirmations in a timely manner, and to redeem your investments as per the scheme's terms.",
            "You have the right to lodge a grievance and receive a response within a reasonable timeframe.",
          ],
        },
        {
          heading: "Your Responsibilities",
          body: [
            "Complete your KYC accurately and keep your contact details updated. Read scheme-related documents before investing. Ask questions if any recommendation is unclear before proceeding.",
          ],
        },
        {
          heading: "Grievance Redressal Process",
          body: [
            "Step 1: Reach out to our support team at contact@futurefund.in or call our helpline — most queries are resolved within 3 business days.",
            "Step 2: If unresolved, escalate in writing to our Grievance Officer at the same email with subject line 'Escalation'. We aim to respond within 7 business days.",
            "Step 3: If still unresolved, you may approach SEBI's SCORES platform (https://scores.gov.in) or the relevant AMC's investor service center directly.",
          ],
        },
        {
          heading: "Timelines",
          body: [
            "Acknowledgement of a grievance: within 24 hours. Resolution or substantive response: within 7 working days, except in cases requiring documentation from a third party (such as an AMC or registrar), where we will keep you informed of progress.",
          ],
        },
      ]}
    />
  );
}
