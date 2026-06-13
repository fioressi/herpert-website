export type Lang = "de" | "en" | "hu";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hu", label: "Magyar", flag: "🇭🇺" },
];

type Content = {
  nav: { workflow: string; modules: string; pdm: string; solidworks: string; translation: string; contact: string; cta: string };
  pdm: {
    badge: string;
    title: string;
    desc: string;
    partIdLabel: string;
    segments: { code: string; label: string; hint: string }[];
    example: string;
    familiesTitle: string;
    families: { range: string; name: string }[];
    lifecycleTitle: string;
    lifecycleNote: string;
    phases: { code: string; phase: string; stage: string; color: string }[];
  };
  hero: { badge: string; title1: string; title2: string; subtitle: string; demo: string; more: string };
  workflow: {
    title: string;
    subtitle: string;
    steps: { step: string; title: string; desc: string; icon: string }[];
  };
  modules: { title: string; items: { title: string; desc: string }[] };
  solidworks: {
    badge: string;
    title: string;
    desc: string;
    points: string[];
    paneTitle: string;
  };
  translation: {
    badge: string;
    title: string;
    desc: string;
    points: string[];
    demoLabel: string;
  };
  blitzDemo: {
    badge: string;
    title: string;
    desc: string;
    views: { email: string; brett: string; kalender: string; tasks: string; orders: string; rudel: string };
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    price: string;
    per: string;
    seat: string;
    includedTitle: string;
    included: string[];
    note: string;
    cta: string;
  };
  cta: { title: string; subtitle: string; demo: string; contact: string };
  footer: { tagline: string; imprint: string; privacy: string; contact: string };
};

