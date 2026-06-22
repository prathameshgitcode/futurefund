import { Wrench } from "lucide-react";
import { StatusPage } from "@/components/states/StatusPage";

export default function MaintenancePage() {
  return (
    <StatusPage
      icon={Wrench}
      title="Scheduled Maintenance"
      subtitle="FutureFund.in is undergoing scheduled maintenance to make things even better. We'll be back online shortly — thank you for your patience."
      primaryAction={{ label: "Check Status", href: "/" }}
    />
  );
}
