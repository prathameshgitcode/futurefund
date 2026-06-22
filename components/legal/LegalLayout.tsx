import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="container-page max-w-2xl py-12">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-xs text-ink-soft mb-8">
            Last updated: {lastUpdated}
          </p>

          {intro && (
            <p className="text-sm text-ink-muted leading-relaxed mb-8">
              {intro}
            </p>
          )}

          <div className="flex flex-col gap-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-semibold mb-3">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-3">
                  {section.body.map((para, i) => (
                    <p
                      key={i}
                      className="text-sm text-ink-muted leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
