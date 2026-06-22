import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MarketTicker } from "@/components/home/MarketTicker";
import { Hero } from "@/components/home/Hero";
import { WhySipSection } from "@/components/home/WhySipSection";
import { SipCalculatorSection } from "@/components/home/SipCalculatorSection";
import { InvestmentGoalsSection } from "@/components/home/InvestmentGoalsSection";
import { PathToWealthSection } from "@/components/home/PathToWealthSection";
import { KnowledgeCenterSection } from "@/components/home/KnowledgeCenterSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { VideoTestimonialsSection } from "@/components/home/VideoTestimonialsSection";
import { ToolsStrip } from "@/components/home/ToolsStrip";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FAQSection } from "@/components/home/FAQSection";

export default function Home() {
  return (
    <>
      <Header />
      <MarketTicker />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <WhySipSection />
        <SipCalculatorSection />
        <ToolsStrip />
        <InvestmentGoalsSection />
        <PathToWealthSection />
        <VideoTestimonialsSection />
        <KnowledgeCenterSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
