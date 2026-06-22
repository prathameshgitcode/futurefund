const PATHS: Record<string, string> = {
  up: "M2 20 L14 14 L26 16 L38 4",
  zigzag: "M2 18 L11 12 L20 16 L29 8 L38 10",
  volatile: "M2 8 L9 18 L16 6 L23 20 L30 4 L38 14",
  flat: "M2 12 L38 12",
};

export function TrendSparkline({
  trend,
  color,
}: {
  trend: string;
  color: string;
}) {
  const path = PATHS[trend] ?? PATHS.flat;
  return (
    <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
      <path
        d={path}
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
