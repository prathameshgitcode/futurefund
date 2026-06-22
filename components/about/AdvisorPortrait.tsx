import Image from "next/image";

export function AdvisorPortrait() {
  return (
    <div className="relative h-full w-full bg-linear-to-br from-slate-800 to-slate-900">
      <Image
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=540&fit=crop&crop=face&q=80"
        alt="Financial Advisor"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent" />
    </div>
  );
}
