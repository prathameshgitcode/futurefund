import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactSidebar } from "@/components/contact/ContactSidebar";
import { TrustBadges } from "@/components/contact/TrustBadges";
import { TrustedByBanner } from "@/components/contact/TrustedByBanner";
import { CalendlyBooking } from "@/components/contact/CalendlyBooking";

export const metadata: Metadata = {
  title: "Contact Us — FutureFund.in",
  description:
    "Get in touch with FutureFund.in's advisory team for SIP planning, portfolio reviews, and general support.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ContactHero />

        {/* Booking + Contact */}
        <section className="container-page pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-3">
              <CalendlyBooking />
            </div>
            <div className="lg:col-span-2">
              <ContactSidebar />
            </div>
          </div>
          <div className="border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft mb-5">
              Or send us a message
            </p>
            <ContactForm />
          </div>
        </section>

        <section className="container-page">
          <TrustBadges />
        </section>

        <TrustedByBanner />
      </main>
      <Footer />
    </>
  );
}
