import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "SEBI Disclaimers — FutureFund.in",
  description:
    "Regulatory disclosures and disclaimers required under SEBI and AMFI guidelines.",
};

export default function SebiDisclaimerPage() {
  return (
    <LegalLayout
      title="SEBI Disclaimers"
      lastUpdated="June 1, 2024"
      sections={[
        {
          heading: "Mutual Fund Risk Disclosure",
          body: [
            "Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The performances of the Mutual Fund Schemes are not guaranteed and may vary based on the factors and forces affecting capital markets.",
            "Past performance of any scheme is not an indication of its future performance. Investors should consult their own financial advisor before making any investment decision.",
          ],
        },
        {
          heading: "Distributor Status",
          body: [
            "FutureFund.in is an AMFI Registered Mutual Fund Distributor, ARN-123456. As a distributor, we earn a commission from Asset Management Companies (AMCs) for facilitating investments — this does not affect the price you pay for a mutual fund unit.",
            "We are not a SEBI-registered Research Analyst or Investment Adviser unless explicitly stated for a specific paid advisory service.",
          ],
        },
        {
          heading: "No Assured Returns",
          body: [
            "Any return figures, projections, or illustrations shown on this platform — including in our calculators — are based on assumed rates and are illustrative only. They do not represent any assurance, guarantee, or promise of actual returns from any scheme.",
          ],
        },
        {
          heading: "Statutory Details",
          body: [
            "Name of Distributor: FutureFund.in Financial Services. ARN: ARN-123456. Registered Office: Crystal Tower, 4th Floor, BKC, Mumbai 400051. For any grievances, please contact contact@futurefund.in.",
          ],
        },
      ]}
    />
  );
}
