import Image from "next/image";

const ARTICLE_IMAGES: Record<string, string> = {
  "mutual-funds-101":
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=375&fit=crop&q=80",
  "sip-vs-lumpsum":
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=375&fit=crop&q=80",
  "managing-volatility":
    "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=600&h=375&fit=crop&q=80",
  "5-mistakes-sip-investors":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=375&fit=crop&q=80",
  "2024-market-outlook":
    "https://images.unsplash.com/photo-1642543348745-03b1219733d9?w=600&h=375&fit=crop&q=80",
};

const FALLBACK =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=375&fit=crop&q=80";

export function ArticleThumb({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const src = ARTICLE_IMAGES[id] ?? FALLBACK;
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={id.replace(/-/g, " ")}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
    </div>
  );
}
