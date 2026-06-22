"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileSpreadsheet,
  Trash2,
  Users,
  Inbox,
  Search,
  RefreshCw,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "@/lib/i18n/I18nProvider";
import {
  getLeads,
  clearLeads,
  downloadLeadsCsv,
  downloadLeadsExcel,
  sourceLabel,
  type Lead,
  type LeadSource,
} from "@/lib/leads/leadStore";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "all">("all");
  const { dict } = useTranslation();
  const t = dict.adminLeads;

  const refresh = () => setLeads(getLeads());

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("sg:lead-added", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("sg:lead-added", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const sources = useMemo(() => {
    const s = new Set<LeadSource>();
    leads.forEach((l) => s.add(l.source));
    return Array.from(s);
  }, [leads]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (l.name ?? "").toLowerCase().includes(q) ||
        (l.email ?? "").toLowerCase().includes(q) ||
        (l.phone ?? "").toLowerCase().includes(q)
      );
    });
  }, [leads, search, sourceFilter]);

  const detailKeys = useMemo(() => {
    const keys = new Set<string>();
    filtered.forEach(
      (l) => l.details && Object.keys(l.details).forEach((k) => keys.add(k)),
    );
    return Array.from(keys);
  }, [filtered]);

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg">
        <div className="container-page py-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-start justify-between gap-4 mb-6"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">
                <Users size={14} /> {t.pageTitle}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-ink">
                {t.heading}
              </h1>
              <p className="text-sm text-ink-muted mt-1">{t.subheading}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => downloadLeadsExcel(filtered)}
                disabled={filtered.length === 0}
                className="inline-flex items-center gap-2 rounded-full bg-green-600 text-white px-4 py-2.5 text-sm font-semibold hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FileSpreadsheet size={15} /> {t.downloadExcel}
              </button>
              <button
                onClick={() => downloadLeadsCsv(filtered)}
                disabled={filtered.length === 0}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:bg-surface-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download size={15} /> {t.downloadCsv}
              </button>
              <button
                onClick={refresh}
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface w-10 h-10 text-ink hover:bg-surface-2 transition-colors cursor-pointer"
                aria-label="Refresh"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatBox label={t.totalLeads} value={leads.length} />
            <StatBox label={t.showing} value={filtered.length} />
            <StatBox label={t.sources} value={sources.length} />
            <StatBox
              label={t.today}
              value={
                leads.filter(
                  (l) =>
                    new Date(l.createdAt).toDateString() ===
                    new Date().toDateString(),
                ).length
              }
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full rounded-xl border border-border bg-surface pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <select
              value={sourceFilter}
              onChange={(e) =>
                setSourceFilter(e.target.value as LeadSource | "all")
              }
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
            >
              <option value="all">{t.allSources}</option>
              {sources.map((s) => (
                <option key={s} value={s}>
                  {sourceLabel(s)}
                </option>
              ))}
            </select>
            {leads.length > 0 && (
              <button
                onClick={() => {
                  if (confirm(t.clearConfirm)) {
                    clearLeads();
                    refresh();
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
              >
                <Trash2 size={14} /> Clear all
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface py-20 flex flex-col items-center gap-3 text-center">
              <Inbox size={32} className="text-ink-soft" />
              <p className="text-sm font-medium text-ink">{t.emptyTitle}</p>
              <p className="text-xs text-ink-muted max-w-xs">
                {t.emptySubtitle}
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-surface overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-2 text-left text-xs uppercase tracking-wide text-ink-muted">
                    <th className="px-4 py-3 font-semibold">{t.colDate}</th>
                    <th className="px-4 py-3 font-semibold">{t.colSource}</th>
                    <th className="px-4 py-3 font-semibold">{t.colName}</th>
                    <th className="px-4 py-3 font-semibold">{t.colEmail}</th>
                    <th className="px-4 py-3 font-semibold">{t.colPhone}</th>
                    {detailKeys.map((k) => (
                      <th
                        key={k}
                        className="px-4 py-3 font-semibold whitespace-nowrap"
                      >
                        {k}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr
                      key={l.id}
                      className="border-b border-border last:border-0 hover:bg-surface-2/50"
                    >
                      <td className="px-4 py-3 text-ink-muted whitespace-nowrap text-xs">
                        {new Date(l.createdAt).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-green-50 text-green-700 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap">
                          {sourceLabel(l.source)}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-ink">
                        {l.name || "—"}
                      </td>
                      <td className="px-4 py-3 text-ink-muted">
                        {l.email || "—"}
                      </td>
                      <td className="px-4 py-3 text-ink-muted whitespace-nowrap">
                        {l.phone || "—"}
                      </td>
                      {detailKeys.map((k) => (
                        <td
                          key={k}
                          className="px-4 py-3 text-ink-muted whitespace-nowrap"
                        >
                          {l.details?.[k] !== undefined &&
                          l.details?.[k] !== null
                            ? String(l.details[k])
                            : "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="text-[11px] text-ink-soft mt-4">{t.footerNote}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="text-2xl font-bold text-ink">{value}</div>
      <div className="text-xs text-ink-muted">{label}</div>
    </div>
  );
}
