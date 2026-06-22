import { CheckCircle2 } from "lucide-react";
import { StatusPage } from "@/components/states/StatusPage";

const REASON_MESSAGES: Record<string, string> = {
  consultation:
    "Your consultation request has been received. One of our advisors will reach out within one business day.",
  newsletter:
    "You're subscribed! Look out for our next Weekly Wealth Letter in your inbox.",
  quiz: "Your investment profile has been saved. You can revisit your results anytime from your dashboard.",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const message =
    (reason && REASON_MESSAGES[reason]) ??
    "Thank you — we've received your request and will be in touch shortly.";

  return (
    <StatusPage
      icon={CheckCircle2}
      title="Thank You!"
      subtitle={message}
      primaryAction={{ label: "Go to Homepage", href: "/" }}
      secondaryAction={{
        label: "Explore Knowledge Center",
        href: "/knowledge",
      }}
    />
  );
}
