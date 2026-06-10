"use client";

import type { Lang } from "../translations";

const LANE_T: Record<Lang, { projects: string; tasks: string; orders: string; invoices: string; emails: string }> = {
  de: { projects: "📁 Projekte", tasks: "📋 Tasks", orders: "🛒 Bestellungen", invoices: "🧾 Rechnungen", emails: "✉ Emails" },
  en: { projects: "📁 Projects", tasks: "📋 Tasks", orders: "🛒 Orders", invoices: "🧾 Invoices", emails: "✉ Emails" },
  hu: { projects: "📁 Projektek", tasks: "📋 Feladatok", orders: "🛒 Megrendelések", invoices: "🧾 Számlák", emails: "✉ Emailek" },
};

const CARDS: Record<Lang, { lane: keyof (typeof LANE_T)["de"]; title: string; sub: string; color: string }[]> = {
  de: [
    { lane: "projects", title: "GPH-001", sub: "Honey Badger", color: "#3b82f6" },
    { lane: "projects", title: "GPH-002", sub: "Greifarm V3", color: "#3b82f6" },
    { lane: "tasks", title: "#45 RFQ Welle", sub: "offen · Müller", color: "#f59e0b" },
    { lane: "tasks", title: "#46 Inspektion", sub: "in Arbeit · Nagy", color: "#f59e0b" },
    { lane: "orders", title: "PO-2026-001", sub: "Schmidt GmbH · 4.200 €", color: "#10b981" },
    { lane: "orders", title: "PO-2026-003", sub: "Lieferant AT · 980 €", color: "#10b981" },
    { lane: "invoices", title: "RE-2026-014", sub: "bezahlt · 4.200 €", color: "#8b5cf6" },
    { lane: "emails", title: "Angebot Welle", sub: "Max Muster", color: "#66d9ef" },
  ],
  en: [
    { lane: "projects", title: "GPH-001", sub: "Honey Badger", color: "#3b82f6" },
    { lane: "projects", title: "GPH-002", sub: "Gripper V3", color: "#3b82f6" },
    { lane: "tasks", title: "#45 RFQ shaft", sub: "open · Müller", color: "#f59e0b" },
    { lane: "tasks", title: "#46 Inspection", sub: "in progress · Nagy", color: "#f59e0b" },
    { lane: "orders", title: "PO-2026-001", sub: "Schmidt GmbH · €4,200", color: "#10b981" },
    { lane: "orders", title: "PO-2026-003", sub: "Supplier AT · €980", color: "#10b981" },
    { lane: "invoices", title: "RE-2026-014", sub: "paid · €4,200", color: "#8b5cf6" },
    { lane: "emails", title: "Quote shaft", sub: "Max Muster", color: "#66d9ef" },
  ],
  hu: [
    { lane: "projects", title: "GPH-001", sub: "Honey Badger", color: "#3b82f6" },
    { lane: "projects", title: "GPH-002", sub: "Megfogó V3", color: "#3b82f6" },
    { lane: "tasks", title: "#45 RFQ tengely", sub: "nyitott · Müller", color: "#f59e0b" },
    { lane: "tasks", title: "#46 Ellenőrzés", sub: "folyamatban · Nagy", color: "#f59e0b" },
    { lane: "orders", title: "PO-2026-001", sub: "Schmidt GmbH · 4 200 €", color: "#10b981" },
    { lane: "orders", title: "PO-2026-003", sub: "Beszállító AT · 980 €", color: "#10b981" },
    { lane: "invoices", title: "RE-2026-014", sub: "fizetve · 4 200 €", color: "#8b5cf6" },
    { lane: "emails", title: "Árajánlat tengely", sub: "Max Muster", color: "#66d9ef" },
  ],
};

export function BrettView({ lang }: { lang: Lang }) {
  const lanes = LANE_T[lang];
  const laneKeys = Object.keys(lanes) as (keyof typeof lanes)[];

  return (
    <div className="p-3 overflow-x-auto">
      <div className="flex gap-3 min-w-max">
        {laneKeys.map((key) => {
          const cards = CARDS[lang].filter((c) => c.lane === key);
          return (
            <div key={key} className="w-44 shrink-0">
              <div className="text-xs font-semibold text-slate-300 mb-2 px-1">{lanes[key]}</div>
              <div className="space-y-2">
                {cards.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-slate-800/60 border-l-2 p-2.5 hover:bg-slate-800 transition cursor-grab"
                    style={{ borderColor: c.color }}
                  >
                    <div className="text-sm text-slate-100 font-medium">{c.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{c.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
