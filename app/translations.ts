export type Lang = "de" | "en" | "hu";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hu", label: "Magyar", flag: "🇭🇺" },
];

type Content = {
  nav: { workflow: string; modules: string; solidworks: string; translation: string; contact: string; cta: string };
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
  cta: { title: string; subtitle: string; demo: string; contact: string };
  footer: { tagline: string; imprint: string; privacy: string; contact: string };
};

export const T: Record<Lang, Content> = {
  de: {
    nav: { workflow: "Workflow", modules: "Module", solidworks: "SolidWorks", translation: "Übersetzung", contact: "Kontakt", cta: "Demo anfragen" },
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
        { title: "🛒 Beschaffung", desc: "Bestellungen mit Positionen, Lieferantenverwaltung, automatische Bedarfsermittlung aus der BOM-Explosion." },
        { title: "🏭 Produktion", desc: "Fertigungsaufträge, SOLL-Bedarf, Material-Reservierungen aus dem Bestand, Zuordnung von Stücklisten." },
        { title: "👥 CRM", desc: "Unternehmen und Kontakte, Lieferanten und Kunden, Firmenkürzel und Projektzuordnung." },
        { title: "⚡ Blitz Email", desc: "PDM-integrierter Email-Client für Microsoft 365. Emails mit Projekten, Bestellungen und Tasks verknüpfen, KI-Unterstützung via Igor." },
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
    nav: { workflow: "Workflow", modules: "Modules", solidworks: "SolidWorks", translation: "Translation", contact: "Contact", cta: "Request demo" },
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
        { title: "🛒 Procurement", desc: "Purchase orders with line items, supplier management, automatic demand calculation from BOM explosion." },
        { title: "🏭 Production", desc: "Production orders, target demand, material reservations from inventory, BOM assignment." },
        { title: "👥 CRM", desc: "Companies and contacts, suppliers and customers, company codes and project assignment." },
        { title: "⚡ Blitz Email", desc: "PDM-integrated email client for Microsoft 365. Link emails to projects, orders and tasks, AI assistance via Igor." },
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
    nav: { workflow: "Folyamat", modules: "Modulok", solidworks: "SolidWorks", translation: "Fordítás", contact: "Kapcsolat", cta: "Demó kérése" },
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
        { title: "🛒 Beszerzés", desc: "Megrendelések tételekkel, beszállítókezelés, automatikus igénymeghatározás a BOM-robbantásból." },
        { title: "🏭 Gyártás", desc: "Gyártási megrendelések, tervezett igény, anyagfoglalások a készletből, darabjegyzék-hozzárendelés." },
        { title: "👥 CRM", desc: "Cégek és kapcsolattartók, beszállítók és vevők, cégkódok és projekt-hozzárendelés." },
        { title: "⚡ Blitz Email", desc: "PDM-integrált email-kliens Microsoft 365-höz. Emailek összekapcsolása projektekkel, megrendelésekkel és feladatokkal, MI-támogatás az Igor révén." },
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
