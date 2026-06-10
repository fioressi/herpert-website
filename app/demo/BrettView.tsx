"use client";

import type { Lang } from "../translations";

const LANE_T: Record<Lang, { projects: string; tasks: string; orders: string; invoices: string; emails: string }> = {
  de: { projects: "📁 Projekte", tasks: "📋 Tasks", orders: "🛒 Bestellungen", invoices: "🧾 Rechnungen", emails: "✉ Emails" },
  en: { projects: "📁 Projects", tasks: "📋 Tasks", orders: "🛒 Orders", invoices: "🧾 Invoices", emails: "✉ Emails" },
  hu: { projects: "📁 Projektek", tasks: "📋 Feladatok", orders: "🛒 Megrendelések", invoices: "🧾 Számlák", emails: "✉ Emailek" },
};

const CARDS: Record<Lang, { lane: keyof (typeof LANE_T)["de"]; title: string; sub: string; color: string }[]> = {
  de: [
    { lane: "projects", title: "P26-014", sub: "Förderband V2", color: "#3b82f6" },
    { lane: "projects", title: "P26-009", sub: "Greifmodul X3", color: "#3b82f6" },
    { lane: "tasks", title: "#34 RFQ Halteblech", sub: "offen · Hofer", color: "#f59e0b" },
    { lane: "tasks", title: "#35 Inspektion", sub: "in Arbeit · Kovács", color: "#f59e0b" },
    { lane: "orders", title: "PO-2026-0021", sub: "Präzitec Kft. · 1.240 €", color: "#10b981" },
    { lane: "orders", title: "PO-2026-0009", sub: "FeinTech Kft. · 980 €", color: "#10b981" },
    { lane: "invoices", title: "R-2026-0188", sub: "bezahlt · 1.240 €", color: "#8b5cf6" },
    { lane: "emails", title: "Angebot Halteblech", sub: "Lena Hofer", color: "#66d9ef" },
  ],
  en: [
    { lane: "projects", title: "P26-014", sub: "Förderband V2", color: "#3b82f6" },
    { lane: "projects", title: "P26-009", sub: "Greifmodul X3", color: "#3b82f6" },
    { lane: "tasks", title: "#34 RFQ bracket", sub: "open · Hofer", color: "#f59e0b" },
    { lane: "tasks", title: "#35 Inspection", sub: "in progress · Kovács", color: "#f59e0b" },
    { lane: "orders", title: "PO-2026-0021", sub: "Präzitec Kft. · €1,240", color: "#10b981" },
    { lane: "orders", title: "PO-2026-0009", sub: "FeinTech Kft. · €980", color: "#10b981" },
    { lane: "invoices", title: "R-2026-0188", sub: "paid · €1,240", color: "#8b5cf6" },
    { lane: "emails", title: "Quote bracket", sub: "Lena Hofer", color: "#66d9ef" },
  ],
  hu: [
    { lane: "projects", title: "P26-014", sub: "Förderband V2", color: "#3b82f6" },
    { lane: "projects", title: "P26-009", sub: "Greifmodul X3", color: "#3b82f6" },
    { lane: "tasks", title: "#34 RFQ tartólemez", sub: "nyitott · Hofer", color: "#f59e0b" },
    { lane: "tasks", title: "#35 Ellenőrzés", sub: "folyamatban · Kovács", color: "#f59e0b" },
    { lane: "orders", title: "PO-2026-0021", sub: "Präzitec Kft. · 1 240 €", color: "#10b981" },
    { lane: "orders", title: "PO-2026-0009", sub: "FeinTech Kft. · 980 €", color: "#10b981" },
    { lane: "invoices", title: "R-2026-0188", sub: "fizetve · 1 240 €", color: "#8b5cf6" },
    { lane: "emails", title: "Árajánlat tartólemez", sub: "Lena Hofer", color: "#66d9ef" },
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
