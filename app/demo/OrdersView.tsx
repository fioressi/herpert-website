"use client";

import { useState } from "react";
import type { Lang } from "../translations";

type OStatus = "open" | "confirmed" | "delivered";
type RStatus = "draft" | "sent" | "quoted" | "awarded";

interface DemoOrder {
  id: string;
  supplier: string;
  project: string;
  total: string;
  status: OStatus;
  lines: number;
}

interface DemoRfq {
  id: string;
  part: string;
  partId: string;
  suppliers: number;
  bestQuote: string | null;
  status: RStatus;
}

const ORDERS: DemoOrder[] = [
  { id: "PO-2026-001", supplier: "Schmidt GmbH", project: "GPH-001", total: "4.200", status: "confirmed", lines: 3 },
  { id: "PO-2026-002", supplier: "Welt AG", project: "GPH-001", total: "12.850", status: "open", lines: 7 },
  { id: "PO-2026-003", supplier: "Lieferant AT", project: "GPH-002", total: "980", status: "delivered", lines: 2 },
  { id: "PO-2026-004", supplier: "Nagy Kft.", project: "GPH-002", total: "5.640", status: "open", lines: 4 },
];

const RFQS: DemoRfq[] = [
  { id: "RFQ-2026-011", part: "Welle GP-2026-04", partId: "H-7206-13282-90", suppliers: 3, bestQuote: "1.180", status: "quoted" },
  { id: "RFQ-2026-012", part: "Lagerbock", partId: "H-7201-13290-70", suppliers: 4, bestQuote: "640", status: "awarded" },
  { id: "RFQ-2026-013", part: "Greifarm V3", partId: "H-7050-13301-80", suppliers: 2, bestQuote: null, status: "sent" },
  { id: "RFQ-2026-014", part: "Deckblech", partId: "H-7206-13312-50", suppliers: 0, bestQuote: null, status: "draft" },
];

const STR: Record<Lang, {
  tabs: { po: string; rfq: string };
  head: { order: string; supplier: string; total: string; status: string; part: string; suppliers: string; best: string };
  ostatus: Record<OStatus, string>;
  rstatus: Record<RStatus, string>;
  sumOpen: string;
  rfqOpen: string;
  noQuote: string;
  currency: (v: string) => string;
}> = {
  de: {
    tabs: { po: "🛒 Bestellungen", rfq: "📨 Anfragen (RFQ)" },
    head: { order: "Bestellung", supplier: "Lieferant", total: "Summe", status: "Status", part: "Teil", suppliers: "Lief.", best: "Bestes Angebot" },
    ostatus: { open: "Offen", confirmed: "Bestätigt", delivered: "Geliefert" },
    rstatus: { draft: "Entwurf", sent: "Versendet", quoted: "Angebote da", awarded: "Vergeben" },
    sumOpen: "Offen gesamt",
    rfqOpen: "Laufende RFQ",
    noQuote: "—",
    currency: (v) => `${v} €`,
  },
  en: {
    tabs: { po: "🛒 Orders", rfq: "📨 Requests (RFQ)" },
    head: { order: "Order", supplier: "Supplier", total: "Total", status: "Status", part: "Part", suppliers: "Sup.", best: "Best quote" },
    ostatus: { open: "Open", confirmed: "Confirmed", delivered: "Delivered" },
    rstatus: { draft: "Draft", sent: "Sent", quoted: "Quoted", awarded: "Awarded" },
    sumOpen: "Total open",
    rfqOpen: "Active RFQ",
    noQuote: "—",
    currency: (v) => `€${v}`,
  },
  hu: {
    tabs: { po: "🛒 Megrendelések", rfq: "📨 Ajánlatkérők (RFQ)" },
    head: { order: "Megrendelés", supplier: "Beszállító", total: "Összeg", status: "Állapot", part: "Alkatrész", suppliers: "Besz.", best: "Legjobb ajánlat" },
    ostatus: { open: "Nyitott", confirmed: "Megerősítve", delivered: "Szállítva" },
    rstatus: { draft: "Vázlat", sent: "Elküldve", quoted: "Ajánlatok", awarded: "Odaítélve" },
    sumOpen: "Nyitott összesen",
    rfqOpen: "Aktív RFQ",
    noQuote: "—",
    currency: (v) => `${v} €`,
  },
};

const O_COLOR: Record<OStatus, string> = {
  open: "bg-amber-500/20 text-amber-300",
  confirmed: "bg-blue-500/20 text-blue-300",
  delivered: "bg-emerald-500/20 text-emerald-300",
};

const R_COLOR: Record<RStatus, string> = {
  draft: "bg-slate-500/20 text-slate-300",
  sent: "bg-blue-500/20 text-blue-300",
  quoted: "bg-amber-500/20 text-amber-300",
  awarded: "bg-emerald-500/20 text-emerald-300",
};

