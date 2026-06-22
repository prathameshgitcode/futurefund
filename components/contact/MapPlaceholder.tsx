export function MapPlaceholder() {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-xl bg-[#2a2a2a]">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 140"
        preserveAspectRatio="none"
      >
        {[20, 55, 95, 140, 180, 220, 260].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={0}
            x2={x - 30}
            y2={140}
            stroke="#4a4a4a"
            strokeWidth={1.5}
          />
        ))}
        {[15, 45, 75, 100, 125].map((y) => (
          <line
            key={`h-${y}`}
            x1={0}
            y1={y}
            x2={300}
            y2={y}
            stroke="#4a4a4a"
            strokeWidth={1.5}
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-3 w-3 rounded-full bg-green-500 ring-4 ring-green-500/30" />
      </div>
    </div>
  );
}
