import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Zap, Mail, LayoutGrid, Network, FileCheck2, Calculator,
  Package, GitBranch, ShoppingCart, Factory, Users, Languages,
  Wrench, Database, Send, Search, Plus, Settings, ChevronRight,
  Square, CheckSquare, Star, Trash2, Reply, Filter, ArrowRight,
  Sparkles, Boxes, Terminal, ScanLine, BookOpen, Menu, X
} from "lucide-react";
import AppShowcase from "@/components/AppShowcase";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/* ───────────────── Utility ─────────────────────────────────────── */

const Mono = ({ children, className = "" }) => (
  <span className={`font-mono ${className}`}>{children}</span>
);

const Overline = ({ children, className = "", color = "muted" }) => (
  <div
    className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
      color === "brand" ? "text-brand" : color === "inv" ? "text-zinc-500" : "text-zinc-500"
    } ${className}`}
  >
    {children}
  </div>
);

/* ───────────────── NAV ────────────────────────────────────────── */

const Nav = () => {
  const [open, setOpen] = useState(false);
  const items = [
    { label: "Suite", href: "#suite" },
    { label: "Module", href: "#module" },
    { label: "Prozess", href: "#prozess" },
    { label: "Demo", href: "#demo" },
    { label: "PartId", href: "#partid" },
    { label: "Preis", href: "#preis" },
  ];
  return (
    <header
      data-testid="site-nav"
      className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 md:px-12">
        <a href="#top" data-testid="logo-link" className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center bg-brand text-white">
            <Zap size={16} strokeWidth={2.5} />
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.18em]">HERPERT</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 lg:inline">
            · ERP · PDM · PLANUNG
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {items.map((it) => (
            <a
              key={it.label}
              href={it.href}
              data-testid={`nav-${it.label.toLowerCase()}`}
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-zinc-600 hover:text-ink"
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#kontakt"
            data-testid="nav-cta-demo"
            className="hidden sm:inline-flex border border-ink bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-white hover:bg-brand hover:border-brand transition-colors"
          >
            Demo anfragen →
          </a>
          <button
            data-testid="mobile-nav-toggle"
            aria-label="Menu"
            className="md:hidden flex h-9 w-9 items-center justify-center border border-zinc-300"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {/* mobile sheet */}
      {open && (
        <div className="border-t border-zinc-200 bg-white md:hidden" data-testid="mobile-nav-sheet">
          <div className="px-4 py-3">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                onClick={() => setOpen(false)}
                className="block border-b border-zinc-100 py-3 font-mono text-[13px] uppercase tracking-[0.14em] text-zinc-700 last:border-b-0"
              >
                {it.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center border border-ink bg-ink px-4 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white"
            >
              Demo anfragen →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

/* ───────────────── HERO ───────────────────────────────────────── */

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-blueprint text-white">
      <div className="absolute inset-0 blueprint-bg opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blueprint" />
      <div className="relative mx-auto max-w-[1400px] px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 md:px-12 md:pt-32 md:pb-44">
        {/* status bar */}
        <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/10 py-3">
          <Overline className="text-cyan-accent">● SYS / ONLINE</Overline>
          <Mono className="text-[11px] uppercase tracking-widest text-zinc-400">
            ERP · PDM · SOLIDWORKS-INTEGRATION
          </Mono>
          <Mono className="ml-auto text-[11px] uppercase tracking-widest text-zinc-500">
            v.2026.01 · BLITZ-SUITE
          </Mono>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="font-sans text-[42px] sm:text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-[88px]">
              Von der <span className="text-brand">Konstruktion</span><br />
              bis zur <span className="border-b-4 border-brand">Fertigung</span>.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-zinc-300 md:mt-8">
              HERPERT ist das ERP-System für konstruktionsnahe Fertigung.
              Produktdaten, Stücklisten, Beschaffung und Produktion in einem
              System — direkt verbunden mit <span className="font-medium text-white">SolidWorks</span> und{" "}
              <span className="font-medium text-white">Microsoft 365</span>.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#demo"
                data-testid="hero-cta-primary"
                className="inline-flex items-center gap-2 bg-brand px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white hover:bg-brand-hover transition-colors"
              >
                Live Demo öffnen <ArrowRight size={14} />
              </a>
              <a
                href="#module"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white hover:bg-white/10 transition-colors"
              >
                Module entdecken
              </a>
            </div>
          </div>

          {/* corner schematic */}
          <div className="md:col-span-4">
            <div className="border border-white/15 bg-black/30 p-5 font-mono text-[11px] text-zinc-400">
              <div className="mb-3 flex items-center justify-between text-cyan-accent">
                <span>// PARTID.SCHEMA</span>
                <span className="cursor-blink">READY</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
                  <span className="text-2xl text-white">H-7206-13282-90</span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-1 text-[10px]">
                  <div><div className="text-zinc-500">COMPANY</div><div className="text-white">H</div></div>
                  <div><div className="text-zinc-500">CLASS</div><div className="text-white">7206</div></div>
                  <div><div className="text-zinc-500">KEY</div><div className="text-white">13282</div></div>
                  <div><div className="text-zinc-500">STATUS</div><div className="text-brand">90 NPI</div></div>
                </div>
                <div className="pt-3 text-zinc-500">
                  → Helios Werk · Blechteil · Prototyp
                </div>
              </div>
            </div>

            {/* mini KPIs */}
            <div className="mt-4 grid grid-cols-3 border border-white/15">
              {[
                { k: "MODULE", v: "11" },
                { k: "KLASSEN", v: "125" },
                { k: "SPRACHEN", v: "3" },
              ].map((it) => (
                <div key={it.k} className="border-r border-white/15 last:border-r-0 p-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{it.k}</div>
                  <div className="font-mono text-2xl text-white">{it.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* tick marquee */}
        <div className="mt-20 overflow-hidden border-t border-b border-white/10 py-3">
          <div className="tick-marquee flex w-max gap-12 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            {Array.from({ length: 2 }).map((_, dup) => (
              <React.Fragment key={dup}>
                {[
                  "SolidWorks Add-in",
                  "Microsoft 365 nativ",
                  "PDM → ERP nahtlos",
                  "12-stufige NPI",
                  "DE · EN · HU automatisch",
                  "KI-Council Meute",
                  "Cloud Hosting",
                  "50 € / Arbeitsplatz",
                ].map((t, i) => (
                  <span key={`${dup}-${i}`} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="text-brand">◆</span> {t}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────── BLITZ SUITE BENTO ──────────────────────────── */

const SuiteBento = () => {
  const items = [
    {
      span: "md:col-span-6 md:row-span-2",
      title: "Herpert",
      tag: "PDM + ERP",
      desc: "Das massive PDM mit SolidWorks-Anbindung und das Herpert-ERP, das Beschaffung und Produktion reibungslos löst — von der PartId bis zur Bestellung.",
      icon: <Database size={20} />,
      featured: true,
    },
    { span: "md:col-span-3", title: "Blitz Post", tag: "Email", desc: "PDM-integrierter Email-Client für Microsoft 365.", icon: <Mail size={20} /> },
    { span: "md:col-span-3", title: "Blitz Brett", tag: "Organisation", desc: "Alles auf einem Board: Projekte, Pakete, Mails, Tasks.", icon: <LayoutGrid size={20} /> },
    { span: "md:col-span-3", title: "Blitz Fips", tag: "Projekte", desc: "Collab-Room über Firmengrenzen. Lieferanten docken an.", icon: <Network size={20} /> },
    { span: "md:col-span-3", title: "Paul", tag: "NPI", desc: "12-stufige NPI mit Freigaben an jedem Gate.", icon: <FileCheck2 size={20} /> },
    { span: "md:col-span-3", title: "Klaus", tag: "Buchhaltung", desc: "KI-Buchhaltung: Rechnungen, Fälligkeiten, Zahlungen.", icon: <Calculator size={20} /> },
    { span: "md:col-span-3", title: "🐺 Meute", tag: "KI-Council", desc: "Igor, BrainB/C/G, Gregor — von jeder Seite zuschaltbar.", icon: <Sparkles size={20} /> },
    {
      span: "md:col-span-6",
      title: "Manifest",
      tag: "DENKWEISE",
      desc: "Keine Module zum Nachkaufen. Kein BOM-Frickeln in Excel. Kein Lieferanten-Ping-Pong per Mail. HERPERT ist die Antwort auf eine simple Frage: warum müssen Engineering, Einkauf und Fertigung in drei Systemen leben?",
      icon: <BookOpen size={20} />,
      quote: true,
    },
  ];
  return (
    <section id="suite" className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <div className="mb-12 grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Overline>// DIE BLITZ-SUITE</Overline>
            <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
              Eine Suite, die mitdenkt.
            </h2>
          </div>
          <p className="md:col-span-4 text-zinc-600">
            Blitz bändigt die Info-Flut und führt Projekte von der Idee bis zur Serie —
            PDM, ERP, Collaboration und Buchhaltung greifen nahtlos ineinander.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-zinc-200 border border-zinc-200 md:grid-cols-12 md:grid-rows-2">
          {items.map((it) => (
            <div
              key={it.title}
              data-testid={`suite-card-${it.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className={`group relative p-6 md:p-8 ${it.span} transition-colors ${
                it.featured ? "bg-ink text-white hover:bg-zinc-900" : "bg-white hover:bg-zinc-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center border ${it.featured ? "border-white/20 text-brand" : "border-zinc-200 text-ink"}`}>
                  {it.icon}
                </div>
                <Mono className={`text-[10px] uppercase tracking-widest ${it.featured ? "text-zinc-400" : "text-zinc-500"}`}>
                  {it.tag}
                </Mono>
              </div>
              <h3 className={`mt-6 font-sans text-2xl font-medium tracking-tight md:text-3xl ${it.featured ? "text-white" : "text-ink"}`}>
                {it.title}
              </h3>
              <p className={`mt-3 max-w-md text-sm leading-relaxed ${it.featured ? "text-zinc-300" : "text-zinc-600"}`}>
                {it.desc}
              </p>
              {it.featured && (
                <div className="mt-8 inline-flex items-center gap-2 border-b border-brand pb-1 font-mono text-[11px] uppercase tracking-widest text-brand">
                  Kernsystem → <ArrowRight size={12} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────── PROZESS PIPELINE ───────────────────────────── */

const ProcessPipeline = () => {
  const steps = [
    { n: "01", title: "Konstruktion", desc: "SolidWorks Add-in legt PDM-Objekte direkt aus dem CAD an.", icon: <Wrench size={18} /> },
    { n: "02", title: "PDM", desc: "Produktdaten, Klassifizierung, Thumbnails, Lifecycle-Status.", icon: <Database size={18} /> },
    { n: "03", title: "Stückliste", desc: "Mehrstufige BOM automatisch aus der Baugruppe.", icon: <GitBranch size={18} /> },
    { n: "04", title: "Beschaffung", desc: "Bestellungen, Lieferanten, Bedarfsermittlung.", icon: <ShoppingCart size={18} /> },
    { n: "05", title: "Produktion", desc: "Fertigungsaufträge, Material-Reservierung.", icon: <Factory size={18} /> },
  ];
  return (
    <section id="prozess" className="border-y border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <Overline>// LIFECYCLE</Overline>
        <h2 className="mt-3 max-w-3xl font-sans text-4xl font-semibold tracking-tight md:text-5xl">
          Ein durchgängiger Prozess — kein Medienbruch.
        </h2>
        <p className="mt-4 max-w-2xl text-zinc-600">
          HERPERT begleitet das Bauteil über seinen gesamten Lebenszyklus —
          von der ersten Skizze in SolidWorks bis zur Bestellung im Lager.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-5">
          {steps.map((s, i) => (
            <div
              key={s.n}
              data-testid={`pipeline-step-${s.n}`}
              className="relative bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <Mono className="text-[11px] tracking-widest text-zinc-400">{s.n}</Mono>
                <div className="flex h-9 w-9 items-center justify-center border border-zinc-200 text-ink">
                  {s.icon}
                </div>
              </div>
              <h3 className="mt-6 font-sans text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="absolute right-[-7px] top-1/2 z-10 hidden h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-zinc-300 bg-white md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────── INTERAKTIVE DEMO ───────────────────────────── */

const TABS = [
  { id: "post", label: "Blitz Post", icon: <Mail size={14} /> },
  { id: "brett", label: "Brett", icon: <LayoutGrid size={14} /> },
  { id: "bom", label: "Stückliste", icon: <GitBranch size={14} /> },
  { id: "po", label: "Bestellungen", icon: <ShoppingCart size={14} /> },
  { id: "dashboard", label: "Dashboard", icon: <Boxes size={14} /> },
  { id: "meute", label: "Meute KI", icon: <Sparkles size={14} /> },
];

const EmailMock = () => {
  const initial = [
    { id: 1, from: "Lena Hofer", initials: "L", time: "10:34", subject: "Angebot Halteblech P26-014", preview: "Anbei unser Angebot für das Halteblech. Termin können wir einhalten…", tag: "P26-014", attach: true },
    { id: 2, from: "Marek Kovács", initials: "M", time: "09:20", subject: "RE: Bestellung PO-2026-0021", preview: "Die Lieferung ist für nächste Woche Dienstag bestätigt…", tag: "PO-2026-0021" },
    { id: 3, from: "Tobias Reiner", initials: "T", time: "08:55", subject: "Freigabe Zeichnung V3 benötigt", preview: "Kannst du die aktualisierte Zeichnung V3 noch heute freigeben?", tag: "P26-009 #34 RFQ", attach: true },
    { id: 4, from: "Sofia Brandt", initials: "S", time: "Gestern", subject: "Meeting morgen 14:00", preview: "Kurze Erinnerung: Morgen 14:00 Review-Meeting für Phase 2…" },
  ];
  const [mails, setMails] = useState(initial);
  const [stats, setStats] = useState({ read: 0, replied: 0, starred: 0 });

  const act = (id, kind) => {
    setMails((m) => m.filter((x) => x.id !== id));
    setStats((s) => ({ ...s, [kind]: s[kind] + 1 }));
  };
  const reset = () => { setMails(initial); setStats({ read: 0, replied: 0, starred: 0 }); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="border-r border-zinc-200 lg:col-span-3">
        <div className="border-b border-zinc-200 p-4">
          <Overline>// POSTEINGANG</Overline>
          <div className="mt-1 font-mono text-2xl">{mails.length}</div>
        </div>
        {[
          { k: "read", label: "Gelesen", icon: <CheckSquare size={14} /> },
          { k: "replied", label: "Beantwortet", icon: <Reply size={14} /> },
          { k: "starred", label: "Gemerkt", icon: <Star size={14} /> },
        ].map((row) => (
          <div key={row.k} className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 text-sm">
            <span className="inline-flex items-center gap-2 text-zinc-600">{row.icon} {row.label}</span>
            <Mono className="text-zinc-900">{stats[row.k]}</Mono>
          </div>
        ))}
        <button
          data-testid="email-reset"
          onClick={reset}
          className="mt-4 mx-4 inline-flex w-[calc(100%-2rem)] items-center justify-center gap-2 border border-zinc-300 px-3 py-2 font-mono text-[11px] uppercase tracking-widest hover:bg-zinc-100"
        >
          ↺ Zurücksetzen
        </button>
      </div>

      <div className="lg:col-span-9">
        <div className="flex items-center justify-between border-b border-zinc-200 p-4">
          <div className="flex items-center gap-2">
            <Search size={14} className="text-zinc-500" />
            <Mono className="text-[11px] uppercase tracking-widest text-zinc-500">Suchen · klick die Buttons zum Sortieren</Mono>
          </div>
          <Mono className="text-[11px] uppercase tracking-widest text-zinc-400">DEMO · TESTDATEN</Mono>
        </div>
        <ul>
          {mails.length === 0 && (
            <li className="p-10 text-center text-zinc-500">Inbox Zero ✓ — klick &bdquo;Zur&uuml;cksetzen&ldquo;</li>
          )}
          {mails.map((m) => (
            <li key={m.id} className="grid grid-cols-12 items-start gap-4 border-b border-zinc-200 p-4 hover:bg-zinc-50">
              <div className="col-span-2 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center border border-zinc-300 bg-zinc-100 font-mono text-sm">{m.initials}</div>
                <div>
                  <div className="text-sm font-medium">{m.from}</div>
                  <Mono className="text-[11px] text-zinc-500">{m.attach ? "📎 " : ""}{m.time}</Mono>
                </div>
              </div>
              <div className="col-span-7">
                <div className="text-sm font-medium text-ink">{m.subject}</div>
                <div className="mt-1 line-clamp-1 text-sm text-zinc-600">{m.preview}</div>
                {m.tag && <Mono className="mt-2 inline-block bg-zinc-100 px-2 py-0.5 text-[10px] uppercase tracking-widest text-zinc-600">{m.tag}</Mono>}
              </div>
              <div className="col-span-3 flex flex-wrap justify-end gap-1">
                <button data-testid={`mail-del-${m.id}`} onClick={() => act(m.id, "read")} className="flex items-center gap-1 border border-zinc-300 px-2 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-zinc-100"><Trash2 size={11} />Löschen</button>
                <button data-testid={`mail-read-${m.id}`} onClick={() => act(m.id, "read")} className="flex items-center gap-1 border border-zinc-300 px-2 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-zinc-100"><CheckSquare size={11} />Gelesen</button>
                <button data-testid={`mail-reply-${m.id}`} onClick={() => act(m.id, "replied")} className="flex items-center gap-1 border border-zinc-300 px-2 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-zinc-100"><Reply size={11} />Antworten</button>
                <button data-testid={`mail-star-${m.id}`} onClick={() => act(m.id, "starred")} className="flex items-center gap-1 border border-zinc-300 px-2 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-zinc-100"><Star size={11} />Merken</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const BrettMock = () => {
  const cols = [
    {
      title: "Backlog", count: 3, cards: [
        { id: "P26-014", title: "Halteblech Rev. C", tag: "BLECH", who: "LH", status: "50 NPD" },
        { id: "P26-021", title: "Achsadapter T2", tag: "FRÄSTEIL", who: "MK", status: "20 DOV" },
        { id: "P26-022", title: "Schutzhaube X", tag: "BAUGRUPPE", who: "TR", status: "20 DOV" },
      ]
    },
    {
      title: "In Arbeit", count: 4, cards: [
        { id: "P26-009", title: "Zeichnung V3 Freigabe", tag: "RFQ", who: "SB", status: "90 NPI" },
        { id: "PO-0021", title: "Bestellung Helios", tag: "BESTELLUNG", who: "MK", status: "01 RAMP" },
        { id: "P26-013", title: "BOM Master prüfen", tag: "BOM", who: "LH", status: "50 NPD" },
        { id: "P26-007", title: "Igor: Toleranzcheck", tag: "KI", who: "🐺", status: "50 NPD" },
      ]
    },
    {
      title: "Warten", count: 2, cards: [
        { id: "P26-005", title: "Lieferant FOPEX QC", tag: "QM", who: "TR", status: "01 RAMP" },
        { id: "P26-004", title: "Klaus: Rechnung 0223", tag: "AP", who: "KL", status: "01 RAMP" },
      ]
    },
    {
      title: "Erledigt", count: 1, cards: [
        { id: "P26-001", title: "Phase 1 Review", tag: "GATE", who: "SB", status: "01 RAMP" },
      ]
    },
  ];
  const statusColor = (s) => {
    if (s.startsWith("20")) return "bg-amber-500/20 text-amber-700 border-amber-500/30";
    if (s.startsWith("50")) return "bg-amber-500/20 text-amber-700 border-amber-500/30";
    if (s.startsWith("90")) return "bg-blue-500/20 text-blue-700 border-blue-500/30";
    if (s.startsWith("01")) return "bg-emerald-500/20 text-emerald-700 border-emerald-500/30";
    return "bg-zinc-200 text-zinc-700 border-zinc-300";
  };
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <Mono className="text-[11px] uppercase tracking-widest text-zinc-500">// PROJECT: ARDEN-XS / SPRINT 26</Mono>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 border border-zinc-300 px-2 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-zinc-50"><Filter size={11} />Filter</button>
          <button className="flex items-center gap-1 border border-ink bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white hover:bg-brand hover:border-brand"><Plus size={11} />Karte</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {cols.map((col) => (
          <div key={col.title} className="border border-zinc-200 bg-zinc-50">
            <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-3 py-2">
              <span className="text-sm font-medium">{col.title}</span>
              <Mono className="text-[10px] text-zinc-500">{col.count}</Mono>
            </div>
            <div className="space-y-2 p-2">
              {col.cards.map((c) => (
                <div key={c.id} data-testid={`brett-card-${c.id}`} className="border border-zinc-200 bg-white p-3 hover:border-ink transition-colors">
                  <div className="flex items-center justify-between">
                    <Mono className="text-[11px] text-zinc-500">{c.id}</Mono>
                    <span className={`border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest ${statusColor(c.status)}`}>{c.status}</span>
                  </div>
                  <div className="mt-1.5 text-sm font-medium leading-tight">{c.title}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600">{c.tag}</span>
                    <div className="flex h-5 w-5 items-center justify-center border border-zinc-300 bg-zinc-100 font-mono text-[10px]">{c.who}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BomMock = () => {
  const rows = [
    { lvl: 0, id: "H-7206-13282-90", name: "Halteblech Baugruppe X2", qty: 1, status: "90 NPI", v: "Rev. C" },
    { lvl: 1, id: "H-7201-00432-50", name: "Halterung gefräst", qty: 1, status: "50 NPD", v: "Rev. B" },
    { lvl: 2, id: "H-4002-00118-00", name: "Aluminium 6082 100×80", qty: 1, status: "00 COTS", v: "—" },
    { lvl: 2, id: "H-6004-00009-01", name: "Eloxieren schwarz", qty: 1, status: "01 RAMP", v: "Rev. A" },
    { lvl: 1, id: "H-7202-00871-90", name: "Niethülse M6", qty: 4, status: "90 NPI", v: "Rev. A" },
    { lvl: 1, id: "H-7610-00033-00", name: "PCBA Sensor", qty: 1, status: "00 COTS", v: "—" },
    { lvl: 1, id: "H-9000-00002-01", name: "Versandkarton 200×150", qty: 1, status: "01 RAMP", v: "—" },
  ];
  const statusColor = (s) => {
    if (s.startsWith("00")) return "text-emerald-600";
    if (s.startsWith("50")) return "text-amber-600";
    if (s.startsWith("90")) return "text-blue-600";
    if (s.startsWith("01")) return "text-violet-600";
    return "text-zinc-600";
  };
  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Mono className="text-[11px] uppercase tracking-widest text-zinc-500">// BOM EXPLOSION · Master</Mono>
          <div className="mt-1 font-mono text-lg">H-7206-13282-90 · Halteblech Baugruppe X2</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-zinc-300 px-2 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-zinc-50">Excel Import</button>
          <button className="border border-ink bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white hover:bg-brand hover:border-brand">SW Traverse</button>
        </div>
      </div>
      <div className="border border-zinc-200">
        <div className="grid grid-cols-12 border-b border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          <div className="col-span-1">Lvl</div>
          <div className="col-span-4">PartId</div>
          <div className="col-span-4">Bezeichnung</div>
          <div className="col-span-1 text-right">Mng</div>
          <div className="col-span-2">Status / Rev</div>
        </div>
        {rows.map((r, i) => (
          <div key={r.id + i} className="grid grid-cols-12 items-center border-b border-zinc-100 px-3 py-2.5 text-sm last:border-b-0 hover:bg-zinc-50">
            <div className="col-span-1 font-mono text-zinc-500">{r.lvl}</div>
            <div className="col-span-4 font-mono text-zinc-900" style={{ paddingLeft: `${r.lvl * 16}px` }}>
              <span className="text-zinc-400">{r.lvl > 0 ? "└─ " : ""}</span>{r.id}
            </div>
            <div className="col-span-4 text-zinc-800">{r.name}</div>
            <div className="col-span-1 text-right font-mono">{r.qty}</div>
            <div className="col-span-2"><Mono className={`text-xs ${statusColor(r.status)}`}>{r.status}</Mono> <span className="ml-2 text-zinc-500">{r.v}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const POMock = () => {
  const rows = [
    { id: "PO-2026-0021", sup: "Helios Werk GmbH", part: "H-7201-00432-50", qty: 120, eta: "2026-07-09", status: "UNTERWEGS" },
    { id: "PO-2026-0020", sup: "Kovács Metallbau", part: "H-7202-00871-90", qty: 800, eta: "2026-07-04", status: "OFFEN" },
    { id: "PO-2026-0018", sup: "FOPEX Surface", part: "H-6004-00009-01", qty: 60, eta: "2026-06-30", status: "ANGEKOMMEN" },
    { id: "PO-2026-0017", sup: "ChipNord OY", part: "H-7610-00033-00", qty: 24, eta: "2026-07-15", status: "UNTERWEGS" },
    { id: "PO-2026-0016", sup: "PaperCo GmbH", part: "H-9000-00002-01", qty: 500, eta: "2026-06-22", status: "ANGEKOMMEN" },
  ];
  const sclr = (s) => s === "OFFEN" ? "border-zinc-400 text-zinc-700" : s === "UNTERWEGS" ? "border-amber-500 text-amber-700 bg-amber-50" : "border-emerald-500 text-emerald-700 bg-emerald-50";
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <Mono className="text-[11px] uppercase tracking-widest text-zinc-500">// BESTELLUNGEN · OFFEN 2 · UNTERWEGS 2 · ANGEKOMMEN 2</Mono>
        <button className="border border-ink bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white hover:bg-brand hover:border-brand">+ PO</button>
      </div>
      <div className="border border-zinc-200">
        <div className="grid grid-cols-12 border-b border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          <div className="col-span-2">PO-Nr</div>
          <div className="col-span-3">Lieferant</div>
          <div className="col-span-3">PartId</div>
          <div className="col-span-1 text-right">Mng</div>
          <div className="col-span-1">ETA</div>
          <div className="col-span-2">Status</div>
        </div>
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-12 items-center border-b border-zinc-100 px-3 py-2.5 text-sm last:border-b-0 hover:bg-zinc-50">
            <div className="col-span-2 font-mono">{r.id}</div>
            <div className="col-span-3">{r.sup}</div>
            <div className="col-span-3 font-mono text-zinc-700">{r.part}</div>
            <div className="col-span-1 text-right font-mono">{r.qty}</div>
            <div className="col-span-1 font-mono text-zinc-500">{r.eta}</div>
            <div className="col-span-2"><span className={`border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${sclr(r.status)}`}>{r.status}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardMock = () => {
  const kpis = [
    { label: "RFQs offen", v: "12", trend: "+3" },
    { label: "POs unterwegs", v: "27", trend: "−2" },
    { label: "Lager Wert", v: "€ 482k", trend: "+1.4%" },
    { label: "WIP Aufträge", v: "9", trend: "+1" },
    { label: "On-Time", v: "94 %", trend: "+0.6%" },
    { label: "Anfragen / Tag", v: "31", trend: "+5" },
  ];
  const orders = [
    { id: "FA-1144", t: "Halteblech X2", p: 60, total: 120 },
    { id: "FA-1145", t: "Achsadapter T2", p: 22, total: 100 },
    { id: "FA-1146", t: "Schutzhaube X", p: 85, total: 90 },
    { id: "FA-1147", t: "Sensor-Hülse", p: 10, total: 800 },
  ];
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <Mono className="text-[11px] uppercase tracking-widest text-zinc-500">// HERPERT · AUFTRAGS-DASHBOARD</Mono>
        <Mono className="text-[10px] text-zinc-500">LIVE · {new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</Mono>
      </div>
      <div className="grid grid-cols-2 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white p-4">
            <Mono className="text-[10px] uppercase tracking-widest text-zinc-500">{k.label}</Mono>
            <div className="mt-1 font-mono text-2xl">{k.v}</div>
            <div className={`mt-1 font-mono text-[11px] ${k.trend.startsWith("+") ? "text-emerald-600" : "text-amber-600"}`}>{k.trend}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="border border-zinc-200 md:col-span-2">
          <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-2"><Mono className="text-[10px] uppercase tracking-widest text-zinc-500">// FERTIGUNGSAUFTRÄGE · FORTSCHRITT</Mono></div>
          <div className="divide-y divide-zinc-200">
            {orders.map((o) => (
              <div key={o.id} className="grid grid-cols-12 items-center gap-3 px-3 py-3 text-sm">
                <div className="col-span-2 font-mono">{o.id}</div>
                <div className="col-span-4">{o.t}</div>
                <div className="col-span-5">
                  <div className="h-1.5 w-full bg-zinc-100">
                    <div className="h-1.5 bg-brand" style={{ width: `${(o.p / o.total) * 100}%` }} />
                  </div>
                </div>
                <div className="col-span-1 text-right font-mono text-zinc-600">{o.p}/{o.total}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-zinc-200">
          <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-2"><Mono className="text-[10px] uppercase tracking-widest text-zinc-500">// MASCHINEN</Mono></div>
          {[
            { m: "CNC-01 DMG Mori", s: "AKTIV", c: "text-emerald-600" },
            { m: "CNC-02 Hermle", s: "AKTIV", c: "text-emerald-600" },
            { m: "Laser TruLaser 3030", s: "WARTUNG", c: "text-amber-600" },
            { m: "Press-Brake Trumpf", s: "LEERLAUF", c: "text-zinc-500" },
          ].map((r) => (
            <div key={r.m} className="flex items-center justify-between border-b border-zinc-100 px-3 py-2.5 text-sm last:border-b-0">
              <span>{r.m}</span>
              <Mono className={`text-[10px] uppercase tracking-widest ${r.c}`}>● {r.s}</Mono>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MeuteMock = () => {
  const messages = [
    { who: "Du", color: "text-ink", t: "Was ist der Status von PO-2026-0021?" },
    { who: "Igor", color: "text-brand", t: "PO-2026-0021 (Helios Werk, 120 Stk H-7201-00432-50) — UNTERWEGS, ETA 09.07.2026. RFQ-Antwort lag 3 Tage über Median, könnte für Q3 ein Risiko sein." },
    { who: "BrainC", color: "text-cyan-600", t: "Vorschlag: Dual-Source via Kovács Metallbau aufsetzen (Lead-Time −2 Tage, +6% Preis)." },
    { who: "Gregor", color: "text-violet-600", t: "Klaus hat 1 offene Rechnung vom Lieferanten gefunden (€ 4.220, fällig 04.07.). Soll ich freigeben?" },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="border-r border-zinc-200 lg:col-span-3">
        <div className="border-b border-zinc-200 p-4">
          <Mono className="text-[10px] uppercase tracking-widest text-zinc-500">// KI-COUNCIL</Mono>
          <div className="mt-1 font-mono text-lg">🐺 Meute</div>
        </div>
        {[
          { n: "Igor", r: "Allrounder", c: "bg-brand" },
          { n: "BrainB", r: "Beschaffung", c: "bg-blue-500" },
          { n: "BrainC", r: "Konstruktion", c: "bg-cyan-500" },
          { n: "BrainG", r: "Geschäft", c: "bg-emerald-500" },
          { n: "Gregor", r: "Klaus-Buchhaltung", c: "bg-violet-500" },
        ].map((a) => (
          <div key={a.n} className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3">
            <div className={`h-7 w-7 ${a.c}`} />
            <div>
              <div className="text-sm font-medium">{a.n}</div>
              <Mono className="text-[10px] uppercase tracking-widest text-zinc-500">{a.r}</Mono>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:col-span-9">
        <div className="space-y-4 p-6">
          {messages.map((m, i) => (
            <div key={i} className="border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <Mono className={`text-[11px] uppercase tracking-widest ${m.color}`}>{m.who}</Mono>
                <Mono className="text-[10px] text-zinc-400">10:3{i + 1}</Mono>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-800">{m.t}</p>
            </div>
          ))}
          <div className="flex items-center gap-2 border border-zinc-300 p-2">
            <input data-testid="meute-input" className="w-full border-0 bg-transparent px-2 py-1 text-sm outline-none" placeholder="Frag die Meute …" />
            <button data-testid="meute-send" className="inline-flex items-center gap-1 bg-ink px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white hover:bg-brand"><Send size={12} /> Senden</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InteractiveDemo = () => {
  const [tab, setTab] = useState("post");
  return (
    <section id="demo" className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Overline>// INTERAKTIVE DEMO</Overline>
            <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
              Das ganze System live ausprobieren.
            </h2>
          </div>
          <p className="md:col-span-4 text-zinc-600">
            Email-Triage, Brett, Stücklisten, Bestellungen, Auftrags-Dashboard und das
            KI-Council — alles klickbar, ohne Login.
          </p>
        </div>

        <div className="mt-12 border border-zinc-200">
          {/* tabs container - scrollable on mobile */}
          <div className="flex items-stretch overflow-x-auto border-b border-zinc-200 bg-zinc-50 scrollbar-thin">
            {TABS.map((t) => (
              <button
                key={t.id}
                data-testid={`demo-tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-zinc-200 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] last:border-r-0 sm:px-5 ${
                  tab === t.id ? "bg-white text-ink border-b-2 border-b-brand -mb-px" : "text-zinc-600 hover:bg-white"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
            <div className="ml-auto hidden items-center px-5 md:flex">
              <Mono className="text-[10px] uppercase tracking-widest text-zinc-400">// DEMO · TESTDATEN</Mono>
            </div>
          </div>

          {/* content - horizontal scroll on tight viewports */}
          <div className="overflow-x-auto bg-white" data-testid={`demo-content-${tab}`}>
            <div className="min-w-[680px]">
              {tab === "post" && <EmailMock />}
              {tab === "brett" && <BrettMock />}
              {tab === "bom" && <BomMock />}
              {tab === "po" && <POMock />}
              {tab === "dashboard" && <DashboardMock />}
              {tab === "meute" && <MeuteMock />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────── MODULE ─────────────────────────────────────── */

const Modules = () => {
  const items = [
    { i: <Package size={18} />,    title: "PDM",                desc: "Zentrale Produktdatenverwaltung — Klassifizierung, Eigenschaften, Thumbnails, Lieferanten- und Projektzuordnung, Lifecycle-Status." },
    { i: <GitBranch size={18} />,  title: "Stücklisten (BOM)",  desc: "Mehrstufige Stücklisten mit Explosion, Master-BOM und Excel-Import. Automatisch aus der SolidWorks-Baugruppe generiert." },
    { i: <Send size={18} />,       title: "RFQ-Portal",         desc: "Anfragen gehen als Web-Link an Lieferanten — Preise und Lieferzeiten landen automatisch im PDM, ohne Email-Ping-Pong." },
    { i: <ShoppingCart size={18} />,title: "Beschaffung & PO",  desc: "Aus dem Bedarf werden Bestellungen mit einem Klick gelöst — Status von OFFEN über UNTERWEGS bis ANGEKOMMEN." },
    { i: <Factory size={18} />,    title: "Produktion",         desc: "Fertigungsaufträge, SOLL-Bedarf, Material-Reservierungen aus dem Bestand, Zuordnung von Stücklisten." },
    { i: <Users size={18} />,      title: "CRM",                desc: "Unternehmen und Kontakte, Lieferanten und Kunden, Firmenkürzel und Projektzuordnung." },
    { i: <Mail size={18} />,       title: "Blitz Email",        desc: "PDM-integrierter Email-Client für Microsoft 365. Emails mit Projekten, Bestellungen und Tasks verknüpfen — KI via Igor." },
    { i: <Network size={18} />,    title: "Blitz Fips",         desc: "Field Interactive Project Space — Collab-Room über Firmengrenzen. Partner ohne eigenes ERP docken an." },
    { i: <FileCheck2 size={18} />, title: "Paul",               desc: "Project Approval & Lifecycle. 12-stufige NPI gated durch jede Phase — mit Freigaben an jedem Tor." },
    { i: <Calculator size={18} />, title: "Klaus",              desc: "Buchhaltung mit viel KI: Rechnungen, Fälligkeiten und Zahlungsstatus, direkt aus Bestellungen und Belegen gespeist." },
    { i: <Sparkles size={18} />,   title: "Meute & Zwutschgerln", desc: "KI-Council (Igor, BrainB/C/G, Gregor) von jeder Seite zuschaltbar — plus private Klebezettel an Mails, Tasks und Brett-Karten." },
    { i: <Languages size={18} />,  title: "Auto-Übersetzung",   desc: "Jeder Datensatz automatisch DE / EN / HU. Konstrukteur in DE, Fertigung in HU — alle lesen ihre Sprache." },
  ];
  return (
    <section id="module" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Overline>// MODULE</Overline>
            <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
              12 Module, die zusammenpassen.
            </h2>
          </div>
          <p className="md:col-span-4 text-zinc-600">
            Keine Module zum Nachkaufen — alles ist Teil der HERPERT Suite.
            Lass dich nicht von der Tiefe abschrecken: das System wächst mit.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} data-testid={`module-${it.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="group flex flex-col bg-white p-5 sm:p-6 hover:bg-zinc-50">
              <div className="flex h-10 w-10 items-center justify-center border border-zinc-200 text-ink group-hover:bg-ink group-hover:text-white transition-colors">
                {it.i}
              </div>
              <h3 className="mt-4 font-sans text-base font-medium tracking-tight sm:mt-5 sm:text-lg">{it.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-600 sm:text-sm">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────── PARTID DATAMODEL ───────────────────────────── */

const PartIdSection = () => {
  const lifecycle = [
    { code: "00", name: "COTS", desc: "Kaufteile — bleiben immer auf 00.", color: "text-emerald-500" },
    { code: "20–49", name: "DOV", desc: "Vision · Evaluation → Ideation.", color: "text-amber-500" },
    { code: "50–89", name: "NPD", desc: "Entwicklung · Konzept → Verifikation.", color: "text-amber-400" },
    { code: "90–99", name: "NPI", desc: "Einführung · Industrialisierung.", color: "text-blue-400" },
    { code: "01–09", name: "Ramp Up", desc: "Serienproduktion.", color: "text-violet-400" },
  ];
  const families = [
    { range: "1001–1104", name: "Dokumente",                 d: "Konstruktion & Fertigung" },
    { range: "4001–4009", name: "Rohmaterialien",            d: "Aluminium, Stahl, Polymere" },
    { range: "5001–5009", name: "Werkzeuge & Vorrichtungen", d: "Spann-, Halte-, Hilfsmittel" },
    { range: "6001–6010", name: "Prozesse & Oberflächen",    d: "Eloxieren, Härten, Lackieren" },
    { range: "7000–7090", name: "Baugruppen & Teile",        d: "Systeme, Module, PCBAs" },
    { range: "7200–7208", name: "Fertigungstech",            d: "Frästeil, Blechteil, Drehteil" },
    { range: "7610–7881", name: "Elektrik & Elektronik",     d: "Sensorik, Hardware" },
    { range: "9000–9160", name: "Versand, Endmontage",       d: "Verpackung, Verkaufsteile" },
  ];
  return (
    <section id="partid" className="bg-blueprint text-white">
      <div className="absolute inset-x-0 blueprint-bg" style={{ height: "100%" }} />
      <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Overline className="text-cyan-accent">// GROUP PDM · DATENMODELL</Overline>
            <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
              Eine PartId, die alles erzählt.
            </h2>
          </div>
          <p className="md:col-span-4 text-zinc-400">
            Jedes Objekt bekommt eine unveränderliche PartId. Vier Segmente codieren
            Eigentümer, Klasse, Identität und Reifegrad. Die ID ändert sich nie — ein
            Statuswechsel erzeugt eine neue Zeile mit demselben UniqueKey.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-12">
          {/* big PartId */}
          <div className="bg-blueprint p-6 sm:p-8 md:col-span-7">
            <Overline className="text-cyan-accent">// AUFBAU DER PARTID</Overline>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-7">
              {[
                { l: "H", k: "CompanyCode", h: "1 Buchstabe · besitzende Firma" },
                { l: "-", k: "", h: "" },
                { l: "7206", k: "ClassCode", h: "Klassen-Familie · z. B. Blechteil" },
                { l: "-", k: "", h: "" },
                { l: "13282", k: "UniqueKey", h: "Identität — bleibt immer gleich" },
                { l: "-", k: "", h: "" },
                { l: "90", k: "StatusCode", h: "Reifegrad · Lifecycle" },
              ].map((seg, i) => (
                <div key={i} className={`text-center ${seg.k === "" ? "hidden sm:block sm:col-span-1" : "col-span-1 sm:col-span-2"}`}>
                  {seg.k === "" ? (
                    <div className="flex h-16 items-center justify-center font-mono text-3xl text-zinc-500">{seg.l}</div>
                  ) : (
                    <div className="border border-white/15 p-3">
                      <Mono className="text-[10px] uppercase tracking-widest text-zinc-400">{seg.k}</Mono>
                      <div className="mt-1 font-mono text-2xl text-white sm:text-3xl">{seg.l}</div>
                      <div className="mt-1 text-[11px] leading-snug text-zinc-500">{seg.h}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-white/10 pt-4 font-mono text-sm text-zinc-400">
              → Helios Werk · Blechteil · Key 13282 · Prototyp
            </div>
          </div>

          {/* lifecycle */}
          <div className="bg-blueprint p-8 md:col-span-5">
            <Overline className="text-cyan-accent">// STATUS-LIFECYCLE</Overline>
            <div className="mt-6 space-y-2">
              {lifecycle.map((l) => (
                <div key={l.name} className="grid grid-cols-12 items-baseline gap-3 border-b border-white/10 py-2">
                  <Mono className={`col-span-2 ${l.color}`}>{l.code}</Mono>
                  <div className="col-span-2 font-mono text-white">{l.name}</div>
                  <div className="col-span-8 text-sm text-zinc-400">{l.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* families */}
          <div className="bg-blueprint p-8 md:col-span-12">
            <Overline className="text-cyan-accent">// KLASSEN-FAMILIEN · 125 KLASSEN IN 15 FAMILIEN</Overline>
            <div className="mt-6 grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
              {families.map((f) => (
                <div key={f.range} className="bg-blueprint p-4">
                  <Mono className="text-[11px] text-cyan-accent">{f.range}</Mono>
                  <div className="mt-1 font-mono text-white">{f.name}</div>
                  <div className="text-sm text-zinc-500">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────── TRANSLATION ────────────────────────────────── */

const Translation = () => {
  const samples = [
    { de: "Lagerbock fräsen, Toleranz H7, bis Freitag", en: "Mill bearing block, tolerance H7, by Friday", hu: "Csapágybak marása, H7 tűrés, péntekig" },
    { de: "Blechteil entgraten, Oberfläche Ra 1.6", en: "Deburr sheet metal part, surface Ra 1.6", hu: "Lemezalkatrész sorjázása, Ra 1.6 felület" },
    { de: "Stückliste freigeben — Rev. C an die Fertigung", en: "Release BOM — Rev. C to production", hu: "Darabjegyzék kiadása — Rev. C a gyártásnak" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % samples.length), 3500);
    return () => clearInterval(t);
  }, [samples.length]);
  const s = samples[idx];
  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Overline>// AUTOMATISCHE ÜBERSETZUNG</Overline>
            <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
              Jeder Datensatz in drei Sprachen — automatisch.
            </h2>
          </div>
          <p className="md:col-span-4 text-zinc-600">
            Konstrukteur in Deutschland, Fertigung in Ungarn, Kunde in UK — alle
            lesen ihre Sprache. Keine Doppelpflege, keine Copy-Paste-Übersetzung.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-3">
          {[
            { flag: "🇩🇪", code: "DE", text: s.de, accent: false },
            { flag: "🇬🇧", code: "EN", text: s.en, accent: true },
            { flag: "🇭🇺", code: "HU", text: s.hu, accent: false },
          ].map((c) => (
            <div key={c.code} className={`p-8 ${c.accent ? "bg-ink text-white" : "bg-white"}`} data-testid={`translation-${c.code}`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{c.flag}</span>
                <Mono className={`text-[10px] uppercase tracking-widest ${c.accent ? "text-zinc-400" : "text-zinc-500"}`}>{c.code}</Mono>
              </div>
              <div key={s[c.code.toLowerCase()] || c.text} className="mt-6 fade-up font-sans text-lg leading-snug">
                {c.text}
              </div>
              <Mono className={`mt-6 inline-block text-[10px] uppercase tracking-widest ${c.accent ? "text-brand" : "text-zinc-400"}`}>
                via Igor · KI
              </Mono>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────── SOLIDWORKS ─────────────────────────────────── */

const SolidWorks = () => {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Overline>// NATIVE INTEGRATION</Overline>
            <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
              Direkt aus SolidWorks.
            </h2>
            <p className="mt-4 max-w-xl text-zinc-700">
              Das HERPERT Add-in lebt im SolidWorks Task Pane. Engineers legen PDM-Objekte an,
              schreiben Eigenschaften zurück ins CAD und erzeugen komplette Stücklisten —
              ohne SolidWorks zu verlassen.
            </p>
            <ul className="mt-6 space-y-3 text-zinc-800">
              {[
                "Eigenschaften zwischen SolidWorks und PDM synchronisieren",
                "Baugruppe durchlaufen und fehlende Teile automatisch anlegen",
                "Mehrstufige BOM mit einem Klick speichern",
                "Thumbnails automatisch erfassen und ablegen",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-3 bg-brand" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            {/* Task pane mockup */}
            <div className="border border-zinc-300 bg-zinc-900 text-zinc-200">
              <div className="flex items-center justify-between border-b border-zinc-700 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-red-500" />
                  <span className="h-2 w-2 bg-amber-500" />
                  <span className="h-2 w-2 bg-emerald-500" />
                  <Mono className="ml-3 text-[10px] uppercase tracking-widest text-zinc-400">SolidWorks · Task Pane</Mono>
                </div>
                <Mono className="text-[10px] uppercase tracking-widest text-brand">HERPERT</Mono>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <button className="flex-1 border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-300">PART</button>
                  <button className="flex-1 border border-brand bg-brand px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white">BAUGRUPPE</button>
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    "LOAD SLWS",
                    "SAVE PDM",
                    "TRAVERSE SW",
                    "CREATE MISSING",
                    "SAVE BOM",
                  ].map((b, i) => (
                    <button key={b} className={`w-full border px-3 py-2 text-left font-mono text-[11px] uppercase tracking-widest hover:border-brand ${i === 4 ? "border-brand text-brand" : "border-zinc-700 text-zinc-300"}`}>
                      {b}
                    </button>
                  ))}
                </div>
                <div className="mt-4 border-t border-zinc-700 pt-3">
                  <Mono className="text-[10px] uppercase tracking-widest text-zinc-500">// PARTID OUT</Mono>
                  <div className="mt-1 font-mono text-lg text-white">H-7206-13282-90</div>
                  <Mono className="text-[10px] text-zinc-500">Class: Blechteil · Status: 90 NPI</Mono>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────── PRICING ────────────────────────────────────── */

const Pricing = () => {
  const incl = [
    "Alle Module — PDM, BOM, Beschaffung, Produktion, CRM",
    "Blitz Email-Client + Rudel-KI-Assistent",
    "SolidWorks-Add-in ohne Aufpreis",
    "Automatische Übersetzung DE / EN / HU",
    "Cloud-Hosting, Updates und Support",
  ];
  return (
    <section id="preis" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <Overline>// PREIS</Overline>
        <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
          Ein Preis, alles inklusive.
        </h2>
        <p className="mt-4 max-w-xl text-zinc-600">
          Keine Module zum Nachkaufen, keine Setup-Gebühr. Du zahlst pro aktivem Arbeitsplatz.
        </p>

        <div className="mt-12 grid grid-cols-1 border border-zinc-200 md:grid-cols-12">
          <div className="border-b border-zinc-200 p-10 md:col-span-7 md:border-b-0 md:border-r">
            <Overline>// PRO ARBEITSPLATZ · MONAT</Overline>
            <div className="mt-4 flex items-end gap-3 font-mono text-zinc-950">
              <span className="text-[120px] leading-none md:text-[180px]">50</span>
              <span className="mb-4 text-3xl">€</span>
            </div>
            <Mono className="mt-3 inline-block text-[11px] uppercase tracking-widest text-zinc-500">
              monatlich kündbar · zzgl. MwSt.
            </Mono>
          </div>
          <div className="p-10 md:col-span-5">
            <Overline>// IM PREIS ENTHALTEN</Overline>
            <ul className="mt-4 space-y-3">
              {incl.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-zinc-800">
                  <span className="mt-1.5 inline-block h-1.5 w-3 flex-shrink-0 bg-brand" />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#kontakt"
              data-testid="pricing-cta"
              className="mt-8 inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-white hover:bg-brand hover:border-brand"
            >
              Jetzt starten <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────── CONTACT FORM ───────────────────────────────── */

const Contact = () => {
  const [form, setForm] = useState({ name: "", company: "", email: "", role: "", message: "" });
  const [state, setState] = useState({ loading: false, ok: false, err: "" });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState({ loading: true, ok: false, err: "" });
    try {
      await axios.post(`${API}/leads`, form);
      setState({ loading: false, ok: true, err: "" });
      setForm({ name: "", company: "", email: "", role: "", message: "" });
    } catch (err) {
      setState({ loading: false, ok: false, err: err?.response?.data?.detail?.[0]?.msg || "Bitte alle Pflichtfelder prüfen." });
    }
  };

  return (
    <section id="kontakt" className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Overline color="brand">// KONTAKT</Overline>
            <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight md:text-5xl">
              Bereit für durchgängige Prozesse?
            </h2>
            <p className="mt-4 max-w-md text-zinc-400">
              Wir zeigen dir, wie HERPERT Konstruktion und Fertigung in deinem Werk verbindet.
              30 Minuten, kein Verkaufsdruck.
            </p>
            <div className="mt-10 space-y-3 font-mono text-sm text-zinc-300">
              <div>→ hi@herpert.com</div>
              <div>→ +43 1 234 5678</div>
              <div>→ Wien · Budapest · München</div>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-px bg-white/10 border border-white/15 p-px md:col-span-7" data-testid="contact-form">
            <div className="grid grid-cols-1 gap-px md:grid-cols-2">
              <div className="bg-ink p-5">
                <Overline className="text-zinc-500">Name *</Overline>
                <input data-testid="contact-name" required value={form.name} onChange={update("name")} className="mt-2 w-full border-0 border-b border-white/20 bg-transparent pb-2 text-lg outline-none focus:border-brand" placeholder="Vor- und Nachname" />
              </div>
              <div className="bg-ink p-5">
                <Overline className="text-zinc-500">Firma *</Overline>
                <input data-testid="contact-company" required value={form.company} onChange={update("company")} className="mt-2 w-full border-0 border-b border-white/20 bg-transparent pb-2 text-lg outline-none focus:border-brand" placeholder="Firma GmbH" />
              </div>
              <div className="bg-ink p-5">
                <Overline className="text-zinc-500">Email *</Overline>
                <input data-testid="contact-email" required type="email" value={form.email} onChange={update("email")} className="mt-2 w-full border-0 border-b border-white/20 bg-transparent pb-2 text-lg outline-none focus:border-brand" placeholder="name@firma.com" />
              </div>
              <div className="bg-ink p-5">
                <Overline className="text-zinc-500">Rolle</Overline>
                <input data-testid="contact-role" value={form.role} onChange={update("role")} className="mt-2 w-full border-0 border-b border-white/20 bg-transparent pb-2 text-lg outline-none focus:border-brand" placeholder="Konstruktionsleitung, IT, …" />
              </div>
            </div>
            <div className="bg-ink p-5">
              <Overline className="text-zinc-500">Worum geht&apos;s?</Overline>
              <textarea data-testid="contact-message" rows={4} value={form.message} onChange={update("message")} className="mt-2 w-full resize-none border-0 border-b border-white/20 bg-transparent pb-2 text-base outline-none focus:border-brand" placeholder="Kurz beschreiben — wir melden uns binnen 24h zurück." />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 bg-ink p-5">
              <Mono className="text-[10px] uppercase tracking-widest text-zinc-500">
                {state.ok ? "✓ Eingegangen — wir melden uns" : state.err ? `✗ ${state.err}` : "Antwort binnen 24h"}
              </Mono>
              <button data-testid="contact-submit" disabled={state.loading} className="inline-flex items-center gap-2 border border-brand bg-brand px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-white hover:bg-brand-hover disabled:opacity-50">
                {state.loading ? "Sende …" : "Demo vereinbaren"} <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

/* ───────────────── FOOTER ─────────────────────────────────────── */

const Footer = () => (
  <footer className="bg-ink border-t border-white/10 text-zinc-400">
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 py-14 md:grid-cols-12 md:px-12">
      <div className="md:col-span-5">
        <div className="flex items-center gap-2 text-white">
          <span className="inline-flex h-7 w-7 items-center justify-center bg-brand"><Zap size={16} /></span>
          <span className="font-mono text-sm tracking-[0.18em]">HERPERT</span>
        </div>
        <p className="mt-4 max-w-sm text-sm">
          ERP für konstruktionsnahe Fertigung. PDM · BOM · Beschaffung · Produktion ·
          SolidWorks · Microsoft 365.
        </p>
      </div>
      {[
        { h: "Produkt", l: ["Suite", "Module", "Prozess", "PartId", "Preis"] },
        { h: "System", l: ["SolidWorks Add-in", "Microsoft 365", "Cloud / On-Prem", "API"] },
        { h: "Unternehmen", l: ["Kontakt", "Imprint", "Datenschutz", "Status"] },
      ].map((col) => (
        <div key={col.h} className="md:col-span-2">
          <Overline>{col.h}</Overline>
          <ul className="mt-3 space-y-2 text-sm">
            {col.l.map((it) => (
              <li key={it}><a href="#" className="hover:text-white">{it}</a></li>
            ))}
          </ul>
        </div>
      ))}
      <div className="md:col-span-1 text-right">
        <Overline>Sprache</Overline>
        <div className="mt-3 font-mono text-sm text-white">DE · EN · HU</div>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 font-mono text-[11px] uppercase tracking-widest text-zinc-500 md:px-12">
        <span>© 2026 HERPERT · v.2026.01</span>
        <span>Built for engineers.</span>
      </div>
    </div>
  </footer>
);

/* ───────────────── PAGE ───────────────────────────────────────── */

const Landing = () => {
  useEffect(() => {
    // ping API just for health
    axios.get(`${API}/`).catch(() => {});
  }, []);
  return (
    <div data-testid="landing-root" className="min-h-screen bg-white text-ink">
      <Nav />
      <Hero />
      <SuiteBento />
      <ProcessPipeline />
      <AppShowcase />
      <Modules />
      <PartIdSection />
      <Translation />
      <SolidWorks />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
