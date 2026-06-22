export function GrowthIllustration() {
  return (
    <svg
      viewBox="0 0 400 320"
      className="w-full h-full"
      role="img"
      aria-label="Illustration of growing investment bars with rising arrow and coins"
    >
      <defs>
        <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2c84b" />
          <stop offset="100%" stopColor="#caa12b" />
        </linearGradient>
        <linearGradient id="bgGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef1fa" />
          <stop offset="100%" stopColor="#dfe4f3" />
        </linearGradient>
        <linearGradient id="arrowGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#4fe3a1" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="320" rx="24" fill="url(#bgGlow)" />

      {/* base platform */}
      <ellipse
        cx="200"
        cy="260"
        rx="150"
        ry="14"
        fill="#c7ccdb"
        opacity="0.6"
      />
      <ellipse
        cx="200"
        cy="252"
        rx="150"
        ry="14"
        fill="#d8a93a"
        opacity="0.5"
      />

      {/* bar chart stack (coin-stack bars) */}
      {[
        { x: 110, h: 60, w: 36 },
        { x: 155, h: 95, w: 36 },
        { x: 200, h: 130, w: 36 },
        { x: 245, h: 165, w: 36 },
      ].map((bar, i) => (
        <g key={i}>
          <rect
            x={bar.x}
            y={252 - bar.h}
            width={bar.w}
            height={bar.h}
            rx="4"
            fill="url(#barGold)"
          />
          {Array.from({ length: Math.round(bar.h / 14) }).map((_, j) => (
            <line
              key={j}
              x1={bar.x}
              x2={bar.x + bar.w}
              y1={252 - j * 14}
              y2={252 - j * 14}
              stroke="#9c7a1f"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
          ))}
        </g>
      ))}

      {/* rising arrow */}
      <path
        d="M90 200 L150 150 L195 180 L290 70"
        fill="none"
        stroke="url(#arrowGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M260 70 L290 70 L290 100"
        fill="none"
        stroke="url(#arrowGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* floating coins */}
      <circle
        cx="80"
        cy="110"
        r="16"
        fill="#f2c84b"
        stroke="#caa12b"
        strokeWidth="2"
      />
      <text
        x="80"
        y="115"
        textAnchor="middle"
        fontSize="13"
        fill="#7a5c12"
        fontWeight="700"
      >
        ₹
      </text>

      <circle
        cx="320"
        cy="130"
        r="13"
        fill="#f2c84b"
        stroke="#caa12b"
        strokeWidth="2"
      />
      <text
        x="320"
        y="135"
        textAnchor="middle"
        fontSize="11"
        fill="#7a5c12"
        fontWeight="700"
      >
        ₹
      </text>

      <circle
        cx="335"
        cy="190"
        r="10"
        fill="#f2c84b"
        stroke="#caa12b"
        strokeWidth="2"
      />
      <text
        x="335"
        y="194"
        textAnchor="middle"
        fontSize="9"
        fill="#7a5c12"
        fontWeight="700"
      >
        ₹
      </text>

      <circle
        cx="55"
        cy="170"
        r="9"
        fill="#4fe3a1"
        stroke="#15803d"
        strokeWidth="2"
      />
    </svg>
  );
}
