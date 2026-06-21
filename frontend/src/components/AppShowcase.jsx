import React, { useState } from "react";
import {
  Mail, Calendar, LayoutGrid, Network, FileCheck2, Calculator,
  Database, Search, Plus, Star, Trash2, Reply, CheckSquare, Filter,
  Paperclip, ChevronDown, Bell, MoreHorizontal, Send, Globe2, LogOut,
  Sparkles, Bug, Layers, Tag
} from "lucide-react";

/* ───────────────── Helpers ─────────────────────────────── */

const Mono = ({ children, className = "" }) => (
  <span className={`font-mono ${className}`}>{children}</span>
);

const Overline = ({ children, className = "" }) => (
  <div className={`font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 ${className}`}>
    {children}
  </div>
);

const Pill = ({ children, color = "cyan" }) => {
  const map = {
    cyan: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
    amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    emerald: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    rose: "border-rose-400/40 bg-rose-400/10 text-rose-300",
    violet: "border-violet-400/40 bg-violet-400/10 text-violet-300",
    blue: "border-blue-400/40 bg-blue-400/10 text-blue-300",
    slate: "border-slate-400/30 bg-slate-400/10 text-slate-300",
  };
  return (
    <span className={`inline-flex items-center border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${map[color]}`}>
      {children}
    </span>
  );
};

/* ───────────────── APP SHELL ─────────────────────────── */

const TABS_APP = [
  { id: "post", label: "Blitz Post" },
  { id: "termin", label: "Blitz Termin" },
  { id: "brett", label: "Blitz Brett" },
  { id: "fips", label: "Blitz Fips" },
  { id: "paul", label: "Paul" },
  { id: "klaus", label: "Klaus" },
  { id: "herpert", label: "Herpert" },
];

const AppShell = ({ active, title, subtitle, children, dataTestid }) => {
  return (
    <div data-testid={dataTestid} className="overflow-hidden border border-cyan-400/15 bg-[#0A1628] text-slate-200 shadow-[0_30px_80px_-30px_rgba(0,30,60,0.6)]">
      {/* top brand bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0A1628] px-4 py-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[11px] tracking-[0.22em] text-cyan-300">HERPERT</span>
            <span className="font-mono text-[11px] text-slate-500">/</span>
            <span className="font-mono text-[11px] tracking-[0.22em] text-slate-300">BLITZ</span>
          </div>
          <Mono className="text-[9px] uppercase tracking-[0.18em] text-slate-500">{subtitle}</Mono>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="hidden items-center gap-1.5 border border-slate-700 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-slate-300 md:inline-flex">
            <span className="h-1.5 w-1.5 bg-emerald-400" /> Alex Berger
          </span>
          <span className="hidden border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-cyan-300 sm:inline-block">
            + Neue E-Mail
          </span>
          <span className="border border-amber-400/30 bg-amber-400/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-amber-300">
            Zwutschgerln
          </span>
          <span className="hidden border border-violet-400/30 bg-violet-400/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-violet-300 sm:inline-block">
            🐺 Meute
          </span>
          <span className="hidden border border-slate-700 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-slate-400 md:inline-block">DE</span>
          <span className="hidden border border-slate-700 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-slate-500 md:inline-block">v.2026.01</span>
        </div>
      </div>
      {/* tab bar */}
      <div className="flex items-center gap-0 overflow-x-auto border-b border-white/5 bg-[#0A1628] px-3">
        {TABS_APP.map((t) => (
          <div
            key={t.id}
            className={`shrink-0 border-b-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] ${
              t.id === active
                ? "border-cyan-400 text-cyan-300"
                : "border-transparent text-slate-500"
            }`}
          >
            {t.label}
          </div>
        ))}
      </div>
      {/* content */}
      <div className="bg-[#0A1628]">{children}</div>
    </div>
  );
};

/* ───────────────── BLITZ POST (Email) ────────────── */

