"use client";

import { useState } from "react";
import type { Lang } from "../translations";

type Role = "meister" | "igor" | "rosetta" | "gregor";

const ROLE_META: Record<Role, { label: string; color: string; avatar: string }> = {
  meister: { label: "Meister", color: "#66d9ef", avatar: "🧑‍🔧" },
  igor: { label: "Igor", color: "#f59e0b", avatar: "🤖" },
  rosetta: { label: "Rosetta", color: "#ec4899", avatar: "🌐" },
  gregor: { label: "Gregor", color: "#10b981", avatar: "📊" },
};

const CONVO: Record<Lang, { role: Role; text: string }[]> = {
  de: [
    { role: "meister", text: "Was ist der Status zu PO-2026-002?" },
    { role: "gregor", text: "PO-2026-002 (Welt AG, 12.850 €) ist offen — 7 Positionen, noch nicht bestätigt. Liefertermin laut Projekt GPH-001 ist der 9. Juni." },
    { role: "igor", text: "In der letzten Mail von Welt AG steht eine Rückfrage zur Toleranz bei Position 4. Soll ich einen Antwortentwurf erstellen?" },
    { role: "meister", text: "Ja, und übersetz die Antwort auf Ungarisch für die Fertigung." },
    { role: "rosetta", text: "Erledigt — Antwort auf DE verfasst und nach HU übersetzt. Beide Versionen hängen am Task #46." },
  ],
  en: [
    { role: "meister", text: "What's the status on PO-2026-002?" },
    { role: "gregor", text: "PO-2026-002 (Welt AG, €12,850) is open — 7 line items, not yet confirmed. Delivery date per project GPH-001 is June 9." },
    { role: "igor", text: "The last email from Welt AG has a query about the tolerance on line 4. Shall I draft a reply?" },
    { role: "meister", text: "Yes, and translate the reply to Hungarian for production." },
    { role: "rosetta", text: "Done — reply drafted in DE and translated to HU. Both versions attached to task #46." },
  ],
  hu: [
    { role: "meister", text: "Mi a státusza a PO-2026-002-nek?" },
    { role: "gregor", text: "A PO-2026-002 (Welt AG, 12 850 €) nyitott — 7 tétel, még nincs megerősítve. A szállítási határidő a GPH-001 projekt szerint június 9." },
    { role: "igor", text: "A Welt AG utolsó emailjében van egy kérdés a 4. tétel tűréséről. Készítsek választervezetet?" },
    { role: "meister", text: "Igen, és fordítsd le a választ magyarra a gyártásnak." },
    { role: "rosetta", text: "Kész — válasz DE-n megfogalmazva és HU-ra fordítva. Mindkét verzió a #46 feladathoz csatolva." },
  ],
};

const PLACEHOLDER: Record<Lang, string> = {
  de: "Frag das Rudel…",
  en: "Ask the pack…",
  hu: "Kérdezd a falkát…",
};

const PARTICIPANTS_LABEL: Record<Lang, string> = {
  de: "Rudel · 4 aktiv",
  en: "Pack · 4 active",
  hu: "Falka · 4 aktív",
};

export function RudelView({ lang }: { lang: Lang }) {
  const [shown, setShown] = useState(2);
  const convo = CONVO[lang];

  return (
    <div className="flex flex-col h-[460px] max-w-3xl mx-auto w-full">
      {/* Participants bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-cyan-400/10 bg-slate-900/60">
        <span className="text-[11px] text-slate-400 mr-1">{PARTICIPANTS_LABEL[lang]}</span>
        {(Object.keys(ROLE_META) as Role[]).map((r) => (
          <span
            key={r}
            className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800/60"
            style={{ color: ROLE_META[r].color }}
            title={ROLE_META[r].label}
          >
            {ROLE_META[r].avatar} {ROLE_META[r].label}
          </span>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {convo.slice(0, shown).map((m, i) => {
          const meta = ROLE_META[m.role];
          const isMeister = m.role === "meister";
          return (
            <div key={i} className={`flex gap-2 ${isMeister ? "flex-row-reverse" : ""}`}>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
                style={{ backgroundColor: `${meta.color}22` }}
              >
                {meta.avatar}
              </div>
              <div className={`max-w-[80%] ${isMeister ? "text-right" : ""}`}>
                <div className="text-[10px] mb-0.5" style={{ color: meta.color }}>
                  {meta.label}
                </div>
                <div
                  className={`text-xs rounded-2xl px-3 py-2 leading-relaxed ${
                    isMeister
                      ? "bg-cyan-400 text-slate-950"
                      : "bg-slate-800/70 text-slate-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-cyan-400/10">
        <div className="flex gap-2">
          <input
            readOnly
            placeholder={PLACEHOLDER[lang]}
            className="flex-1 bg-slate-800/60 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder:text-slate-500 outline-none cursor-pointer"
            onClick={() => setShown((n) => Math.min(n + 1, convo.length))}
          />
          <button
            onClick={() => setShown((n) => (n >= convo.length ? 2 : Math.min(n + 1, convo.length)))}
            className="btn-primary text-xs px-4 py-2"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
