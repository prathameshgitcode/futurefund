import { Sparkles } from "lucide-react";
import { StatusPage } from "@/components/states/StatusPage";

export default function ComingSoonPage() {
  return (
    <StatusPage
      icon={Sparkles}
      title="Coming Soon"
      subtitle="We're putting the finishing touches on this feature. Check back shortly, or explore everything else FutureFund.in already offers."
      primaryAction={{ label: "Go to Homepage", href: "/" }}
      secondaryAction={{ label: "Browse Calculators", href: "/calculators" }}
    />
  );
}
