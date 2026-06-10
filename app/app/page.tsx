"use client";

import { useState } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────────
   Immersive HERPERT / BLITZ demo — faithful clone of the real app shell.
   German-primary, navy theme, dummy data. No login, no backend.
   ────────────────────────────────────────────────────────────────────────── */

type WS = "post" | "termine" | "brett" | "herpert";

const NAVY = "linear-gradient(180deg, #0e2138 0%, #0a1726 55%, #081320 100%)";

export default function AppDemo() {
  const [ws, setWs] = useState<WS>("post");
  const [herpertView, setHerpertView] = useState<"menu" | "dashboard">("menu");

  return (
    <div className="fixed inset-0 flex flex-col text-slate-100 overflow-hidden" style={{ background: NAVY }}>
      <Banner ws={ws} setWs={(w) => { setWs(w); if (w === "herpert") setHerpertView("menu"); }} />

      <div className="flex-1 overflow-hidden">
        {ws === "post" && <PostView />}
        {ws === "termine" && <TermineView />}
        {ws === "brett" && <BrettBoard />}
        {ws === "herpert" && (herpertView === "menu"
          ? <HerpertMenu onOpenDashboard={() => setHerpertView("dashboard")} />
          : <AuftragsDashboard onBack={() => setHerpertView("menu")} />)}
      </div>

      <Arbeitsablage />
    </div>
  );
}

