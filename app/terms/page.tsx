import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service — FutureFund.in",
  description:
    "The terms and conditions governing your use of the FutureFund.in platform.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="June 1, 2024"
      intro="These Terms of Service govern your access to and use of FutureFund.in's website, calculators, investment quiz, and advisory services. By using this platform, you agree to these terms."
      sections={[
        {
          heading: "1. Nature of Our Services",
          body: [
            "FutureFund.in is an AMFI-registered mutual fund distributor. We facilitate investments in mutual fund schemes and provide educational tools, calculators, and general guidance. We are not a SEBI-registered Investment Adviser, and content on this platform should not be construed as personalized investment advice unless explicitly provided through a paid advisory engagement.",
          ],
        },
        {
          heading: "2. Eligibility",
          body: [
            "You must be at least 18 years old and capable of entering into a legally binding agreement to use our investment services. Mutual fund investments require valid KYC compliance as mandated by SEBI.",
          ],
        },
        {
          heading: "3. Calculators & Tools",
          body: [
            "All calculators, projections, and illustrations on this platform (including the SIP, retirement, and goal-planning tools) are for educational and illustrative purposes only. They rely on assumed rates of return and inflation, and actual investment outcomes will vary and may be lower or higher than illustrated.",
          ],
        },
        {
          heading: "4. Portfolio Review Tool",
          body: [
            "The portfolio analysis feature uses an automated model to generate observations about uploaded statements. It is a decision-support tool, not a substitute for professional financial advice, and should be read alongside a conversation with a qualified advisor before acting on any recommendation.",
          ],
        },
        {
          heading: "5. No Guarantee of Returns",
          body: [
            "Mutual fund investments are subject to market risk. Past performance of any scheme is not indicative of future returns. FutureFund.in does not guarantee any specific outcome from investments made through the platform.",
          ],
        },
        {
          heading: "6. User Responsibilities",
          body: [
            "You are responsible for the accuracy of information you provide, including financial details used in our calculators and quiz. You agree not to misuse the platform, attempt unauthorized access, or upload malicious files.",
          ],
        },
        {
          heading: "7. Limitation of Liability",
          body: [
            "To the maximum extent permitted by law, FutureFund.in and its affiliates are not liable for any indirect, incidental, or consequential damages arising from your use of this platform or reliance on its tools and content.",
          ],
        },
        {
          heading: "8. Governing Law",
          body: [
            "These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.",
          ],
        },
      ]}
    />
  );
}
