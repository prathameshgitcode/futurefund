import { Compass } from "lucide-react";
import { StatusPage } from "@/components/states/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      icon={Compass}
      title="Page Not Found"
      subtitle="The page you're looking for doesn't exist or may have moved. Let's get you back on track."
      primaryAction={{ label: "Go to Homepage", href: "/" }}
      secondaryAction={{ label: "Browse Calculators", href: "/calculators" }}
    />
  );
}
