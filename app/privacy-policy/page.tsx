import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — FutureFund.in",
  description:
    "How FutureFund.in collects, uses, and protects your personal and financial information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="June 1, 2024"
      intro="FutureFund.in (“we”, “us”, “our”) respects your privacy. This policy explains what information we collect, why we collect it, and how we keep it safe when you use our website, calculators, and advisory services."
      sections={[
        {
          heading: "1. Information We Collect",
          body: [
            "We collect information you provide directly — such as your name, phone number, email address, and financial details — when you take our investment quiz, request a portfolio review, or contact our advisors.",
            "We also collect limited technical information automatically, such as browser type, device type, and pages visited, to help us improve the platform. We do not sell this information to third parties.",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          body: [
            "Your information is used to personalize investment recommendations, respond to your inquiries, process portfolio reviews, and send you relevant updates if you've opted in to our newsletter.",
            "Financial details submitted through our quiz or portfolio review tools are used solely to generate your results and are not shared with mutual fund houses or other third parties without your explicit consent.",
          ],
        },
        {
          heading: "3. Data Storage & Security",
          body: [
            "We use industry-standard encryption (TLS in transit, AES at rest) to protect your data. Portfolio statements you upload for review are processed to generate your analysis and are not retained longer than necessary for that purpose.",
            "Access to client data within FutureFund.in is restricted to authorized personnel directly involved in providing your advisory services.",
          ],
        },
        {
          heading: "4. Your Rights",
          body: [
            "You may request access to, correction of, or deletion of your personal data at any time by contacting us at contact@futurefund.in. We will respond to verified requests within a reasonable timeframe as required by applicable law.",
          ],
        },
        {
          heading: "5. Cookies",
          body: [
            "We use essential cookies to keep you logged in and remember your language preference. We do not use third-party advertising trackers on this platform.",
          ],
        },
        {
          heading: "6. Changes to This Policy",
          body: [
            "We may update this policy from time to time. Material changes will be communicated via a notice on this page or, where appropriate, directly to registered users.",
          ],
        },
        {
          heading: "7. Contact Us",
          body: [
            "Questions about this policy can be directed to contact@futurefund.in or via the Contact page on this site.",
          ],
        },
      ]}
    />
  );
}