const POST_INITIAL = [
  {
    id: 1,
    from: "Lena Hofer",
    init: "L",
    time: "10:32",
    subject: "Bestellung PO-2026-0021",
    body: "Sehr geehrte Damen und Herren (Nordmetall GmbH), hiermit beauftragen wir Sie mit der Bestellung PO-2026-0021: H-7206-14021-90 Halteblech Hülse 25 mm, 120 Stück, Liefertermin 04.07.2026 …",
    tag: "PO-2026-0021",
    attach: false,
  },
  {
    id: 2,
    from: "Marek Kovács",
    init: "M",
    time: "10:45",
    subject: "Angebot Präzitec Kft.",
    body: "Guten Tag, anbei unser Angebot zu RFQ #34. Position 3 können wir mit kürzerer Lieferzeit anbieten. Details im PDF …",
    tag: "RFQ-#34",
    attach: true,
  },
  {
    id: 3,
    from: "Tobias Reiner",
    init: "T",
    time: "09:43",
    subject: "Rückfrage Toleranz Position 4",
    body: "Hallo, zur Bohrung an Position 4 brauchen wir die Toleranz — H7 oder freier? Sonst pausiert die Fertigung …",
    tag: "P26-021",
    attach: false,
  },
  {
    id: 4,
    from: "Sofia Brandt",
    init: "S",
    time: "07:12",
    subject: "Freigabe Phase 2 — heute bis 16:00?",
    body: "Erinnerung: Die Zeichnungen V3 müssen heute bis 16:00 abgenickt werden, sonst rutscht der Slot.",
    tag: "P26-009",
    attach: false,
  },
];

