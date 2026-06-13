"use client";

import { useState } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────────────────────
   Immersive HERPERT / BLITZ demo — faithful clone of the real app shell.
   German-primary, navy theme, dummy data. No login, no backend.
   ────────────────────────────────────────────────────────────────────────── */

type WS = "post" | "termine" | "brett" | "fips" | "paul" | "klaus" | "zwutschgerl" | "herpert";

const NAVY = "linear-gradient(180deg, #0e2138 0%, #0a1726 55%, #081320 100%)";

export default function AppDemo() {
  const [ws, setWs] = useState<WS>("post");
  const [herpertView, setHerpertView] = useState<"menu" | "dashboard">("menu");
  const [meuteOpen, setMeuteOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col text-slate-100 overflow-hidden" style={{ background: NAVY }}>
      <Banner
        ws={ws}
        setWs={(w) => { setWs(w); if (w === "herpert") setHerpertView("menu"); }}
        meuteOpen={meuteOpen}
        onMeute={() => setMeuteOpen((o) => !o)}
      />

      <div className="flex-1 overflow-hidden">
        {ws === "post" && <PostView />}
        {ws === "termine" && <TermineView />}
        {ws === "brett" && <BrettBoard />}
        {ws === "fips" && <FipsView />}
        {ws === "paul" && <PaulView />}
        {ws === "klaus" && <KlausView />}
        {ws === "zwutschgerl" && <ZwutschgerlnView />}
        {ws === "herpert" && (herpertView === "menu"
          ? <HerpertMenu onOpenDashboard={() => setHerpertView("dashboard")} />
          : <AuftragsDashboard onBack={() => setHerpertView("menu")} />)}
      </div>

      <Arbeitsablage />

      {meuteOpen && <MeuteOverlay onClose={() => setMeuteOpen(false)} />}
    </div>
  );
}

