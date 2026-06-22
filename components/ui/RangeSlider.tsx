"use client";

interface RangeSliderProps {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  accent?: string; // tailwind bg color for the fill, e.g. "bg-green-600"
}

/** Branded range slider matching the SIP calculator styling. */
export function RangeSlider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  accent = "bg-green-600",
}: RangeSliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const borderAccent = accent.replace("bg-", "border-");
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs text-ink-muted">{label}</label>
        <span className="text-sm font-bold text-ink">{display}</span>
      </div>
      <div className="relative h-2 rounded-full bg-surface-2">
        <div
          className={`absolute left-0 top-0 h-full rounded-full ${accent}`}
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border-2 ${borderAccent} shadow-sm pointer-events-none`}
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}
