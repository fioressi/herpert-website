"use client";

import { useState } from "react";
import { LANGS, type Lang } from "../translations";

type TStatus = "open" | "progress" | "done";

interface DemoTask {
  id: string;
  code: string;
  title: Record<Lang, string>;
  assignee: string;
  status: TStatus;
  project: string;
}

const TASKS: DemoTask[] = [
  {
    id: "45",
    code: "#34",
    title: {
      de: "Halteblech bohren, Toleranz H7, bis Freitag",
      en: "Drill bracket, tolerance H7, by Friday",
      hu: "Tartólemez fúrása, H7 tűrés, péntekig",
    },
    assignee: "Hofer",
    status: "open",
    project: "P26-014",
  },
  {
    id: "35",
    code: "#35",
    title: {
      de: "Wareneingang prüfen und dokumentieren",
      en: "Check and document incoming goods",
      hu: "Bejövő áru ellenőrzése és dokumentálása",
    },
    assignee: "Kovács",
    status: "progress",
    project: "P26-014",
  },
  {
    id: "36",
    code: "#36",
    title: {
      de: "QC-Entscheid Halteblech P26-014",
      en: "QC decision bracket P26-014",
      hu: "QC döntés tartólemez P26-014",
    },
    assignee: "Reiner",
    status: "done",
    project: "P26-009",
  },
];

const STR: Record<Lang, { status: Record<TStatus, string>; auto: string; assignee: string }> = {
  de: { status: { open: "Offen", progress: "In Arbeit", done: "Erledigt" }, auto: "auto-übersetzt", assignee: "Zugewiesen" },
  en: { status: { open: "Open", progress: "In progress", done: "Done" }, auto: "auto-translated", assignee: "Assignee" },
  hu: { status: { open: "Nyitott", progress: "Folyamatban", done: "Kész" }, auto: "auto-fordítva", assignee: "Felelős" },
};

const STATUS_COLOR: Record<TStatus, string> = {
  open: "bg-amber-500/20 text-amber-300",
  progress: "bg-blue-500/20 text-blue-300",
  done: "bg-emerald-500/20 text-emerald-300",
};

export function TasksView({ lang }: { lang: Lang }) {
  const s = STR[lang];
  const [openId, setOpenId] = useState<string | null>("45");

  return (
    <div className="p-4 space-y-2 max-w-3xl mx-auto">
      {TASKS.map((task) => {
        const isOpen = openId === task.id;
        return (
          <div key={task.id} className="rounded-xl border border-cyan-400/10 bg-slate-900/50 overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : task.id)}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-800/40 transition"
            >
              <span className="text-xs font-mono text-cyan-400 shrink-0">{task.code}</span>
              <span className="flex-1 text-sm text-slate-200 truncate">{task.title[lang]}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLOR[task.status]}`}>
                {s.status[task.status]}
              </span>
            </button>

            {isOpen && (
              <div className="px-3 pb-3 border-t border-cyan-400/10 pt-3">
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                  <span>👤 {s.assignee}: {task.assignee}</span>
                  <span>📁 {task.project}</span>
                </div>
                {/* Auto-translation showcase */}
                <div className="space-y-1.5">
                  {LANGS.map((l) => (
                    <div
                      key={l.code}
                      className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-xs ${
                        l.code === lang ? "bg-cyan-400/10 border border-cyan-400/20" : "bg-slate-800/40"
                      }`}
                    >
                      <span className="shrink-0">{l.flag}</span>
                      <span className="text-slate-300 flex-1">{task.title[l.code]}</span>
                      {l.code !== lang && (
                        <span className="text-[9px] text-slate-500 shrink-0 mt-0.5">{s.auto}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