export function OrdersView({ lang }: { lang: Lang }) {
  const s = STR[lang];
  const [tab, setTab] = useState<"po" | "rfq">("po");

  const openTotal = ORDERS.filter((o) => o.status !== "delivered")
    .reduce((sum, o) => sum + parseFloat(o.total.replace(".", "")), 0);
  const activeRfq = RFQS.filter((r) => r.status === "sent" || r.status === "quoted").length;

  return (
    <div className="p-3">
      {/* Sub-tabs RFQ / PO */}
      <div className="flex gap-1.5 mb-3">
        <button
          onClick={() => setTab("po")}
          className={`flex-1 text-xs px-3 py-1.5 rounded-lg transition ${
            tab === "po" ? "bg-cyan-400 text-slate-950 font-semibold" : "bg-slate-800/60 text-slate-400 hover:text-cyan-400"
          }`}
        >
          {s.tabs.po}
        </button>
        <button
          onClick={() => setTab("rfq")}
          className={`flex-1 text-xs px-3 py-1.5 rounded-lg transition ${
            tab === "rfq" ? "bg-cyan-400 text-slate-950 font-semibold" : "bg-slate-800/60 text-slate-400 hover:text-cyan-400"
          }`}
        >
          {s.tabs.rfq}
        </button>
      </div>

      {tab === "po" ? (
        <>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <Kpi value={String(ORDERS.length)} label={s.head.order} />
            <Kpi value={String(ORDERS.filter((o) => o.status === "open").length)} label={s.ostatus.open} accent />
            <Kpi value={s.currency(openTotal.toLocaleString(lang === "en" ? "en-US" : "de-DE"))} label={s.sumOpen} />
          </div>
          <div className="rounded-xl border border-cyan-400/10 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400">
                  <th className="text-left px-2.5 py-2 font-medium">{s.head.order}</th>
                  <th className="text-left px-2.5 py-2 font-medium">{s.head.supplier}</th>
                  <th className="text-right px-2.5 py-2 font-medium">{s.head.total}</th>
                  <th className="text-center px-2.5 py-2 font-medium">{s.head.status}</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o) => (
                  <tr key={o.id} className="border-t border-cyan-400/5 hover:bg-slate-800/40 transition">
                    <td className="px-2.5 py-2.5">
                      <div className="text-cyan-400 font-mono">{o.id}</div>
                      <div className="text-[10px] text-slate-500">{o.project} · {o.lines}×</div>
                    </td>
                    <td className="px-2.5 py-2.5 text-slate-300">{o.supplier}</td>
                    <td className="px-2.5 py-2.5 text-right text-slate-200 font-medium">{s.currency(o.total)}</td>
                    <td className="px-2.5 py-2.5 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${O_COLOR[o.status]}`}>
                        {s.ostatus[o.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <Kpi value={String(RFQS.length)} label="RFQ" />
            <Kpi value={String(activeRfq)} label={s.rfqOpen} accent />
            <Kpi value={String(RFQS.filter((r) => r.status === "awarded").length)} label={s.rstatus.awarded} />
          </div>
          <div className="rounded-xl border border-cyan-400/10 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-900/60 text-slate-400">
                  <th className="text-left px-2.5 py-2 font-medium">{s.head.part}</th>
                  <th className="text-center px-2.5 py-2 font-medium">{s.head.suppliers}</th>
                  <th className="text-right px-2.5 py-2 font-medium">{s.head.best}</th>
                  <th className="text-center px-2.5 py-2 font-medium">{s.head.status}</th>
                </tr>
              </thead>
              <tbody>
                {RFQS.map((r) => (
                  <tr key={r.id} className="border-t border-cyan-400/5 hover:bg-slate-800/40 transition">
                    <td className="px-2.5 py-2.5">
                      <div className="text-slate-200">{r.part}</div>
                      <div className="text-[10px] text-cyan-400/70 font-mono">{r.partId}</div>
                    </td>
                    <td className="px-2.5 py-2.5 text-center text-slate-300">{r.suppliers || "—"}</td>
                    <td className="px-2.5 py-2.5 text-right text-slate-200 font-medium">
                      {r.bestQuote ? s.currency(r.bestQuote) : s.noQuote}
                    </td>
                    <td className="px-2.5 py-2.5 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${R_COLOR[r.status]}`}>
                        {s.rstatus[r.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function Kpi({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-2.5 text-center ${accent ? "bg-cyan-400/10 border border-cyan-400/20" : "bg-slate-800/50"}`}>
      <div className={`text-lg font-bold ${accent ? "text-cyan-400" : "text-slate-100"}`}>{value}</div>
      <div className="text-[10px] text-slate-400 mt-0.5">{label}</div>
    </div>
  );
}
