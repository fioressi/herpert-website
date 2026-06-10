"use client";

import { useState } from "react";
import Link from "next/link";
import { LANGS, type Lang } from "../translations";
import { BlitzDemo } from "../BlitzDemo";
import { BrettView } from "../demo/BrettView";
import { CalendarView } from "../demo/CalendarView";
import { OrdersView } from "../demo/OrdersView";
import { TasksView } from "../demo/TasksView";
import { RudelView } from "../demo/RudelView";

type WS = "emails" | "termine" | "brett" | "pdm";

const UI: Record<Lang, {
  sub: string;
  tabs: Record<WS, string>;
  panels: { projects: string; orders: string; tasks: string; tags: string };
  tags: string[];
  rudel: string;
  back: string;
  compose: string;
}> = {
  de: {
    sub: "PDM-Email & ERP",
    tabs: { emails: "Emails", termine: "Termine", brett: "Brett", pdm: "PDM" },
    panels: { projects: "Projekte", orders: "Bestellungen", tasks: "Tasks", tags: "Tags" },
    tags: ["Dringend", "Warten", "Klären"],
    rudel: "Rudel",
    back: "← Zur Website",
    compose: "✎ Neu",
  },
  en: {
    sub: "PDM email & ERP",
    tabs: { emails: "Emails", termine: "Appointments", brett: "Board", pdm: "PDM" },
    panels: { projects: "Projects", orders: "Orders", tasks: "Tasks", tags: "Tags" },
    tags: ["Urgent", "Waiting", "Clarify"],
    rudel: "Rudel",
    back: "← To website",
    compose: "✎ New",
  },
  hu: {
    sub: "PDM email és ERP",
    tabs: { emails: "Emailek", termine: "Időpontok", brett: "Tábla", pdm: "PDM" },
    panels: { projects: "Projektek", orders: "Megrendelések", tasks: "Feladatok", tags: "Címkék" },
    tags: ["Sürgős", "Várakozik", "Tisztázni"],
    rudel: "Rudel",
    back: "← A weboldalra",
    compose: "✎ Új",
  },
};

const PROJECTS = [
  { code: "H26001", name: "Greifeinheit V3" },
  { code: "H26002", name: "Modul A" },
];
const ORDERS = ["PO-2026-001", "PO-2026-002", "PO-2026-003"];
const TASKS = ["#45 RFQ Welle", "#46 Inspektion", "#47 QC Welle"];
const TAG_COLORS = ["#ef4444", "#8b5cf6", "#6b7280"];

