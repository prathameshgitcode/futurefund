/**
 * Client-side lead capture store.
 *
 * Every form submission across the site (consultation booking, calculator
 * email capture, SIP health check, onboarding, etc.) is appended here and
 * persisted to localStorage. The admin page (/admin/leads) reads from this
 * store and lets the distributor download everything as Excel/CSV.
 *
 * No backend required — pure frontend, survives page reloads.
 */

export type LeadSource =
  | "consultation_booking"
  | "calculator_email"
  | "sip_health_check"
  | "onboarding"
  | "contact_form"
  | "exit_intent"
  | "newsletter"
  | "watchlist_alert"
  | "referral";

export interface Lead {
  id: string;
  createdAt: string; // ISO timestamp
  source: LeadSource;
  name?: string;
  email?: string;
  phone?: string;
  /** Any extra structured fields specific to the source. */
  details?: Record<string, string | number | boolean | null>;
}

const STORAGE_KEY = "sg_leads_v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getLeads(): Lead[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

export function saveLead(input: Omit<Lead, "id" | "createdAt">): Lead {
  const lead: Lead = {
    ...input,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  if (isBrowser()) {
    const all = getLeads();
    all.unshift(lead);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      // Let any open admin tab / listeners know.
      window.dispatchEvent(new CustomEvent("sg:lead-added", { detail: lead }));
    } catch {
      /* quota or disabled storage — ignore */
    }
  }
  return lead;
}

export function clearLeads(): void {
  if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY);
}

const SOURCE_LABELS: Record<LeadSource, string> = {
  consultation_booking: "Consultation Booking",
  calculator_email: "Calculator Lead",
  sip_health_check: "SIP Health Check",
  onboarding: "SIP Onboarding",
  contact_form: "Contact Form",
  exit_intent: "Exit Intent",
  newsletter: "Newsletter",
  watchlist_alert: "Watchlist Alert",
  referral: "Referral",
};

export function sourceLabel(source: LeadSource): string {
  return SOURCE_LABELS[source] ?? source;
}

/** Flatten leads (including the `details` map) into rows for export. */
function toRows(leads: Lead[]): { headers: string[]; rows: string[][] } {
  // Collect every detail key that appears so columns line up.
  const detailKeys = new Set<string>();
  leads.forEach((l) => {
    if (l.details) Object.keys(l.details).forEach((k) => detailKeys.add(k));
  });
  const detailCols = Array.from(detailKeys);

  const headers = ["Date", "Source", "Name", "Email", "Phone", ...detailCols];
  const rows = leads.map((l) => {
    const base = [
      new Date(l.createdAt).toLocaleString("en-IN"),
      sourceLabel(l.source),
      l.name ?? "",
      l.email ?? "",
      l.phone ?? "",
    ];
    const extras = detailCols.map((k) => {
      const v = l.details?.[k];
      return v === undefined || v === null ? "" : String(v);
    });
    return [...base, ...extras];
  });
  return { headers, rows };
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function triggerDownload(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadLeadsCsv(leads: Lead[] = getLeads()) {
  const { headers, rows } = toRows(leads);
  const lines = [headers, ...rows].map((r) => r.map(escapeCsv).join(","));
  // BOM so Excel reads UTF-8 correctly (₹ etc.)
  triggerDownload(
    "﻿" + lines.join("\r\n"),
    `sipguru-leads-${dateStamp()}.csv`,
    "text/csv;charset=utf-8;",
  );
}

/**
 * Excel-readable .xls via an HTML table. Opens natively in Microsoft Excel
 * and Google Sheets without any external library.
 */
export function downloadLeadsExcel(leads: Lead[] = getLeads()) {
  const { headers, rows } = toRows(leads);
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const thead = `<tr>${headers
    .map(
      (h) =>
        `<th style="background:#0f5132;color:#fff;padding:6px;text-align:left;">${esc(h)}</th>`,
    )
    .join("")}</tr>`;
  const tbody = rows
    .map(
      (r) =>
        `<tr>${r.map((c) => `<td style="padding:6px;border:1px solid #ddd;">${esc(c)}</td>`).join("")}</tr>`,
    )
    .join("");
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"/></head><body><table border="1">${thead}${tbody}</table></body></html>`;
  triggerDownload(
    html,
    `sipguru-leads-${dateStamp()}.xls`,
    "application/vnd.ms-excel",
  );
}

function dateStamp(): string {
  return new Date().toISOString().slice(0, 10);
}
