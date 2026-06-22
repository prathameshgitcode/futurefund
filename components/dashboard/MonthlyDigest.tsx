"use client";

import { FileText, Download } from "lucide-react";
import { formatINR } from "@/lib/utils/calculators";
import { FUND_PERFORMANCE } from "@/data/dashboardMock";
import { SITE } from "@/constants/site";

/**
 * Generates a clean, printable monthly portfolio statement and opens the
 * browser print dialog (users can "Save as PDF"). No backend or PDF library
 * needed — positions the distributor as proactive with a polished artifact.
 */
function buildDigestHtml(): string {
  const month = new Date().toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });
  const totalInvested = FUND_PERFORMANCE.reduce((s, f) => s + f.invested, 0);
  const totalValue = FUND_PERFORMANCE.reduce((s, f) => s + f.currentValue, 0);
  const gain = totalValue - totalInvested;
  const gainPct = ((gain / totalInvested) * 100).toFixed(1);

  const rows = FUND_PERFORMANCE.map(
    (f) => `
      <tr>
        <td>${f.name}</td>
        <td>${f.units.toLocaleString("en-IN")}</td>
        <td>₹${f.nav.toFixed(2)}</td>
        <td>${formatINR(f.invested)}</td>
        <td>${formatINR(f.currentValue)}</td>
        <td style="color:#16a34a;font-weight:600;">+${f.returnsPercent.toFixed(1)}% (XIRR ${f.xirr.toFixed(1)}%)</td>
      </tr>`,
  ).join("");

  return `<!doctype html><html><head><meta charset="utf-8"/>
  <title>Portfolio Statement — ${month}</title>
  <style>
    body{font-family:system-ui,Arial,sans-serif;color:#0b0e14;max-width:760px;margin:32px auto;padding:0 24px;}
    h1{font-size:22px;margin:0;}
    .muted{color:#6b7280;font-size:13px;}
    .head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #15803d;padding-bottom:16px;margin-bottom:24px;}
    .cards{display:flex;gap:12px;margin-bottom:24px;}
    .card{flex:1;border:1px solid #e3e7f0;border-radius:12px;padding:14px;}
    .card .label{font-size:11px;text-transform:uppercase;color:#6b7280;letter-spacing:.04em;}
    .card .val{font-size:20px;font-weight:700;margin-top:4px;}
    table{width:100%;border-collapse:collapse;font-size:13px;}
    th{background:#0f5132;color:#fff;text-align:left;padding:8px;}
    td{padding:8px;border-bottom:1px solid #eee;}
    .footer{margin-top:28px;font-size:11px;color:#9ca3af;line-height:1.6;}
    @media print{body{margin:0;}}
  </style></head>
  <body onload="window.print()">
    <div class="head">
      <div><h1>${SITE.name}</h1><div class="muted">Monthly Portfolio Statement · ${month}</div></div>
      <div class="muted" style="text-align:right;">${SITE.advisor}<br/>${SITE.arnNumber}</div>
    </div>
    <div class="cards">
      <div class="card"><div class="label">Total Value</div><div class="val">${formatINR(totalValue)}</div></div>
      <div class="card"><div class="label">Invested</div><div class="val">${formatINR(totalInvested)}</div></div>
      <div class="card"><div class="label">Total Gain</div><div class="val" style="color:#16a34a;">+${formatINR(gain)} (${gainPct}%)</div></div>
    </div>
    <table>
      <thead><tr><th>Fund</th><th>Units</th><th>NAV</th><th>Invested</th><th>Value</th><th>Returns</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="footer">
      This statement is generated for informational purposes. Mutual fund investments are subject to market risks;
      read all scheme related documents carefully. Holdings are indicative — for official records refer to your
      CAMS/KFintech consolidated account statement.<br/>
      ${SITE.name} · ${SITE.email} · ${SITE.phone}
    </div>
  </body></html>`;
}

export function MonthlyDigest() {
  const generate = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(buildDigestHtml());
    w.document.close();
  };

  const month = new Date().toLocaleString("en-IN", { month: "long" });

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <FileText size={18} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-ink">
            {month} Portfolio Digest
          </h3>
          <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
            Your monthly statement with holdings, NAV, and returns — ready to
            save or print.
          </p>
          <button
            onClick={generate}
            className="inline-flex items-center gap-1.5 mt-3 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-black transition-colors cursor-pointer"
          >
            <Download size={13} /> Download statement
          </button>
        </div>
      </div>
    </div>
  );
}
