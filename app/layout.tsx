import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { SocialProofTicker } from "@/components/ui/SocialProofTicker";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { ReferralBanner } from "@/components/ui/ReferralBanner";
import { PushNotificationOptIn } from "@/components/ui/PushNotificationOptIn";
import { MarketReassuranceBanner } from "@/components/ui/MarketReassuranceBanner";
import { ChatBot } from "@/components/ui/ChatBot";
import "./globals.css";

export const metadata: Metadata = {
  title: "FutureFund.in — Invest Smart. Build Wealth. Achieve Your Dreams.",
  description:
    "SEBI registered SIP and mutual fund advisory platform. Goal-based investment planning, calculators, and expert guidance for Indian investors.",
  metadataBase: new URL("https://sipguru.example.com"),
  openGraph: {
    title: "FutureFund.in — Invest Smart. Build Wealth.",
    description:
      "Goal-based SIP planning and mutual fund advisory for Indian investors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <I18nProvider>
          <MarketReassuranceBanner />
          <ReferralBanner />
          {children}
          <FloatingCTA />
          <ChatBot />
          <SocialProofTicker />
          <ExitIntentPopup />
          <PushNotificationOptIn />
        </I18nProvider>
      </body>
    </html>
  );
}
