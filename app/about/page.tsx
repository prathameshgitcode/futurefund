import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { CoreFoundations } from "@/components/about/CoreFoundations";
import { Credentials } from "@/components/about/Credentials";
import { AboutCTA } from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us — FutureFund.in",
  description:
    "Meet Arjun Mehra, FutureFund.in's dedicated financial partner. AMFI registered, 15+ years of market experience, 500+ clients served.",
};

const ABOUT_FOOTER_COLUMNS = [
  {
    title: "Quick Links",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Compliance",
    links: [
      { label: "SEBI Disclaimers", href: "/sebi-disclaimer" },
      { label: "Investor Charter", href: "/investor-charter" },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <AboutHero />
        <CoreFoundations />
        <Credentials />
        <AboutCTA />
      </main>
      <Footer columns={ABOUT_FOOTER_COLUMNS} showNewsletter={false} />
    </>
  );
}
