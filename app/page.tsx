export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-cyan-400/10 bg-slate-950/80">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-cyan-400">⚡ HERPERT</div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#workflow" className="hover:text-cyan-400 transition">Workflow</a>
            <a href="#module" className="hover:text-cyan-400 transition">Module</a>
            <a href="#solidworks" className="hover:text-cyan-400 transition">SolidWorks</a>
            <a href="#contact" className="hover:text-cyan-400 transition">Kontakt</a>
          </div>
          <button className="btn-primary text-sm">Demo anfragen</button>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-400/30 text-cyan-400 text-sm">
            ERP · PDM · SolidWorks-Integration
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Von der Konstruktion
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              bis zur Fertigung
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            HERPERT ist das ERP-System für konstruktionsnahe Fertigung. Produktdaten,
            Stücklisten, Beschaffung und Produktion in einem System — direkt verbunden
            mit SolidWorks und Microsoft 365.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg">
              → Live Demo
            </button>
            <button className="btn-secondary px-8 py-4 text-lg">
              Mehr erfahren
            </button>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-4">Ein durchgängiger Prozess</h2>
        <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
          HERPERT begleitet das Bauteil über seinen gesamten Lebenszyklus — kein
          Medienbruch zwischen CAD, Datenverwaltung und Fertigung.
        </p>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { step: "1", title: "Konstruktion", desc: "SolidWorks Add-in legt PDM-Objekte direkt aus dem CAD an", icon: "✏️" },
            { step: "2", title: "PDM", desc: "Produktdaten, Klassifizierung, Thumbnails, Lifecycle-Status", icon: "📦" },
            { step: "3", title: "Stückliste", desc: "Mehrstufige BOM automatisch aus der Baugruppe", icon: "🗂️" },
            { step: "4", title: "Beschaffung", desc: "Bestellungen, Lieferanten, Bedarfsermittlung", icon: "🛒" },
            { step: "5", title: "Produktion", desc: "Fertigungsaufträge, Material-Reservierung", icon: "🏭" },
          ].map((s, i) => (
            <div key={i} className="glass-hover p-5 text-center relative">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-xs text-cyan-400 font-mono mb-1">SCHRITT {s.step}</div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Module */}
      <section id="module" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-16">Module</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "📦 PDM",
              desc: "Zentrale Produktdatenverwaltung — Klassifizierung, Eigenschaften, Thumbnails, Lieferanten- und Projektzuordnung, Lifecycle-Status.",
            },
            {
              title: "🗂️ Stücklisten (BOM)",
              desc: "Mehrstufige Stücklisten mit Explosion, Master-BOM und Excel-Import. Automatisch aus der SolidWorks-Baugruppe generiert.",
            },
            {
              title: "🛒 Beschaffung",
              desc: "Bestellungen mit Positionen, Lieferantenverwaltung, automatische Bedarfsermittlung aus der BOM-Explosion.",
            },
            {
              title: "🏭 Produktion",
              desc: "Fertigungsaufträge, SOLL-Bedarf, Material-Reservierungen aus dem Bestand, Zuordnung von Stücklisten.",
            },
            {
              title: "👥 CRM",
              desc: "Unternehmen und Kontakte, Lieferanten und Kunden, Firmenkürzel und Projektzuordnung.",
            },
            {
              title: "⚡ Blitz Email",
              desc: "PDM-integrierter Email-Client für Microsoft 365. Emails mit Projekten, Bestellungen und Tasks verknüpfen, KI-Unterstützung via Igor.",
            },
          ].map((feature, i) => (
            <div key={i} className="glass-hover p-6 group">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition">
                {feature.title}
              </h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SolidWorks */}
      <section id="solidworks" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="glass p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-mono">
              NATIVE INTEGRATION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Direkt aus SolidWorks
            </h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Das HERPERT Add-in lebt im SolidWorks Task Pane. Engineers legen
              PDM-Objekte an, schreiben Eigenschaften zurück ins CAD und erzeugen
              komplette Stücklisten — ohne SolidWorks zu verlassen.
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                Eigenschaften zwischen SolidWorks und PDM synchronisieren
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                Baugruppe durchlaufen und fehlende Teile automatisch anlegen
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                Mehrstufige BOM mit einem Klick speichern
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400">→</span>
                Thumbnails automatisch erfassen und ablegen
              </li>
            </ul>
          </div>
          <div className="glass bg-slate-950/50 p-6 font-mono text-sm">
            <div className="text-cyan-400 mb-4 text-xs">SolidWorks Task Pane</div>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-cyan-400/10 pb-2">
                <span className="text-slate-500">PART</span>
                <span className="text-slate-500">BAUGRUPPE</span>
              </div>
              {["LOAD SLWS", "SAVE PDM", "TRAVERSE SW", "CREATE MISSING", "SAVE BOM"].map((btn) => (
                <div key={btn} className="bg-slate-800/50 rounded px-3 py-2 text-slate-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition cursor-default">
                  {btn}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Bereit für durchgängige Prozesse?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Sehen Sie, wie HERPERT Konstruktion und Fertigung verbindet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg">
              Demo vereinbaren
            </button>
            <button className="btn-secondary px-8 py-4 text-lg">
              Kontakt aufnehmen
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-400/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <div>© 2026 HERPERT — ERP für Konstruktion & Fertigung</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition">Impressum</a>
            <a href="#" className="hover:text-cyan-400 transition">Datenschutz</a>
            <a href="#" className="hover:text-cyan-400 transition">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
