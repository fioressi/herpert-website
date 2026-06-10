"use client";

import { useState } from "react";
import { T, type Lang } from "./translations";
import { BrettView } from "./demo/BrettView";
import { CalendarView } from "./demo/CalendarView";
import { TasksView } from "./demo/TasksView";
import { OrdersView } from "./demo/OrdersView";
import { RudelView } from "./demo/RudelView";

type View = "email" | "brett" | "kalender" | "tasks" | "orders" | "rudel";

export function WorkspaceDemo({ lang }: { lang: Lang }) {
  const [view, setView] = useState<View>("email");
  const v = T[lang].blitzDemo.views;

  const tabs: { key: View; label: string }[] = [
    { key: "email", label: v.email },
    { key: "brett", label: v.brett },
    { key: "kalender", label: v.kalender },
    { key: "tasks", label: v.tasks },
    { key: "orders", label: v.orders },
    { key: "rudel", label: v.rudel },
  ];

  // Email view keeps a phone-like narrow frame; all other views go full width.
  const narrow = view === "email";

  return (
    <div className="w-full">
      {/* View switcher */}
      <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setView(tb.key)}
            className={`text-sm px-4 py-2 rounded-lg transition ${
              view === tb.key
                ? "bg-cyan-400 text-slate-950 font-semibold"
                : "bg-slate-800/60 text-slate-400 hover:text-cyan-400"
            }`}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {narrow ? (
        <div className="max-w-md mx-auto w-full">
          <BlitzDemo lang={lang} />
        </div>
      ) : (
        <div className="glass bg-slate-950/60 overflow-hidden shadow-2xl w-full">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-cyan-400/10 bg-slate-900/60">
            <span className="text-cyan-400 font-bold">⚡ HERPERT</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 font-mono">
              DEMO
            </span>
            <span className="ml-auto text-xs text-slate-500">
              {tabs.find((tb) => tb.key === view)?.label}
            </span>
          </div>
          {view === "brett" && <BrettView lang={lang} />}
          {view === "kalender" && <CalendarView lang={lang} />}
          {view === "tasks" && <TasksView lang={lang} />}
          {view === "orders" && <OrdersView lang={lang} />}
          {view === "rudel" && <RudelView lang={lang} />}
        </div>
      )}
    </div>
  );
}

type Status = "inbox" | "read" | "reply" | "saved" | "deleted";

interface Link {
  label: string;
  type: "project" | "po" | "task";
}

interface DemoEmail {
  id: string;
  from: string;
  fromEmail: string;
  subject: Record<Lang, string>;
  preview: Record<Lang, string>;
  time: string;
  hasAttachment: boolean;
  links: Link[];
  status: Status;
}

