import type { Metadata } from "next";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
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
  metadataBase: new URL("https://futurefund.in"),
  openGraph: {
    title: "FutureFund.in — Invest Smart. Build Wealth.",
    description:
      "Goal-based SIP planning and mutual fund advisory for Indian investors.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

// Injected before React hydrates — prevents light flash on dark preference
const themeScript = `
(function(){
  try {
    var s = localStorage.getItem('ff-theme');
    if (s === 'dark' || (!s && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e){}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* Flash prevention — must be synchronous, before body paint */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