const BlitzPostScreen = () => {
  const [mails, setMails] = useState(POST_INITIAL);
  const [counts, setCounts] = useState({ read: 0, replied: 0, starred: 0, deleted: 0 });
  const [filter, setFilter] = useState("Posteingang");

  const act = (id, kind) => {
    setMails((m) => m.filter((x) => x.id !== id));
    setCounts((c) => ({ ...c, [kind]: c[kind] + 1 }));
  };
  const reset = () => { setMails(POST_INITIAL); setCounts({ read: 0, replied: 0, starred: 0, deleted: 0 }); };

  const projects = [
    { id: "P26-014", title: "Förderband V2", state: "STARTED", color: "cyan" },
    { id: "P26-009", title: "Greifmodul X3", state: "NOT STARTED", color: "slate" },
    { id: "P25-103", title: "Spannvorrichtung A", state: "NOT STARTED", color: "slate" },
    { id: "P26-021", title: "Gehäuse Serie 4", state: "NOT STARTED", color: "slate" },
  ];
  const packages = [
    { id: "P26-014 Montage", state: "B/2" },
    { id: "P26-009 Konstruktion", state: "B/2" },
    { id: "P26-009 Fertigung", state: "B/2" },
    { id: "P25-103 Prüfung", state: "B/2" },
    { id: "P26-021 Lackierung", state: "B/2" },
    { id: "P26-014 Verdrahtung", state: "B/2" },
  ];
  const tasks = [
    { title: "Freigabe bestätigen für PR-2026-0042", state: "FOLLOW_UP · NEW", color: "amber" },
    { title: "Prüfplan freigeben für PR-2026-0042", state: "FOLLOW_UP · NEW", color: "amber" },
  ];

  return (
    <div className="grid grid-cols-12 gap-px bg-white/5">
      {/* LEFT SIDEBAR */}
      <aside className="col-span-3 hidden bg-[#0A1628] p-3 md:block">
        <Overline className="text-cyan-300">▢ Projekte</Overline>
        <div className="mt-2 space-y-1.5">
          {projects.map((p) => (
            <div key={p.id} className="border border-white/5 bg-white/[0.02] p-2">
              <div className="font-mono text-[10px] text-cyan-300">{p.id}</div>
              <div className="mt-0.5 truncate text-[11px] text-slate-200">{p.title}</div>
              <div className="mt-1"><Pill color={p.color}>{p.state}</Pill></div>
            </div>
          ))}
        </div>
        <Overline className="mt-5 text-cyan-300">▢ Work Packages</Overline>
        <div className="mt-2 space-y-1.5">
          {packages.map((p, i) => (
            <div key={i} className="border border-white/5 bg-white/[0.02] p-2 text-[11px] text-slate-300">
              <div className="truncate">{p.id}</div>
              <Mono className="text-[9px] text-slate-500">{p.state}</Mono>
            </div>
          ))}
        </div>
      </aside>

      {/* MAIN INBOX */}
      <main className="col-span-12 bg-[#0A1628] md:col-span-7">
        <div className="flex flex-wrap items-center gap-1 border-b border-white/5 p-2">
          {["Posteingang", "Gelesen", "Beantworten", "Merken", "Gesendet"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`border px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
                filter === f ? "border-cyan-400 bg-cyan-400/10 text-cyan-300" : "border-white/10 text-slate-400"
              }`}
            >
              {f === "Posteingang" ? `${f} ${mails.length}` : f}
            </button>
          ))}
          <button data-testid="post-reset" onClick={reset} className="ml-auto border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:bg-white/5">
            ↺ Reset
          </button>
        </div>
        <Mono className="block px-3 py-2 text-[10px] uppercase tracking-widest text-slate-500">
          Mails laden seit: 10/06/2026
        </Mono>
        <div className="divide-y divide-white/5">
          {mails.length === 0 && (
            <div className="px-6 py-10 text-center font-mono text-xs uppercase tracking-widest text-slate-500">
              ∎ Inbox Zero — klick &bdquo;Reset&ldquo;
            </div>
          )}
          {mails.map((m) => (
            <article key={m.id} className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center border border-white/10 bg-white/5 font-mono text-[11px] text-slate-200">
                  {m.init}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[11px] text-slate-200">{m.from}</span>
                    <Mono className="text-[9px] text-slate-500">{m.time}</Mono>
                  </div>
                </div>
                <Mono className="text-[9px] text-slate-500">{m.attach && <Paperclip size={10} className="inline" />}</Mono>
              </div>
              <div className="mt-1.5 text-[12px] font-medium text-slate-100">{m.subject}</div>
              <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-400">{m.body}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1">
                <button data-testid={`post-del-${m.id}`} onClick={() => act(m.id, "deleted")} className="border border-white/10 px-1.5 py-1 font-mono text-[9px] uppercase tracking-widest text-slate-400 hover:border-rose-400/40 hover:text-rose-300">
                  <Trash2 size={10} className="inline mr-1" />Löschen
                </button>
                <button data-testid={`post-read-${m.id}`} onClick={() => act(m.id, "read")} className="border border-white/10 px-1.5 py-1 font-mono text-[9px] uppercase tracking-widest text-slate-400 hover:border-cyan-400/40 hover:text-cyan-300">
                  <CheckSquare size={10} className="inline mr-1" />Gelesen
                </button>
                <button data-testid={`post-reply-${m.id}`} onClick={() => act(m.id, "replied")} className="border border-white/10 px-1.5 py-1 font-mono text-[9px] uppercase tracking-widest text-slate-400 hover:border-emerald-400/40 hover:text-emerald-300">
                  <Reply size={10} className="inline mr-1" />Beantworten
                </button>
                <button data-testid={`post-star-${m.id}`} onClick={() => act(m.id, "starred")} className="border border-white/10 px-1.5 py-1 font-mono text-[9px] uppercase tracking-widest text-slate-400 hover:border-amber-400/40 hover:text-amber-300">
                  <Star size={10} className="inline mr-1" />Merken
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="border-t border-white/5 bg-white/[0.02] px-3 py-2">
          <Mono className="text-[9px] uppercase tracking-widest text-slate-500">⌗ Arbeitsablage  ·  1</Mono>
          <div className="mt-1 inline-block border border-white/10 bg-white/[0.02] px-2 py-1">
            <Mono className="text-[10px] text-slate-300">Angebot Nordmetall</Mono>
            <Mono className="ml-2 text-[9px] text-slate-500">Lena Hofer · Nordmetall GmbH</Mono>
          </div>
        </div>
      </main>

      {/* RIGHT — TASKS */}
      <aside className="col-span-12 hidden border-l border-white/5 bg-[#0A1628] p-3 md:col-span-2 md:block">
        <Overline className="text-cyan-300">⌗ Tasks</Overline>
        <div className="mt-2 space-y-2">
          {tasks.map((t, i) => (
            <div key={i} className="border border-white/5 bg-white/[0.02] p-2">
              <div className="text-[10px] leading-tight text-slate-200">{t.title}</div>
              <div className="mt-1"><Pill color={t.color}>{t.state}</Pill></div>
            </div>
          ))}
        </div>
        <Overline className="mt-5 text-cyan-300">∎ Counters</Overline>
        <div className="mt-2 space-y-1 font-mono text-[10px]">
          <div className="flex justify-between text-slate-400"><span>Gelesen</span><span className="text-cyan-300">{counts.read}</span></div>
          <div className="flex justify-between text-slate-400"><span>Beantwortet</span><span className="text-emerald-300">{counts.replied}</span></div>
          <div className="flex justify-between text-slate-400"><span>Merken</span><span className="text-amber-300">{counts.starred}</span></div>
          <div className="flex justify-between text-slate-400"><span>Gelöscht</span><span className="text-rose-300">{counts.deleted}</span></div>
        </div>
      </aside>
    </div>
  );
};

/* ───────────────── BLITZ BRETT (Kanban Multi-Column) ────────── */

const BlitzBrettScreen = () => {
  const columns = [
    {
      title: "Projekte", icon: "▢", count: 4, items: [
        { id: "P26-014", title: "Förderband V2", state: "STARTED", color: "cyan" },
        { id: "P26-009", title: "Greifmodul X3", state: "NOT STARTED", color: "slate" },
        { id: "P25-103", title: "Spannvorrichtung A", state: "NOT STARTED", color: "slate" },
        { id: "P26-021", title: "Gehäuse Serie 4", state: "NOT STARTED", color: "slate" },
      ]
    },
    {
      title: "Arbeitspakete", icon: "⌗", count: 4, items: [
        { id: "P26-014 Montage", title: "Alex Berger", state: "1 offen · 1 gesamt", color: "amber" },
        { id: "P26-009 Konstruktion", title: "Alex Berger", state: "1 offen · 1 gesamt", color: "amber" },
        { id: "P26-009 Fertigung", title: "Alex Berger", state: "1 offen · 1 gesamt", color: "amber" },
        { id: "P25-103 Prüfung", title: "Alex Berger", state: "1 offen · 1 gesamt", color: "amber" },
      ]
    },
    {
      title: "Emails", icon: "✉", count: 4, items: [
        { id: "Bestellung PO-2026-0021", title: "Lena Hofer", state: "10.6.2026", color: "cyan" },
        { id: "Angebot Präzitec Kft.", title: "Marek Kovács", state: "10.6.2026", color: "cyan" },
        { id: "Rückfrage Toleranz Position 4", title: "Tobias Reiner", state: "10.6.2026", color: "cyan" },
        { id: "Lieferavis Nordmetall — KW 25", title: "Sofia Brandt", state: "10.6.2026", color: "cyan" },
      ]
    },
    {
      title: "Tasks", icon: "✓", count: 3, items: [
        { id: "Bohrbild anpassen, H7", title: "DONE · OTHER · NORMAL", state: "", color: "emerald" },
        { id: "Gehäuse entgraten", title: "IN_PROGRESS · CHANGE_OBJECT", state: "△ HIGH · 13.6.2026", color: "rose" },
        { id: "Prüfprotokoll erstellen", title: "NEW · OTHER · NORMAL", state: "", color: "amber" },
      ]
    },
    {
      title: "Bestellungen", icon: "↗", count: 2, items: [
        { id: "PO-2026-0021", title: "Präzitec Kft.", state: "ARRIVED", color: "emerald" },
        { id: "PO-2026-0018", title: "Nordmetall GmbH", state: "OFFEN", color: "slate" },
      ]
    },
    {
      title: "Rechn.", icon: "€", count: 1, items: [
        { id: "R-2026-0188", title: "David Lang", state: "10.6.2026", color: "violet" },
      ]
    },
  ];
  return (
    <div className="p-3">
      <div className="mb-2 flex items-center gap-2">
        <Pill color="amber">▸ Rudel</Pill>
        <Mono className="text-[10px] uppercase tracking-widest text-cyan-300">Sprechendes Seitenhirn</Mono>
        <Mono className="hidden text-[10px] uppercase tracking-widest text-slate-500 sm:inline">Geometrie Brett in Fokus</Mono>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[760px] grid-cols-6 gap-px bg-white/5">
          {columns.map((col) => (
            <div key={col.title} className="bg-[#0A1628]">
              <div className="flex items-center justify-between border-b border-white/5 px-2 py-1.5">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                  <span>{col.icon}</span> {col.title}
                </span>
                <Mono className="text-[9px] text-slate-500">{col.count}</Mono>
              </div>
              <div className="space-y-1.5 p-1.5">
                {col.items.map((it, i) => (
                  <div key={i} className="border border-white/5 bg-white/[0.02] p-2">
                    <div className="font-mono text-[9px] text-slate-500">Name</div>
                    <div className="break-words text-[10px] leading-tight text-slate-200">{it.id}</div>
                    <div className="mt-0.5 font-mono text-[9px] text-slate-500">Verantwortl.</div>
                    <div className="truncate text-[10px] text-slate-300">{it.title}</div>
                    {it.state && (
                      <div className="mt-1"><Pill color={it.color}>{it.state}</Pill></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ───────────────── BLITZ FIPS (Field Interactive Project Space) ─ */

const BlitzFipsScreen = () => {
  const linked = [
    { id: "P26-014 Montage", color: "cyan" },
    { id: "P26-009 Konstruktion", color: "cyan" },
    { id: "P26-009 Fertigung", color: "cyan" },
    { id: "P25-103 Prüfung", color: "cyan" },
  ];
  const kanban = [
    {
      title: "NEW", count: 2, color: "slate", items: [
        { id: "Prüfprotokoll erstellen", who: "Alex Berger" },
        { id: "Lieferschein abgleichen", who: "Sofia Brandt" },
      ]
    },
    {
      title: "IN_PROGRESS", count: 2, color: "amber", items: [
        { id: "Gehäuse entgraten", who: "Marek Kovács" },
        { id: "Verdrahtung Modul 3", who: "Alex Berger" },
      ]
    },
    {
      title: "DONE", count: 1, color: "emerald", items: [
        { id: "Material kommissioniert", who: "Tobias Reiner" },
      ]
    },
  ];
  return (
    <div className="p-3">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <Mono className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Field Interactive Project Space</Mono>
          <div className="mt-1 font-sans text-2xl font-semibold text-cyan-300">Blitz Fips</div>
          <p className="mt-1 max-w-md text-[11px] leading-snug text-slate-400">
            Reibungsfreier Collab-Space über Firmengrenzen hinweg: jeder Room (= Arbeitspaket) bündelt
            Kanban, Termine, Mails, Files und Chat. Partner ohne eigenes ERP docken einfach an.
          </p>
        </div>
        <Pill color="violet">COLLAB</Pill>
      </div>
      <div className="mb-3 flex flex-wrap gap-1">
        {linked.map((l) => (
          <Pill key={l.id} color={l.color}>{l.id}</Pill>
        ))}
      </div>
      <div className="mb-2 flex gap-2 border-b border-white/5 pb-1">
        {["Kanban", "Termine", "Mails", "Files", "Chat 💬"].map((t, i) => (
          <span key={t} className={`font-mono text-[10px] uppercase tracking-widest ${i === 0 ? "border-b border-cyan-400 pb-1 text-cyan-300" : "text-slate-500"}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-px bg-white/5">
        {kanban.map((col) => (
          <div key={col.title} className="bg-[#0A1628] p-2">
            <div className="mb-2 flex items-center justify-between">
              <Pill color={col.color}>{col.title}</Pill>
              <Mono className="text-[9px] text-slate-500">{col.count}</Mono>
            </div>
            <div className="space-y-1.5">
              {col.items.map((it, i) => (
                <div key={i} className="border border-white/5 bg-white/[0.02] p-2">
                  <div className="text-[10px] text-slate-200">{it.id}</div>
                  <div className="mt-1 font-mono text-[9px] text-slate-500">{it.who}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ───────────────── PAUL (12 NPI Gates) ───────────────── */

const PaulScreen = () => {
  const gates = [
    { n: "G01", t: "Bedarf / Idea", phase: "Konzept", state: "DONE", color: "emerald" },
    { n: "G02", t: "Machbarkeit", phase: "Konzept", state: "DONE", color: "emerald" },
    { n: "G03", t: "Lastenheft", phase: "Konzept", state: "ACTIVE", color: "cyan" },
    { n: "G04", t: "Konzept-Design", phase: "Entwicklung", state: "ACTIVE", color: "cyan" },
    { n: "G05", t: "Detail-Design", phase: "Entwicklung", state: "OPEN", color: "slate" },
    { n: "G06", t: "Design-Review", phase: "Entwicklung", state: "OPEN", color: "slate" },
    { n: "G07", t: "Prototyp", phase: "Industrialisierung", state: "OPEN", color: "slate" },
    { n: "G08", t: "Verifikation", phase: "Industrialisierung", state: "OPEN", color: "slate" },
    { n: "G09", t: "Validierung", phase: "Industrialisierung", state: "OPEN", color: "slate" },
    { n: "G10", t: "Industrialisierung", phase: "Industrialisierung", state: "OPEN", color: "slate" },
    { n: "G11", t: "Nullserie", phase: "Serienanlauf", state: "OPEN", color: "slate" },
    { n: "G12", t: "Serienfreigabe", phase: "Serienanlauf", state: "OPEN", color: "slate" },
  ];
  const phases = ["Konzept", "Entwicklung", "Industrialisierung", "Serienanlauf"];
  return (
    <div className="p-3">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <Mono className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Project Approval &amp; Lifecycle Management</Mono>
          <div className="mt-1 font-sans text-2xl font-semibold text-cyan-300">Paul</div>
          <p className="mt-1 max-w-lg text-[11px] leading-snug text-slate-400">
            Zusatzmodul für die 12-stufige NPI: jede Neuentwicklung läuft gated durch alle zwölf Stufen — Paul
            steuert die Tore und sammelt an jedem Gate die nötigen Freigaben.
          </p>
        </div>
        <Pill color="violet">NPI · 12 STUFEN</Pill>
      </div>
      <Overline className="mt-3 text-cyan-300">New Product Introduction · 12 Gates</Overline>
      <div className="mt-2 grid grid-cols-4 gap-2 font-mono text-[9px] uppercase tracking-widest text-slate-500">
        {phases.map((p, i) => (
          <div key={p} className={i === 0 || i === 3 ? "" : ""}>{p}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-4 gap-2">
        {phases.map((phase, phaseIdx) => {
          const phaseGates = gates.filter((g) => g.phase === phase);
          return (
            <div key={phase} className="grid grid-cols-3 gap-1">
              {phaseGates.map((g) => (
                <div key={g.n} className={`border ${g.state === "ACTIVE" ? "border-cyan-400/60 bg-cyan-400/10" : g.state === "DONE" ? "border-emerald-400/40 bg-emerald-400/5" : "border-white/10 bg-white/[0.02]"} p-1.5`}>
                  <Mono className="text-[8px] text-slate-500">{g.n}</Mono>
                  <div className={`mt-0.5 text-[9px] leading-tight ${g.state === "ACTIVE" ? "text-cyan-200" : g.state === "DONE" ? "text-emerald-200" : "text-slate-300"}`}>{g.t}</div>
                  <div className="mt-1"><Pill color={g.color}>{g.state}</Pill></div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-px bg-white/5">
        {[
          { l: "OFFENE FREIGABEN", v: "3", c: "amber" },
          { l: "GATES DURCHLAUFEN", v: "2/12", c: "cyan" },
          { l: "AKTIVE GATES", v: "2", c: "cyan" },
        ].map((kpi) => (
          <div key={kpi.l} className="bg-[#0A1628] p-3">
            <Mono className="text-[9px] uppercase tracking-widest text-slate-500">{kpi.l}</Mono>
            <div className={`mt-1 font-mono text-2xl ${kpi.c === "amber" ? "text-amber-300" : "text-cyan-300"}`}>{kpi.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ───────────────── KLAUS (Accounting) ──────────────── */

const KlausScreen = () => {
  const rows = [
    { id: "R-2026-0188", sup: "Präzitec Kft.", amount: "€ 4.220,00", due: "04.07.2026", state: "OFFEN", color: "amber" },
    { id: "R-2026-0187", sup: "Nordmetall GmbH", amount: "€ 12.480,50", due: "28.06.2026", state: "ÜBERFÄLLIG", color: "rose" },
    { id: "R-2026-0186", sup: "FOPEX Surface", amount: "€ 980,00", due: "21.06.2026", state: "BEZAHLT", color: "emerald" },
    { id: "R-2026-0185", sup: "ChipNord OY", amount: "€ 7.140,00", due: "16.06.2026", state: "BEZAHLT", color: "emerald" },
  ];
  return (
    <div className="p-3">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <Mono className="text-[9px] uppercase tracking-[0.2em] text-slate-500">KI-Buchhaltung · Gregor an Bord</Mono>
          <div className="mt-1 font-sans text-2xl font-semibold text-cyan-300">Klaus</div>
          <p className="mt-1 max-w-lg text-[11px] leading-snug text-slate-400">
            Rechnungen aus den Bestellungen, Fälligkeiten und Zahlungsstatus — Gregor (KI) prüft automatisch
            jede Rechnung gegen die PO und meldet Abweichungen.
          </p>
        </div>
        <Pill color="violet">ACCOUNTING</Pill>
      </div>
      <div className="grid grid-cols-4 gap-px bg-white/5">
        {[
          { l: "OFFENE RECHNUNGEN", v: "12", c: "amber" },
          { l: "ÜBERFÄLLIG", v: "1", c: "rose" },
          { l: "VOLUMEN OFFEN", v: "€ 142k", c: "cyan" },
          { l: "DURCHLAUFZEIT", v: "3.4 d", c: "emerald" },
        ].map((k) => (
          <div key={k.l} className="bg-[#0A1628] p-3">
            <Mono className="text-[9px] uppercase tracking-widest text-slate-500">{k.l}</Mono>
            <div className={`mt-1 font-mono text-xl ${k.c === "rose" ? "text-rose-300" : k.c === "amber" ? "text-amber-300" : k.c === "emerald" ? "text-emerald-300" : "text-cyan-300"}`}>{k.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 border border-white/5">
        <div className="grid grid-cols-12 border-b border-white/5 bg-white/[0.02] px-2 py-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-500">
          <div className="col-span-3">Rechnung</div>
          <div className="col-span-4">Lieferant</div>
          <div className="col-span-2 text-right">Betrag</div>
          <div className="col-span-1">Fällig</div>
          <div className="col-span-2">Status</div>
        </div>
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-12 items-center border-b border-white/5 px-2 py-2 text-[11px] last:border-b-0">
            <div className="col-span-3 font-mono text-cyan-300">{r.id}</div>
            <div className="col-span-4 text-slate-300">{r.sup}</div>
            <div className="col-span-2 text-right font-mono text-slate-200">{r.amount}</div>
            <div className="col-span-1 font-mono text-[10px] text-slate-500">{r.due}</div>
            <div className="col-span-2"><Pill color={r.color}>{r.state}</Pill></div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ───────────────── HERPERT (PDM + BOM) ─────────────── */

const HerpertScreen = () => {
  const rows = [
    { lvl: 0, id: "H-7206-13282-90", name: "Halteblech Baugruppe X2", qty: 1, state: "90 NPI", color: "cyan" },
    { lvl: 1, id: "H-7201-00432-50", name: "Halterung gefräst", qty: 1, state: "50 NPD", color: "amber" },
    { lvl: 2, id: "H-4002-00118-00", name: "Aluminium 6082 100×80", qty: 1, state: "00 COTS", color: "emerald" },
    { lvl: 2, id: "H-6004-00009-01", name: "Eloxieren schwarz", qty: 1, state: "01 RAMP", color: "violet" },
    { lvl: 1, id: "H-7202-00871-90", name: "Niethülse M6", qty: 4, state: "90 NPI", color: "cyan" },
    { lvl: 1, id: "H-7610-00033-00", name: "PCBA Sensor", qty: 1, state: "00 COTS", color: "emerald" },
    { lvl: 1, id: "H-9000-00002-01", name: "Versandkarton 200×150", qty: 1, state: "01 RAMP", color: "violet" },
  ];
  return (
    <div className="grid grid-cols-12 gap-px bg-white/5">
      <aside className="col-span-3 hidden bg-[#0A1628] p-3 md:block">
        <Overline className="text-cyan-300">▢ Klassen-Familien</Overline>
        <div className="mt-2 space-y-1 font-mono text-[10px]">
          {[
            ["1001-1104", "Dokumente"],
            ["4001-4009", "Rohmaterialien"],
            ["5001-5009", "Werkzeuge"],
            ["6001-6010", "Prozesse"],
            ["7000-7090", "Baugruppen"],
            ["7200-7208", "Fertigung"],
            ["7610-7881", "Elektronik"],
            ["9000-9160", "Versand"],
          ].map(([r, l]) => (
            <div key={r} className="flex items-center justify-between border-b border-white/5 py-1">
              <span className="text-cyan-300">{r}</span>
              <span className="text-slate-400">{l}</span>
            </div>
          ))}
        </div>
      </aside>
      <main className="col-span-12 bg-[#0A1628] p-3 md:col-span-9">
        <div className="mb-2 flex items-baseline gap-3">
          <Mono className="text-[10px] uppercase tracking-widest text-cyan-300">PartId · Master</Mono>
          <span className="font-mono text-base text-cyan-200">H-7206-13282-90</span>
          <Pill color="cyan">90 NPI · Rev. C</Pill>
        </div>
        <div className="border border-white/5">
          <div className="grid grid-cols-12 border-b border-white/5 bg-white/[0.02] px-2 py-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-500">
            <div className="col-span-1">Lvl</div>
            <div className="col-span-4">PartId</div>
            <div className="col-span-4">Bezeichnung</div>
            <div className="col-span-1 text-right">Mng</div>
            <div className="col-span-2">Status</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-12 items-center border-b border-white/5 px-2 py-2 text-[11px] last:border-b-0 hover:bg-white/[0.02]">
              <div className="col-span-1 font-mono text-slate-500">{r.lvl}</div>
              <div className="col-span-4 font-mono text-cyan-300" style={{ paddingLeft: `${r.lvl * 14}px` }}>
                <span className="text-slate-600">{r.lvl > 0 ? "└─ " : ""}</span>{r.id}
              </div>
              <div className="col-span-4 text-slate-200">{r.name}</div>
              <div className="col-span-1 text-right font-mono text-slate-300">{r.qty}</div>
              <div className="col-span-2"><Pill color={r.color}>{r.state}</Pill></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

/* ───────────────── BLITZ TERMIN (Calendar) ───────────────────── */

const BlitzTerminScreen = () => {
  const days = ["Mo", "Di", "Mi", "Do", "Fr"];
  const slots = [
    { day: 0, h: 9, dur: 2, label: "Design-Review P26-014", color: "cyan" },
    { day: 1, h: 10, dur: 1, label: "RFQ-Call Präzitec", color: "amber" },
    { day: 2, h: 14, dur: 2, label: "Phase-2 Gate G04", color: "violet" },
    { day: 3, h: 11, dur: 1, label: "Werkstour Helios", color: "emerald" },
    { day: 4, h: 9, dur: 3, label: "Sprint-Review", color: "cyan" },
    { day: 1, h: 15, dur: 1, label: "Lieferant Q-Audit", color: "rose" },
  ];
  return (
    <div className="p-3">
      <div className="mb-2 flex items-center gap-2">
        <Mono className="text-[10px] uppercase tracking-widest text-cyan-300">KW 25 · Juni 2026</Mono>
        <Pill color="cyan">6 Termine</Pill>
      </div>
      <div className="grid grid-cols-[40px_repeat(5,1fr)] gap-px bg-white/5 text-[10px]">
        <div className="bg-[#0A1628]" />
        {days.map((d) => (
          <div key={d} className="bg-[#0A1628] py-1 text-center font-mono text-slate-300">{d}</div>
        ))}
        {Array.from({ length: 8 }).map((_, hourIdx) => {
          const hour = 9 + hourIdx;
          return (
            <React.Fragment key={hour}>
              <div className="bg-[#0A1628] py-3 text-right pr-1 font-mono text-[9px] text-slate-500">{hour}:00</div>
              {days.map((_, dayIdx) => {
                const slot = slots.find((s) => s.day === dayIdx && s.h === hour);
                return (
                  <div key={dayIdx} className="relative h-10 bg-[#0A1628]">
                    {slot && (
                      <div
                        className={`absolute inset-x-1 top-0.5 border px-1.5 py-1 ${
                          slot.color === "cyan" ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200" :
                          slot.color === "amber" ? "border-amber-400/40 bg-amber-400/10 text-amber-200" :
                          slot.color === "violet" ? "border-violet-400/40 bg-violet-400/10 text-violet-200" :
                          slot.color === "emerald" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" :
                          "border-rose-400/40 bg-rose-400/10 text-rose-200"
                        }`}
                        style={{ height: `${slot.dur * 40 - 4}px` }}
                      >
                        <div className="truncate font-mono text-[9px]">{slot.label}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/* ───────────────── SECTION WRAPPER ─────────────────── */

const TILES = [
  { id: "post", title: "Blitz Post", subtitle: "Posteingang-Triage: gelesen, beantworten, merken — in einem Klick.", render: <BlitzPostScreen />, active: "post", testid: "showcase-post" },
  { id: "brett", title: "Blitz Brett", subtitle: "Alles auf einem Board: Projekte, Pakete, Mails, Tasks, Bestellungen.", render: <BlitzBrettScreen />, active: "brett", testid: "showcase-brett" },
  { id: "fips", title: "Blitz Fips", subtitle: "Reibungsfreier Collab-Space über Firmengrenzen hinweg — Partner docken an.", render: <BlitzFipsScreen />, active: "fips", testid: "showcase-fips" },
  { id: "paul", title: "Paul", subtitle: "12-stufige NPI gated durch alle Tore — mit Freigaben an jedem Gate.", render: <PaulScreen />, active: "paul", testid: "showcase-paul" },
  { id: "klaus", title: "Klaus", subtitle: "Buchhaltung mit KI — Rechnungen, Fälligkeiten, Zahlungen automatisiert.", render: <KlausScreen />, active: "klaus", testid: "showcase-klaus" },
  { id: "herpert", title: "Herpert", subtitle: "Das massive PDM mit Klassen-Familien und mehrstufiger BOM-Explosion.", render: <HerpertScreen />, active: "herpert", testid: "showcase-herpert" },
  { id: "termin", title: "Blitz Termin", subtitle: "Wochenkalender für Reviews, Gates, Q-Audits und Sprint-Termine.", render: <BlitzTerminScreen />, active: "termin", testid: "showcase-termin" },
];

const AppShowcase = () => {
  return (
    <section id="demo" className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Overline>// LIVE-OBERFLÄCHE</Overline>
            <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
              Sieh dir die echte Oberfläche an.
            </h2>
          </div>
          <p className="md:col-span-4 text-zinc-600">
            Screenshots aus der Live-Demo — jedes Modul ist nur einen Klick entfernt.
            Klick auf Blitz Post die Aktions-Buttons und beobachte den Counter rechts.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {TILES.map((tile) => (
            <div key={tile.id} className="group">
              <AppShell active={tile.active} title={tile.title} subtitle={`Eine Oberfläche für Emails und HERPERT Web · ${tile.title.toUpperCase()}`} dataTestid={tile.testid}>
                {tile.render}
              </AppShell>
              <div className="mt-5">
                <h3 className="font-sans text-2xl font-medium tracking-tight">{tile.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm text-zinc-600">{tile.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