/* ── Banner ─────────────────────────────────────────────────────────────── */
function Banner({ ws, setWs, meuteOpen, onMeute }: { ws: WS; setWs: (w: WS) => void; meuteOpen: boolean; onMeute: () => void }) {
  const tabs: { key: WS; label: string; title?: string }[] = [
    { key: "post", label: "Blitz Post" },
    { key: "termine", label: "Blitz Termin" },
    { key: "brett", label: "Blitz Brett" },
    { key: "fips", label: "Blitz Fips", title: "Field Interactive Project Space" },
    { key: "paul", label: "Paul", title: "Project Approval & Lifecycle Management" },
    { key: "klaus", label: "Klaus", title: "Buchhaltung" },
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
          <span className="text-slate-300 hidden md:inline">Alex Berger</span>
          {showMail && (
            <button className="px-3 py-1.5 rounded-lg border border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 transition whitespace-nowrap">
              ✉ Neue E-Mail
            </button>
          )}
          <button
            onClick={() => setWs("zwutschgerl")}
            title="Zwutschgerln — private Notizen & Mini-Tasks"
            className={`px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
              ws === "zwutschgerl"
                ? "border-amber-400/50 text-amber-200 bg-amber-400/10"
                : "border-slate-700 text-slate-300 hover:border-amber-400/40 hover:text-amber-200"
            }`}
          >
            🟨 Zwutschgerln
          </button>
          <button
            onClick={onMeute}
            title="Meute (KI-Council) öffnen"
            className={`px-3 py-1.5 rounded-lg border transition whitespace-nowrap ${
              meuteOpen
                ? "border-cyan-400/60 text-cyan-200 bg-cyan-400/15"
                : "border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10"
            }`}
          >
            🐺 Meute
          </button>
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
            title={t.title}
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
  { code: "P26-014", name: "Förderband V2", status: "STARTED" },
  { code: "P26-009", name: "Greifmodul X3", status: "NOT STARTED" },
  { code: "P25-103", name: "Spannvorrichtung A", status: "NOT STARTED" },
  { code: "P26-021", name: "Gehäuse Serie 4", status: "NOT STARTED" },
];
const WORKPACKAGES = [
  "P26-014 Montage",
  "P26-009 Konstruktion",
  "P26-009 Fertigung",
  "P25-103 Prüfung",
  "P26-021 Lackierung",
  "P26-014 Verdrahtung",
];
const TASKS_PANEL = [
  "Freigabe bestätigen für PR-2026-0042",
  "Prüfplan freigeben für PR-2026-0042",
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
  { id: "1", from: "Lena Hofer", time: "11:02", subject: "Bestellung PO-2026-0021", preview: "Sehr geehrte Damen und Herren (Nordmetall GmbH), hiermit beauftragen wir Sie mit der Bestellung PO-2026-0021: H-7206-14021-90 Halteblech links · 4 · 28,50 EUR …", status: "inbox" },
  { id: "2", from: "Marek Kovács", time: "10:45", subject: "Angebot Präzitec Kft.", preview: "Guten Tag, anbei unser Angebot zu RFQ #34. Position 3 können wir mit kürzerer Lieferzeit anbieten, Details im PDF …", status: "inbox" },
  { id: "3", from: "Tobias Reiner", time: "08:03", subject: "Rückfrage Toleranz Position 4", preview: "Hallo, zur Bohrung an Position 4 brauchen wir die Toleranz — H7 oder freier? Sonst pausiert die Fertigung …", status: "inbox" },
  { id: "4", from: "Sofia Brandt", time: "07:52", subject: "Lieferavis Nordmetall — KW 25", preview: "Die Teile aus PO-2026-0018 sind kommissioniert und gehen morgen raus. Tracking folgt separat …", status: "inbox" },
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
  { id: "PR-2026-0042", desc: "Produktion von 12 Sets …", status: "PLANNED", color: "#94a3b8" },
  { id: "PR-2026-0041", desc: "Werkzeugbau Gehäuse…", status: "PLANNED", color: "#94a3b8" },
  { id: "PR-2026-0040", desc: "Serie 4 Montage", status: "IN_PROGRESS", color: "#5bc8ea" },
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
        <DashColumn title="RFQs ›" sub="offen 1 · beantwortet 2 · ohne Preis 0">
          <DashRow>#34 · Nordmetall GmbH · CLOSED · 3 Pos. ›</DashRow>
          <DashRow>#29 · Präzitec Kft. · OFFEN · 2 Pos. ›</DashRow>
        </DashColumn>
        <DashColumn title="Bestellungen ›" sub="offen 1 · unterwegs 1 · angek. 1 · überfällig 0">
          <DashRow>PO-2026-0021 · Präzitec Kft. · ARRIVED · 1.240,00 EUR ›</DashRow>
          <DashRow>PO-2026-0018 · Nordmetall GmbH · OFFEN · 3.880,00 EUR ›</DashRow>
          <DashRow>PO-2026-0009 · FeinTech Kft. · CANCELLED · 12.500,00 EUR ›</DashRow>
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
    cards: WORKPACKAGES.map((w) => (
      <BrettCard key={w}>
        <div className="text-sm text-slate-100">{w}</div>
        <KV k="Verantwortl." v="Alex Berger" /><KV k="Tasks" v="1 offen / 1 gesamt" />
      </BrettCard>
    )),
  },
  {
    title: "Emails", icon: "✉", color: "#5bc8ea", count: 18,
    cards: [
      { s: "Bestellung PO-2026-0021", v: "Lena Hofer" },
      { s: "Angebot Präzitec Kft.", v: "Marek Kovács" },
      { s: "Rückfrage Toleranz Position 4", v: "Tobias Reiner" },
      { s: "Lieferavis Nordmetall — KW 25", v: "Sofia Brandt" },
      { s: "Rechnung R-2026-0188", v: "David Lang" },
    ].map((e, i) => (
      <BrettCard key={i}>
        <div className="text-sm text-slate-100 line-clamp-2">{e.s}</div>
        <KV k="Von" v={e.v} /><KV k="Datum" v="10.6.2026" />
      </BrettCard>
    )),
  },
  {
    title: "Tasks", icon: "📋", color: "#f59e0b", count: 9,
    cards: [
      <BrettCard key="t1"><div className="text-sm text-slate-100">Bohrbild anpassen, H7</div><div className="flex gap-1 mt-1.5"><Badge c="emerald">DONE</Badge><Badge c="slate">OTHER</Badge><Badge c="cyan">NORMAL</Badge></div></BrettCard>,
      <BrettCard key="t2"><div className="text-sm text-slate-100">Gehäuse entgraten</div><div className="flex gap-1 mt-1.5"><Badge c="amber">IN_PROGRESS</Badge><Badge c="slate">CHANGE_OBJECT</Badge></div><div className="flex gap-1 mt-1"><Badge c="amber">▲ HIGH</Badge><Badge c="rose">⚠ 12.6.2026</Badge></div><div className="text-[11px] text-slate-400 mt-1">👤 Marek Kovács</div></BrettCard>,
      <BrettCard key="t3"><div className="text-sm text-slate-100">Prüfprotokoll erstellen</div><div className="flex gap-1 mt-1.5"><Badge c="blue">NEW</Badge><Badge c="slate">OTHER</Badge><Badge c="cyan">NORMAL</Badge></div></BrettCard>,
      <BrettCard key="t4"><div className="text-sm text-slate-100">H-7206-14088-92 Seitenteil anpassen</div><div className="flex gap-1 mt-1.5"><Badge c="amber">IN_PROGRESS</Badge><Badge c="slate">OTHER</Badge></div></BrettCard>,
    ],
  },
  {
    title: "Bestellungen", icon: "🛒", color: "#10b981", count: 2,
    cards: [
      <BrettCard key="b1"><div className="text-sm font-semibold text-slate-100">PO-2026-0021</div><KV k="Lieferant" v="Präzitec Kft." /><KV k="Status" v="ARRIVED" /></BrettCard>,
      <BrettCard key="b2"><div className="text-sm font-semibold text-slate-100">PO-2026-0018</div><KV k="Lieferant" v="Nordmetall GmbH" /><KV k="Status" v="OFFEN" /></BrettCard>,
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
  2: [{ label: "Projektreview P26-014", color: "#3b82f6" }],
  3: [{ label: "Werkstatt-Meeting", color: "#8b5cf6" }, { label: "Sync Konstruktion", color: "#5bc8ea" }],
  4: [{ label: "Weekly Sync", color: "#3b82f6" }],
  5: [{ label: "Kickoff P26-021", color: "#8b5cf6" }, { label: "Lieferung Präzitec", color: "#5bc8ea" }],
  6: [{ label: "Abnahme P26-014", color: "#10b981" }],
  10: [{ label: "Sync Konstruktion", color: "#5bc8ea" }],
  11: [{ label: "Weekly Sync", color: "#3b82f6" }],
  12: [{ label: "QS-Termin", color: "#5bc8ea" }],
  18: [{ label: "Review Greifmodul", color: "#8b5cf6" }, { label: "Weekly Sync", color: "#3b82f6" }],
  19: [{ label: "QS-Termin", color: "#5bc8ea" }],
  24: [{ label: "Sync Konstruktion", color: "#5bc8ea" }],
  25: [{ label: "Weekly Sync", color: "#3b82f6" }],
  26: [{ label: "Abnahme P26-021", color: "#5bc8ea" }],
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

/* ── Shared shell hero ──────────────────────────────────────────────────── */
function ShellHero({ kicker, title, sub, badge }: { kicker: string; title: string; sub: string; badge?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div>
        <div className="text-[11px] uppercase tracking-widest text-cyan-400/80 font-semibold mb-1">{kicker}</div>
        <h1 className="text-3xl font-bold" style={{ color: "#5bc8ea" }}>{title}</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">{sub}</p>
      </div>
      {badge && <span className="ml-auto shrink-0 text-[10px] px-2 py-0.5 rounded bg-cyan-400/15 text-cyan-300 font-semibold border border-cyan-400/20 mt-1">{badge}</span>}
    </div>
  );
}

/* ── Blitz Fips (Field Interactive Project Space) ───────────────────────── */
const FIPS_ROOMS = ["P26-014 Montage", "P26-009 Konstruktion", "P26-009 Fertigung", "P25-103 Prüfung"];
const FIPS_SUBTABS = ["Kanban", "Termine", "Mails", "Files", "Chat"];

function FipsView() {
  const [room, setRoom] = useState(FIPS_ROOMS[0]);
  const [sub, setSub] = useState("Kanban");
  return (
    <div className="h-full overflow-y-auto p-6">
      <ShellHero
        kicker="Field Interactive Project Space"
        title="Blitz Fips"
        sub="Interne Sicht auf einen Room (= Arbeitspaket): Kanban, Termine, Mails, Files und Chat an einem Ort — die Meute ist im Chat zuschaltbar."
        badge="ROOM"
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {FIPS_ROOMS.map((r) => (
          <button
            key={r}
            onClick={() => setRoom(r)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition ${
              room === r ? "border-purple-400/60 text-purple-200 bg-purple-400/10" : "border-slate-700 text-slate-400 hover:text-slate-200"
            }`}
          >
            📦 {r}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-5 border-b border-cyan-400/10 pb-2 mb-4 text-sm">
        {FIPS_SUBTABS.map((s) => (
          <button
            key={s}
            onClick={() => setSub(s)}
            className={`pb-1 border-b-2 transition ${sub === s ? "border-cyan-400 text-cyan-300 font-semibold" : "border-transparent text-slate-400 hover:text-slate-200"}`}
          >
            {s}{s === "Chat" && " 🐺"}
          </button>
        ))}
      </div>
      {sub === "Kanban" && (
        <div className="grid md:grid-cols-3 gap-3 max-w-5xl">
          <FipsLane title="NEW" color="#3b82f6">
            <BrettCard><div className="text-sm text-slate-100">Prüfprotokoll erstellen</div><div className="flex gap-1 mt-1.5"><Badge c="blue">NEW</Badge><Badge c="cyan">NORMAL</Badge></div></BrettCard>
          </FipsLane>
          <FipsLane title="IN_PROGRESS" color="#f59e0b">
            <BrettCard><div className="text-sm text-slate-100">Gehäuse entgraten</div><div className="flex gap-1 mt-1.5"><Badge c="amber">IN_PROGRESS</Badge><Badge c="amber">▲ HIGH</Badge></div><div className="text-[11px] text-slate-400 mt-1">👤 Marek Kovács</div></BrettCard>
            <BrettCard><div className="text-sm text-slate-100">Bohrbild anpassen, H7</div><div className="flex gap-1 mt-1.5"><Badge c="amber">IN_PROGRESS</Badge></div></BrettCard>
          </FipsLane>
          <FipsLane title="DONE" color="#10b981">
            <BrettCard><div className="text-sm text-slate-100">Material kommissioniert</div><div className="flex gap-1 mt-1.5"><Badge c="emerald">DONE</Badge></div></BrettCard>
          </FipsLane>
        </div>
      )}
      {sub === "Termine" && (
        <div className="max-w-2xl space-y-2">
          <FipsRow icon="📅" main="Werkstatt-Meeting — Montagefreigabe" meta="Mi 17.06. · 09:00 · Halle 2" />
          <FipsRow icon="📅" main="QS-Termin Halteblech" meta="Do 18.06. · 14:00" />
          <div className="text-[11px] text-slate-500 px-1">Room-Termine im Kaliber-Look · Igor kann Slots vorschlagen.</div>
        </div>
      )}
      {sub === "Mails" && (
        <div className="max-w-2xl space-y-2">
          <FipsRow icon="✉" main="Rückfrage Toleranz Position 4" meta="Tobias Reiner · 08:03" />
          <FipsRow icon="✉" main="Lieferavis Nordmetall — KW 25" meta="Sofia Brandt · 07:52" />
          <div className="text-[11px] text-slate-500 px-1">Nur dem Room zugeordnete Mails — öffnen das volle EmailDetail.</div>
        </div>
      )}
      {sub === "Files" && (
        <div className="max-w-2xl space-y-2">
          <FipsRow icon="📄" main="Montagezeichnung_P26-014_RevB.pdf" meta="1,8 MB · 10.06.2026" />
          <FipsRow icon="📄" main="Prüfplan_Halteblech.xlsx" meta="44 KB · 09.06.2026" />
          <FipsRow icon="📄" main="Foto_Entgratung.jpg" meta="2,3 MB · 11.06.2026" />
        </div>
      )}
      {sub === "Chat" && (
        <div className="max-w-2xl">
          <div className="rounded-xl border border-cyan-400/10 bg-slate-900/40 p-4 space-y-3">
            <ChatBubble who="Alex Berger" me text="Steht die Montage von P26-014 für KW 25?" />
            <ChatBubble who="Marek Kovács" text="Bohrbild ist angepasst, Gehäuse entgraten läuft. KW 25 hält." />
            <ChatBubble who="🐺 Meute · Igor" ai text="Offen ist nur das Prüfprotokoll (NEW). Slot Do 18.06. 14:00 würde passen — soll ich den Termin anlegen?" />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <input disabled placeholder="Nachricht an den Room…" className="flex-1 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-sm text-slate-300 placeholder:text-slate-600" />
            <span className="px-3 py-2 rounded-lg bg-cyan-400/15 text-cyan-300 text-xs font-semibold border border-cyan-400/30">🐺 Meute an</span>
          </div>
        </div>
      )}
    </div>
  );
}

function FipsLane({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="rounded-t-xl px-3 py-2 flex items-center gap-2 border-t-2" style={{ borderColor: color, background: "rgba(15,30,50,0.6)" }}>
        <span className="text-sm font-semibold text-slate-100">{title}</span>
      </div>
      <div className="flex-1 space-y-2 p-2 rounded-b-xl bg-slate-900/30 min-h-[120px]">{children}</div>
    </div>
  );
}

function FipsRow({ icon, main, meta }: { icon: string; main: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-cyan-400/10 bg-slate-900/40 px-3 py-2.5 hover:border-cyan-400/25 transition">
      <span className="text-slate-400">{icon}</span>
      <div className="min-w-0">
        <div className="text-sm text-slate-100 truncate">{main}</div>
        <div className="text-[11px] text-slate-500">{meta}</div>
      </div>
    </div>
  );
}

function ChatBubble({ who, text, me, ai }: { who: string; text: string; me?: boolean; ai?: boolean }) {
  return (
    <div className={`max-w-[85%] ${me ? "ml-auto" : ""}`}>
      <div className={`text-[10px] mb-0.5 ${ai ? "text-cyan-300" : "text-slate-500"} ${me ? "text-right" : ""}`}>{who}</div>
      <div className={`rounded-xl px-3 py-2 text-sm ${me ? "bg-cyan-400/15 text-cyan-50 border border-cyan-400/25" : ai ? "bg-slate-800/80 text-slate-200 border border-cyan-400/20" : "bg-slate-800/60 text-slate-200"}`}>{text}</div>
    </div>
  );
}

/* ── Paul (Project Approval & Lifecycle Management) ─────────────────────── */
const PAUL_STAGES = [
  { k: "COTS", l: "Zukauf", c: "#64748b" },
  { k: "DOV", l: "Design-Vorgabe", c: "#3b82f6" },
  { k: "NPD", l: "Entwicklung", c: "#8b5cf6" },
  { k: "NPI", l: "Industrialisierung", c: "#5bc8ea" },
  { k: "Ramp-Up", l: "Serienanlauf", c: "#10b981" },
];
const PAUL_APPROVALS = [
  { obj: "H-7206-14021-90 Halteblech links", from: "DOV", to: "NPD", who: "Lena Hofer", state: "WARTET" },
  { obj: "P26-014 Förderband V2", from: "NPD", to: "NPI", who: "Alex Berger", state: "WARTET" },
  { obj: "H-7206-14088-92 Seitenteil", from: "NPI", to: "Ramp-Up", who: "Marek Kovács", state: "FREIGEGEBEN" },
];

function PaulView() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <ShellHero
        kicker="Project Approval & Lifecycle Management"
        title="Paul"
        sub="Projekt-Freigaben & Lifecycle. Jedes Objekt durchläuft denselben Reifegrad-Pfad — Paul steuert die Übergänge und sammelt die nötigen Freigaben."
        badge="LIFECYCLE"
      />
      <div className="rounded-2xl border border-cyan-400/10 bg-slate-900/40 p-5 mb-6 max-w-5xl">
        <div className="text-xs text-slate-500 mb-4 tracking-wide font-semibold">COME TO LIFE · PRODUKT-LIFECYCLE</div>
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {PAUL_STAGES.map((s, i) => (
            <div key={s.k} className="flex items-center gap-1 shrink-0">
              <div className="rounded-xl px-4 py-3 text-center border" style={{ borderColor: `${s.c}66`, background: `${s.c}1a` }}>
                <div className="text-sm font-bold" style={{ color: s.c }}>{s.k}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{s.l}</div>
              </div>
              {i < PAUL_STAGES.length - 1 && <span className="text-slate-600">→</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-5xl">
        <div className="text-sm font-semibold text-slate-200 mb-3">Offene Freigaben</div>
        <div className="space-y-2">
          {PAUL_APPROVALS.map((a) => (
            <div key={a.obj} className="flex items-center gap-3 rounded-xl border border-cyan-400/10 bg-slate-900/40 px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-slate-100 truncate">{a.obj}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">👤 {a.who}</div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0">
                <span className="px-1.5 py-0.5 rounded bg-slate-700/50">{a.from}</span>
                <span>→</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-700/50">{a.to}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold shrink-0 ${a.state === "FREIGEGEBEN" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>{a.state}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Klaus (Buchhaltung) ────────────────────────────────────────────────── */
const KLAUS_KPIS = [
  { v: "5.120,00 €", l: "Offen", c: "text-amber-300" },
  { v: "1.240,00 €", l: "Fällig", c: "text-rose-400" },
  { v: "14.380,00 €", l: "Bezahlt (Monat)", c: "text-emerald-300" },
];
const KLAUS_INVOICES = [
  { id: "R-2026-0188", party: "Nordmetall GmbH", amount: "3.880,00 €", due: "20.06.2026", state: "OFFEN" },
  { id: "R-2026-0184", party: "Präzitec Kft.", amount: "1.240,00 €", due: "14.06.2026", state: "FÄLLIG" },
  { id: "R-2026-0177", party: "FeinTech Kft.", amount: "12.500,00 €", due: "02.06.2026", state: "BEZAHLT" },
];

function KlausView() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <ShellHero
        kicker="Buchhaltung"
        title="Klaus"
        sub="Rechnungen, Fälligkeiten und Zahlungsstatus — direkt aus Bestellungen und Belegen des PDM gespeist."
        badge="BETA"
      />
      <div className="flex flex-wrap gap-2.5 mb-6 max-w-3xl">
        {KLAUS_KPIS.map((k) => (
          <div key={k.l} className="rounded-xl border border-cyan-400/10 bg-slate-900/40 px-4 py-3 min-w-[140px]">
            <div className={`text-xl font-bold ${k.c}`}>{k.v}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{k.l}</div>
          </div>
        ))}
      </div>
      <div className="max-w-4xl rounded-2xl border border-cyan-400/10 bg-slate-900/40 overflow-hidden">
        <div className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr_0.8fr] gap-2 px-4 py-2.5 text-[11px] text-slate-500 font-semibold border-b border-cyan-400/10 bg-slate-800/30">
          <span>Rechnung</span><span>Geschäftspartner</span><span>Betrag</span><span>Fällig</span><span>Status</span>
        </div>
        {KLAUS_INVOICES.map((r) => (
          <div key={r.id} className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr_0.8fr] gap-2 px-4 py-3 text-sm border-b border-cyan-400/5 hover:bg-slate-800/30 transition">
            <span className="text-slate-100 font-medium">{r.id}</span>
            <span className="text-slate-300 truncate">{r.party}</span>
            <span className="text-slate-200">{r.amount}</span>
            <span className="text-slate-400">{r.due}</span>
            <span><span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${r.state === "BEZAHLT" ? "bg-emerald-500/20 text-emerald-300" : r.state === "FÄLLIG" ? "bg-rose-500/20 text-rose-300" : "bg-amber-500/20 text-amber-300"}`}>{r.state}</span></span>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500 mt-4 max-w-2xl">Klaus ist im Aufbau — weitere Funktionen (Mahnwesen, DATEV-Export, Kostenstellen) folgen.</p>
    </div>
  );
}

/* ── Zwutschgerln (sticky notes) ────────────────────────────────────────── */
const ZW = {
  free: [
    { t: "Igor wegen RFQ #34 anstupsen", c: "#fde68a" },
    { t: "Toleranz H7 final klären", c: "#bbf7d0" },
  ],
  mails: [{ t: "Rückruf Tobias Reiner heute", c: "#fecaca", ref: "Rückfrage Toleranz Position 4" }],
  tasks: [{ t: "vor Freigabe Prüfplan checken", c: "#bfdbfe", ref: "Prüfplan freigeben PR-2026-0042" }],
  brett: [{ t: "Foto Entgratung anhängen", c: "#e9d5ff", ref: "Gehäuse entgraten" }],
};

function ZwutschgerlnView() {
  return (
    <div className="h-full overflow-y-auto p-6">
      <ShellHero
        kicker="Private Notizen & Mini-Tasks"
        title="🟨 Zwutschgerln"
        sub="Kleine Klebezettel — frei oder an eine Mail, einen Task oder eine Brett-Karte geheftet. Nur für dich, geräteübergreifend synchron."
      />
      <div className="space-y-6 max-w-5xl">
        <ZwSection title="Frei" notes={ZW.free} />
        <ZwSection title="✉️ An Mails" notes={ZW.mails} />
        <ZwSection title="📋 An Tasks" notes={ZW.tasks} />
        <ZwSection title="🗂️ An Brett-Karten" notes={ZW.brett} />
      </div>
    </div>
  );
}

function ZwSection({ title, notes }: { title: string; notes: { t: string; c: string; ref?: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-300 mb-2">{title} <span className="text-slate-500">{notes.length}</span></h3>
      <div className="flex flex-wrap gap-3">
        {notes.map((n, i) => (
          <div key={i} className="w-48 rounded-lg p-3 shadow-md rotate-[-1deg]" style={{ background: n.c, color: "#1e293b" }}>
            {n.ref && <div className="text-[10px] font-semibold opacity-70 mb-1 truncate">↳ {n.ref}</div>}
            <div className="text-sm font-medium leading-snug">{n.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Meute (KI-Council) overlay ─────────────────────────────────────────── */
const MEUTE_MEMBERS = [
  { label: "Igor", mode: "Chef", c: "cyan" },
  { label: "BrainB", mode: "sichtbar", c: "emerald" },
  { label: "BrainC", mode: "sichtbar", c: "emerald" },
  { label: "BrainG", mode: "sichtbar", c: "emerald" },
  { label: "Gregor", mode: "aus", c: "slate" },
];
const MEUTE_QUICK = ["📋 Lagebild", "⚠️ Risiken", "➡️ Nächste Schritte"];

function MeuteOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md h-full flex flex-col border-l border-cyan-400/20 shadow-2xl" style={{ background: "#0a1726" }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-400/10">
          <span className="text-lg">🐺</span>
          <span className="font-bold text-slate-100">Meute</span>
          <span className="text-xs text-slate-500">KI-Council</span>
          <button onClick={onClose} className="ml-auto w-8 h-8 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition">✕</button>
        </div>
        <div className="flex flex-wrap gap-1.5 px-4 py-3 border-b border-cyan-400/10">
          {MEUTE_MEMBERS.map((m) => (
            <span key={m.label} className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700">
              <span className={`w-1.5 h-1.5 rounded-full ${m.c === "cyan" ? "bg-cyan-400" : m.c === "emerald" ? "bg-emerald-400" : "bg-slate-500"}`} />
              <span className="text-slate-200">{m.label}</span>
              <span className="text-slate-500">· {m.mode}</span>
            </span>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <ChatBubble who="Ich" me text="📋 Lagebild zum aktuellen Stand?" />
          <ChatBubble who="Igor" ai text="3 Aufträge aktiv, einer (PR-2026-0042) wartet auf zwei Freigaben. Bestellung PO-2026-0021 ist angekommen, PO-2026-0018 noch offen. 68 Artikel ohne Bestellung — das ist der größte Hebel." />
          <ChatBubble who="BrainC" ai text="RFQ #34 (Nordmetall) ist beantwortet, Position 3 mit kürzerer Lieferzeit. Lohnt sich, vor dem Toleranz-Klärungspunkt zu entscheiden." />
          <ChatBubble who="BrainG" ai text="Risiko: Toleranz H7 an Position 4 blockiert die Fertigung. Empfehlung: zuerst Tobias Reiner antworten." />
        </div>
        <div className="px-4 py-3 border-t border-cyan-400/10">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {MEUTE_QUICK.map((q) => (
              <span key={q} className="text-[11px] px-2 py-1 rounded-lg bg-slate-800/60 border border-slate-700 text-slate-300">{q}</span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input disabled placeholder="Frag die Meute…" className="flex-1 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700 text-sm text-slate-300 placeholder:text-slate-600" />
            <span className="px-3 py-2 rounded-lg bg-cyan-400/15 text-cyan-300 text-sm font-semibold border border-cyan-400/30">➤</span>
          </div>
        </div>
      </div>
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
              <div className="text-xs text-slate-200 truncate">Angebot Nordmetall</div>
              <div className="text-[10px] text-slate-500 truncate">Lena Hofer · Nordmetall GmbH</div>
            </div>
            <span className="text-slate-500 text-xs ml-2">↗ ×</span>
          </div>
        </div>
      )}
    </div>
  );
}
