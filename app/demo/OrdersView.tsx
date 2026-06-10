"use client";

import type { Lang } from "../translations";

type OStatus = "open" | "confirmed" | "delivered";

interface DemoOrder {
  id: string;
  supplier: string;
  project: string;
  total: string;
  status: OStatus;
  lines: number;
}

const ORDERS: DemoOrder[] = [
  { id: "PO-2026-001", supplier: "Schmidt GmbH", project: "GPH-001", total: "4.200", status: "confirmed", lines: 3 },
  { id: "PO-2026-002", supplier: "Welt AG", project: "GPH-001", total: "12.850", status: "open", lines: 7 },
  { id: "PO-2026-003", supplier: "Lieferant AT", project: "GPH-002", total: "980", status: "delivered", lines: 2 },
  { id: "PO-2026-004", supplier: "Nagy Kft.", project: "GPH-002", total: "5.640", status: "open", lines: 4 },
];

const STR: Record<Lang, {
  head: { order: string; supplier: string; project: string; lines: string; total: string; status: string };
  status: Record<OStatus, string>;
  sum: string;
  currency: (v: string) => string;
}> = {
  de: {
    head: { order: "Bestellung", supplier: "Lieferant", project: "Projekt", lines: "Pos.", total: "Summe", status: "Status" },
    status: { open: "Offen", confirmed: "Bestätigt", delivered: "Geliefert" },
    sum: "Gesamt offen",
    currency: (v) => `${v} €`,
  },
  en: {
    head: { order: "Order", supplier: "Supplier", project: "Project", lines: "Lines", total: "Total", status: "Status" },
    status: { open: "Open", confirmed: "Confirmed", delivered: "Delivered" },
    sum: "Total open",
    currency: (v) => `€${v}`,
  },
  hu: {
    head: { order: "Megrendelés", supplier: "Beszállító", project: "Projekt", lines: "Tétel", total: "Összeg", status: "Állapot" },
    status: { open: "Nyitott", confirmed: "Megerősítve", delivered: "Szállítva" },
    sum: "Nyitott összesen",
    currency: (v) => `${v} €`,
  },
};

const STATUS_COLOR: Record<OStatus, string> = {
  open: "bg-amber-500/20 text-amber-300",
  confirmed: "bg-blue-500/20 text-blue-300",
  delivered: "bg-emerald-500/20 text-emerald-300",
};

export function OrdersView({ lang }: { lang: Lang }) {
  const s = STR[lang];
  const openTotal = ORDERS.filter((o) => o.status !== "delivered")
    .reduce((sum, o) => sum + parseFloat(o.total.replace(".", "")), 0);

  return (
    <div className="p-3">
      {/* KPI row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <Kpi value={String(ORDERS.length)} label={s.head.order} />
        <Kpi value={String(ORDERS.filter((o) => o.status === "open").length)} label={s.status.open} accent />
        <Kpi value={s.currency(openTotal.toLocaleString(lang === "en" ? "en-US" : "de-DE"))} label={s.sum} />
      </div>

      {/* Table */}
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
                  <div className="text-[10px] text-slate-500">{o.project} · {o.lines} {s.head.lines}</div>
                </td>
                <td className="px-2.5 py-2.5 text-slate-300">{o.supplier}</td>
                <td className="px-2.5 py-2.5 text-right text-slate-200 font-medium">{s.currency(o.total)}</td>
                <td className="px-2.5 py-2.5 text-center">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${STATUS_COLOR[o.status]}`}>
                    {s.status[o.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