/* ── Banner ─────────────────────────────────────────────────────────────── */
function Banner({ ws, setWs }: { ws: WS; setWs: (w: WS) => void }) {
  const tabs: { key: WS; label: string }[] = [
    { key: "post", label: "Post" },
    { key: "termine", label: "Termine" },
    { key: "brett", label: "Brett" },
    { key: "herpert", label: "Herpert" },
  ];
  const showMail = ws === "post" || ws === "brett";

  return (
    <header className="shrink-0 px-6 pt-3 pb-2 border-b border-cyan-400/10" style={{ background: "rgba(14,33,56,0.6)" }}>
      <div className="flex items-start gap-4">
        <div className="leading-tight">
          <div className="text-xl font-bold tracking-wide" style={{ color: "#5bc8ea" }}>HERPERT / BLITZ</div>
          <div className="text-xs text-slate-400 mt-0.5">Eine Oberfläche für Emails und HERPERT Web</div>
        </div>

        <div className="ml-auto flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
            <span>👁</span>
            <span className="text-slate-300">Ich (Admin)</span>
            <span className="text-slate-500">⌄</span>
          </div>
          <span className="text-slate-300 hidden md:inline">Matthaeus Unger</span>
          {showMail && (
            <button className="px-3 py-1.5 rounded-lg border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 transition whitespace-nowrap">
              ✉ Neue E-Mail
            </button>
          )}
          <button className="w-8 h-8 rounded-lg bg-slate-800/60 text-slate-400 hover:text-cyan-300 transition" title="Aktualisieren">↻</button>
          <span className="px-2 py-1 rounded bg-slate-800/60 text-slate-300 text-xs font-semibold">DE</span>
          <span className="text-[10px] text-slate-600 font-mono hidden lg:inline">v1.0.452</span>
          <Link href="/" className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition whitespace-nowrap">
            Abmelden
          </Link>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setWs(t.key)}
            className={`px-5 py-1.5 rounded-lg text-sm transition ${
              ws === t.key
                ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/40 font-semibold"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </header>
  );
}

/* ── Shared side-panel data ─────────────────────────────────────────────── */
const PROJECTS = [
  { code: "R26081", name: "AVID S7", status: "NOT STARTED" },
  { code: "R25078", name: "Apogee NOVA", status: "NOT STARTED" },
  { code: "H24002", name: "GPV Ampelknopf", status: "NOT STARTED" },
  { code: "H22001", name: "MEINE ERDE REERDIGUNG", status: "STARTED" },
];
const WORKPACKAGES = [
  "H24002 GPV Proto",
  "H22001 PRODUKTION LÜFTUNG",
  "H22001 PRODUKTIONSVORBEREITUNG",
  "H22001 ECO S9A",
  "H22001 PURCHASING",
  "NOVA ECN3",
];
const TASKS_PANEL = [
  "Readiness bestaetigen fuer PR-2026-0003",
  "Pruefplan freigeben fuer PR-2026-0003",
];

function LeftPanel() {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-cyan-400/10 overflow-y-auto p-3 gap-4" style={{ background: "rgba(10,23,38,0.4)" }}>
      <PanelSection title="PROJEKTE" icon="📁">
        {PROJECTS.map((p) => (
          <div key={p.code} className="rounded-lg px-3 py-2 border-l-2 border-blue-400 bg-slate-800/40 hover:bg-slate-800/70 transition cursor-pointer">
            <div className="text-sm font-semibold text-slate-100">{p.code}</div>
            <div className="text-[11px] text-slate-400 truncate">{p.name} · {p.status}</div>
          </div>
        ))}
      </PanelSection>
      <PanelSection title="WORK PACKAGES" icon="📦">
        {WORKPACKAGES.map((w) => (
          <div key={w} className="rounded-lg px-3 py-2 border-l-2 border-purple-400 bg-slate-800/40 hover:bg-slate-800/70 transition cursor-pointer">
            <div className="text-xs text-slate-200">{w}</div>
            <div className="text-[10px] text-slate-500">ECO</div>
          </div>
        ))}
      </PanelSection>
    </aside>
  );
}

function RightPanel() {
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-l border-cyan-400/10 overflow-y-auto p-3" style={{ background: "rgba(10,23,38,0.4)" }}>
      <PanelSection title="TASKS" icon="📋">
        {TASKS_PANEL.map((t) => (
          <div key={t} className="rounded-lg px-3 py-2 border-l-2 border-amber-400 bg-slate-800/40 hover:bg-slate-800/70 transition cursor-pointer">
            <div className="text-xs text-slate-200">{t}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">FOLLOW_UP · NEW</div>
          </div>
        ))}
      </PanelSection>
    </aside>
  );
}

function PanelSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 tracking-wide mb-2 px-1">
        <span>{icon}</span>{title}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

/* ── Post (email) view ──────────────────────────────────────────────────── */
type MStatus = "inbox" | "read" | "reply" | "saved" | "sent";

const EMAILS: { id: string; from: string; time: string; subject: string; preview: string; status: MStatus }[] = [
  { id: "1", from: "Matthaeus Unger", time: "11:02", subject: "Bestellung PO-2026-0013", preview: "Sehr geehrte Damen und Herren (HUNGEMA Kft.), hiermit beauftragen wir Sie mit der Bestellung PO-2026-0013: H-5006-13441-9A CONCRETE TOOL LID BUTTOM 1 1,00 EUR …", status: "inbox" },
  { id: "2", from: "Matthaeus Unger", time: "10:45", subject: "Bestellung PO-2026-0012", preview: "Dear Sir or Madam (HUNGEMA Ltd.), I authorize you to place the order PO-2026-0012: H-5006-13441-9A CONCRETE TOOL COVER LOWER 1 1.00 EUR H-5006-13443-9A …", status: "inbox" },
  { id: "3", from: "Matthaeus Unger", time: "08:03", subject: "Summary of Unread Emails: Needs Response, FYI, and Other Important Emails", preview: "Needs Response * Sender: Microsoft Power Platform — Your Developer environment will be deleted in 3 days due to inactivity …", status: "inbox" },
  { id: "4", from: "Microsoft", time: "07:52", subject: "Ihre Microsoft-Rechnung G163776094 ist bereit.", preview: "Ihre monatliche Rechnung für Azure-Dienste steht zum Download bereit …", status: "inbox" },
];

function PostView() {
  const [emails, setEmails] = useState(EMAILS);
  const [tab, setTab] = useState<MStatus>("inbox");
  const move = (id: string, status: MStatus) => setEmails((p) => p.map((e) => (e.id === id ? { ...e, status } : e)));
  const cnt = (s: MStatus) => emails.filter((e) => e.status === s).length;
  const visible = emails.filter((e) => e.status === tab);

  const tabs: { k: MStatus; l: string; c?: string }[] = [
    { k: "inbox", l: "Posteingang", c: "text-cyan-300" },
    { k: "read", l: "Gelesen", c: "text-slate-400" },
    { k: "reply", l: "Beantworten", c: "text-amber-300" },
    { k: "saved", l: "Merken" },
    { k: "sent", l: "Gesendet" },
  ];

  return (
    <div className="h-full flex">
      <LeftPanel />
      <main className="flex-1 overflow-y-auto px-5 py-4">
        {/* tabs */}
        <div className="flex items-center gap-5 border-b border-cyan-400/10 pb-2 mb-4 text-sm">
          {tabs.map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`flex items-center gap-1.5 pb-1 border-b-2 transition ${
                tab === t.k ? "border-cyan-400 text-cyan-300 font-semibold" : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.l}
              {cnt(t.k) > 0 && (
                <span className={`text-xs px-1.5 rounded-full ${t.k === "inbox" ? "bg-cyan-400 text-slate-950" : t.k === "reply" ? "bg-rose-500 text-white" : "bg-slate-600 text-slate-200"}`}>
                  {cnt(t.k)}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <span>Mails laden seit:</span>
          <span className="px-2 py-1 rounded bg-slate-800/60 border border-slate-700">10/06/2026</span>
        </div>

        <div className="space-y-3 max-w-4xl">
          {visible.length === 0 ? (
            <div className="text-center text-slate-500 py-20 text-sm">Keine Mails hier — alles erledigt ✨</div>
          ) : visible.map((e) => (
            <div key={e.id} className="rounded-xl border border-cyan-400/10 bg-slate-900/40 p-4 hover:border-cyan-400/25 transition">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-cyan-400/15 text-cyan-300 flex items-center justify-center font-semibold">
                  {e.from[0]}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-100">{e.from}</div>
                  <div className="text-[11px] text-slate-500">{e.time}</div>
                </div>
                <button className="w-8 h-8 rounded-lg text-slate-500 hover:text-cyan-300" title="Vorlesen">🔊</button>
              </div>
              <div className="text-sm font-semibold text-slate-100 mb-1">{e.subject}</div>
              <div className="text-xs text-slate-400 mb-3 line-clamp-1">{e.preview}</div>
              <div className="grid grid-cols-4 gap-2">
                <MailBtn onClick={() => move(e.id, "inbox")} hover="hover:bg-red-500/15 hover:text-red-300">🗑 Löschen</MailBtn>
                <MailBtn onClick={() => move(e.id, "read")} hover="hover:bg-emerald-500/15 hover:text-emerald-300">✓ Gelesen</MailBtn>
                <MailBtn onClick={() => move(e.id, "reply")} hover="hover:bg-amber-500/15 hover:text-amber-300">↩ Beantworten</MailBtn>
                <MailBtn onClick={() => move(e.id, "saved")} hover="hover:bg-purple-500/15 hover:text-purple-300">★ Merken</MailBtn>
              </div>
            </div>
          ))}
        </div>
      </main>
      <RightPanel />
    </div>
  );
}

function MailBtn({ children, onClick, hover }: { children: React.ReactNode; onClick: () => void; hover: string }) {
  return (
    <button onClick={onClick} className={`text-xs py-2 rounded-lg bg-slate-800/50 text-slate-400 transition ${hover}`}>
      {children}
    </button>
  );
}

/* ── Herpert module launcher ────────────────────────────────────────────── */
const MODULES: { cat: string; icon: string; items: string[] }[] = [
  { cat: "ENTWICKLUNG", icon: "⚙️", items: ["Objekte", "Stückliste", "Objekt anlegen"] },
  { cat: "PLANUNG", icon: "📋", items: ["Fertigungsauftrag", "Produktionsübersicht", "Auftrags-Dashboard", "Beschaffungsvorbereitung"] },
  { cat: "EINKAUF", icon: "🛒", items: ["Bestellungen", "Angebote", "Rechnungen", "Anfragen (RFQ)", "Bestellverfolgung"] },
  { cat: "LAGER", icon: "📦", items: ["Wareneingang", "Prüfung & QS", "Einlagern"] },
  { cat: "PROZESSE", icon: "🔄", items: ["Aufgaben", "Work Packages"] },
  { cat: "ADMIN", icon: "🔧", items: ["Kontakte", "Projekte", "Firmen"] },
];

function HerpertMenu({ onOpenDashboard }: { onOpenDashboard: () => void }) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {MODULES.map((m) => (
          <div key={m.cat} className="rounded-2xl border border-cyan-400/10 bg-slate-900/40 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span>{m.icon}</span>
              <span className="font-bold text-slate-100 tracking-wide text-sm">{m.cat}</span>
              <span className="ml-auto text-xs text-slate-500 bg-slate-800/60 rounded-full w-5 h-5 flex items-center justify-center">{m.items.length}</span>
            </div>
            <div className="space-y-1.5">
              {m.items.map((it) => (
                <button
                  key={it}
                  onClick={it === "Auftrags-Dashboard" ? onOpenDashboard : undefined}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 bg-slate-800/40 hover:bg-slate-800/80 transition text-left group"
                >
                  <span className="text-sm text-slate-200 group-hover:text-cyan-300">{it}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold">Live</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Auftrags-Dashboard ─────────────────────────────────────────────────── */
const KPIS: { v: string; l: string; c: string }[] = [
  { v: "72", l: "Artikel", c: "text-slate-100" },
  { v: "4", l: "Ohne Lieferant", c: "text-amber-300" },
  { v: "58", l: "Ohne Preis", c: "text-amber-300" },
  { v: "68", l: "Ohne Bestellung", c: "text-amber-300" },
  { v: "10", l: "Bestellbar", c: "text-cyan-300" },
  { v: "0", l: "Unterwegs", c: "text-slate-100" },
  { v: "4", l: "Angekommen", c: "text-emerald-300" },
  { v: "4", l: "Im Lager", c: "text-emerald-300" },
  { v: "0", l: "Reserviert", c: "text-slate-100" },
  { v: "68", l: "Risiken", c: "text-rose-400" },
];
const ORDER_CARDS = [
  { id: "PR-2026-0003", desc: "Produktion von 8 Sets …", status: "PLANNED", color: "#94a3b8" },
  { id: "PR-2026-0002", desc: "Werkzeugbau für Prod…", status: "PLANNED", color: "#94a3b8" },
  { id: "PR-2026-0001", desc: "Produktion von 14 SETS", status: "IN_PROGRESS", color: "#5bc8ea" },
];

function AuftragsDashboard({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-slate-400 hover:text-cyan-300 text-sm">← Herpert</button>
        <h1 className="text-2xl font-bold" style={{ color: "#5bc8ea" }}>Auftrags-Dashboard</h1>
        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">ROT</span>
        <span className="text-sm text-slate-400">3 Aufträge</span>
      </div>

      {/* order cards */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
        <DashCard selected>
          <div className="text-2xl mb-6">📊</div>
          <div className="font-semibold text-slate-100">Alle Aufträge</div>
          <div className="text-xs text-slate-400">3 Aufträge</div>
        </DashCard>
        <DashCard dashed>
          <div className="text-2xl mb-6 text-cyan-300">+</div>
          <div className="font-semibold text-slate-100">Neuer Auftrag</div>
          <div className="text-xs text-slate-400">anlegen</div>
        </DashCard>
        {ORDER_CARDS.map((o) => (
          <DashCard key={o.id}>
            <div className="text-2xl mb-6">📦</div>
            <div className="font-semibold text-slate-100 text-sm">{o.id}</div>
            <div className="text-[11px] text-slate-400 truncate">{o.desc}</div>
            <div className="text-[11px] font-semibold mt-1" style={{ color: o.color }}>{o.status}</div>
          </DashCard>
        ))}
      </div>

      <div className="text-xs text-slate-500 mb-3">Alle Aufträge ·</div>

      {/* KPI row */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {KPIS.map((k) => (
          <div key={k.l} className="rounded-xl border border-cyan-400/10 bg-slate-900/40 px-4 py-3 min-w-[88px]">
            <div className={`text-2xl font-bold ${k.c}`}>{k.v}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{k.l}</div>
          </div>
        ))}
      </div>

      {/* three columns */}
      <div className="grid md:grid-cols-3 gap-4">
        <DashColumn title="RFQs ›" sub="offen 0 · beantwortet 2 · ohne Preis 0">
          <DashRow>#28 · HUNGEMA Kft. · CLOSED · 2 Pos. ›</DashRow>
          <DashRow>#16 · Ferolaser Kft · CLOSED · 2 Pos. ›</DashRow>
        </DashColumn>
        <DashColumn title="Bestellungen ›" sub="offen 2 · unterwegs 0 · angek. 2 · überfällig 0">
          <DashRow>PO-2026-0011 · Ferolaser Kft · ARRIVED · 443,98 EUR ›</DashRow>
          <DashRow>PO-2026-0007 · HUNGEMA Kft. · ARRIVED · 2,00 EUR ›</DashRow>
          <DashRow>PO-26000053 · Fluidtech Kft. · CANCELLED · 82.376,00 EUR ›</DashRow>
        </DashColumn>
        <DashColumn title="Lager ›" sub="Bestand 4 · reserviert 0 · fehlt 136">
          <DashRow><span className="text-slate-300 font-semibold">Lücken ›</span> Lieferant 8 · Preis 116 · Bestellung 136</DashRow>
          <DashRow><span className="text-slate-300 font-semibold">Risiken ›</span> verspätet 0 · Qualität 0 · kritisch 136</DashRow>
        </DashColumn>
      </div>
    </div>
  );
}

function DashCard({ children, selected, dashed }: { children: React.ReactNode; selected?: boolean; dashed?: boolean }) {
  return (
    <div
      className={`shrink-0 w-40 h-44 rounded-2xl p-4 flex flex-col ${
        selected ? "border-2 border-cyan-400/60 bg-cyan-400/5" : dashed ? "border-2 border-dashed border-slate-600 bg-slate-900/30" : "border border-cyan-400/10 bg-slate-900/40"
      }`}
    >
      {children}
    </div>
  );
}

function DashColumn({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-cyan-400/10 bg-slate-900/40 p-4">
      <div className="font-semibold text-slate-100 mb-1">{title}</div>
      <div className="text-[11px] text-slate-500 mb-3">{sub}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DashRow({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer">{children}</div>;
}

/* ── Brett (board) ──────────────────────────────────────────────────────── */
const BRETT: { title: string; icon: string; color: string; count: number; cards: React.ReactNode[] }[] = [
  {
    title: "Projekte", icon: "📁", color: "#3b82f6", count: 4,
    cards: PROJECTS.map((p) => (
      <BrettCard key={p.code}>
        <div className="text-sm font-semibold text-slate-100">{p.code}</div>
        <KV k="Name" v={p.name} /><KV k="Status" v={p.status} />
      </BrettCard>
    )),
  },
  {
    title: "Arbeitspakete", icon: "📦", color: "#8b5cf6", count: 6,
    cards: ["H24002 GPV Proto", "H22001 PRODUKTION LÜFTUNG", "H22001 PRODUKTIONSVORBEREITUNG", "H22001 ECO S9A", "H22001 PURCHASING", "NOVA ECN3"].map((w) => (
      <BrettCard key={w}>
        <div className="text-sm text-slate-100">{w}</div>
        <KV k="Verantwortl." v="Matthaeus Unger" /><KV k="Tasks" v="1 offen / 1 gesamt" />
      </BrettCard>
    )),
  },
  {
    title: "Emails", icon: "✉", color: "#5bc8ea", count: 36,
    cards: ["Bestellung PO-2026-0013", "Bestellung PO-2026-0012", "Summary of Unread Emails", "Ihre Microsoft-Rechnung G163776094", "FIORESI.COM - Domain Broker Service"].map((s, i) => (
      <BrettCard key={i}>
        <div className="text-sm text-slate-100 line-clamp-2">{s}</div>
        <KV k="Von" v={i === 4 ? "Elvira Tsekova" : i === 3 ? "Microsoft" : "Matthaeus Unger"} /><KV k="Datum" v="10.6.2026" />
      </BrettCard>
    )),
  },
  {
    title: "Tasks", icon: "📋", color: "#f59e0b", count: 13,
    cards: [
      <BrettCard key="t1"><div className="text-sm text-slate-100">Luchtlöcher 2mm ANPASSEN. SOFORT</div><div className="flex gap-1 mt-1.5"><Badge c="emerald">DONE</Badge><Badge c="slate">OTHER</Badge><Badge c="cyan">NORMAL</Badge></div></BrettCard>,
      <BrettCard key="t2"><div className="text-sm text-slate-100">Betonwerkzeug anpassen</div><div className="flex gap-1 mt-1.5"><Badge c="amber">IN_PROGRESS</Badge><Badge c="slate">CHANGE_OBJECT</Badge></div><div className="flex gap-1 mt-1"><Badge c="amber">▲ HIGH</Badge><Badge c="rose">⚠ 20.5.2026</Badge></div><div className="text-[11px] text-slate-400 mt-1">👤 Robert Rác</div></BrettCard>,
      <BrettCard key="t3"><div className="text-sm text-slate-100">Räder umstellen (gebremste, ungebremste)</div><div className="flex gap-1 mt-1.5"><Badge c="blue">NEW</Badge><Badge c="slate">OTHER</Badge><Badge c="cyan">NORMAL</Badge></div></BrettCard>,
      <BrettCard key="t4"><div className="text-sm text-slate-100">H-7200-13170-92 Seitenteil anpassen</div><div className="flex gap-1 mt-1.5"><Badge c="amber">IN_PROGRESS</Badge><Badge c="slate">OTHER</Badge></div></BrettCard>,
    ],
  },
  {
    title: "Bestellungen", icon: "🛒", color: "#10b981", count: 2,
    cards: [
      <BrettCard key="b1"><div className="text-sm font-semibold text-slate-100">PO-2026-0011</div><KV k="Lieferant" v="Ferolaser Kft" /><KV k="Status" v="ARRIVED" /></BrettCard>,
      <BrettCard key="b2"><div className="text-sm font-semibold text-slate-100">PO-2026-0007</div><KV k="Lieferant" v="HUNGEMA Kft." /><KV k="Status" v="ARRIVED" /></BrettCard>,
    ],
  },
  { title: "Rechnungen", icon: "🧾", color: "#a855f7", count: 0, cards: [<div key="none" className="text-xs text-slate-500 italic px-1">Keine Einträge</div>] },
];

function BrettBoard() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-6 py-2.5 border-b border-cyan-400/10 text-sm" style={{ background: "rgba(14,33,56,0.5)" }}>
        <span className="px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 text-xs font-semibold">🐺 Rudel</span>
        <span className="font-semibold text-slate-200">Sprechendes Seitenhirn</span>
        <span className="text-slate-500 text-xs">Gesamtes Brett im Fokus</span>
      </div>
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-3 h-full min-w-max">
          {BRETT.map((lane) => (
            <div key={lane.title} className="w-64 shrink-0 flex flex-col">
              <div className="rounded-t-xl px-3 py-2 flex items-center gap-2 border-t-2" style={{ borderColor: lane.color, background: "rgba(15,30,50,0.6)" }}>
                <span>{lane.icon}</span>
                <span className="text-sm font-semibold text-slate-100">{lane.title}</span>
                <span className="ml-auto text-xs text-slate-400 bg-slate-800/60 rounded-full px-2">{lane.count}</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 p-2 rounded-b-xl bg-slate-900/30">{lane.cards}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrettCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg bg-slate-800/50 border border-cyan-400/5 p-2.5 hover:border-cyan-400/20 transition cursor-grab">{children}</div>;
}
function KV({ k, v }: { k: string; v: string }) {
  return <div className="flex gap-2 text-[11px] mt-1"><span className="text-slate-500 w-20 shrink-0">{k}</span><span className="text-slate-300 truncate">{v}</span></div>;
}
function Badge({ children, c }: { children: React.ReactNode; c: string }) {
  const map: Record<string, string> = {
    emerald: "bg-emerald-500/20 text-emerald-300", amber: "bg-amber-500/20 text-amber-300",
    cyan: "bg-cyan-500/20 text-cyan-300", slate: "bg-slate-600/40 text-slate-300",
    blue: "bg-blue-500/20 text-blue-300", rose: "bg-rose-500/20 text-rose-300",
  };
  return <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${map[c]}`}>{children}</span>;
}

/* ── Termine (calendar) ─────────────────────────────────────────────────── */
const WD = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
const CAL_EVENTS: Record<number, { label: string; color: string }[]> = {
  2: [{ label: "Erinnerung go-int…", color: "#3b82f6" }],
  3: [{ label: "Alexi in Ibiza", color: "#8b5cf6" }, { label: "NOVA-Matthaeus…", color: "#5bc8ea" }],
  4: [{ label: "HGM / ME: weekly", color: "#3b82f6" }],
  5: [{ label: "Meeting", color: "#8b5cf6" }, { label: "PATMOS <> Apo…", color: "#5bc8ea" }],
  6: [{ label: "H-7200-13170-9…", color: "#10b981" }],
  10: [{ label: "NOVA-Matthaeus…", color: "#5bc8ea" }],
  11: [{ label: "HGM / ME: weekly", color: "#3b82f6" }],
  12: [{ label: "PATMOS <> Apo…", color: "#5bc8ea" }],
  18: [{ label: "Alexi Augenlider…", color: "#8b5cf6" }, { label: "HGM / ME: weekly", color: "#3b82f6" }],
  19: [{ label: "PATMOS <> Apo…", color: "#5bc8ea" }],
  24: [{ label: "NOVA-Matthaeus…", color: "#5bc8ea" }],
  25: [{ label: "HGM / ME: weekly", color: "#3b82f6" }],
  26: [{ label: "PATMOS <> Apo…", color: "#5bc8ea" }],
};

function TermineView() {
  const cells: (number | null)[] = [...Array.from({ length: 30 }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="h-full flex">
      <LeftPanel />
      <main className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center gap-3 mb-4">
          <button className="w-8 h-8 rounded-lg bg-slate-800/60 text-slate-300">‹</button>
          <h1 className="text-2xl font-bold text-slate-100">Juni 2026</h1>
          <button className="w-8 h-8 rounded-lg bg-slate-800/60 text-slate-300">›</button>
          <button className="px-4 py-1.5 rounded-lg bg-cyan-400/15 text-cyan-300 text-sm border border-cyan-400/30 ml-2">Heute</button>
          <button className="px-4 py-1.5 rounded-lg bg-cyan-400/15 text-cyan-300 text-sm border border-cyan-400/30">+ Termin anlegen</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WD.map((d) => <div key={d} className="text-[11px] text-slate-500 font-mono py-1 px-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => (
            <div key={i} className={`min-h-[92px] rounded-lg p-1.5 ${day ? "bg-slate-800/30 border border-cyan-400/5" : ""} ${day === 10 ? "ring-1 ring-cyan-400" : ""}`}>
              {day && <>
                <div className={`text-xs mb-1 ${day === 10 ? "text-cyan-300 font-bold" : "text-slate-400"}`}>{day}</div>
                <div className="space-y-0.5">
                  {(CAL_EVENTS[day] || []).map((ev, j) => (
                    <div key={j} className="text-[9px] rounded px-1 py-0.5 text-white truncate" style={{ background: `${ev.color}cc` }}>{ev.label}</div>
                  ))}
                </div>
              </>}
            </div>
          ))}
        </div>
      </main>
      <RightPanel />
    </div>
  );
}

/* ── Arbeitsablage (parked items) footer ────────────────────────────────── */
function Arbeitsablage() {
  const [open, setOpen] = useState(true);
  return (
    <div className="shrink-0 border-t border-cyan-400/10" style={{ background: "rgba(10,23,38,0.7)" }}>
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-2 px-5 py-2 text-sm">
        <span>📁</span>
        <span className="font-semibold text-slate-300 tracking-wide text-xs">ARBEITSABLAGE</span>
        <span className="text-xs bg-cyan-400/20 text-cyan-300 rounded-full px-2">1</span>
      </button>
      {open && (
        <div className="px-5 pb-3">
          <div className="inline-flex items-center gap-2 rounded-lg bg-slate-800/60 border border-cyan-400/10 px-3 py-2 max-w-xs">
            <span className="text-slate-500">✉</span>
            <div className="min-w-0">
              <div className="text-xs text-slate-200 truncate">Rastelli Raccordi</div>
              <div className="text-[10px] text-slate-500 truncate">Rosario Bordino - Rastelli Raccor</div>
            </div>
            <span className="text-slate-500 text-xs ml-2">↗ ×</span>
          </div>
        </div>
      )}
    </div>
  );
}
