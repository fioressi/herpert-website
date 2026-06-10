"use client";

import type { Lang } from "../translations";

const WEEKDAYS: Record<Lang, string[]> = {
  de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  hu: ["H", "K", "Sze", "Cs", "P", "Szo", "V"],
};

const MONTH: Record<Lang, string> = { de: "Juni 2026", en: "June 2026", hu: "2026. június" };

// day-of-month → event
const EVENTS: Record<Lang, Record<number, { label: string; color: string }>> = {
  de: {
    4: { label: "Review P2", color: "#3b82f6" },
    9: { label: "Liefertermin", color: "#10b981" },
    12: { label: "RFQ Deadline", color: "#f59e0b" },
    18: { label: "Inspektion", color: "#8b5cf6" },
    25: { label: "Abnahme GPH-001", color: "#ec4899" },
  },
  en: {
    4: { label: "Review P2", color: "#3b82f6" },
    9: { label: "Delivery", color: "#10b981" },
    12: { label: "RFQ deadline", color: "#f59e0b" },
    18: { label: "Inspection", color: "#8b5cf6" },
    25: { label: "Acceptance GPH-001", color: "#ec4899" },
  },
  hu: {
    4: { label: "Review P2", color: "#3b82f6" },
    9: { label: "Szállítás", color: "#10b981" },
    12: { label: "RFQ határidő", color: "#f59e0b" },
    18: { label: "Ellenőrzés", color: "#8b5cf6" },
    25: { label: "Átvétel GPH-001", color: "#ec4899" },
  },
};

export function CalendarView({ lang }: { lang: Lang }) {
  // June 2026 starts on a Monday (offset 0), 30 days
  const firstWeekday = 0; // Monday
  const days = 30;
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const today = 10;

  return (
    <div className="p-3">
      <div className="text-center text-sm font-semibold text-cyan-400 mb-3">{MONTH[lang]}</div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAYS[lang].map((d) => (
          <div key={d} className="text-center text-[10px] text-slate-500 font-mono py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          const ev = day ? EVENTS[lang][day] : undefined;
          const isToday = day === today;
          return (
            <div
              key={i}
              className={`aspect-square rounded-lg p-1 text-[10px] flex flex-col ${
                day ? "bg-slate-800/40 hover:bg-slate-800/70 transition" : ""
              } ${isToday ? "ring-1 ring-cyan-400" : ""}`}
            >
              {day && (
                <>
                  <span className={isToday ? "text-cyan-400 font-bold" : "text-slate-400"}>{day}</span>
                  {ev && (
                    <span
                      className="mt-auto rounded px-1 py-0.5 text-white text-[8px] leading-tight truncate"
                      style={{ backgroundColor: ev.color }}
                      title={ev.label}
                    >
                      {ev.label}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