const LINK_COLORS: Record<Link["type"], string> = {
  project: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  po: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  task: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const INITIAL_EMAILS: DemoEmail[] = [
  {
    id: "1",
    from: "Lena Hofer",
    fromEmail: "l.hofer@nordmetall.example",
    subject: {
      de: "Angebot Halteblech P26-014",
      en: "Quote bracket P26-014",
      hu: "Árajánlat tartólemez P26-014",
    },
    preview: {
      de: "Anbei unser Angebot für das Halteblech. Termin können wir einhalten…",
      en: "Please find our quote for the bracket attached. We can meet the deadline…",
      hu: "Mellékelten küldjük árajánlatunkat a tartólemezre. A határidőt tudjuk tartani…",
    },
    time: "10:34",
    hasAttachment: true,
    links: [{ label: "P26-014", type: "project" }],
    status: "inbox",
  },
  {
    id: "2",
    from: "Marek Kovács",
    fromEmail: "m.kovacs@praezitec.example",
    subject: {
      de: "RE: Bestellung PO-2026-0021",
      en: "RE: Order PO-2026-0021",
      hu: "RE: Megrendelés PO-2026-0021",
    },
    preview: {
      de: "Die Lieferung ist für nächste Woche Dienstag bestätigt…",
      en: "Delivery is confirmed for next Tuesday…",
      hu: "A szállítás jövő keddre megerősítve…",
    },
    time: "09:20",
    hasAttachment: false,
    links: [{ label: "PO-2026-0021", type: "po" }],
    status: "inbox",
  },
  {
    id: "3",
    from: "Tobias Reiner",
    fromEmail: "t.reiner@feintech.example",
    subject: {
      de: "Freigabe Zeichnung V3 benötigt",
      en: "Approval drawing V3 needed",
      hu: "V3 rajz jóváhagyása szükséges",
    },
    preview: {
      de: "Kannst du die aktualisierte Zeichnung V3 noch heute freigeben?",
      en: "Can you approve the updated drawing V3 today?",
      hu: "Jóvá tudod hagyni a frissített V3 rajzot még ma?",
    },
    time: "08:55",
    hasAttachment: true,
    links: [
      { label: "P26-009", type: "project" },
      { label: "#34 RFQ", type: "task" },
    ],
    status: "inbox",
  },
  {
    id: "4",
    from: "Sofia Brandt",
    fromEmail: "s.brandt@beispiel.example",
    subject: {
      de: "Meeting morgen 14:00",
      en: "Meeting tomorrow 14:00",
      hu: "Megbeszélés holnap 14:00",
    },
    preview: {
      de: "Kurze Erinnerung: Morgen 14:00 Review-Meeting für Phase 2…",
      en: "Quick reminder: review meeting for phase 2 tomorrow at 14:00…",
      hu: "Rövid emlékeztető: holnap 14:00 áttekintő megbeszélés a 2. fázishoz…",
    },
    time: "Gestern",
    hasAttachment: false,
    links: [],
    status: "inbox",
  },
];

const STR: Record<Lang, {
  tabs: { inbox: string; read: string; reply: string; saved: string };
  del: string;
  markRead: string;
  reply: string;
  save: string;
  empty: string;
  reset: string;
  hint: string;
}> = {
  de: {
    tabs: { inbox: "Posteingang", read: "Gelesen", reply: "Beantworten", saved: "Merken" },
    del: "🗑 Löschen",
    markRead: "✓ Gelesen",
    reply: "↩ Antworten",
    save: "★ Merken",
    empty: "Keine Mails hier — alles erledigt ✨",
    reset: "↺ Zurücksetzen",
    hint: "Testdaten · klick die Buttons zum Sortieren",
  },
  en: {
    tabs: { inbox: "Inbox", read: "Read", reply: "Reply", saved: "Saved" },
    del: "🗑 Delete",
    markRead: "✓ Read",
    reply: "↩ Reply",
    save: "★ Save",
    empty: "No mail here — all done ✨",
    reset: "↺ Reset",
    hint: "Test data · click the buttons to triage",
  },
  hu: {
    tabs: { inbox: "Beérkezett", read: "Olvasott", reply: "Válasz", saved: "Mentett" },
    del: "🗑 Törlés",
    markRead: "✓ Olvasott",
    reply: "↩ Válasz",
    save: "★ Mentés",
    empty: "Nincs itt levél — kész ✨",
    reset: "↺ Visszaállítás",
    hint: "Tesztadatok · kattints a gombokra a rendezéshez",
  },
};

export function BlitzDemo({ lang, wide = false }: { lang: Lang; wide?: boolean }) {
  const [emails, setEmails] = useState<DemoEmail[]>(INITIAL_EMAILS);
  const [tab, setTab] = useState<Status>("inbox");
  const s = STR[lang];

  const move = (id: string, status: Status) =>
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));

  const reset = () => {
    setEmails(INITIAL_EMAILS);
    setTab("inbox");
  };

  const count = (st: Status) => emails.filter((e) => e.status === st).length;
  const visible = emails.filter((e) => e.status === tab);

  const tabs: { key: Status; label: string; badge: string }[] = [
    { key: "inbox", label: s.tabs.inbox, badge: "bg-cyan-400 text-slate-950" },
    { key: "read", label: s.tabs.read, badge: "bg-slate-600 text-slate-200" },
    { key: "reply", label: s.tabs.reply, badge: "bg-amber-500 text-slate-950" },
    { key: "saved", label: s.tabs.saved, badge: "bg-purple-500 text-white" },
  ];

  return (
    <div className={`glass bg-slate-950/60 overflow-hidden w-full shadow-2xl ${wide ? "" : "max-w-md mx-auto"}`}>
      {/* App bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-400/10 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold">⚡ Blitz</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 font-mono">
            DEMO
          </span>
        </div>
        <button onClick={reset} className="text-xs text-slate-400 hover:text-cyan-400 transition">
          {s.reset}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-cyan-400/10 text-xs">
        {tabs.map((tb) => (
          <button
            key={tb.key}
            onClick={() => setTab(tb.key)}
            className={`flex-1 px-2 py-2.5 flex items-center justify-center gap-1.5 transition ${
              tab === tb.key
                ? "text-cyan-400 border-b-2 border-cyan-400 bg-slate-900/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>{tb.label}</span>
            {count(tb.key) > 0 && (
              <span className={`px-1.5 rounded-full text-[10px] font-bold ${tb.badge}`}>
                {count(tb.key)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Email list */}
      <div className="p-3 space-y-3 min-h-[360px] max-h-[420px] overflow-y-auto">
        <div className="text-center text-[10px] text-slate-500 font-mono pb-1">{s.hint}</div>
        {visible.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-slate-500 text-sm text-center px-6">
            {s.empty}
          </div>
        ) : (
          visible.map((email) => (
            <div
              key={email.id}
              className="rounded-xl border border-cyan-400/10 bg-slate-900/50 p-3 hover:border-cyan-400/30 transition"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                  {email.from[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-200 truncate">{email.from}</div>
                </div>
                {email.hasAttachment && <span className="text-slate-500 text-sm">📎</span>}
                <span className="text-[11px] text-slate-500 shrink-0">{email.time}</span>
              </div>

              <div className="text-sm font-semibold text-slate-100 mb-1">{email.subject[lang]}</div>
              <div className="text-xs text-slate-400 mb-2 line-clamp-2">{email.preview[lang]}</div>

              {email.links.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {email.links.map((link, i) => (
                    <span
                      key={i}
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${LINK_COLORS[link.type]}`}
                    >
                      {link.label}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-4 gap-1.5">
                <ActionBtn onClick={() => move(email.id, "deleted")} className="hover:bg-red-500/20 hover:text-red-300">
                  {s.del}
                </ActionBtn>
                <ActionBtn onClick={() => move(email.id, "read")} className="hover:bg-emerald-500/20 hover:text-emerald-300">
                  {s.markRead}
                </ActionBtn>
                <ActionBtn onClick={() => move(email.id, "reply")} className="hover:bg-amber-500/20 hover:text-amber-300">
                  {s.reply}
                </ActionBtn>
                <ActionBtn onClick={() => move(email.id, "saved")} className="hover:bg-purple-500/20 hover:text-purple-300">
                  {s.save}
                </ActionBtn>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[10px] py-1.5 rounded-lg bg-slate-800/60 text-slate-400 transition ${className}`}
    >
      {children}
    </button>
  );
}