export default function AppDemo() {
  const [ws, setWs] = useState<WS>("emails");
  const [lang, setLang] = useState<Lang>("de");
  const [rudelOpen, setRudelOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const u = UI[lang];

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Banner */}
      <header className="shrink-0 border-b border-cyan-400/15 bg-slate-900/70 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <div className="flex flex-col leading-none">
            <span className="font-bold text-cyan-400 tracking-wide text-sm">HERPERT / BLITZ</span>
            <span className="text-[10px] text-slate-500 mt-0.5">{u.sub}</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-300 font-mono">
            DEMO
          </span>

          <div className="ml-auto flex items-center gap-2">
            {ws === "emails" && (
              <button className="text-xs px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-500 transition">
                {u.compose}
              </button>
            )}
            <button
              onClick={() => setRudelOpen((o) => !o)}
              className={`text-xs px-3 py-1.5 rounded-lg transition ${
                rudelOpen ? "bg-cyan-400 text-slate-950 font-semibold" : "bg-slate-800 text-slate-300 hover:text-cyan-400"
              }`}
            >
              🐺 {u.rudel}
            </button>
            <div className="flex gap-0.5 p-0.5 rounded-lg bg-slate-800">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-1 rounded text-sm transition ${
                    lang === l.code ? "bg-cyan-400 text-slate-950" : "text-slate-400 hover:text-cyan-400"
                  }`}
                >
                  {l.flag}
                </button>
              ))}
            </div>
            <Link
              href="/"
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition whitespace-nowrap"
            >
              {u.back}
            </Link>
          </div>
        </div>

        {/* Workspace tabs */}
        <div className="flex gap-1 px-4">
          {(Object.keys(u.tabs) as WS[]).map((key) => (
            <button
              key={key}
              onClick={() => setWs(key)}
              className={`px-4 py-2 text-sm border-b-2 transition ${
                ws === key
                  ? "border-cyan-400 text-cyan-400 font-semibold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {u.tabs[key]}
            </button>
          ))}
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Email workspace = 3 panels; others = full center */}
        {ws === "emails" ? (
          <>
            {/* Left panel */}
            <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-cyan-400/10 bg-slate-900/40 overflow-y-auto">
              <PanelGroup title={u.panels.projects} icon="📁">
                {PROJECTS.map((p) => (
                  <PanelItem
                    key={p.code}
                    active={activeProject === p.code}
                    onClick={() => setActiveProject(activeProject === p.code ? null : p.code)}
                    color="#3b82f6"
                  >
                    <span className="font-mono text-xs">{p.code}</span>
                    <span className="text-slate-400 text-[11px] ml-1.5">{p.name}</span>
                  </PanelItem>
                ))}
              </PanelGroup>
              <PanelGroup title={u.panels.orders} icon="🛒">
                {ORDERS.map((o) => (
                  <PanelItem key={o} color="#10b981">
                    <span className="font-mono text-xs">{o}</span>
                  </PanelItem>
                ))}
              </PanelGroup>
            </aside>

            {/* Center inbox */}
            <main className="flex-1 overflow-y-auto p-4 bg-slate-950/40">
              <div className="max-w-xl mx-auto">
                <BlitzDemo lang={lang} wide />
              </div>
            </main>

            {/* Right panel */}
            <aside className="hidden lg:flex flex-col w-56 shrink-0 border-l border-cyan-400/10 bg-slate-900/40 overflow-y-auto">
              <PanelGroup title={u.panels.tasks} icon="📋">
                {TASKS.map((t) => (
                  <PanelItem key={t} color="#f59e0b">
                    <span className="text-xs">{t}</span>
                  </PanelItem>
                ))}
              </PanelGroup>
              <PanelGroup title={u.panels.tags} icon="🏷">
                {u.tags.map((tag, i) => (
                  <PanelItem key={tag} color={TAG_COLORS[i]}>
                    <span className="text-xs">{tag}</span>
                  </PanelItem>
                ))}
              </PanelGroup>
            </aside>
          </>
        ) : (
          <main className="flex-1 overflow-y-auto p-4 bg-slate-950/40">
            <div className="max-w-5xl mx-auto glass bg-slate-950/60 overflow-hidden">
              {ws === "termine" && <CalendarView lang={lang} />}
              {ws === "brett" && <BrettView lang={lang} />}
              {ws === "pdm" && <OrdersView lang={lang} />}
            </div>
            {ws === "brett" && (
              <div className="max-w-5xl mx-auto mt-4 glass bg-slate-950/60 overflow-hidden">
                <TasksView lang={lang} />
              </div>
            )}
          </main>
        )}

        {/* Rudel drawer */}
        {rudelOpen && (
          <aside className="w-full sm:w-96 shrink-0 border-l border-cyan-400/15 bg-slate-900/70 backdrop-blur flex flex-col absolute sm:relative inset-0 sm:inset-auto z-20">
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-400/10">
              <span className="font-semibold text-cyan-400">🐺 {u.rudel}</span>
              <button onClick={() => setRudelOpen(false)} className="text-slate-400 hover:text-cyan-400 text-xl leading-none">
                ×
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <RudelView lang={lang} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function PanelGroup({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="p-3 border-b border-cyan-400/5">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2 px-1">
        <span>{icon}</span>
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function PanelItem({
  children,
  color,
  active,
  onClick,
}: {
  children: React.ReactNode;
  color: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left border-l-2 transition ${
        active ? "bg-cyan-400/10" : "bg-slate-800/40 hover:bg-slate-800/70"
      }`}
      style={{ borderColor: color }}
    >
      <span className="text-slate-200 truncate">{children}</span>
    </button>
  );
}