export const T: Record<Lang, Content> = {
  de: {
    nav: { workflow: "Workflow", modules: "Module", pdm: "PDM-Logik", solidworks: "SolidWorks", translation: "Übersetzung", contact: "Kontakt", cta: "Demo anfragen" },
    pdm: {
      badge: "GROUP PDM · DATENMODELL",
      title: "Eine PartId, die alles erzählt",
      desc: "Jedes Objekt — Teil, Baugruppe, Dokument, Werkzeug, Rohmaterial — bekommt eine unveränderliche PartId. Vier Segmente codieren Eigentümer, Klasse, Identität und Reifegrad. Die ID ändert sich nie; ein Statuswechsel erzeugt eine neue Zeile mit demselben UniqueKey.",
      partIdLabel: "Aufbau der PartId",
      segments: [
        { code: "H", label: "CompanyCode", hint: "1 Buchstabe · besitzende Firma" },
        { code: "7206", label: "ClassCode", hint: "4 Ziffern · Objektklasse (125 Klassen)" },
        { code: "13282", label: "UniqueKey", hint: "5 Zeichen · permanent, nie wiederverwendet" },
        { code: "90", label: "StatusCode", hint: "2 Ziffern · Reifegrad im Lifecycle" },
      ],
      example: "H-7206-13282-90 = Helios Werk · Blechteil · Key 13282 · Prototyp",
      familiesTitle: "Klassen-Familien (125 Klassen in 15 Familien)",
      families: [
        { range: "1001–1104", name: "Dokumente (Konstruktion & Fertigung)" },
        { range: "4001–4009", name: "Rohmaterialien" },
        { range: "5001–5009", name: "Werkzeuge & Vorrichtungen" },
        { range: "6001–6010", name: "Prozesse & Oberflächen" },
        { range: "7000–7090", name: "Baugruppen, Teile, Systeme, PCBAs" },
        { range: "7200–7208", name: "Fertigungstechnologien" },
        { range: "7610–7881", name: "Elektrik, Elektronik, Hardware" },
        { range: "9000–9160", name: "Versand, Endmontage, Verkaufsteile" },
      ],
      lifecycleTitle: "Status-Lifecycle (StatusCode-Segment)",
      lifecycleNote: "COTS-/Kaufteile bleiben immer auf 00 — der Lebenszyklus gilt nur für Eigenentwicklung.",
      phases: [
        { code: "00", phase: "COTS", stage: "Kaufteil", color: "#6b7280" },
        { code: "20–49", phase: "DOV", stage: "Vision · Evaluation → Ideation", color: "#8b5cf6" },
        { code: "50–89", phase: "NPD", stage: "Entwicklung · Konzept → Verifikation", color: "#3b82f6" },
        { code: "90–99", phase: "NPI", stage: "Einführung · Industrialisierung", color: "#f59e0b" },
        { code: "01–09", phase: "Ramp Up", stage: "Serienproduktion", color: "#10b981" },
      ],
    },
    hero: {
      badge: "ERP · PDM · SolidWorks-Integration",
      title1: "Von der Konstruktion",
      title2: "bis zur Fertigung",
      subtitle: "HERPERT ist das ERP-System für konstruktionsnahe Fertigung. Produktdaten, Stücklisten, Beschaffung und Produktion in einem System — direkt verbunden mit SolidWorks und Microsoft 365.",
      demo: "→ Live Demo",
      more: "Mehr erfahren",
    },
    workflow: {
      title: "Ein durchgängiger Prozess",
      subtitle: "HERPERT begleitet das Bauteil über seinen gesamten Lebenszyklus — kein Medienbruch zwischen CAD, Datenverwaltung und Fertigung.",
      steps: [
        { step: "1", title: "Konstruktion", desc: "SolidWorks Add-in legt PDM-Objekte direkt aus dem CAD an", icon: "✏️" },
        { step: "2", title: "PDM", desc: "Produktdaten, Klassifizierung, Thumbnails, Lifecycle-Status", icon: "📦" },
        { step: "3", title: "Stückliste", desc: "Mehrstufige BOM automatisch aus der Baugruppe", icon: "🗂️" },
        { step: "4", title: "Beschaffung", desc: "Bestellungen, Lieferanten, Bedarfsermittlung", icon: "🛒" },
        { step: "5", title: "Produktion", desc: "Fertigungsaufträge, Material-Reservierung", icon: "🏭" },
      ],
    },
    modules: {
      title: "Module",
      items: [
        { title: "📦 PDM", desc: "Zentrale Produktdatenverwaltung — Klassifizierung, Eigenschaften, Thumbnails, Lieferanten- und Projektzuordnung, Lifecycle-Status." },
        { title: "🗂️ Stücklisten (BOM)", desc: "Mehrstufige Stücklisten mit Explosion, Master-BOM und Excel-Import. Automatisch aus der SolidWorks-Baugruppe generiert." },
        { title: "📨 RFQ-Portal", desc: "Anfragen gehen als Web-Link an die Lieferanten — die tragen ihr Angebot direkt im Browser ein. Preise und Lieferzeiten landen automatisch im PDM, ganz ohne Email-Ping-Pong." },
        { title: "🛒 Beschaffung & PO", desc: "Aus dem Bedarf werden Bestellungen mit einem Klick gelöst — Positionen, Lieferanten, Termine. Status von OFFEN über UNTERWEGS bis ANGEKOMMEN, automatisch aus der BOM-Explosion." },
        { title: "🏭 Produktion", desc: "Fertigungsaufträge, SOLL-Bedarf, Material-Reservierungen aus dem Bestand, Zuordnung von Stücklisten." },
        { title: "👥 CRM", desc: "Unternehmen und Kontakte, Lieferanten und Kunden, Firmenkürzel und Projektzuordnung." },
        { title: "⚡ Blitz Email", desc: "PDM-integrierter Email-Client für Microsoft 365. Emails mit Projekten, Bestellungen und Tasks verknüpfen, KI-Unterstützung via Igor." },
        { title: "🛰️ Blitz Fips", desc: "Field Interactive Project Space — ein reibungsfreier Collab-Space, der die Hürden zwischen Firmen überwindet. Jeder Room bündelt Kanban, Termine, Mails, Files und Chat (mit KI-Meute); Partner ohne eigenes ERP docken einfach an. Andockbar an jedes ERP — ersetzt Slack & Monday." },
        { title: "✅ Paul", desc: "Project Approval & Lifecycle Management — steuert die Reifegrad-Übergänge (COTS → DOV → NPD → NPI → Ramp-Up) und sammelt die nötigen Freigaben." },
        { title: "🧮 Klaus", desc: "Buchhaltung: Rechnungen, Fälligkeiten und Zahlungsstatus, direkt aus Bestellungen und Belegen gespeist." },
        { title: "🐺 Meute & Zwutschgerln", desc: "KI-Council (Igor, BrainB/C/G, Gregor) von jeder Seite zuschaltbar, plus private Klebezettel an Mails, Tasks und Brett-Karten." },
      ],
    },
    solidworks: {
      badge: "NATIVE INTEGRATION",
      title: "Direkt aus SolidWorks",
      desc: "Das HERPERT Add-in lebt im SolidWorks Task Pane. Engineers legen PDM-Objekte an, schreiben Eigenschaften zurück ins CAD und erzeugen komplette Stücklisten — ohne SolidWorks zu verlassen.",
      points: [
        "Eigenschaften zwischen SolidWorks und PDM synchronisieren",
        "Baugruppe durchlaufen und fehlende Teile automatisch anlegen",
        "Mehrstufige BOM mit einem Klick speichern",
        "Thumbnails automatisch erfassen und ablegen",
      ],
      paneTitle: "SolidWorks Task Pane",
    },
    translation: {
      badge: "AUTOMATISCHE ÜBERSETZUNG",
      title: "Jeder Datensatz in drei Sprachen — automatisch",
      desc: "Das Killer-Feature für internationale Teams: HERPERT übersetzt Aufgaben, Beschreibungen und Bauteildaten KI-gestützt automatisch in Deutsch, Englisch und Ungarisch. Erfasst der Konstrukteur einen Text, steht er Sekunden später in allen drei Sprachen bereit — ohne manuelles Zutun.",
      points: [
        "DE · EN · HU für jeden Task und jedes Objekt",
        "KI-Übersetzung im Hintergrund via Igor",
        "Konstrukteur in Deutschland, Fertigung in Ungarn — alle lesen ihre Sprache",
        "Keine Doppelpflege, keine Copy-Paste-Übersetzung",
      ],
      demoLabel: "Live-Übersetzung",
    },
    blitzDemo: {
      badge: "INTERAKTIVE DEMO",
      title: "Das ganze System live ausprobieren",
      desc: "Email-Triage, Kanban-Brett, Kalender, Tasks, Bestellungen und der Rudel-KI-Chat — wechseln Sie oben die Ansicht. Alles läuft hier mit Testdaten, klickbar und ohne Login.",
      views: { email: "📧 Blitz", brett: "🗂️ Brett", kalender: "📅 Kalender", tasks: "📋 Tasks", orders: "🛒 Bestellungen", rudel: "🐺 Rudel" },
    },
    pricing: {
      badge: "PREIS",
      title: "Ein Preis, alles inklusive",
      subtitle: "Keine Module zum Nachkaufen, keine Setup-Gebühr. Sie zahlen pro aktivem Arbeitsplatz.",
      price: "50 €",
      per: "pro Monat",
      seat: "pro Arbeitsplatz",
      includedTitle: "Im Preis enthalten",
      included: [
        "Alle Module — PDM, BOM, Beschaffung, Produktion, CRM",
        "Blitz Email-Client + Rudel-KI-Assistent",
        "SolidWorks-Add-in ohne Aufpreis",
        "Automatische Übersetzung DE / EN / HU",
        "Cloud-Hosting, Updates und Support",
      ],
      note: "Monatlich kündbar · zzgl. MwSt.",
      cta: "Jetzt starten",
    },
    cta: {
      title: "Bereit für durchgängige Prozesse?",
      subtitle: "Sehen Sie, wie HERPERT Konstruktion und Fertigung verbindet.",
      demo: "Demo vereinbaren",
      contact: "Kontakt aufnehmen",
    },
    footer: {
      tagline: "ERP für Konstruktion & Fertigung",
      imprint: "Impressum",
      privacy: "Datenschutz",
      contact: "Kontakt",
    },
  },

  en: {
    nav: { workflow: "Workflow", modules: "Modules", pdm: "PDM logic", solidworks: "SolidWorks", translation: "Translation", contact: "Contact", cta: "Request demo" },
    pdm: {
      badge: "GROUP PDM · DATA MODEL",
      title: "One PartId that tells the whole story",
      desc: "Every object — part, assembly, document, tool, raw material — gets an immutable PartId. Four segments encode owner, class, identity and maturity. The ID never changes; a status change creates a new row with the same UniqueKey.",
      partIdLabel: "Anatomy of the PartId",
      segments: [
        { code: "H", label: "CompanyCode", hint: "1 letter · owning company" },
        { code: "7206", label: "ClassCode", hint: "4 digits · object class (125 classes)" },
        { code: "13282", label: "UniqueKey", hint: "5 chars · permanent, never reused" },
        { code: "90", label: "StatusCode", hint: "2 digits · maturity in the lifecycle" },
      ],
      example: "H-7206-13282-90 = Helios Werk · Sheet metal part · Key 13282 · Prototype",
      familiesTitle: "Class families (125 classes across 15 families)",
      families: [
        { range: "1001–1104", name: "Documents (engineering & manufacturing)" },
        { range: "4001–4009", name: "Raw materials" },
        { range: "5001–5009", name: "Tools & fixtures" },
        { range: "6001–6010", name: "Processes & finishes" },
        { range: "7000–7090", name: "Assemblies, parts, systems, PCBAs" },
        { range: "7200–7208", name: "Fabrication technologies" },
        { range: "7610–7881", name: "Electrical, electronic, hardware" },
        { range: "9000–9160", name: "Shipping, final assemblies, sales parts" },
      ],
      lifecycleTitle: "Status lifecycle (StatusCode segment)",
      lifecycleNote: "COTS / purchased parts always stay at 00 — the lifecycle applies only to in-house development.",
      phases: [
        { code: "00", phase: "COTS", stage: "Purchased part", color: "#6b7280" },
        { code: "20–49", phase: "DOV", stage: "Vision · evaluation → ideation", color: "#8b5cf6" },
        { code: "50–89", phase: "NPD", stage: "Development · concept → verification", color: "#3b82f6" },
        { code: "90–99", phase: "NPI", stage: "Introduction · industrialize", color: "#f59e0b" },
        { code: "01–09", phase: "Ramp Up", stage: "Series production", color: "#10b981" },
      ],
    },
    hero: {
      badge: "ERP · PDM · SolidWorks integration",
      title1: "From design",
      title2: "to manufacturing",
      subtitle: "HERPERT is the ERP system for engineering-driven manufacturing. Product data, bills of materials, procurement and production in one system — connected directly to SolidWorks and Microsoft 365.",
      demo: "→ Live demo",
      more: "Learn more",
    },
    workflow: {
      title: "One seamless process",
      subtitle: "HERPERT follows the part across its entire lifecycle — no media breaks between CAD, data management and manufacturing.",
      steps: [
        { step: "1", title: "Design", desc: "SolidWorks add-in creates PDM objects straight from CAD", icon: "✏️" },
        { step: "2", title: "PDM", desc: "Product data, classification, thumbnails, lifecycle status", icon: "📦" },
        { step: "3", title: "BOM", desc: "Multi-level bills of materials generated from the assembly", icon: "🗂️" },
        { step: "4", title: "Procurement", desc: "Purchase orders, suppliers, demand calculation", icon: "🛒" },
        { step: "5", title: "Production", desc: "Production orders, material reservations", icon: "🏭" },
      ],
    },
    modules: {
      title: "Modules",
      items: [
        { title: "📦 PDM", desc: "Central product data management — classification, properties, thumbnails, supplier and project assignment, lifecycle status." },
        { title: "🗂️ Bills of Materials", desc: "Multi-level BOMs with explosion, master BOM and Excel import. Generated automatically from the SolidWorks assembly." },
        { title: "📨 RFQ portal", desc: "Requests go out to suppliers as a web link — they enter their quote straight in the browser. Prices and lead times land in the PDM automatically, with zero email ping-pong." },
        { title: "🛒 Procurement & PO", desc: "Demand turns into purchase orders in one click — line items, suppliers, dates. Status from OPEN through IN TRANSIT to ARRIVED, fed automatically from the BOM explosion." },
        { title: "🏭 Production", desc: "Production orders, target demand, material reservations from inventory, BOM assignment." },
        { title: "👥 CRM", desc: "Companies and contacts, suppliers and customers, company codes and project assignment." },
        { title: "⚡ Blitz Email", desc: "PDM-integrated email client for Microsoft 365. Link emails to projects, orders and tasks, AI assistance via Igor." },
        { title: "🛰️ Blitz Fips", desc: "Field Interactive Project Space — a friction-free collaboration space that overcomes the barriers between companies. Every room bundles Kanban, calendar, mails, files and chat (with the AI pack); partners with no ERP of their own simply dock in. Pluggable into any ERP — replaces Slack & Monday." },
        { title: "✅ Paul", desc: "Project Approval & Lifecycle Management — drives the maturity transitions (COTS → DOV → NPD → NPI → Ramp-Up) and collects the required approvals." },
        { title: "🧮 Klaus", desc: "Accounting: invoices, due dates and payment status, fed straight from orders and documents." },
        { title: "🐺 Meute & Zwutschgerln", desc: "AI council (Igor, BrainB/C/G, Gregor) switchable from any page, plus private sticky notes pinned to mails, tasks and board cards." },
      ],
    },
    solidworks: {
      badge: "NATIVE INTEGRATION",
      title: "Straight from SolidWorks",
      desc: "The HERPERT add-in lives in the SolidWorks Task Pane. Engineers create PDM objects, write properties back to CAD and generate complete bills of materials — without ever leaving SolidWorks.",
      points: [
        "Sync properties between SolidWorks and PDM",
        "Traverse the assembly and auto-create missing parts",
        "Save multi-level BOM with a single click",
        "Capture and store thumbnails automatically",
      ],
      paneTitle: "SolidWorks Task Pane",
    },
    translation: {
      badge: "AUTOMATIC TRANSLATION",
      title: "Every record in three languages — automatically",
      desc: "The killer feature for international teams: HERPERT automatically translates tasks, descriptions and part data into German, English and Hungarian using AI. The moment an engineer enters text, it is available in all three languages seconds later — with zero manual effort.",
      points: [
        "DE · EN · HU for every task and every object",
        "AI translation in the background via Igor",
        "Engineer in Germany, production in Hungary — everyone reads their language",
        "No duplicate data entry, no copy-paste translation",
      ],
      demoLabel: "Live translation",
    },
    blitzDemo: {
      badge: "INTERACTIVE DEMO",
      title: "Try the whole system live",
      desc: "Email triage, kanban board, calendar, tasks, orders and the Rudel AI chat — switch the view above. Everything runs here on test data, clickable and without login.",
      views: { email: "📧 Blitz", brett: "🗂️ Board", kalender: "📅 Calendar", tasks: "📋 Tasks", orders: "🛒 Orders", rudel: "🐺 Rudel" },
    },
    pricing: {
      badge: "PRICING",
      title: "One price, everything included",
      subtitle: "No modules to buy on top, no setup fee. You pay per active seat.",
      price: "€50",
      per: "per month",
      seat: "per seat",
      includedTitle: "Included in the price",
      included: [
        "All modules — PDM, BOM, procurement, production, CRM",
        "Blitz email client + Rudel AI assistant",
        "SolidWorks add-in at no extra cost",
        "Automatic translation DE / EN / HU",
        "Cloud hosting, updates and support",
      ],
      note: "Cancel monthly · plus VAT",
      cta: "Get started",
    },
    cta: {
      title: "Ready for seamless processes?",
      subtitle: "See how HERPERT connects design and manufacturing.",
      demo: "Book a demo",
      contact: "Get in touch",
    },
    footer: {
      tagline: "ERP for engineering & manufacturing",
      imprint: "Imprint",
      privacy: "Privacy",
      contact: "Contact",
    },
  },

  hu: {
    nav: { workflow: "Folyamat", modules: "Modulok", pdm: "PDM-logika", solidworks: "SolidWorks", translation: "Fordítás", contact: "Kapcsolat", cta: "Demó kérése" },
    pdm: {
      badge: "GROUP PDM · ADATMODELL",
      title: "Egy PartId, amely mindent elmesél",
      desc: "Minden objektum — alkatrész, összeállítás, dokumentum, szerszám, alapanyag — megváltoztathatatlan PartId-t kap. Négy szegmens kódolja a tulajdonost, az osztályt, az identitást és az érettséget. Az azonosító soha nem változik; egy állapotváltás új sort hoz létre ugyanazzal a UniqueKey-jel.",
      partIdLabel: "A PartId felépítése",
      segments: [
        { code: "H", label: "CompanyCode", hint: "1 betű · tulajdonos cég" },
        { code: "7206", label: "ClassCode", hint: "4 számjegy · objektumosztály (125 osztály)" },
        { code: "13282", label: "UniqueKey", hint: "5 karakter · állandó, soha nem újrahasznosított" },
        { code: "90", label: "StatusCode", hint: "2 számjegy · érettség az életciklusban" },
      ],
      example: "H-7206-13282-90 = Helios Werk · Lemezalkatrész · Key 13282 · Prototípus",
      familiesTitle: "Osztálycsaládok (125 osztály 15 családban)",
      families: [
        { range: "1001–1104", name: "Dokumentumok (tervezés és gyártás)" },
        { range: "4001–4009", name: "Alapanyagok" },
        { range: "5001–5009", name: "Szerszámok és készülékek" },
        { range: "6001–6010", name: "Folyamatok és felületek" },
        { range: "7000–7090", name: "Összeállítások, alkatrészek, rendszerek, PCBA-k" },
        { range: "7200–7208", name: "Gyártástechnológiák" },
        { range: "7610–7881", name: "Elektromos, elektronikai, hardver" },
        { range: "9000–9160", name: "Szállítás, végszerelés, eladási alkatrészek" },
      ],
      lifecycleTitle: "Állapot-életciklus (StatusCode szegmens)",
      lifecycleNote: "A COTS / vásárolt alkatrészek mindig 00-n maradnak — az életciklus csak a saját fejlesztésre vonatkozik.",
      phases: [
        { code: "00", phase: "COTS", stage: "Vásárolt alkatrész", color: "#6b7280" },
        { code: "20–49", phase: "DOV", stage: "Vízió · értékelés → ötletelés", color: "#8b5cf6" },
        { code: "50–89", phase: "NPD", stage: "Fejlesztés · koncepció → ellenőrzés", color: "#3b82f6" },
        { code: "90–99", phase: "NPI", stage: "Bevezetés · iparosítás", color: "#f59e0b" },
        { code: "01–09", phase: "Ramp Up", stage: "Sorozatgyártás", color: "#10b981" },
      ],
    },
    hero: {
      badge: "ERP · PDM · SolidWorks integráció",
      title1: "A tervezéstől",
      title2: "a gyártásig",
      subtitle: "A HERPERT a tervezésközpontú gyártás ERP-rendszere. Termékadatok, darabjegyzékek, beszerzés és gyártás egyetlen rendszerben — közvetlenül összekötve a SolidWorks-szel és a Microsoft 365-tel.",
      demo: "→ Élő demó",
      more: "Tudjon meg többet",
    },
    workflow: {
      title: "Egyetlen átfogó folyamat",
      subtitle: "A HERPERT végigkíséri az alkatrészt a teljes életciklusán — nincs törés a CAD, az adatkezelés és a gyártás között.",
      steps: [
        { step: "1", title: "Tervezés", desc: "A SolidWorks bővítmény közvetlenül a CAD-ből hoz létre PDM-objektumokat", icon: "✏️" },
        { step: "2", title: "PDM", desc: "Termékadatok, osztályozás, miniatűrök, életciklus-állapot", icon: "📦" },
        { step: "3", title: "Darabjegyzék", desc: "Többszintű BOM automatikusan az összeállításból", icon: "🗂️" },
        { step: "4", title: "Beszerzés", desc: "Megrendelések, beszállítók, igénymeghatározás", icon: "🛒" },
        { step: "5", title: "Gyártás", desc: "Gyártási megrendelések, anyagfoglalás", icon: "🏭" },
      ],
    },
    modules: {
      title: "Modulok",
      items: [
        { title: "📦 PDM", desc: "Központi termékadat-kezelés — osztályozás, tulajdonságok, miniatűrök, beszállító- és projekt-hozzárendelés, életciklus-állapot." },
        { title: "🗂️ Darabjegyzék (BOM)", desc: "Többszintű darabjegyzékek robbantással, master BOM és Excel-import. Automatikusan a SolidWorks összeállításból generálva." },
        { title: "📨 RFQ-portál", desc: "Az ajánlatkérések web-linkként mennek ki a beszállítókhoz — ők közvetlenül a böngészőben adják meg ajánlatukat. Az árak és szállítási idők automatikusan a PDM-be kerülnek, email-pingpong nélkül." },
        { title: "🛒 Beszerzés & PO", desc: "Az igényből egy kattintással születnek megrendelések — tételek, beszállítók, határidők. Állapot NYITOTT-tól ÚTON keresztül MEGÉRKEZETT-ig, automatikusan a BOM-robbantásból táplálva." },
        { title: "🏭 Gyártás", desc: "Gyártási megrendelések, tervezett igény, anyagfoglalások a készletből, darabjegyzék-hozzárendelés." },
        { title: "👥 CRM", desc: "Cégek és kapcsolattartók, beszállítók és vevők, cégkódok és projekt-hozzárendelés." },
        { title: "⚡ Blitz Email", desc: "PDM-integrált email-kliens Microsoft 365-höz. Emailek összekapcsolása projektekkel, megrendelésekkel és feladatokkal, MI-támogatás az Igor révén." },
        { title: "🛰️ Blitz Fips", desc: "Field Interactive Project Space — súrlódásmentes együttműködési tér, amely lebontja a cégek közötti akadályokat. Minden room egyesíti a Kanbant, naptárt, emaileket, fájlokat és chatet (MI-falkával); a saját ERP nélküli partnerek egyszerűen csatlakoznak. Bármely ERP-hez illeszthető — kiváltja a Slacket és a Monday-t." },
        { title: "✅ Paul", desc: "Project Approval & Lifecycle Management — vezérli az érettségi átmeneteket (COTS → DOV → NPD → NPI → Ramp-Up) és összegyűjti a szükséges jóváhagyásokat." },
        { title: "🧮 Klaus", desc: "Könyvelés: számlák, határidők és fizetési állapot, közvetlenül a megrendelésekből és bizonylatokból táplálva." },
        { title: "🐺 Meute & Zwutschgerln", desc: "MI-tanács (Igor, BrainB/C/G, Gregor) bármely oldalról bekapcsolható, plusz privát cetlik emailekhez, feladatokhoz és tábla-kártyákhoz tűzve." },
      ],
    },
    solidworks: {
      badge: "NATÍV INTEGRÁCIÓ",
      title: "Közvetlenül a SolidWorks-ből",
      desc: "A HERPERT bővítmény a SolidWorks Task Pane-ben él. A mérnökök PDM-objektumokat hoznak létre, tulajdonságokat írnak vissza a CAD-be és teljes darabjegyzékeket generálnak — anélkül, hogy elhagynák a SolidWorks-öt.",
      points: [
        "Tulajdonságok szinkronizálása a SolidWorks és a PDM között",
        "Az összeállítás bejárása és a hiányzó alkatrészek automatikus létrehozása",
        "Többszintű BOM mentése egyetlen kattintással",
        "Miniatűrök automatikus rögzítése és tárolása",
      ],
      paneTitle: "SolidWorks Task Pane",
    },
    translation: {
      badge: "AUTOMATIKUS FORDÍTÁS",
      title: "Minden adat három nyelven — automatikusan",
      desc: "A nemzetközi csapatok kulcsfunkciója: a HERPERT MI segítségével automatikusan lefordítja a feladatokat, leírásokat és alkatrészadatokat németre, angolra és magyarra. Amint a mérnök beír egy szöveget, az másodperceken belül mindhárom nyelven elérhető — kézi munka nélkül.",
      points: [
        "DE · EN · HU minden feladathoz és objektumhoz",
        "MI-fordítás a háttérben az Igor révén",
        "Mérnök Németországban, gyártás Magyarországon — mindenki a saját nyelvén olvas",
        "Nincs kettős adatbevitel, nincs másol-beilleszt fordítás",
      ],
      demoLabel: "Élő fordítás",
    },
    blitzDemo: {
      badge: "INTERAKTÍV DEMÓ",
      title: "Próbálja ki az egész rendszert élőben",
      desc: "Email-rendezés, kanban-tábla, naptár, feladatok, megrendelések és a Rudel MI-chat — fent válthat nézetet. Minden tesztadatokkal fut, kattintható, bejelentkezés nélkül.",
      views: { email: "📧 Blitz", brett: "🗂️ Tábla", kalender: "📅 Naptár", tasks: "📋 Feladatok", orders: "🛒 Megrendelések", rudel: "🐺 Rudel" },
    },
    pricing: {
      badge: "ÁRAZÁS",
      title: "Egy ár, minden benne",
      subtitle: "Nincs külön megvásárolható modul, nincs telepítési díj. Aktív munkahelyenként fizet.",
      price: "50 €",
      per: "havonta",
      seat: "munkahelyenként",
      includedTitle: "Az árban benne van",
      included: [
        "Minden modul — PDM, BOM, beszerzés, gyártás, CRM",
        "Blitz email-kliens + Rudel MI-asszisztens",
        "SolidWorks bővítmény felár nélkül",
        "Automatikus fordítás DE / EN / HU",
        "Felhő-tárhely, frissítések és támogatás",
      ],
      note: "Havonta felmondható · ÁFA nélkül",
      cta: "Kezdés",
    },
    cta: {
      title: "Készen áll az átfogó folyamatokra?",
      subtitle: "Nézze meg, hogyan köti össze a HERPERT a tervezést és a gyártást.",
      demo: "Demó foglalása",
      contact: "Kapcsolatfelvétel",
    },
    footer: {
      tagline: "ERP a tervezéshez és gyártáshoz",
      imprint: "Impresszum",
      privacy: "Adatvédelem",
      contact: "Kapcsolat",
    },
  },
};
