"use client";

import { useState } from "react";
import { T, LANGS, type Lang } from "./translations";
import { WorkspaceDemo } from "./BlitzDemo";
import { PdmAnatomy } from "./PdmAnatomy";

export default function Home() {
  const [lang, setLang] = useState<Lang>("de");
  const t = T[lang];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-cyan-400/10 bg-slate-950/80">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
          <div className="text-2xl font-bold text-cyan-400 shrink-0">⚡ HERPERT</div>
          <div className="hidden lg:flex gap-8 text-sm">
            <a href="#workflow" className="hover:text-cyan-400 transition">{t.nav.workflow}</a>
            <a href="#module" className="hover:text-cyan-400 transition">{t.nav.modules}</a>
            <a href="#pdm" className="hover:text-cyan-400 transition">{t.nav.pdm}</a>
            <a href="#demo" className="hover:text-cyan-400 transition">Demo</a>
            <a href="#solidworks" className="hover:text-cyan-400 transition">{t.nav.solidworks}</a>
            <a href="#preis" className="hover:text-cyan-400 transition">{t.pricing.badge}</a>
            <a href="#uebersetzung" className="hover:text-cyan-400 transition">{t.nav.translation}</a>
            <a href="#contact" className="hover:text-cyan-400 transition">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <LangSwitcher lang={lang} setLang={setLang} />
            <button className="btn-primary text-sm hidden sm:block">{t.nav.cta}</button>
          </div>
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
            {t.hero.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t.hero.title1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              {t.hero.title2}
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg">{t.hero.demo}</button>
            <button className="btn-secondary px-8 py-4 text-lg">{t.hero.more}</button>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-4">{t.workflow.title}</h2>
        <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">{t.workflow.subtitle}</p>
        <div className="grid md:grid-cols-5 gap-4">
          {t.workflow.steps.map((s, i) => (
            <div key={i} className="glass-hover p-5 text-center relative">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-xs text-cyan-400 font-mono mb-1">{s.step}</div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Module */}
      <section id="module" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-16">{t.modules.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.modules.items.map((feature, i) => (
            <div key={i} className="glass-hover p-6 group">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition">
                {feature.title}
              </h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PDM Nomenklatur / Datenmodell */}
      <section id="pdm" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-mono">
            {t.pdm.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pdm.title}</h2>
          <p className="text-slate-300 leading-relaxed">{t.pdm.desc}</p>
        </div>
        <PdmAnatomy lang={lang} />
      </section>

      {/* Blitz Live Demo */}
      <section id="demo" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-mono">
              {t.blitzDemo.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.blitzDemo.title}</h2>
            <p className="text-slate-300 leading-relaxed">{t.blitzDemo.desc}</p>
          </div>
          <WorkspaceDemo lang={lang} />
        </div>
      </section>

      {/* Übersetzung — Mega Feature */}
      <section id="uebersetzung" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="glass p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-mono">
              {t.translation.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.translation.title}</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">{t.translation.desc}</p>
            <ul className="space-y-3 text-slate-300">
              {t.translation.points.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-cyan-400">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <TranslationDemo label={t.translation.demoLabel} />
        </div>
      </section>

      {/* SolidWorks */}
      <section id="solidworks" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="glass p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-mono">
              {t.solidworks.badge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.solidworks.title}</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">{t.solidworks.desc}</p>
            <ul className="space-y-3 text-slate-300">
              {t.solidworks.points.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-cyan-400">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass bg-slate-950/50 p-6 font-mono text-sm">
            <div className="text-cyan-400 mb-4 text-xs">{t.solidworks.paneTitle}</div>
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

      {/* Preis */}
      <section id="preis" className="py-20 px-6 max-w-3xl mx-auto w-full">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-xs font-mono">
            {t.pricing.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricing.title}</h2>
          <p className="text-slate-300 max-w-xl mx-auto">{t.pricing.subtitle}</p>
        </div>

        <div className="glass p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl" />
          <div className="text-center mb-8 relative">
            <div className="flex items-end justify-center gap-2">
              <span className="text-6xl font-bold text-cyan-400">{t.pricing.price}</span>
              <div className="text-left mb-2">
                <div className="text-slate-300 text-sm">{t.pricing.per}</div>
                <div className="text-slate-400 text-sm">{t.pricing.seat}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-cyan-400/10 pt-6 mb-6">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">
              {t.pricing.includedTitle}
            </div>
            <ul className="space-y-3">
              {t.pricing.included.map((item, i) => (
                <li key={i} className="flex gap-3 text-slate-200">
                  <span className="text-cyan-400 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button className="btn-primary w-full py-4 text-lg mb-3">{t.pricing.cta}</button>
          <div className="text-center text-xs text-slate-500">{t.pricing.note}</div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">{t.cta.title}</h2>
          <p className="text-xl text-slate-300 mb-8">{t.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg">{t.cta.demo}</button>
            <button className="btn-secondary px-8 py-4 text-lg">{t.cta.contact}</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-400/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <div>© 2026 HERPERT — {t.footer.tagline}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition">{t.footer.imprint}</a>
            <a href="#" className="hover:text-cyan-400 transition">{t.footer.privacy}</a>
            <a href="#" className="hover:text-cyan-400 transition">{t.footer.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex gap-1 p-1 rounded-lg bg-slate-800/50 border border-cyan-400/10">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2.5 py-1 rounded text-sm transition ${
            lang === l.code
              ? "bg-cyan-400 text-slate-950 font-semibold"
              : "text-slate-400 hover:text-cyan-400"
          }`}
          aria-label={l.label}
        >
          {l.flag}
        </button>
      ))}
    </div>
  );
}

const DEMO_PHRASES: Record<Lang, string> = {
  de: "Lagerbock fräsen, Toleranz H7, bis Freitag",
  en: "Mill bearing block, tolerance H7, by Friday",
  hu: "Csapágybak marása, H7 tűrés, péntekig",
};

function TranslationDemo({ label }: { label: string }) {
  return (
    <div className="glass bg-slate-950/50 p-6 font-mono text-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-cyan-400 text-xs">{label}</span>
        <span className="flex items-center gap-1.5 text-xs text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Igor AI
        </span>
      </div>
      <div className="space-y-3">
        {LANGS.map((l) => (
          <div key={l.code} className="bg-slate-800/50 rounded px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span>{l.flag}</span>
              <span className="text-xs text-slate-500 uppercase">{l.code}</span>
            </div>
            <div className="text-slate-200">{DEMO_PHRASES[l.code]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
